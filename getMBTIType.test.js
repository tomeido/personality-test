const test = require('node:test');
const assert = require('node:assert');
const { getMBTIType, resetMbtiScores, getMbtiScores } = require('./script.js');

test('getMBTIType utility', async (t) => {

    t.afterEach(() => {
        resetMbtiScores();
    });

    await t.test('should return ESTJ when all scores are positive', () => {
        const scores = getMbtiScores();
        scores.EI = 10;
        scores.SN = 10;
        scores.TF = 10;
        scores.JP = 10;

        const result = getMBTIType();
        assert.strictEqual(result, 'ESTJ');
    });

    await t.test('should return INFP when all scores are negative', () => {
        const scores = getMbtiScores();
        scores.EI = -10;
        scores.SN = -10;
        scores.TF = -10;
        scores.JP = -10;

        const result = getMBTIType();
        assert.strictEqual(result, 'INFP');
    });

    await t.test('should return ESTJ when all scores are exactly zero', () => {
        const scores = getMbtiScores();
        scores.EI = 0;
        scores.SN = 0;
        scores.TF = 0;
        scores.JP = 0;

        // 0 / 10 = 0. 50 + 0 = 50. >= 50 defaults to left letters (ESTJ)
        const result = getMBTIType();
        assert.strictEqual(result, 'ESTJ');
    });

    await t.test('should return mixed types for mixed scores (e.g. ENTP)', () => {
        const scores = getMbtiScores();
        scores.EI = 5;   // E
        scores.SN = -5;  // N
        scores.TF = 5;   // T
        scores.JP = -5;  // P

        const result = getMBTIType();
        assert.strictEqual(result, 'ENTP');
    });

    await t.test('should return ISFJ for mixed scores', () => {
        const scores = getMbtiScores();
        scores.EI = -8;  // I
        scores.SN = 8;   // S
        scores.TF = -8;  // F
        scores.JP = 8;   // J

        const result = getMBTIType();
        assert.strictEqual(result, 'ISFJ');
    });

    await t.test('should handle scores far beyond max limits without breaking (testing Math.max/min clamping)', () => {
        const scores = getMbtiScores();
        scores.EI = 1000;  // E
        scores.SN = -1000; // N
        scores.TF = 1000;  // T
        scores.JP = -1000; // P

        const result = getMBTIType();
        assert.strictEqual(result, 'ENTP');
    });
});
