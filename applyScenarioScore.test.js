const test = require('node:test');
const assert = require('node:assert');
const { applyScenarioScore, getMbtiScores, resetMbtiScores } = require('./script.js');

test('applyScenarioScore', async (t) => {
    t.beforeEach(() => {
        resetMbtiScores();
    });

    await t.test('applies a single-axis score directly', () => {
        const question = {
            presentation: 'scenario',
            choices: [
                { scores: { EI: 2 } },
                { scores: { EI: -2 } }
            ]
        };
        applyScenarioScore(question, 0);
        assert.strictEqual(getMbtiScores().EI, 2);

        applyScenarioScore(question, 1);
        assert.strictEqual(getMbtiScores().EI, 0);
    });

    await t.test('applies multi-axis scores from a single choice', () => {
        const question = {
            presentation: 'scenario',
            choices: [
                { scores: { EI: -1, JP: 2, TF: 1 } }
            ]
        };
        applyScenarioScore(question, 0);
        const s = getMbtiScores();
        assert.strictEqual(s.EI, -1);
        assert.strictEqual(s.JP, 2);
        assert.strictEqual(s.TF, 1);
        assert.strictEqual(s.SN, 0);
    });

    await t.test('ignores unknown axes safely', () => {
        const question = {
            presentation: 'scenario',
            choices: [{ scores: { EI: 1, NOT_AN_AXIS: 99 } }]
        };
        applyScenarioScore(question, 0);
        assert.strictEqual(getMbtiScores().EI, 1);
    });

    await t.test('no-op when choice has no scores', () => {
        const question = {
            presentation: 'scenario',
            choices: [{ text: '뭐였지' }]
        };
        applyScenarioScore(question, 0);
        const s = getMbtiScores();
        assert.strictEqual(s.EI, 0);
        assert.strictEqual(s.SN, 0);
        assert.strictEqual(s.TF, 0);
        assert.strictEqual(s.JP, 0);
    });
});
