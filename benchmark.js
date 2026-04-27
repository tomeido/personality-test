const { JSDOM } = require('jsdom');
const fs = require('fs');

const html = fs.readFileSync('./index.html', 'utf8');
const scriptCode = fs.readFileSync('./script.js', 'utf8');

const dom = new JSDOM(html, { runScripts: "outside-only" });
dom.window.eval(scriptCode);
const window = dom.window;

function runBenchmark() {
    const start = performance.now();
    const iterations = 100000;
    for (let i = 0; i < iterations; i++) {
        window.showScreen('test-screen');
        window.showScreen('result-screen');
    }
    const end = performance.now();
    console.log(`Time taken for ${iterations * 2} showScreen calls: ${(end - start).toFixed(2)} ms`);
}

runBenchmark();
