const test = require('node:test');
const assert = require('node:assert');
const { applyInstinctScore, getInstinctScores, resetInstinctScores, setIsYesNoMode } = require('./script.js');

test('applyInstinctScore business logic', async (t) => {
    t.beforeEach(() => {
        resetInstinctScores();
    });

    await t.test('5-choice mode with weights', () => {
        setIsYesNoMode(false);
        const question = {
            scores: { SP: 2, SO: 1 },
            weights: [1.0, 0.5, 0, -0.5, -1.0]
        };

        // Selecting first option (index 0) => weight 1.0
        applyInstinctScore(question, 0);
        let scores = getInstinctScores();
        assert.strictEqual(scores.SP, 2);
        assert.strictEqual(scores.SO, 1);
        assert.strictEqual(scores.SX, 0);

        // Selecting second option (index 1) => weight 0.5
        // Reset and test again for clarity
        resetInstinctScores();
        applyInstinctScore(question, 1);
        scores = getInstinctScores();
        assert.strictEqual(scores.SP, 1);
        assert.strictEqual(scores.SO, 0.5);
    });

    await t.test('Yes/No mode', () => {
        setIsYesNoMode(true);
        const question = {
            scores: { SX: 3, SO: 2 }
        };

        // Selecting Yes (index 0) => weight 1
        applyInstinctScore(question, 0);
        let scores = getInstinctScores();
        assert.strictEqual(scores.SX, 3);
        assert.strictEqual(scores.SO, 2);
        assert.strictEqual(scores.SP, 0);

        // Selecting No (index 1) => weight 0
        resetInstinctScores();
        applyInstinctScore(question, 1);
        scores = getInstinctScores();
        assert.strictEqual(scores.SX, 0);
        assert.strictEqual(scores.SO, 0);
    });

    await t.test('Cumulative scores', () => {
        setIsYesNoMode(false);
        const q1 = { scores: { SP: 2 }, weights: [1, 0.5, 0, -0.5, -1] };
        const q2 = { scores: { SP: 1, SX: 2 }, weights: [1, 0.5, 0, -0.5, -1] };

        applyInstinctScore(q1, 0); // SP: +2
        applyInstinctScore(q2, 1); // SP: +0.5, SX: +1

        const scores = getInstinctScores();
        assert.strictEqual(scores.SP, 2.5);
        assert.strictEqual(scores.SX, 1);
        assert.strictEqual(scores.SO, 0);
    });
});
