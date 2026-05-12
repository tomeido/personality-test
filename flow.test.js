// Flow-level tests that don't require a DOM.
// Validates that scenario data is well-formed and tournament pool is balanced.

const test = require('node:test');
const assert = require('node:assert');

const { MBTI_SCENARIO_QUESTIONS } = require('./data/mbti-scenarios.js');
const { TOURNAMENT_POOL } = require('./data/tournament-pairs.js');
const { applyScenarioScore, getMbtiScores, resetMbtiScores } = require('./script.js');

test('MBTI_SCENARIO_QUESTIONS data integrity', async (t) => {
    await t.test('every question has presentation, text, and 4 choices', () => {
        for (const q of MBTI_SCENARIO_QUESTIONS) {
            assert.strictEqual(q.presentation, 'scenario', `q${q.id} presentation`);
            assert.ok(typeof q.text === 'string' && q.text.length > 0, `q${q.id} text`);
            assert.ok(Array.isArray(q.choices) && q.choices.length === 4, `q${q.id} choices.length`);
        }
    });

    await t.test('every choice has emoji, text, and at least one valid score axis', () => {
        const validAxes = ['EI', 'SN', 'TF', 'JP'];
        for (const q of MBTI_SCENARIO_QUESTIONS) {
            for (const c of q.choices) {
                assert.ok(typeof c.emoji === 'string', `q${q.id} choice emoji`);
                assert.ok(typeof c.text === 'string', `q${q.id} choice text`);
                assert.ok(c.scores && Object.keys(c.scores).length >= 1, `q${q.id} choice scores`);
                for (const axis of Object.keys(c.scores)) {
                    assert.ok(validAxes.includes(axis), `q${q.id} unknown axis ${axis}`);
                }
            }
        }
    });

    await t.test('answering every question on first choice yields finite, bounded scores', () => {
        resetMbtiScores();
        for (const q of MBTI_SCENARIO_QUESTIONS) {
            applyScenarioScore(q, 0);
        }
        const s = getMbtiScores();
        for (const axis of ['EI', 'SN', 'TF', 'JP']) {
            assert.ok(Number.isFinite(s[axis]), `${axis} must be finite`);
            assert.ok(Math.abs(s[axis]) < 1000, `${axis} must be in plausible range`);
        }
    });
});

test('TOURNAMENT_POOL data integrity', async (t) => {
    await t.test('every contestant has id, instinct, emoji, text and ids are unique', () => {
        const validInstincts = ['SP', 'SO', 'SX'];
        const ids = new Set();
        for (const c of TOURNAMENT_POOL) {
            assert.ok(typeof c.id === 'string' && c.id.length > 0, 'id');
            assert.ok(!ids.has(c.id), `duplicate id: ${c.id}`);
            ids.add(c.id);
            assert.ok(validInstincts.includes(c.instinct), `instinct: ${c.instinct}`);
            assert.ok(typeof c.emoji === 'string' && c.emoji.length > 0, 'emoji');
            assert.ok(typeof c.text === 'string' && c.text.length > 0, 'text');
        }
    });

    await t.test('pool has at least 16 contestants (full 16-strong bracket)', () => {
        assert.ok(TOURNAMENT_POOL.length >= 16,
            `expected >= 16 contestants, got ${TOURNAMENT_POOL.length}`);
    });

    await t.test('each instinct has at least 4 contestants for balanced matchups', () => {
        const counts = TOURNAMENT_POOL.reduce((acc, c) => {
            acc[c.instinct] = (acc[c.instinct] || 0) + 1;
            return acc;
        }, {});
        for (const instinct of ['SP', 'SO', 'SX']) {
            assert.ok(counts[instinct] >= 4,
                `${instinct} has only ${counts[instinct]} contestants, want >= 4`);
        }
    });
});
