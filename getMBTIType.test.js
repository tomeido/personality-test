const test = require('node:test');
const assert = require('node:assert');
const { getMBTIType, getMbtiScores, resetMbtiScores, mbtiScores } = require('./script.js');

test('getMBTIType utility', async (t) => {
    // Save original scores


    // Reset helper
    const resetScores = resetMbtiScores; //
        getMbtiScores().EI = 0;
        getMbtiScores().SN = 0;
        getMbtiScores().TF = 0;
        getMbtiScores().JP = 0;
    };*/

    t.afterEach(() => {
        resetScores();
    });

    await t.test('should return ESTJ when all scores are positive', () => {
        getMbtiScores().EI = 10;
        getMbtiScores().SN = 10;
        getMbtiScores().TF = 10;
        getMbtiScores().JP = 10;

        const result = getMBTIType();
        assert.strictEqual(result, 'ESTJ');
    });

    await t.test('should return INFP when all scores are negative', () => {
        getMbtiScores().EI = -10;
        getMbtiScores().SN = -10;
        getMbtiScores().TF = -10;
        getMbtiScores().JP = -10;

        const result = getMBTIType();
        assert.strictEqual(result, 'INFP');
    });

    await t.test('should return ESTJ when all scores are exactly zero', () => {
        getMbtiScores().EI = 0;
        getMbtiScores().SN = 0;
        getMbtiScores().TF = 0;
        getMbtiScores().JP = 0;

        // 0 / 10 = 0. 50 + 0 = 50. >= 50 defaults to left letters (ESTJ)
        const result = getMBTIType();
        assert.strictEqual(result, 'ESTJ');
    });

    await t.test('should return mixed types for mixed scores (e.g. ENTP)', () => {
        getMbtiScores().EI = 5;   // E
        getMbtiScores().SN = -5;  // N
        getMbtiScores().TF = 5;   // T
        getMbtiScores().JP = -5;  // P

        const result = getMBTIType();
        assert.strictEqual(result, 'ENTP');
    });

    await t.test('should return ISFJ for mixed scores', () => {
        getMbtiScores().EI = -8;  // I
        getMbtiScores().SN = 8;   // S
        getMbtiScores().TF = -8;  // F
        getMbtiScores().JP = 8;   // J

        const result = getMBTIType();
        assert.strictEqual(result, 'ISFJ');
    });

    await t.test('should handle scores far beyond max limits without breaking (testing Math.max/min clamping)', () => {
        getMbtiScores().EI = 1000;  // E
        getMbtiScores().SN = -1000; // N
        getMbtiScores().TF = 1000;  // T
        getMbtiScores().JP = -1000; // P

        const result = getMBTIType();
        assert.strictEqual(result, 'ENTP');
    });
});
