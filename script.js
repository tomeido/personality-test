// ===== State Management =====
let currentTest = null; // 'mbti', 'enneagram', 'instinct', 'both', 'complete', 'mbti-yesno', 'mbti-scenario', or 'tournament'
let currentPhase = null; // 'mbti', 'enneagram', or 'instinct'
let currentQuestionIndex = 0;
let questions = [];
let isYesNoMode = false; // Yes/No style mode flag

// MBTI Scores: positive = left side (E, S, T, J), negative = right side (I, N, F, P)
let mbtiScores = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0
};

// Enneagram Scores: 1-9 types
let enneagramScores = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
};

// Instinct Scores: SP, SO, SX
let instinctScores = {
    SP: 0,
    SO: 0,
    SX: 0
};

// ===== Screen Management =====
let cachedScreens = null;
function showScreen(screenId) {
    if (!cachedScreens) {
        cachedScreens = document.querySelectorAll('.screen');
    }
    cachedScreens.forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ===== Start Test =====
function startTest(testType) {
    currentTest = testType;
    currentQuestionIndex = 0;

    // Reset all scores
    mbtiScores = { EI: 0, SN: 0, TF: 0, JP: 0 };
    enneagramScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
    instinctScores = { SP: 0, SO: 0, SX: 0 };
    isYesNoMode = false; // Reset mode

    // Reset answer buttons visibility
    document.getElementById('answer-options').style.display = 'flex';
    document.getElementById('answer-options-yesno').style.display = 'none';

    // Hide all visualizations first
    document.getElementById('mbti-viz').style.display = 'none';
    document.getElementById('enneagram-viz').style.display = 'none';
    document.getElementById('instinct-viz').style.display = 'none';

    // Set up questions based on test type
    if (testType === 'mbti') {
        questions = [...MBTI_QUESTIONS];
        currentPhase = 'mbti';
        document.getElementById('test-type-badge').textContent = 'MBTI';
        document.getElementById('mbti-viz').style.display = 'block';
    } else if (testType === 'enneagram') {
        questions = [...ENNEAGRAM_QUESTIONS];
        currentPhase = 'enneagram';
        document.getElementById('test-type-badge').textContent = 'Enneagram';
        document.getElementById('enneagram-viz').style.display = 'block';
    } else if (testType === 'instinct') {
        questions = [...INSTINCT_QUESTIONS];
        currentPhase = 'instinct';
        document.getElementById('test-type-badge').textContent = '본능 유형';
        document.getElementById('instinct-viz').style.display = 'block';
    } else if (testType === 'both') {
        // MBTI + Enneagram
        questions = [...MBTI_QUESTIONS];
        currentPhase = 'mbti';
        document.getElementById('test-type-badge').textContent = 'MBTI';
        document.getElementById('mbti-viz').style.display = 'block';
    } else if (testType === 'complete') {
        // MBTI + Enneagram + Instinct
        questions = [...MBTI_QUESTIONS];
        currentPhase = 'mbti';
        document.getElementById('test-type-badge').textContent = 'MBTI';
        document.getElementById('mbti-viz').style.display = 'block';
    } else if (testType === 'mbti-yesno') {
        // MBTI Yes/No Quick Test
        questions = [...MBTI_QUESTIONS];
        currentPhase = 'mbti';
        isYesNoMode = true;
        document.getElementById('test-type-badge').textContent = 'MBTI ⚡';
        document.getElementById('mbti-viz').style.display = 'block';

        // Switch to Yes/No answer buttons
        document.getElementById('answer-options').style.display = 'none';
        document.getElementById('answer-options-yesno').style.display = 'flex';
    } else if (testType === 'mbti-scenario') {
        // MBTI Scenario (situational) Test — shuffled choices per question
        questions = MBTI_SCENARIO_QUESTIONS.map(q => ({
            ...q,
            choices: shuffleArray([...q.choices])
        }));
        currentPhase = 'mbti';
        document.getElementById('test-type-badge').textContent = 'MBTI 🎬';
        document.getElementById('mbti-viz').style.display = 'block';
    } else if (testType === 'tournament') {
        startTournament();
        return;
    }

    // Update UI
    updateVisualization();
    updateCharacterBuilder();
    displayQuestion();
    showScreen('test-screen');
}

function goToStart() {
    showScreen('start-screen');
}

// ===== Question Display =====
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const totalQuestions = getTotalQuestions();
    const currentNum = getCurrentQuestionNumber();

    // Update progress
    const progressPercent = (currentNum / totalQuestions) * 100;
    const roundedPercent = Math.round(progressPercent);
    document.getElementById('progress-text').textContent = `질문 ${currentNum} / ${totalQuestions}`;
    document.getElementById('progress-percent').textContent = `${roundedPercent}%`;
    document.getElementById('progress-fill').style.width = `${progressPercent}%`;

    // Update ARIA attributes for progress bar
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.setAttribute('aria-valuenow', roundedPercent);
    }

    // Update question
    document.getElementById('question-number').textContent = `Q${currentNum}`;
    document.getElementById('question-text').textContent = question.text;

    // Render answer UI based on question presentation
    renderAnswerUI(question);

    // Reset answer buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Mid-test spoiler (every 5 questions, not on the first)
    maybeShowSpoiler(currentNum, totalQuestions);
}

function renderAnswerUI(question) {
    const likertEl = document.getElementById('answer-options');
    const yesNoEl = document.getElementById('answer-options-yesno');
    const scenarioEl = document.getElementById('answer-options-scenario');

    if (likertEl) likertEl.style.display = 'none';
    if (yesNoEl) yesNoEl.style.display = 'none';
    if (scenarioEl) scenarioEl.style.display = 'none';

    if (question.presentation === 'scenario') {
        if (!scenarioEl) return;
        scenarioEl.style.display = 'grid';
        scenarioEl.innerHTML = '';
        question.choices.forEach((choice, i) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn scenario-btn';
            btn.type = 'button';
            btn.addEventListener('click', () => selectAnswer(i));
            const icon = document.createElement('span');
            icon.className = 'answer-icon';
            icon.setAttribute('aria-hidden', 'true');
            icon.textContent = choice.emoji;
            const txt = document.createElement('span');
            txt.className = 'answer-text';
            txt.textContent = choice.text;
            btn.appendChild(icon);
            btn.appendChild(txt);
            scenarioEl.appendChild(btn);
        });
    } else if (isYesNoMode) {
        if (yesNoEl) yesNoEl.style.display = 'flex';
    } else {
        if (likertEl) likertEl.style.display = 'flex';
    }
}

function getTotalQuestions() {
    if (currentTest === 'both') {
        return MBTI_QUESTIONS.length + ENNEAGRAM_QUESTIONS.length;
    } else if (currentTest === 'complete') {
        return MBTI_QUESTIONS.length + ENNEAGRAM_QUESTIONS.length + INSTINCT_QUESTIONS.length;
    }
    return questions.length;
}

function getCurrentQuestionNumber() {
    if (currentTest === 'both' && currentPhase === 'enneagram') {
        return MBTI_QUESTIONS.length + currentQuestionIndex + 1;
    } else if (currentTest === 'complete') {
        if (currentPhase === 'enneagram') {
            return MBTI_QUESTIONS.length + currentQuestionIndex + 1;
        } else if (currentPhase === 'instinct') {
            return MBTI_QUESTIONS.length + ENNEAGRAM_QUESTIONS.length + currentQuestionIndex + 1;
        }
    }
    return currentQuestionIndex + 1;
}

// ===== Answer Selection =====
function selectAnswer(answerIndex) {
    const question = questions[currentQuestionIndex];

    // Scenario-format questions carry their own per-choice score map.
    if (question && question.presentation === 'scenario') {
        applyScenarioScore(question, answerIndex);
    } else if (currentPhase === 'mbti') {
        applyMBTIScore(question, answerIndex);
    } else if (currentPhase === 'enneagram') {
        applyEnneagramScore(question, answerIndex);
    } else if (currentPhase === 'instinct') {
        applyInstinctScore(question, answerIndex);
    }

    // Update visualization with animation
    updateVisualization();
    updateCharacterBuilder();

    // Mark button as selected briefly (works for both static and dynamically-rendered buttons)
    const activeContainer = document.querySelector('.answer-options:not([style*="display: none"])') ||
                            document.getElementById('answer-options');
    const buttons = activeContainer ? activeContainer.querySelectorAll('.answer-btn') : [];
    if (buttons[answerIndex]) {
        buttons[answerIndex].classList.add('selected');
    }

    // Move to next question after a short delay
    setTimeout(() => {
        nextQuestion();
    }, 400);
}

function applyScenarioScore(question, choiceIndex) {
    const choice = question.choices[choiceIndex];
    if (!choice || !choice.scores) return;
    for (const [axis, value] of Object.entries(choice.scores)) {
        if (axis in mbtiScores) {
            mbtiScores[axis] += value;
        }
    }
}

function applyMBTIScore(question, answerIndex) {
    let score;

    if (isYesNoMode) {
        // Yes/No style: Yes = 2, No = -2
        score = answerIndex === 0 ? 2 : -2;
    } else {
        // Original 5-choice style: weights from question
        score = question.weights[answerIndex];
    }

    // If question direction is for the right side (I, N, F, P), flip the score
    if (question.direction === 'I' || question.direction === 'N' ||
        question.direction === 'F' || question.direction === 'P') {
        score = -score;
    }

    mbtiScores[question.axis] += score;
}

function applyEnneagramScore(question, answerIndex) {
    let weight;

    if (isYesNoMode) {
        // Yes/No style: Yes = 1, No = 0
        weight = answerIndex === 0 ? 1 : 0;
    } else {
        // Original 5-choice style
        weight = question.weights[answerIndex];
    }

    // Apply scores to each type affected by this question
    for (const [type, baseScore] of Object.entries(question.scores)) {
        enneagramScores[type] += baseScore * weight;
    }
}

function applyInstinctScore(question, answerIndex) {
    let weight;

    if (isYesNoMode) {
        // Yes/No style: Yes = 1, No = 0
        weight = answerIndex === 0 ? 1 : 0;
    } else {
        // Original 5-choice style
        weight = question.weights[answerIndex];
    }

    // Apply scores to each instinct type affected by this question
    for (const [instinct, baseScore] of Object.entries(question.scores)) {
        instinctScores[instinct] += baseScore * weight;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    // Adaptive: if a phase axis is already decisive, fast-forward through its questions.
    skipQuestionsForDecidedAxes();

    // Check if we need to switch phases (for 'both' mode)
    if (currentTest === 'both' && currentPhase === 'mbti' && currentQuestionIndex >= MBTI_QUESTIONS.length) {
        // Switch to enneagram phase
        currentPhase = 'enneagram';
        questions = [...ENNEAGRAM_QUESTIONS];
        currentQuestionIndex = 0;

        document.getElementById('test-type-badge').textContent = 'Enneagram';
        document.getElementById('mbti-viz').style.display = 'none';
        document.getElementById('enneagram-viz').style.display = 'block';

        displayQuestion();
        return;
    }

    // Check if we need to switch phases (for 'complete' mode)
    if (currentTest === 'complete') {
        if (currentPhase === 'mbti' && currentQuestionIndex >= MBTI_QUESTIONS.length) {
            // Switch to enneagram phase
            currentPhase = 'enneagram';
            questions = [...ENNEAGRAM_QUESTIONS];
            currentQuestionIndex = 0;

            document.getElementById('test-type-badge').textContent = 'Enneagram';
            document.getElementById('mbti-viz').style.display = 'none';
            document.getElementById('enneagram-viz').style.display = 'block';
            document.getElementById('instinct-viz').style.display = 'none';

            displayQuestion();
            return;
        }

        if (currentPhase === 'enneagram' && currentQuestionIndex >= ENNEAGRAM_QUESTIONS.length) {
            // Switch to instinct phase
            currentPhase = 'instinct';
            questions = [...INSTINCT_QUESTIONS];
            currentQuestionIndex = 0;

            document.getElementById('test-type-badge').textContent = '본능 유형';
            document.getElementById('mbti-viz').style.display = 'none';
            document.getElementById('enneagram-viz').style.display = 'none';
            document.getElementById('instinct-viz').style.display = 'block';

            displayQuestion();
            return;
        }
    }

    // Check if test is complete
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    displayQuestion();
}

// ===== Real-time Visualization =====
function updateVisualization() {
    if (currentPhase === 'mbti' || currentTest === 'both' || currentTest === 'complete') {
        updateMBTIVisualization();
    }
    if (currentPhase === 'enneagram' || currentTest === 'both' || currentTest === 'complete') {
        updateEnneagramVisualization();
    }
    if (currentPhase === 'instinct' || currentTest === 'complete') {
        updateInstinctVisualization();
    }
}

function updateMBTIVisualization() {
    // Calculate percentages for each axis
    // Score range: approximately -10 to +10 per axis (5 questions * 2 max points)
    const maxScore = 10;

    const axes = ['EI', 'SN', 'TF', 'JP'];
    const leftLetters = ['E', 'S', 'T', 'J'];
    const rightLetters = ['I', 'N', 'F', 'P'];

    let mbtiType = '';

    axes.forEach((axis, index) => {
        const score = mbtiScores[axis];
        // Convert to percentage (50% = neutral)
        const leftPercent = Math.min(100, Math.max(0, 50 + (score / maxScore) * 50));
        const rightPercent = 100 - leftPercent;

        // Update bar
        const fill = document.getElementById(`${axis.toLowerCase()}-fill`);
        fill.style.setProperty('--left-percent', `${leftPercent}%`);

        // Update value displays
        document.getElementById(`${leftLetters[index].toLowerCase()}-value`).textContent = `${Math.round(leftPercent)}%`;
        document.getElementById(`${rightLetters[index].toLowerCase()}-value`).textContent = `${Math.round(rightPercent)}%`;

        // Determine type letter
        mbtiType += leftPercent >= 50 ? leftLetters[index] : rightLetters[index];
    });

    // Update current type display
    document.getElementById('current-mbti-type').textContent = mbtiType || '----';
}

let enneaDOMCache = null;

function updateEnneagramVisualization() {
    // Lazy initialize DOM cache
    if (typeof document !== 'undefined' && !enneaDOMCache) {
        enneaDOMCache = {
            fills: {},
            percents: {},
            barItems: {},
            currentType: document.getElementById('current-enneagram-type')
        };
        for (let i = 1; i <= 9; i++) {
            enneaDOMCache.fills[i] = document.getElementById(`ennea-${i}-fill`);
            enneaDOMCache.percents[i] = document.getElementById(`ennea-${i}-percent`);
            enneaDOMCache.barItems[i] = document.querySelector(`.ennea-bar-item[data-type="${i}"]`);
        }
    }

    // Find max score for normalization
    const maxScore = Math.max(...Object.values(enneagramScores), 1);

    // Find leading type
    let leadingType = 1;
    let leadingScore = enneagramScores[1];

    for (let i = 1; i <= 9; i++) {
        const score = enneagramScores[i];
        const percent = (score / maxScore) * 100;

        if (enneaDOMCache) {
            // Update bar
            enneaDOMCache.fills[i].style.width = `${percent}%`;

            // Update percentage display
            enneaDOMCache.percents[i].textContent = `${Math.round(percent)}%`;

            // Update leading class
            enneaDOMCache.barItems[i].classList.remove('leading');
        }

        if (score > leadingScore) {
            leadingScore = score;
            leadingType = i;
        }
    }

    if (enneaDOMCache) {
        // Mark leading type
        enneaDOMCache.barItems[leadingType].classList.add('leading');

        // Update current type display
        const typeName = ENNEAGRAM_TYPES[leadingType].name;
        enneaDOMCache.currentType.textContent = `${leadingType}번 ${typeName}`;
    }
}

function updateInstinctVisualization() {
    const maxScore = Math.max(...Object.values(instinctScores), 1);

    const instincts = ['SP', 'SO', 'SX'];
    const instinctNames = {
        SP: '자기보존형',
        SO: '사회형',
        SX: '일대일형'
    };
    const instinctEmojis = {
        SP: '🏠',
        SO: '👥',
        SX: '🔥'
    };

    let leadingInstinct = 'SP';
    let leadingScore = instinctScores.SP;

    instincts.forEach(instinct => {
        const score = instinctScores[instinct];
        const percent = (score / maxScore) * 100;

        // Update bar
        const fill = document.getElementById(`${instinct.toLowerCase()}-fill`);
        if (fill) {
            fill.style.width = `${percent}%`;
        }

        // Update percentage display
        const percentEl = document.getElementById(`${instinct.toLowerCase()}-percent`);
        if (percentEl) {
            percentEl.textContent = `${Math.round(percent)}%`;
        }

        // Update leading class
        const barItem = document.querySelector(`.instinct-bar-item[data-instinct="${instinct}"]`);
        if (barItem) {
            barItem.classList.remove('leading');
        }

        if (score > leadingScore) {
            leadingScore = score;
            leadingInstinct = instinct;
        }
    });

    // Mark leading type
    const leadingBarItem = document.querySelector(`.instinct-bar-item[data-instinct="${leadingInstinct}"]`);
    if (leadingBarItem) {
        leadingBarItem.classList.add('leading');
    }

    // Update current type display
    const currentTypeEl = document.getElementById('current-instinct-type');
    if (currentTypeEl) {
        currentTypeEl.textContent = `${instinctEmojis[leadingInstinct]} ${instinctNames[leadingInstinct]}`;
    }
}

// ===== Results =====
function showResults() {
    // Prepare result cards
    const showMBTI = currentTest === 'mbti' || currentTest === 'both' || currentTest === 'complete' || currentTest === 'mbti-yesno' || currentTest === 'mbti-scenario';
    const showEnneagram = currentTest === 'enneagram' || currentTest === 'both' || currentTest === 'complete';
    const showInstinct = currentTest === 'instinct' || currentTest === 'complete';

    if (showMBTI) {
        displayMBTIResult();
        document.getElementById('mbti-result').style.display = 'block';
    } else {
        document.getElementById('mbti-result').style.display = 'none';
    }

    if (showEnneagram) {
        displayEnneagramResult();
        document.getElementById('enneagram-result').style.display = 'block';
    } else {
        document.getElementById('enneagram-result').style.display = 'none';
    }

    if (showInstinct) {
        displayInstinctResult();
        document.getElementById('instinct-result').style.display = 'block';
    } else {
        document.getElementById('instinct-result').style.display = 'none';
    }

    // Display similar people from PDB
    displaySimilarPeople(showMBTI, showEnneagram);

    showScreen('result-screen');
}

function displayMBTIResult() {
    const maxScore = 10;
    const axes = ['EI', 'SN', 'TF', 'JP'];
    const leftLetters = ['E', 'S', 'T', 'J'];
    const rightLetters = ['I', 'N', 'F', 'P'];
    const leftNames = ['외향', '감각', '사고', '판단'];
    const rightNames = ['내향', '직관', '감정', '인식'];

    let mbtiType = '';
    let axesHTML = '';

    const axesEl = document.getElementById('result-mbti-axes');
    axesEl.innerHTML = '';

    axes.forEach((axis, index) => {
        const score = mbtiScores[axis];
        const leftPercent = Math.min(100, Math.max(0, 50 + (score / maxScore) * 50));
        const rightPercent = 100 - leftPercent;

        const isLeft = leftPercent >= 50;
        const currentLetter = isLeft ? leftLetters[index] : rightLetters[index];
        const currentName = isLeft ? leftNames[index] : rightNames[index];
        mbtiType += currentLetter;

        const color = isLeft
            ? `var(--color-${leftLetters[index].toLowerCase()})`
            : `var(--color-${rightLetters[index].toLowerCase()})`;

        const axisDiv = document.createElement('div');
        axisDiv.className = 'result-axis';

        const labelSpan = document.createElement('span');
        labelSpan.className = 'result-axis-label';
        labelSpan.style.color = color;
        labelSpan.textContent = `${currentLetter} ${currentName}`;

        const barDiv = document.createElement('div');
        barDiv.className = 'result-axis-bar';

        const fillDiv = document.createElement('div');
        fillDiv.className = 'result-axis-fill';
        fillDiv.style.width = `${isLeft ? leftPercent : rightPercent}%`;
        fillDiv.style.background = color;

        barDiv.appendChild(fillDiv);

        const valueSpan = document.createElement('span');
        valueSpan.className = 'result-axis-value';
        valueSpan.textContent = `${Math.round(isLeft ? leftPercent : rightPercent)}%`;

        axisDiv.appendChild(labelSpan);
        axisDiv.appendChild(barDiv);
        axisDiv.appendChild(valueSpan);

        axesEl.appendChild(axisDiv);
    });

    document.getElementById('result-mbti-type').textContent = mbtiType;
    document.getElementById('result-mbti-name').textContent = MBTI_TYPES[mbtiType]?.name || '';

    const typeInfo = MBTI_TYPES[mbtiType];
    if (typeInfo) {
        const descEl = document.getElementById('result-mbti-description');
        descEl.innerHTML = '';

        const pDesc = document.createElement('p');
        pDesc.textContent = typeInfo.description;

        const h4Strengths = document.createElement('h4');
        h4Strengths.textContent = '💪 강점';

        const pStrengths = document.createElement('p');
        pStrengths.textContent = typeInfo.strengths;

        const h4Challenges = document.createElement('h4');
        h4Challenges.textContent = '🎯 도전 과제';

        const pChallenges = document.createElement('p');
        pChallenges.textContent = typeInfo.challenges;

        descEl.appendChild(pDesc);
        descEl.appendChild(h4Strengths);
        descEl.appendChild(pStrengths);
        descEl.appendChild(h4Challenges);
        descEl.appendChild(pChallenges);
    }
}

function displayEnneagramResult() {
    // Find top type and wing
    const mainType = getEnneagramType();
    const mainScore = enneagramScores[mainType];

    // Find wing (adjacent type with higher score)
    const prevType = mainType === 1 ? 9 : mainType - 1;
    const nextType = mainType === 9 ? 1 : mainType + 1;
    const wing = enneagramScores[prevType] > enneagramScores[nextType] ? prevType : nextType;

    const typeInfo = ENNEAGRAM_TYPES[mainType];

    document.getElementById('result-enneagram-type').textContent = mainType;
    document.getElementById('result-enneagram-name').textContent = typeInfo.name;

    const wingEl = document.getElementById('result-wing');
    wingEl.innerHTML = '';
    const pWing = document.createElement('p');
    pWing.innerHTML = `🪽 날개: <strong>${mainType}w${wing}</strong> (${escapeHTML(typeInfo.name)} + ${escapeHTML(ENNEAGRAM_TYPES[wing].name)} 성향)`;
    wingEl.appendChild(pWing);

    const enneaDescEl = document.getElementById('result-enneagram-description');
    enneaDescEl.innerHTML = '';

    const sections = [
        { tag: 'p', text: typeInfo.description },
        { tag: 'h4', text: '💫 핵심 욕구' },
        { tag: 'p', text: typeInfo.coreDesire },
        { tag: 'h4', text: '😰 핵심 두려움' },
        { tag: 'p', text: typeInfo.coreFear },
        { tag: 'h4', text: '💪 강점' },
        { tag: 'p', text: typeInfo.strengths },
        { tag: 'h4', text: '🌱 성장 포인트' },
        { tag: 'p', text: typeInfo.growth }
    ];

    sections.forEach(sec => {
        const el = document.createElement(sec.tag);
        el.textContent = sec.text;
        enneaDescEl.appendChild(el);
    });
}

function displayInstinctResult() {
    // Find instinct stacking order
    const sortedInstincts = Object.entries(instinctScores)
        .sort((a, b) => b[1] - a[1]);

    const mainInstinct = sortedInstincts[0][0];
    const secondInstinct = sortedInstincts[1][0];
    const thirdInstinct = sortedInstincts[2][0];

    const instinctInfo = INSTINCT_TYPES[mainInstinct];

    document.getElementById('result-instinct-icon').textContent = instinctInfo.emoji;
    document.getElementById('result-instinct-type').textContent = mainInstinct;
    document.getElementById('result-instinct-name').textContent = instinctInfo.name;

    // Display instinct stacking
    const stackEl = document.getElementById('result-instinct-stack');
    stackEl.innerHTML = '';
    const h4Stack = document.createElement('h4');
    h4Stack.textContent = '본능 스태킹 순서';
    stackEl.appendChild(h4Stack);

    const stackOrderDiv = document.createElement('div');
    stackOrderDiv.className = 'instinct-stack-order';

    [mainInstinct, secondInstinct, thirdInstinct].forEach(ins => {
        const span = document.createElement('span');
        span.textContent = `${INSTINCT_TYPES[ins].emoji} ${ins}`;
        stackOrderDiv.appendChild(span);
    });
    stackEl.appendChild(stackOrderDiv);

    // If we also have enneagram, show subtype
    const subtypeEl = document.getElementById('result-subtype');
    if (currentTest === 'complete') {
        const enneaType = getEnneagramType();
        const subtypeKey = `${enneaType}${mainInstinct}`;
        const subtypeInfo = SUBTYPE_DESCRIPTIONS[subtypeKey];

        if (subtypeInfo) {
            subtypeEl.innerHTML = '';
            const h4Subtype = document.createElement('h4');
            h4Subtype.textContent = '에니어그램 하위유형';

            const nameDiv = document.createElement('div');
            nameDiv.className = 'subtype-name';
            nameDiv.textContent = `${enneaType}${mainInstinct}: ${subtypeInfo.name}`;

            const pSubtypeDesc = document.createElement('p');
            pSubtypeDesc.style.cssText = 'font-size: 0.9rem; color: var(--text-secondary); margin-top: 8px;';
            pSubtypeDesc.textContent = subtypeInfo.description;

            subtypeEl.appendChild(h4Subtype);
            subtypeEl.appendChild(nameDiv);
            subtypeEl.appendChild(pSubtypeDesc);
            subtypeEl.style.display = 'block';
        } else {
            subtypeEl.style.display = 'none';
        }
    } else {
        subtypeEl.style.display = 'none';
    }

    const instinctDescEl = document.getElementById('result-instinct-description');
    instinctDescEl.innerHTML = '';
    const insSections = [
        { tag: 'p', text: instinctInfo.description },
        { tag: 'h4', text: '🎯 주요 관심사' },
        { tag: 'p', text: instinctInfo.focus.join(', ') },
        { tag: 'h4', text: '💪 강점' },
        { tag: 'p', text: instinctInfo.strengths },
        { tag: 'h4', text: '⚠️ 주의점' },
        { tag: 'p', text: instinctInfo.challenges }
    ];

    insSections.forEach(sec => {
        const el = document.createElement(sec.tag);
        el.textContent = sec.text;
        instinctDescEl.appendChild(el);
    });
}

function generateSimilarPeopleHTML(typeData, label) {
    if (!typeData) return '';

    let html = `<div class="similar-people-type-group">`;
    html += `<div class="similar-people-type-label">${label}</div>`;
    html += `<div class="similar-people-grid">`;

    // Add celebrities
    typeData.celebrities.slice(0, 2).forEach(person => {
        html += `
            <div class="similar-person-card">
                <div class="similar-person-image">${person.image}</div>
                <div class="similar-person-name">${person.name}</div>
                <span class="similar-person-category">${person.category}</span>
            </div>
        `;
    });

    // Add characters
    typeData.characters.slice(0, 2).forEach(char => {
        html += `
            <div class="similar-person-card">
                <div class="similar-person-image">${char.image}</div>
                <div class="similar-person-name">${char.name}</div>
                <div class="similar-person-work">${char.work}</div>
            </div>
        `;
    });

    html += `</div></div>`;
    return html;
}

function displaySimilarPeople(showMBTI, showEnneagram) {
    const similarSection = document.getElementById('similar-people-section');
    const similarGrid = document.getElementById('similar-people-grid');

    if (!showMBTI && !showEnneagram) {
        similarSection.style.display = 'none';
        return;
    }

    similarSection.style.display = 'block';
    similarGrid.innerHTML = ''; // Clear existing content

    const createPersonCard = (person, type) => {
        const card = document.createElement('div');
        card.className = 'similar-person-card';

        const image = document.createElement('div');
        image.className = 'similar-person-image';
        image.textContent = person.image;

        const name = document.createElement('div');
        name.className = 'similar-person-name';
        name.textContent = person.name;

        card.appendChild(image);
        card.appendChild(name);

        if (type === 'celebrity') {
            const category = document.createElement('span');
            category.className = 'similar-person-category';
            category.textContent = person.category;
            card.appendChild(category);
        } else {
            const work = document.createElement('div');
            work.className = 'similar-person-work';
            work.textContent = person.work;
            card.appendChild(work);
        }

        return card;
    };

    const createTypeGroup = (label, data) => {
        const group = document.createElement('div');
        group.className = 'similar-people-type-group';

        const groupLabel = document.createElement('div');
        groupLabel.className = 'similar-people-type-label';
        groupLabel.textContent = label;
        group.appendChild(groupLabel);

        const grid = document.createElement('div');
        grid.className = 'similar-people-grid';

        data.celebrities.slice(0, 2).forEach(person => {
            grid.appendChild(createPersonCard(person, 'celebrity'));
        });

        data.characters.slice(0, 2).forEach(char => {
            grid.appendChild(createPersonCard(char, 'character'));
        });

        group.appendChild(grid);
        return group;
    };

    // Get MBTI matches
    if (showMBTI) {
        const mbtiType = getMBTIType();
        const mbtiData = PDB_DATA.mbti[mbtiType];
        if (mbtiData) {
            similarGrid.appendChild(createTypeGroup(`🎭 ${mbtiType} 유형`, mbtiData));
        }
    }

    // Get Enneagram matches
    if (showEnneagram) {
        const enneaType = getEnneagramType();
        const enneaData = PDB_DATA.enneagram[enneaType];
        if (enneaData) {
            similarGrid.appendChild(createTypeGroup(`💜 ${enneaType}번 유형`, enneaData));
        }
    }
}

function getMBTIType() {
    const maxScore = 10;
    const axes = ['EI', 'SN', 'TF', 'JP'];
    const leftLetters = ['E', 'S', 'T', 'J'];
    const rightLetters = ['I', 'N', 'F', 'P'];

    let mbtiType = '';
    axes.forEach((axis, index) => {
        const score = mbtiScores[axis];
        const leftPercent = Math.min(100, Math.max(0, 50 + (score / maxScore) * 50));
        mbtiType += leftPercent >= 50 ? leftLetters[index] : rightLetters[index];
    });

    return mbtiType;
}

function getEnneagramType() {
    let sortedTypes = Object.entries(enneagramScores)
        .sort((a, b) => b[1] - a[1]);
    return parseInt(sortedTypes[0][0]);
}

// ===== Share Result =====
function shareResult() {
    let shareText = '🧠 나의 성격 테스트 결과\n\n';
    const showMBTI = currentTest === 'mbti' || currentTest === 'both' || currentTest === 'complete' || currentTest === 'mbti-yesno' || currentTest === 'mbti-scenario';
    const showEnneagram = currentTest === 'enneagram' || currentTest === 'both' || currentTest === 'complete';
    const showInstinct = currentTest === 'instinct' || currentTest === 'complete';

    if (showMBTI) {
        const mbtiType = document.getElementById('result-mbti-type').textContent;
        const mbtiName = document.getElementById('result-mbti-name').textContent;
        shareText += `📊 MBTI: ${mbtiType} (${mbtiName})\n`;
    }

    if (showEnneagram) {
        const enneaType = document.getElementById('result-enneagram-type').textContent;
        const enneaName = document.getElementById('result-enneagram-name').textContent;
        shareText += `💜 Enneagram: ${enneaType}번 ${enneaName}\n`;
    }

    if (showInstinct) {
        const instinctType = document.getElementById('result-instinct-type').textContent;
        const instinctName = document.getElementById('result-instinct-name').textContent;
        shareText += `🔥 본능 유형: ${instinctType} (${instinctName})\n`;
    }

    shareText += '\n✨ 실시간 성격 테스트로 나를 알아보세요!';

    if (navigator.share) {
        navigator.share({
            title: '성격 테스트 결과',
            text: shareText
        }).catch(console.error);
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('결과가 클립보드에 복사되었습니다!');
        }).catch(() => {
            alert(shareText);
        });
    }
}

// ===== Result image card =====
// Renders a shareable PNG of the user's result and either invokes Web Share with
// the file (mobile) or downloads it directly (desktop).
function buildResultCardCanvas() {
    const W = 1080, H = 1350; // Instagram portrait
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // ---- Determine which sections are visible ----
    const showMBTI = currentTest === 'mbti' || currentTest === 'both' || currentTest === 'complete' || currentTest === 'mbti-yesno' || currentTest === 'mbti-scenario';
    const showEnneagram = currentTest === 'enneagram' || currentTest === 'both' || currentTest === 'complete';
    const showInstinct = currentTest === 'instinct' || currentTest === 'complete';

    // ---- Per-section palettes (each section gets its own gradient identity) ----
    // displayIndex is the canonical "chapter number" — used for BOTH eyebrow label
    // and the giant faint numeral. Keeps single-card modes (e.g. instinct-only)
    // from contradicting themselves.
    const PALETTES = {
        mbti:       { a: '#7CF5FF', b: '#A78BFA', c: '#F472B6', tag: 'PERSONA',  displayIndex: 1, ko: '성격 유형' },
        enneagram:  { a: '#FFD479', b: '#FF8FA3', c: '#C084FC', tag: 'PATTERN',  displayIndex: 2, ko: '에니어그램' },
        instinct:   { a: '#FF9A6B', b: '#FF5E87', c: '#7C5CFF', tag: 'INSTINCT', displayIndex: 3, ko: '본능 변형' }
    };

    // Collect active sections in display order so spacing adapts to 1/2/3 cards
    const sections = [];
    if (showMBTI) {
        const t = (document.getElementById('result-mbti-type')?.textContent || (typeof getMBTIType === 'function' ? getMBTIType() : 'INFP') || '').trim();
        const n = (document.getElementById('result-mbti-name')?.textContent || '').trim();
        sections.push({ key: 'mbti', big: t, small: n, palette: PALETTES.mbti, ko: '성격 유형' });
    }
    if (showEnneagram) {
        let t = (document.getElementById('result-enneagram-type')?.textContent || (typeof getEnneagramType === 'function' ? String(getEnneagramType()) : '4') || '').trim();
        // Display just the digit prominently; suffix handled separately
        const n = (document.getElementById('result-enneagram-name')?.textContent || '').trim();
        sections.push({ key: 'enneagram', big: t, suffix: '번', small: n, palette: PALETTES.enneagram, ko: '에니어그램' });
    }
    if (showInstinct) {
        const t = (document.getElementById('result-instinct-type')?.textContent || '').trim();
        const n = (document.getElementById('result-instinct-name')?.textContent || '').trim();
        sections.push({ key: 'instinct', big: t, small: n, palette: PALETTES.instinct, ko: '본능 변형' });
    }

    // ============================================================
    //  LAYER 1 — Background: deep night canvas with cosmic gradient
    // ============================================================
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0,    '#0A0A1F');
    bg.addColorStop(0.45, '#11102B');
    bg.addColorStop(0.85, '#180B33');
    bg.addColorStop(1,    '#0D0820');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // ============================================================
    //  LAYER 2 — Aurora orbs (large blurred radial gradients)
    //  These are the signature decoration — they float behind cards
    // ============================================================
    drawAuroraOrb(ctx, -120, 180, 620, ['rgba(124,245,255,0.45)','rgba(124,245,255,0)']);
    drawAuroraOrb(ctx, W + 140, 520, 720, ['rgba(244,114,182,0.42)','rgba(244,114,182,0)']);
    drawAuroraOrb(ctx, 540, H + 80, 780, ['rgba(167,139,250,0.50)','rgba(167,139,250,0)']);
    drawAuroraOrb(ctx, 880, 1080, 360, ['rgba(255,212,121,0.28)','rgba(255,212,121,0)']);

    // ============================================================
    //  LAYER 3 — Subtle grain + faint scanlines for tactile editorial depth
    // ============================================================
    drawGrain(ctx, W, H, 0.08);
    drawScanlines(ctx, W, H);

    // ============================================================
    //  LAYER 4 — Header band (asymmetric — tall index numeral + brand)
    // ============================================================
    drawHeader(ctx, W);

    // ============================================================
    //  LAYER 5 — Cards (asymmetric, magazine-style)
    // ============================================================
    // Vertical layout: header to ~H-180 (footer area).
    const topY = 320;
    const bottomY = H - 180;
    const trackH = bottomY - topY;
    const gap = sections.length >= 3 ? 22 : 30;
    // Card height: comfortable for 3, taller for 1–2 to avoid sparseness.
    // Single-card mode gets a poster-tall card (~800) plus a lookalike row drawn beneath.
    const maxCardH = sections.length >= 3 ? 290
                    : sections.length === 2 ? 380
                    : 800;
    const cardH = Math.min(maxCardH, (trackH - gap * (sections.length - 1)) / Math.max(1, sections.length));
    const totalH = cardH * sections.length + gap * (sections.length - 1);
    const startY = topY + (trackH - totalH) / 2;

    sections.forEach((s, i) => {
        const cy = startY + i * (cardH + gap);
        drawResultCard(ctx, 70, cy, W - 140, cardH, s, i, sections.length);
    });

    // ============================================================
    //  LAYER 6 — Footer (Toss-style minimal signature)
    // ============================================================
    drawFooter(ctx, W, H);

    return canvas;
}

// ---------------- Helpers (kept local to result-card section) ----------------

function drawAuroraOrb(ctx, cx, cy, r, stops) {
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, stops[0]);
    g.addColorStop(1, stops[1]);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
}

function drawGrain(ctx, W, H, alpha) {
    // Fine speckle — visible-at-Instagram-scale density + mixed dark/light specks
    // for tactile newsprint feel (instead of pure white sparkle).
    ctx.save();
    // Seeded pseudo-random so output is reproducible
    let s = 7;
    const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    for (let i = 0; i < 4200; i++) {
        const x = rand() * W;
        const y = rand() * H;
        const sz = rand() * 1.8 + 0.4;
        const light = rand() > 0.4;
        ctx.globalAlpha = (light ? alpha : alpha * 0.85);
        ctx.fillStyle = light ? '#ffffff' : '#000000';
        ctx.fillRect(x, y, sz, sz);
    }
    ctx.restore();
}

// Faint diagonal scanline striations — editorial / scanned-print feel.
// Very subtle: only visible on close inspection, not a moiré pattern.
function drawScanlines(ctx, W, H) {
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    // ~3px gaps, drawn as horizontal hairlines across the canvas.
    for (let yy = 0; yy < H; yy += 3) {
        ctx.beginPath();
        ctx.moveTo(0, yy + 0.5);
        ctx.lineTo(W, yy + 0.5);
        ctx.stroke();
    }
    ctx.restore();
}

function drawHeader(ctx, W) {
    // Tiny eyebrow label, top-left
    ctx.save();
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '600 22px "Noto Sans KR", system-ui, sans-serif';
    // letter-spacing emulation
    drawSpacedText(ctx, 'PERSONALITY  REPORT', 80, 130, 4.5);

    // Brand wordmark (huge but light)
    ctx.fillStyle = 'rgba(255,255,255,0.96)';
    ctx.font = '800 76px "Noto Sans KR", system-ui, sans-serif';
    ctx.fillText('나의 페르소나', 80, 222);

    // Date / signature pill on top-right
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yy = String(d.getFullYear()).slice(2);
    const dateStr = `${yy}.${mm}.${dd}`;
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '500 24px "Noto Sans KR", system-ui, sans-serif';
    ctx.fillText(dateStr, W - 80, 130);

    // Tiny status dot — single-pass with shadow glow, no double-stamp smear
    const dotX = W - 80 - ctx.measureText(dateStr).width - 22;
    ctx.save();
    ctx.fillStyle = '#7CF5FF';
    ctx.shadowColor = '#7CF5FF';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(dotX, 122, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Gradient hairline divider under header
    const lineY = 268;
    const lg = ctx.createLinearGradient(80, lineY, W - 80, lineY);
    lg.addColorStop(0,   'rgba(255,255,255,0)');
    lg.addColorStop(0.25,'rgba(124,245,255,0.5)');
    lg.addColorStop(0.55,'rgba(167,139,250,0.5)');
    lg.addColorStop(0.85,'rgba(244,114,182,0.5)');
    lg.addColorStop(1,   'rgba(255,255,255,0)');
    ctx.strokeStyle = lg;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(80, lineY);
    ctx.lineTo(W - 80, lineY);
    ctx.stroke();
    ctx.restore();
}

function drawResultCard(ctx, x, y, w, h, section, index, totalSections) {
    const r = 36;
    const p = section.palette;

    // Layout mode flags — drives every internal spacing decision
    const compact = h < 320;      // 3-card mode
    const poster  = totalSections === 1; // single-card poster mode
    // Equal side padding (eyebrow left, descriptor right, big type left)
    const PAD = 56;
    const contentX = x + PAD;

    ctx.save();

    // ---- Soft outer glow drop shadow ----
    ctx.shadowColor = 'rgba(0,0,0,0.55)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 20;

    // ---- Card body: glassmorphism (stronger tint + darken pass for edge definition) ----
    // First, a slightly dark "frosted glass" base so edges read against the night BG.
    ctx.fillStyle = 'rgba(20,15,40,0.28)';
    roundRect(ctx, x, y, w, h, r, true, false);

    // Reset shadow so the white tint above doesn't double-shadow.
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    const cardGrad = ctx.createLinearGradient(x, y, x, y + h);
    cardGrad.addColorStop(0, 'rgba(255,255,255,0.14)');
    cardGrad.addColorStop(1, 'rgba(255,255,255,0.06)');
    ctx.fillStyle = cardGrad;
    roundRect(ctx, x, y, w, h, r, true, false);

    // ---- Inner accent radial orb anchored to right edge (per-section color) ----
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, x, y, w, h, r, false, false);
    ctx.clip();

    const orbR = h * 1.1;
    const orbCx = x + w + 60;
    const orbCy = y + h * 0.55;
    const orb = ctx.createRadialGradient(orbCx, orbCy, 0, orbCx, orbCy, orbR);
    orb.addColorStop(0,   hexToRgba(p.a, 0.55));
    orb.addColorStop(0.45, hexToRgba(p.b, 0.38));
    orb.addColorStop(1,   hexToRgba(p.c, 0));
    ctx.fillStyle = orb;
    ctx.fillRect(x, y, w, h);

    // Subtle secondary orb on opposite corner
    const orb2 = ctx.createRadialGradient(x - 40, y - 40, 0, x - 40, y - 40, h * 0.9);
    orb2.addColorStop(0, hexToRgba(p.c, 0.32));
    orb2.addColorStop(1, hexToRgba(p.c, 0));
    ctx.fillStyle = orb2;
    ctx.fillRect(x, y, w, h);

    // ---- Index numeral (huge, faint) — drawn INSIDE the clip so it can clip off
    // the right edge in 3-card mode for that "Toss recap" partial-bleed feel.
    // Use displayIndex (1/2/3) — consistent with eyebrow label, regardless of mode.
    {
        ctx.save();
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        let idxSize, idxX, idxY;
        if (compact) {
            // 3-card mode: shrink AND shift off the right edge so it bleeds out
            idxSize = 150;
            idxX = x + w + 28;     // clip past the card edge
            idxY = y + h * 0.62;
        } else if (poster) {
            // Poster mode: large but not overwhelming, anchored mid-card
            idxSize = 240;
            idxX = x + w - 44;
            idxY = y + h * 0.55;
        } else {
            // 2-card mode: comfortable middle ground
            idxSize = Math.round(Math.min(220, Math.max(170, h * 0.6)));
            idxX = x + w - 44;
            idxY = y + h * 0.54;
        }
        ctx.font = `200 ${idxSize}px "Noto Sans KR", system-ui, sans-serif`;
        const idxGrad = ctx.createLinearGradient(0, y, 0, y + h);
        idxGrad.addColorStop(0, hexToRgba(p.a, 0.22));
        idxGrad.addColorStop(1, hexToRgba(p.c, 0.05));
        ctx.fillStyle = idxGrad;
        ctx.fillText(String(p.displayIndex).padStart(2, '0'), idxX, idxY);
        ctx.restore();
    }

    // 1px inner glass border (all four sides, not just top)
    ctx.strokeStyle = 'rgba(255,255,255,0.14)';
    ctx.lineWidth = 1;
    roundRect(ctx, x + 0.5, y + 0.5, w - 1, h - 1, r - 0.5, false, true);

    // Subtle top-edge highlight on top of the border
    const hi = ctx.createLinearGradient(x, y, x, y + Math.min(h * 0.5, 200));
    hi.addColorStop(0, 'rgba(255,255,255,0.45)');
    hi.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.strokeStyle = hi;
    ctx.lineWidth = 1.2;
    roundRect(ctx, x + 0.6, y + 0.6, w - 1.2, h - 1.2, r - 0.6, false, true);

    ctx.restore();

    // ---- Left rail: vertical gradient bar (signature) ----
    const railX = x + 28;
    const railY = y + 36;
    const railH = h - 72;
    const railG = ctx.createLinearGradient(railX, railY, railX, railY + railH);
    railG.addColorStop(0, p.a);
    railG.addColorStop(0.55, p.b);
    railG.addColorStop(1, p.c);
    ctx.fillStyle = railG;
    roundRect(ctx, railX, railY, 5, railH, 3, true, false);

    // Glow under rail
    ctx.save();
    ctx.shadowColor = hexToRgba(p.b, 0.7);
    ctx.shadowBlur = 22;
    ctx.fillStyle = railG;
    roundRect(ctx, railX, railY, 5, railH, 3, true, false);
    ctx.restore();

    // ---- Eyebrow label (tiny, tracked-out) — derived from displayIndex ----
    const eyebrowY = compact ? (y + 44) : (y + 62);
    const koY      = compact ? (y + 74) : (y + 100);
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '600 20px "Noto Sans KR", system-ui, sans-serif';
    const eyebrow = `${p.tag} · ${String(p.displayIndex).padStart(2, '0')}`;
    drawSpacedText(ctx, eyebrow, contentX, eyebrowY, 3.5);

    // ---- Korean section name (medium weight) ----
    ctx.fillStyle = 'rgba(255,255,255,0.78)';
    ctx.font = `500 ${compact ? 26 : 30}px "Noto Sans KR", system-ui, sans-serif`;
    ctx.fillText(section.ko, contentX, koY);

    // ---- BIG type: gradient-filled, ultra-heavy weight ----
    const big = section.big || '';
    const suffix = section.suffix || '';
    // fitBigTypeSize ceiling depends on layout mode.
    const fitCeil = compact ? 110 : (poster ? 220 : 168);
    const bigSize = fitBigTypeSize(ctx, big, w - (PAD * 2 + (poster ? 0 : 200)), fitCeil);
    ctx.font = `900 ${bigSize}px "Noto Sans KR", system-ui, sans-serif`;
    // Big type baseline: in compact mode push UP to avoid crowding bottom edge.
    const bigBaseline = compact ? (y + h - 78)
                       : poster ? (y + h * 0.62)
                       : (y + h - 60);
    const tg = ctx.createLinearGradient(contentX, bigBaseline - bigSize, contentX + 600, bigBaseline);
    tg.addColorStop(0, p.a);
    tg.addColorStop(0.5, '#FFFFFF');
    tg.addColorStop(1, p.c);
    ctx.fillStyle = tg;
    // glow behind type
    ctx.save();
    ctx.shadowColor = hexToRgba(p.b, 0.55);
    ctx.shadowBlur = 30;
    ctx.fillText(big, contentX, bigBaseline);
    ctx.restore();

    // Suffix (e.g. "번") — share baseline with big numeral
    if (suffix) {
        const bigW = ctx.measureText(big).width;
        const suffixSize = compact ? 30 : (poster ? 56 : 42);
        ctx.font = `300 ${suffixSize}px "Noto Sans KR", system-ui, sans-serif`;
        ctx.fillStyle = 'rgba(255,255,255,0.78)';
        // Sit on the same baseline as the big type (optical, very slight lift handled by font metrics).
        ctx.fillText(suffix, contentX + bigW + 14, bigBaseline);
    }

    // ---- Small descriptor name on right side ----
    if (section.small) {
        ctx.textAlign = 'right';
        ctx.fillStyle = 'rgba(255,255,255,0.92)';
        const descSize = compact ? 28 : 34;
        ctx.font = `600 ${descSize}px "Noto Sans KR", system-ui, sans-serif`;
        // Right padding matches left padding
        const descX = x + w - PAD;
        const descY = compact ? (y + 50) : (y + 92);
        ctx.fillText(section.small, descX, descY);

        // Underline accent — tiny gradient line under the descriptor
        const nW = Math.min(ctx.measureText(section.small).width, 280);
        const ulX = descX - nW;
        const ulY = descY + (compact ? 10 : 16);
        const ul = ctx.createLinearGradient(ulX, ulY, ulX + nW, ulY);
        ul.addColorStop(0, hexToRgba(p.a, 0));
        ul.addColorStop(0.5, hexToRgba(p.b, 0.9));
        ul.addColorStop(1, hexToRgba(p.c, 0));
        ctx.strokeStyle = ul;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ulX, ulY);
        ctx.lineTo(ulX + nW, ulY);
        ctx.stroke();
    }

    // ---- Poster-mode extras: lookalike avatar row + tag chips ---------
    // Fills the vertical space that would otherwise read as orphaned canvas.
    if (poster) {
        drawLookalikeRow(ctx, contentX, y + h * 0.78, p, section);
        drawTagChips(ctx, contentX, y + h - 80, p, section);
    }

    ctx.restore();
}

function fitBigTypeSize(ctx, text, maxWidth, ceiling) {
    // Start large, shrink until it fits. Ceiling is layout-dependent:
    //  - 3-card compact: ~110
    //  - 2-card: ~168
    //  - 1-card poster: ~220
    let size = ceiling || 156;
    const floor = Math.min(80, Math.floor(size * 0.55));
    while (size > floor) {
        ctx.font = `900 ${size}px "Noto Sans KR", system-ui, sans-serif`;
        if (ctx.measureText(text).width <= maxWidth) return size;
        size -= 4;
    }
    return size;
}

// ---- Poster-mode decoration: row of 3 gradient-filled lookalike avatars ----
// Pure decoration, but it sells the "your tribe" idea and fills the
// otherwise-empty lower half of the poster card. The initials are derived
// from the section big-type or section.ko so they feel earned, not random.
function drawLookalikeRow(ctx, x, y, palette, section) {
    ctx.save();
    // Label above the row — small, all-caps, tracked
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.font = '600 16px "Noto Sans KR", system-ui, sans-serif';
    drawSpacedText(ctx, 'LOOKALIKES', x, y - 18, 3.0);

    // Derive 3 distinct "initials" from section data — deterministic stub avatars.
    const seed = `${section.key}-${section.big}-${section.small}`;
    const palettes = [
        [palette.a, palette.b],
        [palette.b, palette.c],
        [palette.c, palette.a]
    ];
    const initials = pickAvatarInitials(seed);

    const R = 42;          // radius
    const stepX = R * 2 + 18;
    let cx = x + R;
    const cy = y + R + 6;

    for (let i = 0; i < 3; i++) {
        // Disc fill with per-avatar gradient
        const g = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
        g.addColorStop(0, palettes[i][0]);
        g.addColorStop(1, palettes[i][1]);
        // Subtle glow
        ctx.save();
        ctx.shadowColor = hexToRgba(palette.b, 0.45);
        ctx.shadowBlur = 18;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Ring stroke
        ctx.strokeStyle = 'rgba(255,255,255,0.25)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.stroke();

        // Initials inside
        ctx.fillStyle = 'rgba(15,10,28,0.85)';
        ctx.font = '800 28px "Noto Sans KR", system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(initials[i], cx, cy + 2);

        cx += stepX;
    }
    ctx.restore();
}

// ---- Poster-mode decoration: faux tag chips beneath the lookalikes ----
function drawTagChips(ctx, x, y, palette, section) {
    // Tags derived from section identity — short, evocative.
    const TAG_LIBRARY = {
        mbti:      ['감정형', '아이디어 메이커', '조용한 몰입'],
        enneagram: ['깊은 감수성', '독자성', '의미 추적자'],
        instinct:  ['일대일 본능', '강렬한 연결', '집중과 몰입']
    };
    const tags = TAG_LIBRARY[section.key] || ['고유함', '깊이', '몰입'];

    ctx.save();
    ctx.textBaseline = 'middle';
    ctx.font = '500 19px "Noto Sans KR", system-ui, sans-serif';

    let cx = x;
    const cy = y;
    const padX = 16, padY = 9;
    const gap = 10;

    for (const tag of tags) {
        const tw = ctx.measureText(tag).width;
        const chipW = tw + padX * 2;
        const chipH = 38;

        // Chip background: faint glass with palette tint
        ctx.fillStyle = hexToRgba(palette.b, 0.12);
        roundRect(ctx, cx, cy - chipH / 2, chipW, chipH, chipH / 2, true, false);
        ctx.strokeStyle = hexToRgba(palette.a, 0.35);
        ctx.lineWidth = 1;
        roundRect(ctx, cx + 0.5, cy - chipH / 2 + 0.5, chipW - 1, chipH - 1, (chipH - 1) / 2, false, true);

        // Tag text
        ctx.fillStyle = 'rgba(255,255,255,0.86)';
        ctx.textAlign = 'left';
        ctx.fillText(tag, cx + padX, cy + 1);

        cx += chipW + gap;
    }
    ctx.restore();
}

// Deterministic 3 sets of initials from a seed string. ASCII only so we don't
// accidentally render glyphs that the fallback fonts don't ship.
function pickAvatarInitials(seed) {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) & 0xffffffff;
    const POOL = ['MJ','SY','KH','JW','HR','EJ','DK','TY','NH','RE','BL','AV','SN','IL'];
    const out = [];
    for (let i = 0; i < 3; i++) {
        h = (h * 1103515245 + 12345) & 0x7fffffff;
        out.push(POOL[h % POOL.length]);
    }
    // Dedupe — if any collision, walk forward.
    for (let i = 1; i < out.length; i++) {
        let guard = 0;
        while (out.slice(0, i).includes(out[i]) && guard++ < POOL.length) {
            out[i] = POOL[(POOL.indexOf(out[i]) + 1) % POOL.length];
        }
    }
    return out;
}

function drawSpacedText(ctx, text, x, y, spacing) {
    // Manual letter-spacing — Canvas has no native equivalent in all browsers
    let cx = x;
    for (const ch of text) {
        ctx.fillText(ch, cx, y);
        cx += ctx.measureText(ch).width + spacing;
    }
}

function hexToRgba(hex, a) {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
}

function drawFooter(ctx, W, H) {
    ctx.save();
    // Hairline gradient divider
    const ly = H - 110;
    const lg = ctx.createLinearGradient(80, ly, W - 80, ly);
    lg.addColorStop(0,   'rgba(255,255,255,0)');
    lg.addColorStop(0.5, 'rgba(255,255,255,0.25)');
    lg.addColorStop(1,   'rgba(255,255,255,0)');
    ctx.strokeStyle = lg;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, ly);
    ctx.lineTo(W - 80, ly);
    ctx.stroke();

    // Brand mark (left) + handle/CTA (right)
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = '700 26px "Noto Sans KR", system-ui, sans-serif';
    ctx.fillText('PERSONA.LAB', 80, H - 60);

    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.font = '500 22px "Noto Sans KR", system-ui, sans-serif';
    // Replaced the generic Korean CTA with a handle — feels like a publication
    // mark rather than a stock share prompt.
    ctx.fillText('@persona.lab', W - 80, H - 60);
    ctx.restore();
}

function roundRect(ctx, x, y, w, h, r, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
}

async function downloadResultCard() {
    const canvas = buildResultCardCanvas();
    const filename = `personality-result-${Date.now()}.png`;

    // Prefer Web Share API with file (mobile)
    if (navigator.canShare && typeof canvas.toBlob === 'function') {
        try {
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            if (blob) {
                const file = new File([blob], filename, { type: 'image/png' });
                if (navigator.canShare({ files: [file] })) {
                    await navigator.share({ files: [file], title: '내 성격 테스트 결과' });
                    return;
                }
            }
        } catch (err) {
            // Fall through to download
        }
    }

    // Fallback: trigger a download
    const dataURL = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// ===== Utility Functions =====
function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ===== Initialize =====
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Personality Test App Initialized');

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('test-screen').classList.contains('active')) {
                const key = e.key.toLowerCase();

                if (isYesNoMode) {
                    // Yes/No style: Y/N or 1/2
                    if (key === 'y' || key === '1') {
                        selectAnswer(0); // Yes
                    } else if (key === 'n' || key === '2') {
                        selectAnswer(1); // No
                    }
                } else {
                    // Original 5-choice style: 1-5
                    if (e.key >= '1' && e.key <= '5') {
                        selectAnswer(parseInt(e.key) - 1);
                    }
                }
            }
        });
    });
}

// ===== Character Builder =====
// Real-time avatar that gains traits as scores cross thresholds.
// Pure UI; safe no-op in non-DOM (test) environment.
const CHARACTER_TRAIT_RULES = [
    { axis: 'EI', side: 'pos', threshold: 3, chip: '🗣️ 외향', face: '😄' },
    { axis: 'EI', side: 'neg', threshold: 3, chip: '🤫 내향', face: '🤓' },
    { axis: 'SN', side: 'pos', threshold: 3, chip: '🔎 현실적', face: null },
    { axis: 'SN', side: 'neg', threshold: 3, chip: '🌠 직관적', face: null },
    { axis: 'TF', side: 'pos', threshold: 3, chip: '📊 논리', face: null },
    { axis: 'TF', side: 'neg', threshold: 3, chip: '💗 공감', face: null },
    { axis: 'JP', side: 'pos', threshold: 3, chip: '📅 계획형', face: null },
    { axis: 'JP', side: 'neg', threshold: 3, chip: '🎲 즉흥형', face: null }
];

function updateCharacterBuilder() {
    if (typeof document === 'undefined') return;
    const traitsEl = document.getElementById('character-traits');
    const faceEl = document.getElementById('character-face');
    const nameEl = document.getElementById('character-name');
    if (!traitsEl || !faceEl) return;

    const earnedChips = [];
    let face = '🙂';
    for (const rule of CHARACTER_TRAIT_RULES) {
        const score = mbtiScores[rule.axis];
        const triggered = rule.side === 'pos' ? score >= rule.threshold : score <= -rule.threshold;
        if (triggered) {
            earnedChips.push(rule.chip);
            if (rule.face) face = rule.face;
        }
    }

    traitsEl.innerHTML = '';
    earnedChips.forEach(chip => {
        const span = document.createElement('span');
        span.className = 'trait-chip';
        span.textContent = chip;
        traitsEl.appendChild(span);
    });
    faceEl.textContent = face;

    if (nameEl) {
        if (earnedChips.length === 0) {
            nameEl.textContent = '아직 알 수 없는 사람';
        } else if (currentPhase === 'mbti' || currentTest === 'both' || currentTest === 'complete' || currentTest === 'mbti-scenario' || currentTest === 'mbti-yesno') {
            nameEl.textContent = `${getMBTIType()} 성향이 보입니다`;
        } else {
            nameEl.textContent = '성격이 형성되는 중…';
        }
    }
}

// ===== Mid-test spoiler =====
let lastSpoilerAtQuestion = -1;

function maybeShowSpoiler(currentNum, totalQuestions) {
    if (typeof document === 'undefined') return;
    if (currentNum <= 1) return;
    if (currentNum === lastSpoilerAtQuestion) return;
    // Fire at every 5th question, but not on the very last one (would clash with result reveal).
    if (currentNum % 5 !== 0) return;
    if (currentNum >= totalQuestions) return;

    let message = '';
    if (currentPhase === 'mbti') {
        message = `🔮 지금까지의 흐름: ${getMBTIType()} 쪽으로 기울고 있어요`;
    } else if (currentPhase === 'enneagram') {
        message = `🔮 지금까지의 흐름: ${getEnneagramType()}번 유형 쪽으로 기울고 있어요`;
    } else if (currentPhase === 'instinct') {
        const sorted = Object.entries(instinctScores).sort((a, b) => b[1] - a[1]);
        message = `🔮 지금까지의 흐름: ${sorted[0][0]} 본능이 우세해요`;
    }
    if (!message) return;

    const toast = document.getElementById('spoiler-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    lastSpoilerAtQuestion = currentNum;
    clearTimeout(maybeShowSpoiler._t);
    maybeShowSpoiler._t = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ===== Adaptive shortened mode =====
// Skip Likert questions targeting an axis whose absolute score already exceeds
// a decisive threshold. Only applies to traditional MBTI-axis questions.
const ADAPTIVE_DECISION_THRESHOLD = 8;

function isAxisDecided(axis) {
    if (!(axis in mbtiScores)) return false;
    return Math.abs(mbtiScores[axis]) >= ADAPTIVE_DECISION_THRESHOLD;
}

function skipQuestionsForDecidedAxes() {
    if (!questions || !questions.length) return;
    if (currentPhase !== 'mbti') return;
    // Only fast-forward across consecutive decided-axis questions.
    while (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        // Scenario questions touch multiple axes — never skip them.
        if (!q || q.presentation === 'scenario') break;
        if (!q.axis) break;
        if (!isAxisDecided(q.axis)) break;
        currentQuestionIndex++;
    }
}

// ===== Tournament (이상형 월드컵) =====
let tournamentState = null;

function startTournament() {
    if (typeof TOURNAMENT_POOL === 'undefined') return;
    const shuffled = shuffleArray([...TOURNAMENT_POOL]);
    // Use up to 16 contestants; pool may be smaller, so pad to nearest power of 2.
    let bracketSize = 1;
    while (bracketSize * 2 <= shuffled.length) bracketSize *= 2;
    const initial = shuffled.slice(0, bracketSize);

    instinctScores = { SP: 0, SO: 0, SX: 0 };
    tournamentState = {
        roundContestants: initial,
        nextRound: [],
        matchIndex: 0,
        roundNumber: 1,
        totalRounds: Math.log2(bracketSize)
    };
    currentTest = 'tournament';
    currentPhase = 'tournament';
    showScreen('tournament-screen');
    renderTournamentMatchup();
}

function tournamentRoundLabel(state) {
    const remaining = state.roundContestants.length;
    if (remaining === 2) return '결승';
    if (remaining === 4) return '4강';
    if (remaining === 8) return '8강';
    if (remaining === 16) return '16강';
    return `${remaining}강`;
}

function renderTournamentMatchup() {
    if (typeof document === 'undefined' || !tournamentState) return;
    const s = tournamentState;
    if (s.matchIndex >= s.roundContestants.length) {
        if (s.nextRound.length === 1) {
            finishTournament(s.nextRound[0]);
            return;
        }
        s.roundContestants = s.nextRound;
        s.nextRound = [];
        s.matchIndex = 0;
        s.roundNumber++;
    }

    const left = s.roundContestants[s.matchIndex];
    const right = s.roundContestants[s.matchIndex + 1];
    const totalMatchesThisRound = s.roundContestants.length / 2;
    const matchNumberThisRound = s.matchIndex / 2 + 1;

    const roundEl = document.getElementById('tournament-round');
    if (roundEl) roundEl.textContent = `${tournamentRoundLabel(s)} · ${matchNumberThisRound} / ${totalMatchesThisRound}`;

    const leftEmoji = document.getElementById('tournament-left-emoji');
    const leftText = document.getElementById('tournament-left-text');
    const rightEmoji = document.getElementById('tournament-right-emoji');
    const rightText = document.getElementById('tournament-right-text');
    if (leftEmoji) leftEmoji.textContent = left.emoji;
    if (leftText) leftText.textContent = left.text;
    if (rightEmoji) rightEmoji.textContent = right.emoji;
    if (rightText) rightText.textContent = right.text;
}

function pickTournamentSide(side) {
    if (!tournamentState) return;
    const s = tournamentState;
    const left = s.roundContestants[s.matchIndex];
    const right = s.roundContestants[s.matchIndex + 1];
    if (!left || !right) return;

    const winner = side === 'left' ? left : right;
    const loser = side === 'left' ? right : left;

    // Winners get more weight; losers also score a small amount because reaching
    // the bracket means the user implicitly considered them.
    if (winner.instinct in instinctScores) instinctScores[winner.instinct] += 2;
    if (loser.instinct in instinctScores) instinctScores[loser.instinct] += 0;

    s.nextRound.push(winner);
    s.matchIndex += 2;
    renderTournamentMatchup();
}

function finishTournament(champion) {
    currentTest = 'instinct'; // route through the existing instinct result UI
    currentPhase = 'instinct';
    // Bias scores by the champion so the winner is always the top instinct.
    if (champion && champion.instinct in instinctScores) {
        instinctScores[champion.instinct] += 5;
    }
    showResults();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        shuffleArray,
        getEnneagramType,
        setEnneagramScores: (scores) => { enneagramScores = scores; },
        getMBTIType,
        resetEnneagramScores: () => { enneagramScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }; },
        applyMBTIScore,
        applyScenarioScore,
        getMbtiScores: () => mbtiScores,
        setMbtiScores: (scores) => { mbtiScores = scores; },
        setIsYesNoMode: (val) => { isYesNoMode = val; },
        resetMbtiScores: () => { mbtiScores = { EI: 0, SN: 0, TF: 0, JP: 0 }; },
        applyInstinctScore,
        getInstinctScores: () => instinctScores,
        resetInstinctScores: () => { instinctScores = { SP: 0, SO: 0, SX: 0 }; },
        isAxisDecided,
        skipQuestionsForDecidedAxes
    };
}
