// ===== State Management =====
let currentTest = null; // 'mbti', 'enneagram', 'instinct', 'both', 'complete', or 'mbti-yesno'
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
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
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
    }

    // Update UI
    updateVisualization();
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
    document.getElementById('progress-text').textContent = `질문 ${currentNum} / ${totalQuestions}`;
    document.getElementById('progress-percent').textContent = `${Math.round(progressPercent)}%`;
    document.getElementById('progress-fill').style.width = `${progressPercent}%`;

    // Update question
    document.getElementById('question-number').textContent = `Q${currentNum}`;
    document.getElementById('question-text').textContent = question.text;

    // Reset answer buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
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

    // Apply score based on current phase
    if (currentPhase === 'mbti') {
        applyMBTIScore(question, answerIndex);
    } else if (currentPhase === 'enneagram') {
        applyEnneagramScore(question, answerIndex);
    } else if (currentPhase === 'instinct') {
        applyInstinctScore(question, answerIndex);
    }

    // Update visualization with animation
    updateVisualization();

    // Mark button as selected briefly
    const buttons = document.querySelectorAll('.answer-btn');
    buttons[answerIndex].classList.add('selected');

    // Move to next question after a short delay
    setTimeout(() => {
        nextQuestion();
    }, 400);
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

function updateEnneagramVisualization() {
    // Find max score for normalization
    const maxScore = Math.max(...Object.values(enneagramScores), 1);

    // Find leading type
    let leadingType = 1;
    let leadingScore = enneagramScores[1];

    for (let i = 1; i <= 9; i++) {
        const score = enneagramScores[i];
        const percent = (score / maxScore) * 100;

        // Update bar
        const fill = document.getElementById(`ennea-${i}-fill`);
        fill.style.width = `${percent}%`;

        // Update percentage display
        document.getElementById(`ennea-${i}-percent`).textContent = `${Math.round(percent)}%`;

        // Update leading class
        const barItem = document.querySelector(`.ennea-bar-item[data-type="${i}"]`);
        barItem.classList.remove('leading');

        if (score > leadingScore) {
            leadingScore = score;
            leadingType = i;
        }
    }

    // Mark leading type
    document.querySelector(`.ennea-bar-item[data-type="${leadingType}"]`).classList.add('leading');

    // Update current type display
    const typeName = ENNEAGRAM_TYPES[leadingType].name;
    document.getElementById('current-enneagram-type').textContent = `${leadingType}번 ${typeName}`;
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
    const showMBTI = currentTest === 'mbti' || currentTest === 'both' || currentTest === 'complete' || currentTest === 'mbti-yesno';
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
    let sortedTypes = Object.entries(enneagramScores)
        .sort((a, b) => b[1] - a[1]);

    const mainType = parseInt(sortedTypes[0][0]);
    const mainScore = sortedTypes[0][1];

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

    if (currentTest === 'mbti' || currentTest === 'both' || currentTest === 'complete' || currentTest === 'mbti-yesno') {
        const mbtiType = document.getElementById('result-mbti-type').textContent;
        const mbtiName = document.getElementById('result-mbti-name').textContent;
        shareText += `📊 MBTI: ${mbtiType} (${mbtiName})\n`;
    }

    if (currentTest === 'enneagram' || currentTest === 'both' || currentTest === 'complete') {
        const enneaType = document.getElementById('result-enneagram-type').textContent;
        const enneaName = document.getElementById('result-enneagram-name').textContent;
        shareText += `💜 Enneagram: ${enneaType}번 ${enneaName}\n`;
    }

    if (currentTest === 'instinct' || currentTest === 'complete') {
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { shuffleArray };
}
