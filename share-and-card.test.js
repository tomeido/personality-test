const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

function setup(t, mode = 'mbti') {
    const dom = new JSDOM(fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8'), { runScripts: 'outside-only' });
    t.after(() => dom.window.close());
    const w = dom.window;
    w.eval(fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8') + `\ncurrentTest = ${JSON.stringify(mode)};`);
    const timers = [];
    w.setTimeout = fn => { timers.push(fn); return timers.length; };
    const values = {
        'result-mbti-type': 'ESTJ', 'result-mbti-name': '경영자',
        'result-enneagram-type': '8', 'result-enneagram-name': '도전자',
        'result-instinct-type': 'SP', 'result-instinct-name': '자기보존'
    };
    for (const [id, value] of Object.entries(values)) w.document.getElementById(id).textContent = value;
    const btn = w.document.querySelector('[onclick="shareResult(event)"]');
    return { w, btn, timers, status: w.document.getElementById('share-status') };
}

test('clipboard sharing blocks repeated clicks and restores the original button', async t => {
    const { w, btn, timers, status } = setup(t);
    const original = Array.from(btn.childNodes);
    let finish;
    let copies = 0;
    w.navigator.clipboard = { writeText: text => {
        copies++;
        assert.match(text, /ESTJ/);
        return new Promise(resolve => { finish = resolve; });
    } };
    const pending = w.shareResult({ currentTarget: btn });
    assert.equal(btn.disabled, true);
    await w.shareResult({ currentTarget: btn });
    assert.equal(copies, 1);
    finish();
    await pending;
    assert.match(btn.textContent, /복사 완료/);
    assert.match(status.textContent, /클립보드/);
    timers.shift()();
    assert.equal(btn.disabled, false);
    original.forEach((node, i) => assert.equal(btn.childNodes[i], node));
    assert.equal(btn.querySelector('span').getAttribute('aria-hidden'), 'true');
});

for (const unavailable of [false, true]) {
    test(`clipboard ${unavailable ? 'unavailable' : 'rejected'} preserves copyable results and restores the button`, async t => {
        const { w, btn, timers, status } = setup(t);
        if (!unavailable) w.navigator.clipboard = { writeText: () => Promise.reject(new Error('denied')) };
        await w.shareResult({ currentTarget: btn });
        assert.match(status.textContent, /ESTJ/);
        assert.match(btn.textContent, /복사 실패/);
        timers.shift()();
        assert.equal(btn.disabled, false);
        assert.match(btn.textContent, /텍스트 공유/);
    });
}

test('cancelled native sharing leaves the clipboard and button unchanged', async t => {
    const { w, btn, timers } = setup(t);
    w.navigator.share = () => Promise.reject(Object.assign(new Error('cancelled'), { name: 'AbortError' }));
    w.navigator.clipboard = { writeText: () => assert.fail('cancel must not copy') };
    await w.shareResult({ currentTarget: btn });
    assert.equal(btn.disabled, false);
    assert.equal(timers.length, 0);
});

test('failed native sharing falls back using the captured trigger', async t => {
    const { w, btn, status } = setup(t, 'tournament');
    const event = { currentTarget: btn };
    w.navigator.share = async () => { event.currentTarget = null; throw new Error('unavailable'); };
    w.navigator.clipboard = { writeText: async text => assert.match(text, /SP.*자기보존/) };
    await w.shareResult(event);
    assert.match(btn.textContent, /복사 완료/);
    assert.match(status.textContent, /클립보드/);
});

test('native share success does not invoke clipboard fallback', async t => {
    const { w, btn, timers } = setup(t);
    w.navigator.share = async payload => assert.match(payload.text, /ESTJ/);
    w.navigator.clipboard = { writeText: () => assert.fail('native success must not copy') };
    await w.shareResult({ currentTarget: btn });
    assert.equal(timers.length, 0);
    assert.equal(btn.disabled, false);
});

for (const [mode, expected] of Object.entries({
    mbti: ['ESTJ'], 'mbti-yesno': ['ESTJ'], 'mbti-scenario': ['ESTJ'],
    enneagram: ['8'], instinct: ['SP'], tournament: ['SP'],
    both: ['ESTJ', '8'], complete: ['ESTJ', '8', 'SP']
})) {
    test(`result card renders the real results for ${mode}`, t => {
        const { w } = setup(t, mode);
        const texts = [];
        const ctx = new Proxy({}, { get: (_, key) => {
            if (key === 'measureText') return text => ({ width: text.length * 15 });
            if (key === 'createLinearGradient' || key === 'createRadialGradient') return () => ({ addColorStop() {} });
            if (key === 'fillText') return text => texts.push(String(text));
            return () => {};
        } });
        w.HTMLCanvasElement.prototype.getContext = () => ctx;
        const card = w.buildResultCardCanvas();
        assert.equal(card.width, 1080);
        assert.equal(card.height, 1350);
        for (const value of ['ESTJ', '8', 'SP']) assert.equal(texts.includes(value), expected.includes(value));
        assert.equal(texts.includes('감정형'), false);
        assert.equal(texts.includes('일대일 본능'), false);
    });
}
