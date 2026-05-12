const test = require('node:test');
const assert = require('node:assert');
const {
    isAxisDecided,
    setMbtiScores,
    resetMbtiScores
} = require('./script.js');

test('isAxisDecided', async (t) => {
    t.beforeEach(() => resetMbtiScores());

    await t.test('false when axis score is below threshold', () => {
        setMbtiScores({ EI: 7, SN: 0, TF: 0, JP: 0 });
        assert.strictEqual(isAxisDecided('EI'), false);
    });

    await t.test('true at or above positive threshold', () => {
        setMbtiScores({ EI: 8, SN: 0, TF: 0, JP: 0 });
        assert.strictEqual(isAxisDecided('EI'), true);
    });

    await t.test('true at or below negative threshold', () => {
        setMbtiScores({ EI: -9, SN: 0, TF: 0, JP: 0 });
        assert.strictEqual(isAxisDecided('EI'), true);
    });

    await t.test('unknown axis returns false', () => {
        assert.strictEqual(isAxisDecided('XX'), false);
    });
});
