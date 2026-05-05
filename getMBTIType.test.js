const test = require('node:test');
const assert = require('node:assert');
const { getMBTIType, setMbtiScores, resetMbtiScores } = require('./script.js');

test('getMBTIType utility', async (t) => {
    t.afterEach(() => {
        resetMbtiScores();
    });

    await t.test('should return ESTJ when all scores are positive', () => {
        setMbtiScores({
            EI: 10,
            SN: 10,
            TF: 10,
            JP: 10
        });

        const result = getMBTIType();
        assert.strictEqual(result, 'ESTJ');
    });

    await t.test('should return INFP when all scores are negative', () => {
        setMbtiScores({
            EI: -10,
            SN: -10,
            TF: -10,
            JP: -10
        });

        const result = getMBTIType();
        assert.strictEqual(result, 'INFP');
    });

    await t.test('should return ESTJ when all scores are exactly zero', () => {
        setMbtiScores({
            EI: 0,
            SN: 0,
            TF: 0,
            JP: 0
        });

        // 0 / 10 = 0. 50 + 0 = 50. >= 50 defaults to left letters (ESTJ)
        const result = getMBTIType();
        assert.strictEqual(result, 'ESTJ');
    });

    await t.test('should return mixed types for mixed scores (e.g. ENTP)', () => {
        setMbtiScores({
            EI: 5,   // E
            SN: -5,  // N
            TF: 5,   // T
            JP: -5   // P
        });

        const result = getMBTIType();
        assert.strictEqual(result, 'ENTP');
    });

    await t.test('should return ISFJ for mixed scores', () => {
        setMbtiScores({
            EI: -8,  // I
            SN: 8,   // S
            TF: -8,  // F
            JP: 8    // J
        });

        const result = getMBTIType();
        assert.strictEqual(result, 'ISFJ');
    });

    await t.test('should handle scores far beyond max limits without breaking (testing Math.max/min clamping)', () => {
        setMbtiScores({
            EI: 1000,  // E
            SN: -1000, // N
            TF: 1000,  // T
            JP: -1000  // P
        });

        const result = getMBTIType();
        assert.strictEqual(result, 'ENTP');
    });
});
