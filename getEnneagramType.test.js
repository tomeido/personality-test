const test = require('node:test');
const assert = require('node:assert');
const { getEnneagramType, setEnneagramScores, resetEnneagramScores } = require('./script.js');

test('getEnneagramType utility', async (t) => {
    t.beforeEach(() => {
        resetEnneagramScores();
    });

    await t.test('should return the type with the highest score', () => {
        setEnneagramScores({ 1: 0, 2: 5, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 });
        assert.strictEqual(getEnneagramType(), 2);

        setEnneagramScores({ 1: 3, 2: 2, 3: 1, 4: 10, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8 });
        assert.strictEqual(getEnneagramType(), 4);
    });

    await t.test('should return one of the types when there is a tie', () => {
        // Tie between 3 and 7
        setEnneagramScores({ 1: 0, 2: 0, 3: 10, 4: 0, 5: 0, 6: 0, 7: 10, 8: 0, 9: 0 });
        const result = getEnneagramType();
        assert.ok(result === 3 || result === 7, `Expected 3 or 7, but got ${result}`);
    });

    await t.test('should handle default all-zero scores', () => {
        resetEnneagramScores();
        const result = getEnneagramType();
        assert.ok(result >= 1 && result <= 9, `Expected a valid type 1-9, but got ${result}`);
    });

    await t.test('should return integer type, not string', () => {
        setEnneagramScores({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 5, 9: 0 });
        const result = getEnneagramType();
        assert.strictEqual(typeof result, 'number');
        assert.strictEqual(result, 8);
    });
});
