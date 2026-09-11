const test = require('node:test');
const assert = require('node:assert');
const { shuffleArray } = require('./script.js');

test('shuffleArray utility', async (t) => {
    await t.test('should return a new array and not mutate the original array', () => {
        const original = [1, 2, 3, 4, 5];
        const copy = [...original];
        const shuffled = shuffleArray(original);

        // Assert that a new array is returned
        assert.notStrictEqual(shuffled, original);
        // Assert that the original array is not mutated
        assert.deepStrictEqual(original, copy);
    });

    await t.test('should contain all the original elements', () => {
        const original = [1, 2, 3, 4, 5];
        const shuffled = shuffleArray(original);

        // Ensure same length
        assert.strictEqual(shuffled.length, original.length);

        // Ensure same elements (by sorting both)
        const sortedOriginal = [...original].sort();
        const sortedShuffled = [...shuffled].sort();
        assert.deepStrictEqual(sortedShuffled, sortedOriginal);
    });

    await t.test('should handle empty arrays', () => {
        const original = [];
        const shuffled = shuffleArray(original);
        assert.deepStrictEqual(shuffled, []);
        assert.notStrictEqual(shuffled, original); // should still return a new array
    });

    await t.test('should handle single-element arrays', () => {
        const original = [42];
        const shuffled = shuffleArray(original);
        assert.deepStrictEqual(shuffled, [42]);
        assert.notStrictEqual(shuffled, original);
    });

    await t.test('should likely change the order of elements for larger arrays', () => {
        const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        // Since shuffling is random, there is a very small chance that the shuffled
        // array will be exactly the same as the original. We try up to 10 times to
        // make sure it changes at least once to avoid flaky tests.
        let hasChangedOrder = false;
        for (let i = 0; i < 10; i++) {
            const shuffled = shuffleArray(original);
            let isDifferent = false;
            for (let j = 0; j < original.length; j++) {
                if (original[j] !== shuffled[j]) {
                    isDifferent = true;
                    break;
                }
            }
            if (isDifferent) {
                hasChangedOrder = true;
                break;
            }
        }

        assert.ok(hasChangedOrder, 'The array order should change at least once in 10 shuffles');
    });
});
