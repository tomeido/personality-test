// MBTI Questions Data
// Each question affects one of the four axes: E-I, S-N, T-F, J-P
// Scoring: answers give points to the left (E,S,T,J) or right (I,N,F,P) side

const MBTI_QUESTIONS = [
    // E-I Questions (Extraversion vs Introversion)
    {
        id: 1,
        text: "새로운 사람들과 만나는 것이 즐겁고 에너지를 얻는다.",
        axis: "EI",
        direction: "E", // E means positive answers favor E
        weights: [2, 1, 0, -1, -2] // 매우 그렇다 → 매우 아니다
    },
    {
        id: 2,
        text: "혼자만의 시간이 많이 필요하고, 그런 시간이 나를 재충전시킨다.",
        axis: "EI",
        direction: "I",
        weights: [2, 1, 0, -1, -2]
    },
    {
        id: 3,
        text: "파티나 모임에서 다양한 사람들과 대화하는 것을 좋아한다.",
        axis: "EI",
        direction: "E",
        weights: [2, 1, 0, -1, -2]
    },
    {
        id: 4,
        text: "깊은 대화를 나눌 수 있는 소수의 친밀한 관계를 선호한다.",
        axis: "EI",
        direction: "I",
        weights: [2, 1, 0, -1, -2]
    },
    {
        id: 5,
        text: "말하면서 생각을 정리하는 편이다.",
        axis: "EI",
        direction: "E",
        weights: [2, 1, 0, -1, -2]
    },
    
    // S-N Questions (Sensing vs Intuition)
    {
        id: 6,
        text: "구체적인 사실과 세부사항에 주의를 기울인다.",
        axis: "SN",
        direction: "S",
        weights: [2, 1, 0, -1, -2]
    },
    {
        id: 7,
        text: "미래의 가능성과 아이디어에 대해 생각하는 것을 좋아한다.",
        axis: "SN",
        direction: "N",
        weights: [2, 1, 0, -1, -2]
    },
    {
        id: 8,
        text: "검증된 방법과 실용적인 접근 방식을 선호한다.",
        axis: "SN",
        direction: "S",
        weights: [2, 1, 0, -1, -2]
    },
    {
        id: 9,
        text: "패턴과 연결고리를 찾고 상징적인 의미를 탐구하는 것을 즐긴다.",
        axis: "SN",
        direction: "N",
        weights: [2, 1, 0, -1, -2]
    },
    {
        id: 10,
        text: "지금 현재에 집중하는 것이 자연스럽다.",
        axis: "SN",
        direction: "S",
        weights: [2, 1, 0, -1, -2]
    },
    
    // T-F Questions (Thinking vs Feeling)
    {
        id: 11,
        text: "결정을 내릴 때 논리와 객관적 분석을 중시한다.",
        axis: "TF",
        direction: "T",
        weights: [2, 1, 0, -1, -2]
    },
    {
        id: 12,
        text: "다른 사람의 감정과 가치를 고려해서 결정을 내린다.",
        axis: "TF",
        direction: "F",
        weights: [2, 1, 0, -1, -2]
    },
    {
        id: 13,
        text: "진실을 말하는 것이 상대방의 기분을 맞추는 것보다 중요하다.",
        axis: "TF",
        direction: "T",
        weights: [2, 1, 0, -1, -2]
    },
    {
        id: 14,
        text: "조화와 협력을 유지하는 것이 중요하다.",
        axis: "TF",
        direction: "F",
        weights: [2, 1, 0, -1, -2]
    },
    {
        id: 15,
        text: "비판을 받으면 개선의 기회로 받아들인다.",
        axis: "TF",
        direction: "T",
        weights: [2, 1, 0, -1, -2]
    },
    
    // J-P Questions (Judging vs Perceiving)
    {
        id: 16,
        text: "계획을 세우고 그 계획대로 실행하는 것을 좋아한다.",
        axis: "JP",
        direction: "J",
        weights: [2, 1, 0, -1, -2]
    },
    {
        id: 17,
        text: "상황에 따라 유연하게 대처하고 즉흥적인 것을 즐긴다.",
        axis: "JP",
        direction: "P",
        weights: [2, 1, 0, -1, -2]
    },
    {
        id: 18,
        text: "할 일 목록을 만들고 완료하는 것에서 만족감을 느낀다.",
        axis: "JP",
        direction: "J",
        weights: [2, 1, 0, -1, -2]
    },
    {
        id: 19,
        text: "마감 직전에 가장 효율적으로 일하는 편이다.",
        axis: "JP",
        direction: "P",
        weights: [2, 1, 0, -1, -2]
    },
    {
        id: 20,
        text: "결정을 빨리 내리고 마무리 짓는 것을 선호한다.",
        axis: "JP",
        direction: "J",
        weights: [2, 1, 0, -1, -2]
    }
];

// MBTI Type Descriptions
const MBTI_TYPES = {
    "INTJ": {
        name: "전략가",
        description: "독립적이고 분석적인 전략가입니다. 복잡한 문제를 해결하는 것을 즐기며, 장기적인 비전을 가지고 목표를 향해 체계적으로 나아갑니다.",
        strengths: "전략적 사고, 독립성, 결단력, 높은 기준",
        challenges: "완벽주의, 감정 표현의 어려움, 과도한 비판적 태도"
    },
    "INTP": {
        name: "논리술사",
        description: "논리적이고 창의적인 사상가입니다. 이론과 아이디어를 탐구하는 것을 즐기며, 복잡한 개념을 이해하고 분석하는 데 뛰어납니다.",
        strengths: "분석적 사고, 창의력, 객관성, 적응력",
        challenges: "우유부단함, 현실적인 세부사항에 대한 무관심"
    },
    "ENTJ": {
        name: "통솔자",
        description: "카리스마 있는 리더입니다. 효율적으로 목표를 달성하는 것을 좋아하며, 사람들을 이끌고 비전을 실현하는 데 뛰어납니다.",
        strengths: "리더십, 자신감, 전략적 사고, 효율성",
        challenges: "인내심 부족, 지배적인 태도, 감정적 둔감함"
    },
    "ENTP": {
        name: "변론가",
        description: "영리하고 호기심 많은 사상가입니다. 새로운 아이디어를 탐구하고 토론하는 것을 즐기며, 문제를 창의적으로 해결합니다.",
        strengths: "창의력, 빠른 사고, 카리스마, 적응력",
        challenges: "지속성 부족, 논쟁적인 성향, 규칙에 대한 반항"
    },
    "INFJ": {
        name: "옹호자",
        description: "통찰력 있고 이상주의적인 사람입니다. 깊은 공감 능력을 가지고 있으며, 다른 사람들을 도우려는 강한 열망이 있습니다.",
        strengths: "통찰력, 공감 능력, 헌신, 창의력",
        challenges: "완벽주의, 과도한 민감성, 번아웃 경향"
    },
    "INFP": {
        name: "중재자",
        description: "이상주의적이고 예술적인 영혼입니다. 깊은 가치관을 가지고 있으며, 진정성과 의미를 추구합니다.",
        strengths: "공감 능력, 창의력, 열정, 유연성",
        challenges: "비현실적인 기대, 과도한 감정, 결정의 어려움"
    },
    "ENFJ": {
        name: "선도자",
        description: "카리스마 있고 영감을 주는 리더입니다. 사람들에게 동기를 부여하고 성장을 돕는 것을 즐깁니다.",
        strengths: "리더십, 공감 능력, 소통 능력, 신뢰성",
        challenges: "과도한 이상주의, 자기희생, 비판에 대한 민감함"
    },
    "ENFP": {
        name: "활동가",
        description: "열정적이고 창의적인 영혼입니다. 새로운 가능성을 탐구하고 사람들과 깊은 연결을 맺는 것을 즐깁니다.",
        strengths: "열정, 창의력, 사교성, 적응력",
        challenges: "집중력 부족, 과도한 감정, 비현실적인 기대"
    },
    "ISTJ": {
        name: "현실주의자",
        description: "책임감 있고 신뢰할 수 있는 사람입니다. 체계적이고 꼼꼼하며, 맡은 일을 끝까지 완수합니다.",
        strengths: "신뢰성, 책임감, 조직력, 인내심",
        challenges: "융통성 부족, 변화에 대한 저항, 감정 표현의 어려움"
    },
    "ISFJ": {
        name: "수호자",
        description: "따뜻하고 헌신적인 보호자입니다. 다른 사람들을 돌보는 것을 중요하게 생각하며, 조용히 지원하는 역할을 합니다.",
        strengths: "헌신, 신뢰성, 인내심, 관찰력",
        challenges: "자기 희생, 변화에 대한 저항, 과도한 겸손"
    },
    "ESTJ": {
        name: "경영자",
        description: "체계적이고 효율적인 관리자입니다. 질서와 규칙을 중시하며, 목표 달성을 위해 사람들을 조직합니다.",
        strengths: "조직력, 리더십, 신뢰성, 결단력",
        challenges: "융통성 부족, 지배적인 태도, 감정에 대한 둔감함"
    },
    "ESFJ": {
        name: "집정관",
        description: "사교적이고 배려심 깊은 사람입니다. 조화로운 환경을 만들고 다른 사람들의 안녕을 챙기는 것을 중요하게 생각합니다.",
        strengths: "사교성, 책임감, 협동심, 배려심",
        challenges: "비판에 대한 민감함, 승인 욕구, 변화에 대한 저항"
    },
    "ISTP": {
        name: "장인",
        description: "논리적이고 실용적인 문제 해결사입니다. 손으로 직접 만들고 수리하는 것을 즐기며, 위기 상황에서 침착합니다.",
        strengths: "적응력, 문제 해결 능력, 실용성, 침착함",
        challenges: "감정 표현의 어려움, 장기 계획의 어려움, 둔감함"
    },
    "ISFP": {
        name: "모험가",
        description: "예술적이고 감각적인 탐험가입니다. 현재 순간을 즐기고 아름다움을 추구하며, 자유롭게 자신을 표현합니다.",
        strengths: "창의력, 적응력, 감수성, 매력",
        challenges: "장기 계획의 어려움, 비판에 대한 민감함, 과도한 겸손"
    },
    "ESTP": {
        name: "사업가",
        description: "에너지 넘치고 용감한 행동파입니다. 즉흥적이고 현실적이며, 스릴과 모험을 즐깁니다.",
        strengths: "대담함, 현실성, 사교성, 문제 해결 능력",
        challenges: "인내심 부족, 위험 감수, 감정적 둔감함"
    },
    "ESFP": {
        name: "연예인",
        description: "활기차고 즉흥적인 엔터테이너입니다. 주변 사람들에게 기쁨을 주는 것을 좋아하고, 현재 순간을 즐깁니다.",
        strengths: "사교성, 긍정성, 실용성, 유연성",
        challenges: "장기 계획의 어려움, 집중력 부족, 비판에 대한 민감함"
    }
};
