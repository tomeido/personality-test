const test = require('node:test');
const assert = require('node:assert');
const { shuffleArray } = require('./script.js');

test('shuffleArray utility', async (t) => {
    await t.test('should return an array of the same length', () => {
        const input = [1, 2, 3, 4, 5];
        const output = shuffleArray(input);
        assert.strictEqual(output.length, input.length);
    });

    await t.test('should contain all original elements', () => {
        const input = [1, 2, 3, 4, 5];
        const output = shuffleArray(input);
        const sortedInput = [...input].sort();
        const sortedOutput = [...output].sort();
        assert.deepStrictEqual(sortedOutput, sortedInput);
    });

    await t.test('should not modify the original array', () => {
        const input = [1, 2, 3, 4, 5];
        const inputCopy = [...input];
        shuffleArray(input);
        assert.deepStrictEqual(input, inputCopy);
    });

    await t.test('should handle empty arrays', () => {
        const input = [];
        const output = shuffleArray(input);
        assert.deepStrictEqual(output, []);
    });

    await t.test('should handle single-element arrays', () => {
        const input = [42];
        const output = shuffleArray(input);
        assert.deepStrictEqual(output, [42]);
    });

    await t.test('should actually shuffle the elements (probabilistic)', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let identicalCount = 0;
        const trials = 100;

        for (let i = 0; i < trials; i++) {
            const output = shuffleArray(input);
            if (JSON.stringify(output) === JSON.stringify(input)) {
                identicalCount++;
            }
        }

        // The probability of 10 elements staying in the same order 100 times is extremely low ( (1/10!)^100 )
        // Even staying in the same order once is 1/3,628,800.
        // We allow for a tiny bit of chance, but it should definitely not be all of them.
        assert.ok(identicalCount < trials, 'Array was never shuffled');
    });
});
