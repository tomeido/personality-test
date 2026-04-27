const test = require('node:test');
const assert = require('node:assert');
const { applyMBTIScore, getMbtiScores, setIsYesNoMode, resetMbtiScores } = require('./script.js');

test('applyMBTIScore business logic', async (t) => {
    t.beforeEach(() => {
        resetMbtiScores();
    });

    await t.test('5-choice mode with left-side direction (e.g. E)', () => {
        setIsYesNoMode(false);
        const question = {
            axis: 'EI',
            direction: 'E',
            weights: [2, 1, 0, -1, -2]
        };

        // Selecting first option (index 0) => score should be weights[0] => 2
        applyMBTIScore(question, 0);
        assert.strictEqual(getMbtiScores().EI, 2);

        // Selecting fourth option (index 3) => score should be weights[3] => -1
        applyMBTIScore(question, 3);
        assert.strictEqual(getMbtiScores().EI, 1); // 2 + (-1)
    });

    await t.test('5-choice mode with right-side direction (e.g. I)', () => {
        setIsYesNoMode(false);
        const question = {
            axis: 'EI',
            direction: 'I',
            weights: [2, 1, 0, -1, -2]
        };

        // Selecting first option (index 0) => score should be weights[0] = 2, flipped to -2
        applyMBTIScore(question, 0);
        assert.strictEqual(getMbtiScores().EI, -2);

        // Selecting fifth option (index 4) => score should be weights[4] = -2, flipped to 2
        applyMBTIScore(question, 4);
        assert.strictEqual(getMbtiScores().EI, 0); // -2 + 2
    });

    await t.test('Yes/No mode with left-side direction (e.g. S)', () => {
        setIsYesNoMode(true);
        const question = {
            axis: 'SN',
            direction: 'S'
        };

        // Selecting Yes (index 0) => score should be 2
        applyMBTIScore(question, 0);
        assert.strictEqual(getMbtiScores().SN, 2);

        // Selecting No (index 1) => score should be -2
        applyMBTIScore(question, 1);
        assert.strictEqual(getMbtiScores().SN, 0); // 2 + (-2)
    });

    await t.test('Yes/No mode with right-side direction (e.g. P)', () => {
        setIsYesNoMode(true);
        const question = {
            axis: 'JP',
            direction: 'P'
        };

        // Selecting Yes (index 0) => base 2, flipped to -2
        applyMBTIScore(question, 0);
        assert.strictEqual(getMbtiScores().JP, -2);

        // Selecting No (index 1) => base -2, flipped to 2
        applyMBTIScore(question, 1);
        assert.strictEqual(getMbtiScores().JP, 0); // -2 + 2
    });

    await t.test('Applies score to the correct axis', () => {
        setIsYesNoMode(false);

        const questionSN = { axis: 'SN', direction: 'S', weights: [2, 1, 0, -1, -2] };
        const questionTF = { axis: 'TF', direction: 'F', weights: [2, 1, 0, -1, -2] };

        applyMBTIScore(questionSN, 1); // +1 to SN
        applyMBTIScore(questionTF, 0); // +2 flipped to -2 to TF

        const scores = getMbtiScores();
        assert.strictEqual(scores.EI, 0);
        assert.strictEqual(scores.SN, 1);
        assert.strictEqual(scores.TF, -2);
        assert.strictEqual(scores.JP, 0);
    });
});
