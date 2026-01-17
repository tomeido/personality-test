// ===== Enneagram Instinctual Variants Questions =====
// SP = Self-Preservation (자기보존)
// SO = Social (사회적)  
// SX = Sexual/One-to-One (성적/일대일)

const INSTINCT_QUESTIONS = [
    // SP Questions
    {
        text: "안전하고 안정적인 환경을 만드는 것이 중요하다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 1, SO: 0, SX: 0 }
    },
    {
        text: "건강, 재정, 물질적 안정에 대해 자주 생각한다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 1, SO: 0, SX: 0 }
    },
    {
        text: "편안한 집과 맛있는 음식이 삶의 중요한 요소다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 1, SO: 0, SX: 0 }
    },
    {
        text: "혼자만의 시간과 개인 공간이 꼭 필요하다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 1, SO: 0, SX: 0 }
    },
    {
        text: "미래를 대비해 저축하고 계획을 세우는 편이다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 1, SO: 0, SX: 0 }
    },
    {
        text: "새로운 상황에서 먼저 안전 여부를 확인한다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 1, SO: 0, SX: 0 }
    },

    // SO Questions
    {
        text: "사회적 모임에서 내 위치와 역할이 중요하다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 0, SO: 1, SX: 0 }
    },
    {
        text: "커뮤니티에 기여하고 소속감을 느끼고 싶다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 0, SO: 1, SX: 0 }
    },
    {
        text: "다른 사람들이 나를 어떻게 바라보는지 신경 쓴다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 0, SO: 1, SX: 0 }
    },
    {
        text: "그룹 활동이나 팀 프로젝트에 적극 참여한다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 0, SO: 1, SX: 0 }
    },
    {
        text: "사회적 이슈나 정의에 관심이 많다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 0, SO: 1, SX: 0 }
    },
    {
        text: "네트워킹과 인맥 관리가 중요하다고 생각한다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 0, SO: 1, SX: 0 }
    },

    // SX Questions
    {
        text: "깊고 강렬한 관계를 원한다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 0, SO: 0, SX: 1 }
    },
    {
        text: "열정과 강렬함이 삶의 원동력이다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 0, SO: 0, SX: 1 }
    },
    {
        text: "특별한 한 사람과의 깊은 유대를 중시한다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 0, SO: 0, SX: 1 }
    },
    {
        text: "누군가에게 매력적으로 보이고 싶다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 0, SO: 0, SX: 1 }
    },
    {
        text: "평범한 것보다 특별하고 독특한 것을 선호한다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 0, SO: 0, SX: 1 }
    },
    {
        text: "화학적 끌림이나 강한 연결감을 중요하게 여긴다.",
        weights: [2, 1, 0, -1, -2],
        scores: { SP: 0, SO: 0, SX: 1 }
    }
];

// Instinct Type Information
const INSTINCT_TYPES = {
    SP: {
        name: "자기보존형",
        shortName: "SP",
        emoji: "🏠",
        description: "안전, 건강, 물질적 안정을 추구합니다. 편안한 환경과 자기 관리에 집중하며, 실용적이고 현실적인 접근을 선호합니다.",
        focus: ["건강과 웰빙", "재정적 안정", "편안한 환경", "자기 관리"],
        strengths: "실용적, 자립적, 계획적, 신중함",
        challenges: "지나친 걱정, 고립 경향, 물질주의"
    },
    SO: {
        name: "사회형",
        shortName: "SO",
        emoji: "👥",
        description: "사회적 소속감과 커뮤니티를 중시합니다. 그룹 내 역할, 사회적 위치, 타인과의 관계에 관심을 가집니다.",
        focus: ["커뮤니티 소속", "사회적 역할", "그룹 역학", "사회적 기여"],
        strengths: "협력적, 책임감, 사회의식, 연결 능력",
        challenges: "과도한 비교, 인정 욕구, 집단 압력에 민감"
    },
    SX: {
        name: "일대일형",
        shortName: "SX",
        emoji: "🔥",
        description: "강렬한 일대일 연결과 깊은 유대를 추구합니다. 열정, 매력, 특별한 관계에 집중합니다.",
        focus: ["깊은 연결", "열정과 강렬함", "매력", "특별한 관계"],
        strengths: "열정적, 카리스마, 깊은 유대, 헌신적",
        challenges: "질투, 집착 경향, 관계 의존"
    }
};

// Subtype Descriptions (27 subtypes = 9 types × 3 instincts)
const SUBTYPE_DESCRIPTIONS = {
    // Type 1 Subtypes
    "1SP": { name: "걱정", description: "자신의 불완전함에 대해 걱정하며 스스로를 개선하려 합니다." },
    "1SO": { name: "비적응", description: "사회의 잘못된 점을 바로잡으려 하며 도덕적 기준을 설파합니다." },
    "1SX": { name: "열정", description: "완벽한 파트너를 찾고 관계에서 이상을 추구합니다." },

    // Type 2 Subtypes
    "2SP": { name: "특권의식", description: "자신의 필요를 정당화하며 돌봄받기를 원합니다." },
    "2SO": { name: "야망", description: "영향력 있는 사람들과 연결되어 인정받고 싶어합니다." },
    "2SX": { name: "유혹", description: "매력을 통해 특별한 관계를 만들려 합니다." },

    // Type 3 Subtypes
    "3SP": { name: "안전", description: "효율적이고 생산적으로 물질적 성공을 추구합니다." },
    "3SO": { name: "명성", description: "사회적 인정과 지위를 통해 성공을 증명하려 합니다." },
    "3SX": { name: "매력", description: "이상적인 이미지로 파트너를 끌어당기려 합니다." },

    // Type 4 Subtypes
    "4SP": { name: "불굴/강인함", description: "고통을 내면화하고 인내하며 감정을 억누릅니다." },
    "4SO": { name: "수치심", description: "비교를 통해 자신의 결핍을 느끼며 소속되고 싶어합니다." },
    "4SX": { name: "경쟁", description: "강렬한 감정 표현으로 특별한 연결을 추구합니다." },

    // Type 5 Subtypes
    "5SP": { name: "은둔처", description: "필요를 최소화하고 자급자족하며 경계를 유지합니다." },
    "5SO": { name: "토템", description: "지식을 통해 그룹에서 가치 있는 역할을 찾습니다." },
    "5SX": { name: "신뢰", description: "소수의 선택된 사람과 깊은 연결을 추구합니다." },

    // Type 6 Subtypes
    "6SP": { name: "따뜻함", description: "안전한 관계와 시스템에 의지하며 신뢰를 구축합니다." },
    "6SO": { name: "의무", description: "규칙과 권위를 따르며 그룹의 기대에 부응합니다." },
    "6SX": { name: "강함/아름다움", description: "두려움에 맞서며 강하고 매력적으로 보이려 합니다." },

    // Type 7 Subtypes
    "7SP": { name: "가족", description: "실용적 네트워크를 통해 기회와 자원을 확보합니다." },
    "7SO": { name: "희생", description: "이상주의적으로 더 나은 세상을 위해 기여합니다." },
    "7SX": { name: "매혹", description: "강렬한 경험과 관계의 가능성에 이끌립니다." },

    // Type 8 Subtypes
    "8SP": { name: "생존", description: "자원과 영역을 확보하며 강하게 자신을 보호합니다." },
    "8SO": { name: "사회적 영향", description: "그룹을 보호하고 정의를 위해 권력을 사용합니다." },
    "8SX": { name: "소유욕", description: "강렬한 관계에서 통제하고 보호하려 합니다." },

    // Type 9 Subtypes
    "9SP": { name: "식욕", description: "편안한 루틴과 물질적 위안으로 평화를 찾습니다." },
    "9SO": { name: "참여", description: "그룹에 조화롭게 융화되며 소속감을 느낍니다." },
    "9SX": { name: "융합", description: "파트너와 하나가 되어 자아를 잃기도 합니다." }
};
