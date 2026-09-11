const test = require('node:test');
const assert = require('node:assert');
const { applyEnneagramScore, getEnneagramScores, resetEnneagramScores, setIsYesNoMode } = require('./script.js');

test('applyEnneagramScore business logic', async (t) => {
    t.beforeEach(() => {
        resetEnneagramScores();
    });

    await t.test('5-choice mode with weights', () => {
        setIsYesNoMode(false);
        const question = {
            scores: { 1: 2, 2: 1 },
            weights: [1.0, 0.5, 0, -0.5, -1.0]
        };

        // Selecting first option (index 0) => weight 1.0
        applyEnneagramScore(question, 0);
        let scores = getEnneagramScores();
        assert.strictEqual(scores[1], 2);
        assert.strictEqual(scores[2], 1);
        assert.strictEqual(scores[3], 0);

        // Selecting second option (index 1) => weight 0.5
        // Reset and test again
        resetEnneagramScores();
        applyEnneagramScore(question, 1);
        scores = getEnneagramScores();
        assert.strictEqual(scores[1], 1);
        assert.strictEqual(scores[2], 0.5);
        assert.strictEqual(scores[3], 0);

        // Selecting fifth option (index 4) => weight -1.0
        resetEnneagramScores();
        applyEnneagramScore(question, 4);
        scores = getEnneagramScores();
        assert.strictEqual(scores[1], -2);
        assert.strictEqual(scores[2], -1);
    });

    await t.test('Yes/No mode', () => {
        setIsYesNoMode(true);
        const question = {
            scores: { 5: 3, 6: 2 }
        };

        // Selecting Yes (index 0) => weight 1
        applyEnneagramScore(question, 0);
        let scores = getEnneagramScores();
        assert.strictEqual(scores[5], 3);
        assert.strictEqual(scores[6], 2);
        assert.strictEqual(scores[7], 0);

        // Selecting No (index 1) => weight 0
        resetEnneagramScores();
        applyEnneagramScore(question, 1);
        scores = getEnneagramScores();
        assert.strictEqual(scores[5], 0);
        assert.strictEqual(scores[6], 0);
    });

    await t.test('Cumulative scores across multiple questions', () => {
        setIsYesNoMode(false);
        const q1 = { scores: { 4: 2 }, weights: [1, 0.5, 0, -0.5, -1] };
        const q2 = { scores: { 4: 1, 5: 2 }, weights: [1, 0.5, 0, -0.5, -1] };

        applyEnneagramScore(q1, 0); // Type 4: +2
        applyEnneagramScore(q2, 1); // Type 4: +0.5, Type 5: +1

        const scores = getEnneagramScores();
        assert.strictEqual(scores[4], 2.5);
        assert.strictEqual(scores[5], 1);
        assert.strictEqual(scores[6], 0);
    });
});