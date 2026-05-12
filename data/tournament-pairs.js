// Tournament Pool — 16 contestants for the instinct world cup.
// Each card represents a lifestyle/scene tied to one instinct (SP / SO / SX).
// The bracket pits contestants against each other; the winning instinct
// at the end of the bracket wins. Ties in the final standings break by
// descending total instinct score collected along the way.

const TOURNAMENT_POOL = [
    // SP (자기보존 — comfort, safety, routine)
    { id: 'sp-1',  instinct: 'SP', emoji: '🏠', text: '잘 정돈된 자취방에서 보내는 조용한 주말' },
    { id: 'sp-2',  instinct: 'SP', emoji: '🛁', text: '향초 켜고 따뜻한 목욕, 좋아하는 책 한 권' },
    { id: 'sp-3',  instinct: 'SP', emoji: '🍲', text: '재료 사다가 직접 끓이는 따끈한 한 끼' },
    { id: 'sp-4',  instinct: 'SP', emoji: '💰', text: '가계부 정리하고 비상금 계좌 확인' },
    { id: 'sp-5',  instinct: 'SP', emoji: '🧘', text: '아침 6시 요가, 그 후 정성스런 아침식사' },

    // SO (사회형 — group, status, belonging)
    { id: 'so-1',  instinct: 'SO', emoji: '👥', text: '동아리 친구 10명과 떠나는 MT' },
    { id: 'so-2',  instinct: 'SO', emoji: '🎤', text: '나만의 채널을 키우고 팔로워와 소통' },
    { id: 'so-3',  instinct: 'SO', emoji: '🏛️', text: '내가 속한 모임에서 인정받고 기여하기' },
    { id: 'so-4',  instinct: 'SO', emoji: '🎂', text: '친구 생일파티에 풀세팅 깜짝 이벤트' },
    { id: 'so-5',  instinct: 'SO', emoji: '🤝', text: '업계 네트워킹 행사에서 명함 30장' },

    // SX (일대일 — intensity, fusion, deep one-on-one)
    { id: 'sx-1',  instinct: 'SX', emoji: '🔥', text: '한 사람과 새벽까지 영혼 깊은 대화' },
    { id: 'sx-2',  instinct: 'SX', emoji: '🎸', text: '몰입할 수 있는 격렬한 라이브 공연 한복판' },
    { id: 'sx-3',  instinct: 'SX', emoji: '🌌', text: '운명 같은 사람과의 강렬한 첫 만남' },
    { id: 'sx-4',  instinct: 'SX', emoji: '🏍️', text: '한밤중 둘이서 떠나는 즉흥 라이딩' },
    { id: 'sx-5',  instinct: 'SX', emoji: '💃', text: '눈 마주친 누군가와 끝까지 추는 탱고' },
    { id: 'sx-6',  instinct: 'SX', emoji: '🖼️', text: '오직 한 작품 앞에서 한 시간 머무는 미술관 데이트' }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TOURNAMENT_POOL };
}
