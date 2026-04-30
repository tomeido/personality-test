const test = require('node:test');
const assert = require('node:assert');
const { getMBTIType, mbtiScores } = require('./script.js');

test('getMBTIType utility', async (t) => {
    // Save original scores
    const originalScores = { ...mbtiScores };

    // Reset helper
    const resetScores = () => {
        mbtiScores.EI = 0;
        mbtiScores.SN = 0;
        mbtiScores.TF = 0;
        mbtiScores.JP = 0;
    };

    t.afterEach(() => {
        resetScores();
    });

    await t.test('should return ESTJ when all scores are positive', () => {
        mbtiScores.EI = 10;
        mbtiScores.SN = 10;
        mbtiScores.TF = 10;
        mbtiScores.JP = 10;

        const result = getMBTIType();
        assert.strictEqual(result, 'ESTJ');
    });

    await t.test('should return INFP when all scores are negative', () => {
        mbtiScores.EI = -10;
        mbtiScores.SN = -10;
        mbtiScores.TF = -10;
        mbtiScores.JP = -10;

        const result = getMBTIType();
        assert.strictEqual(result, 'INFP');
    });

    await t.test('should return ESTJ when all scores are exactly zero', () => {
        mbtiScores.EI = 0;
        mbtiScores.SN = 0;
        mbtiScores.TF = 0;
        mbtiScores.JP = 0;

        // 0 / 10 = 0. 50 + 0 = 50. >= 50 defaults to left letters (ESTJ)
        const result = getMBTIType();
        assert.strictEqual(result, 'ESTJ');
    });

    await t.test('should return mixed types for mixed scores (e.g. ENTP)', () => {
        mbtiScores.EI = 5;   // E
        mbtiScores.SN = -5;  // N
        mbtiScores.TF = 5;   // T
        mbtiScores.JP = -5;  // P

        const result = getMBTIType();
        assert.strictEqual(result, 'ENTP');
    });

    await t.test('should return ISFJ for mixed scores', () => {
        mbtiScores.EI = -8;  // I
        mbtiScores.SN = 8;   // S
        mbtiScores.TF = -8;  // F
        mbtiScores.JP = 8;   // J

        const result = getMBTIType();
        assert.strictEqual(result, 'ISFJ');
    });

    await t.test('should handle scores far beyond max limits without breaking (testing Math.max/min clamping)', () => {
        mbtiScores.EI = 1000;  // E
        mbtiScores.SN = -1000; // N
        mbtiScores.TF = 1000;  // T
        mbtiScores.JP = -1000; // P

        const result = getMBTIType();
        assert.strictEqual(result, 'ENTP');
    });
});
