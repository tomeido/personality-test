// Enneagram Questions Data
// Each question affects one or more of the 9 types
// Higher scores indicate stronger alignment with that type

const ENNEAGRAM_QUESTIONS = [
    // Type 1 - The Reformer (개혁가)
    {
        id: 1,
        text: "나는 일을 올바르게 하는 것이 중요하고, 실수하면 불안해진다.",
        scores: { 1: 2, 3: 1, 6: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 2,
        text: "규칙과 원칙을 지키는 것이 중요하고, 불공정한 것을 참기 어렵다.",
        scores: { 1: 2, 8: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 3,
        text: "완벽하지 않은 결과물은 제출하기 어려워서 시간이 오래 걸린다.",
        scores: { 1: 2, 4: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    },

    // Type 2 - The Helper (조력가)
    {
        id: 4,
        text: "다른 사람들의 필요를 알아채고 도와주는 것에서 기쁨을 느낀다.",
        scores: { 2: 2, 9: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 5,
        text: "사람들에게 사랑받고 인정받는 것이 나에게 매우 중요하다.",
        scores: { 2: 2, 3: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 6,
        text: "다른 사람의 문제를 해결해주려고 할 때 나 자신의 필요는 잊어버린다.",
        scores: { 2: 2 },
        weights: [2, 1.5, 1, 0.5, 0]
    },

    // Type 3 - The Achiever (성취가)
    {
        id: 7,
        text: "성공과 성취가 나에게 매우 중요하고, 목표를 달성하면 뿌듯하다.",
        scores: { 3: 2, 8: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 8,
        text: "다른 사람들에게 인상적이고 성공적인 사람으로 보이고 싶다.",
        scores: { 3: 2, 7: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 9,
        text: "효율적이고 생산적인 것이 중요하고, 시간 낭비를 싫어한다.",
        scores: { 3: 2, 1: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    },

    // Type 4 - The Individualist (예술가)
    {
        id: 10,
        text: "나는 다른 사람들과 다르고 특별하다고 느끼며, 그것이 중요하다.",
        scores: { 4: 2 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 11,
        text: "깊은 감정과 의미를 추구하고, 피상적인 것은 싫어한다.",
        scores: { 4: 2, 5: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 12,
        text: "과거의 일이나 잃어버린 것에 대해 자주 생각하고 우울해지기도 한다.",
        scores: { 4: 2 },
        weights: [2, 1.5, 1, 0.5, 0]
    },

    // Type 5 - The Investigator (탐구가)
    {
        id: 13,
        text: "지식을 쌓고 세상을 이해하는 것이 중요하다.",
        scores: { 5: 2, 1: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 14,
        text: "혼자서 생각하고 연구하는 시간이 많이 필요하다.",
        scores: { 5: 2, 4: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 15,
        text: "감정적으로 너무 많이 요구하는 사람들이 부담스럽다.",
        scores: { 5: 2 },
        weights: [2, 1.5, 1, 0.5, 0]
    },

    // Type 6 - The Loyalist (충성가)
    {
        id: 16,
        text: "미래에 대해 걱정하고, 최악의 상황에 대비하려고 한다.",
        scores: { 6: 2 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 17,
        text: "신뢰할 수 있는 사람과 집단에 소속되는 것이 중요하다.",
        scores: { 6: 2, 2: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 18,
        text: "권위에 대해 의문을 갖거나, 반대로 권위에 의존하는 경향이 있다.",
        scores: { 6: 2 },
        weights: [2, 1.5, 1, 0.5, 0]
    },

    // Type 7 - The Enthusiast (열정가)
    {
        id: 19,
        text: "새로운 경험과 재미있는 일을 추구하고, 지루함을 견디기 어렵다.",
        scores: { 7: 2, 3: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 20,
        text: "긍정적인 가능성에 집중하고, 부정적인 감정은 피하려고 한다.",
        scores: { 7: 2, 9: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 21,
        text: "한 가지에 집중하기보다 여러 가지 일을 동시에 하는 것을 좋아한다.",
        scores: { 7: 2 },
        weights: [2, 1.5, 1, 0.5, 0]
    },

    // Type 8 - The Challenger (도전가)
    {
        id: 22,
        text: "강하고 독립적인 것이 중요하고, 약함을 보이는 것은 싫다.",
        scores: { 8: 2 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 23,
        text: "불의에 맞서 싸우고, 약한 사람을 보호하려고 한다.",
        scores: { 8: 2, 1: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 24,
        text: "상황을 통제하고 결정을 내리는 것을 좋아한다.",
        scores: { 8: 2, 3: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    },

    // Type 9 - The Peacemaker (평화주의자)
    {
        id: 25,
        text: "갈등을 피하고 평화로운 환경을 유지하는 것이 중요하다.",
        scores: { 9: 2, 2: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 26,
        text: "다른 사람의 관점을 잘 이해하고, 중재자 역할을 할 때가 많다.",
        scores: { 9: 2 },
        weights: [2, 1.5, 1, 0.5, 0]
    },
    {
        id: 27,
        text: "내가 원하는 것보다 다른 사람이 원하는 것에 맞추는 경향이 있다.",
        scores: { 9: 2, 2: 1 },
        weights: [2, 1.5, 1, 0.5, 0]
    }
];

// Enneagram Type Descriptions
const ENNEAGRAM_TYPES = {
    1: {
        name: "개혁가",
        subtitle: "The Reformer",
        coreDesire: "올바르고 완벽해지는 것",
        coreFear: "결함이 있거나 나쁜 사람이 되는 것",
        description: "원칙적이고 이상주의적인 유형입니다. 윤리적이고 양심적이며, 옳고 그름에 대한 강한 감각을 가지고 있습니다. 교사, 개혁자 역할을 하며, 세상을 더 나은 곳으로 만들려고 합니다.",
        strengths: "정직함, 책임감, 자기 절제력, 이상주의",
        growth: "불완전함을 받아들이고, 자기 비판을 줄이며, 현재 순간을 즐기는 법을 배우세요."
    },
    2: {
        name: "조력가",
        subtitle: "The Helper",
        coreDesire: "사랑받고 필요한 존재가 되는 것",
        coreFear: "사랑받을 가치가 없다는 것",
        description: "배려심 많고 대인관계에 능한 유형입니다. 공감 능력이 뛰어나고, 친절하며, 관대합니다. 다른 사람들을 돕고 기쁘게 하는 것을 좋아합니다.",
        strengths: "공감 능력, 관대함, 따뜻함, 헌신",
        growth: "자신의 필요를 인식하고 표현하며, '아니오'라고 말하는 법을 배우세요."
    },
    3: {
        name: "성취가",
        subtitle: "The Achiever",
        coreDesire: "가치 있고 성공적인 사람이 되는 것",
        coreFear: "가치 없고 실패한 사람이 되는 것",
        description: "성공 지향적이고 실용적인 유형입니다. 적응력이 뛰어나고, 자신감 있으며, 매력적입니다. 성취와 인정을 추구하며, 목표 달성에 집중합니다.",
        strengths: "효율성, 자신감, 동기부여, 적응력",
        growth: "내면의 가치를 인식하고, 성취와 별개로 자신을 사랑하는 법을 배우세요."
    },
    4: {
        name: "예술가",
        subtitle: "The Individualist",
        coreDesire: "독특하고 진정한 자아를 찾는 것",
        coreFear: "정체성이 없거나 평범한 존재인 것",
        description: "감수성이 풍부하고 자기 성찰적인 유형입니다. 표현력이 뛰어나고, 극적이며, 기분에 따라 변합니다. 아름다움과 깊은 감정을 추구합니다.",
        strengths: "창의력, 직관력, 감수성, 진정성",
        growth: "현재에 집중하고, 다른 사람과의 연결을 통해 기쁨을 찾으세요."
    },
    5: {
        name: "탐구가",
        subtitle: "The Investigator",
        coreDesire: "유능하고 똑똑한 사람이 되는 것",
        coreFear: "무능하고 쓸모없는 존재인 것",
        description: "집중력 있고 혁신적인 유형입니다. 통찰력이 있고, 호기심이 많으며, 독립적입니다. 지식을 쌓고 세상을 이해하려고 합니다.",
        strengths: "분석력, 객관성, 집중력, 독립심",
        growth: "머리에서 벗어나 몸과 감정을 경험하고, 다른 사람과 연결되세요."
    },
    6: {
        name: "충성가",
        subtitle: "The Loyalist",
        coreDesire: "안전하고 지지받는 것",
        coreFear: "지원 없이 혼자 남겨지는 것",
        description: "헌신적이고 책임감 있는 유형입니다. 신뢰할 수 있고, 근면하며, 문제 해결에 능합니다. 안정과 소속감을 추구합니다.",
        strengths: "충성심, 책임감, 문제 해결 능력, 헌신",
        growth: "자신을 믿고, 불안에 맞서며, 현재의 안전을 인식하세요."
    },
    7: {
        name: "열정가",
        subtitle: "The Enthusiast",
        coreDesire: "행복하고 만족스러운 삶을 사는 것",
        coreFear: "고통스럽고 박탈당하는 것",
        description: "바쁘고 다재다능한 유형입니다. 자발적이고, 낙천적이며, 활기찹니다. 새로운 경험과 가능성을 추구합니다.",
        strengths: "낙천성, 다재다능함, 열정, 즉흥성",
        growth: "현재 순간에 머물고, 어려운 감정을 피하지 않으며, 깊이를 추구하세요."
    },
    8: {
        name: "도전가",
        subtitle: "The Challenger",
        coreDesire: "자신을 보호하고 통제력을 유지하는 것",
        coreFear: "다른 사람에게 통제당하거나 해를 입는 것",
        description: "강하고 결단력 있는 유형입니다. 자신감 있고, 직접적이며, 보호적입니다. 약자를 보호하고 불의에 맞서 싸웁니다.",
        strengths: "자신감, 결단력, 보호 본능, 리더십",
        growth: "취약함을 보여주고, 다른 사람에게 통제를 양보하는 법을 배우세요."
    },
    9: {
        name: "평화주의자",
        subtitle: "The Peacemaker",
        coreDesire: "내적 안정과 평화를 유지하는 것",
        coreFear: "상실과 분리, 갈등",
        description: "수용적이고 안심시켜주는 유형입니다. 쉽게 동의하고, 신뢰하며, 안정적입니다. 조화와 평화를 추구하며 중재자 역할을 합니다.",
        strengths: "수용성, 인내심, 중재 능력, 안정감",
        growth: "자신의 필요와 의견을 표현하고, 편안함을 추구하는 것에서 벗어나세요."
    }
};
