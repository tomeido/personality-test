# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Vanilla-JS, single-page Korean personality test (MBTI + Enneagram + Instinct SP/SO/SX). No build step, no framework, no bundler. `index.html` loads four data scripts then `script.js`, all served as static files.

UI strings, question text, and result names are in Korean — preserve the existing language when editing copy.

## Commands

```bash
# Run all unit tests (Node's built-in runner — no Jest/Mocha)
npm test            # alias for `node --test`

# Run a single test file
node --test applyMBTIScore.test.js

# Install jsdom (only needed for benchmark.js)
npm install

# Run the showScreen() micro-benchmark
npm run benchmark   # alias for `node benchmark.js`
```

There is no lint, build, or dev-server command. To preview the app, open `index.html` in a browser or serve the directory with any static server (e.g. `npx serve`).

## Architecture

### Module boundary trick
`script.js` is loaded as a browser `<script>` *and* `require()`d by the test files. The bottom of `script.js` does a `typeof module !== 'undefined'` check and exports the pure scoring functions plus setter/reset helpers (`setMbtiScores`, `resetEnneagramScores`, etc.) so tests can drive the module without a DOM. Any new pure function that needs test coverage must be added to that export block — and any new mutable state needs matching setter/reset helpers, otherwise tests can't isolate cases.

### State model
Four module-level `let` bindings in `script.js` hold all runtime state: `currentTest`, `currentPhase`, `currentQuestionIndex`, and three score objects (`mbtiScores`, `enneagramScores`, `instinctScores`). `startTest()` resets all of these; there is no class or store wrapping them.

### Test-type phasing
`currentTest` can be `'mbti' | 'enneagram' | 'instinct' | 'both' | 'complete' | 'mbti-yesno' | 'mbti-scenario' | 'tournament'`. The multi-phase modes (`'both'`, `'complete'`) are driven entirely inside `nextQuestion()` — when `currentQuestionIndex` exceeds the current phase's question array, it swaps `questions`, flips `currentPhase`, toggles the matching `*-viz` element, and resets the index. The `'tournament'` mode bypasses the question-array machinery entirely and lives inside `tournamentState` + `pickTournamentSide()`. Adding a new test mode means touching `startTest()`, `nextQuestion()`, `showResults()`, `displaySimilarPeople()`, and `shareResult()` — they all branch on `currentTest`.

### Scoring rules (see `apply*Score` functions, ~line 188-260)
- **MBTI (Likert/YesNo)**: each question has an `axis` (`EI|SN|TF|JP`), a `direction` (one of `E/I/S/N/T/F/J/P`), and `weights[5]`. In 5-choice mode the chosen weight is added to the axis; in Yes/No mode `applyMBTIScore` uses `+2/-2` instead of `weights`. If `direction` is on the right side (`I/N/F/P`), the score is negated before being added.
- **MBTI (Scenario)**: each question has `presentation: 'scenario'` and a `choices[]` array; each choice carries its own `scores: { EI?, SN?, TF?, JP? }` map that `applyScenarioScore` adds directly to `mbtiScores`. No direction flip — scenario authors encode polarity in the score sign.
- **Enneagram & Instinct**: each question has a `scores` object mapping types to base weights, plus `weights[5]` for 5-choice mode. The applied score is `baseScore * weight` per affected type. In Yes/No mode, `weight` collapses to `1` (yes) or `0` (no).
- **Tournament**: each `pickTournamentSide()` call awards `+2` to the winner's instinct in `instinctScores`; the final champion gets a `+5` tiebreaker bias before `showResults()` routes through the existing instinct result UI.
- **Final type**: `getMBTIType()` derives each letter from the sign of the axis score (using a percent calculation against `maxScore = 10`). `getEnneagramType()` picks the highest-scoring type. There is no tie-breaking logic — first key in iteration order wins on a tie.

### Adaptive shortening
`skipQuestionsForDecidedAxes()` runs at the top of `nextQuestion()`. When `isAxisDecided(axis)` returns true (`Math.abs(mbtiScores[axis]) >= 8`), consecutive Likert questions targeting that axis are skipped without showing. Scenario questions are never skipped (multi-axis impact). This shortens 'both' and 'complete' runs without changing the progress bar's total — the progress just jumps.

### Data files (`data/`)
- `mbti-questions.js`, `enneagram-questions.js`, `instinct-questions.js` define globals `MBTI_QUESTIONS`, `ENNEAGRAM_QUESTIONS`, `INSTINCT_QUESTIONS` — plain arrays of question objects matching the Likert scoring contract above.
- `mbti-scenarios.js` defines `MBTI_SCENARIO_QUESTIONS` — scenario format (`presentation: 'scenario'`, `text`, `choices[4]` each with `emoji/text/scores`).
- `tournament-pairs.js` defines `TOURNAMENT_POOL` — 16+ contestants `{ id, instinct: 'SP'|'SO'|'SX', emoji, text }` for the bracket. Tournament code shuffles and slices down to the nearest power of 2.
- `pdb-data.js` defines `PDB_DATA` with `celebrities`/`characters` per MBTI and Enneagram type, used by `displaySimilarPeople()` and `generateSimilarPeopleHTML()` on the result screen.

All are loaded via `<script>` tags in `index.html` *before* `script.js`, so they exist as window globals at runtime.

### Real-time visualization
After every answer, `updateVisualization()` redraws the bars/charts for whichever phase is active (`updateMBTIVisualization`, `updateEnneagramVisualization`, `updateInstinctVisualization`). The Enneagram one caches DOM lookups in `enneaDOMCache`; the others re-query each time. Screen switching is cached similarly via `cachedScreens` in `showScreen()`.

`updateCharacterBuilder()` runs alongside and lights up trait chips when an axis crosses `±3` (rules in `CHARACTER_TRAIT_RULES`). `maybeShowSpoiler()` fires every 5 questions with a toast announcing the current leading type (`#spoiler-toast`).

### Result image card
`downloadResultCard()` renders the result into a 1080×1350 canvas (`buildResultCardCanvas` + `roundRect`) and either invokes Web Share with a `File` (mobile) or triggers a download (desktop). Three result cards drawn: MBTI, Enneagram, Instinct — each gated by the same `currentTest` flags as the on-screen result panel.

## Conventions

- Always escape user-controlled or data-file strings with `escapeHTML()` (defined in `script.js`) when injecting into `innerHTML`.
- Dynamic content containers should carry `aria-live="polite"` and `aria-atomic="true"` — vanilla JS DOM updates are invisible to screen readers otherwise (per `.Jules/palette.md`).
- Keep the public test-only setters in `script.js`'s `module.exports` in sync with any new mutable state.
