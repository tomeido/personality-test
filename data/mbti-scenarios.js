// MBTI Scenario Questions
// Each question presents a vivid situation with 4 distinct choices.
// Choices directly map to axis scores (no direction flip).
// Score shape: { EI: ±n, SN: ±n, TF: ±n, JP: ±n } — positive = left letter, negative = right.

const MBTI_SCENARIO_QUESTIONS = [
    // E/I scenarios
    {
        id: 1,
        presentation: 'scenario',
        text: "금요일 밤 11시. 친구가 갑자기 '지금 클럽 갈래?' 메시지를 보냈다.",
        choices: [
            { emoji: '🕺', text: '"콜! 옷만 갈아입고 바로 출발"', scores: { EI: 2 } },
            { emoji: '☕', text: '"근처 조용한 펍은 어때?"', scores: { EI: -1, JP: 1 } },
            { emoji: '🎮', text: '"오늘은 집에서 게임하고 싶어"', scores: { EI: -2 } },
            { emoji: '😴', text: '"내일 일찍 일어나야 해, 다음에"', scores: { EI: -1, JP: 2 } }
        ]
    },
    {
        id: 2,
        presentation: 'scenario',
        text: "회사 회식이 끝났다. 동료들이 2차를 가자고 한다.",
        choices: [
            { emoji: '🍻', text: '"좋아요! 어디로 갈까요?"', scores: { EI: 2 } },
            { emoji: '🚇', text: '"마지막 지하철 시간이라 먼저 갈게요"', scores: { EI: -2 } },
            { emoji: '🤝', text: '"30분만 같이 있다가 갈게요"', scores: { EI: 1, TF: 1 } },
            { emoji: '📱', text: '"몰래 빠져나와 집으로"', scores: { EI: -2, TF: -1 } }
        ]
    },
    {
        id: 3,
        presentation: 'scenario',
        text: "꿈의 휴가 패키지가 두 개 도착했다. 어느 쪽?",
        choices: [
            { emoji: '🏝️', text: '20명 일행과 떠나는 단체 크루즈 여행', scores: { EI: 2, JP: 1 } },
            { emoji: '🎒', text: '혼자 떠나는 자유 배낭여행', scores: { EI: -2, JP: -1 } },
            { emoji: '👯', text: '절친 한 명과 떠나는 도시 여행', scores: { EI: -1, TF: 1 } },
            { emoji: '🏕️', text: '낯선 호스텔에서 만난 사람들과 즉흥 여행', scores: { EI: 1, JP: -2 } }
        ]
    },

    // S/N scenarios
    {
        id: 4,
        presentation: 'scenario',
        text: "새로 산 가전제품의 박스를 열었다. 어떻게 시작?",
        choices: [
            { emoji: '📖', text: '매뉴얼을 처음부터 끝까지 정독', scores: { SN: 2, JP: 1 } },
            { emoji: '🔌', text: '일단 코드 꽂고 버튼 눌러본다', scores: { SN: -1, JP: -2 } },
            { emoji: '🎥', text: '유튜브 리뷰 영상부터 검색', scores: { SN: 1, JP: 1 } },
            { emoji: '💭', text: '"이걸로 뭘 만들 수 있을까" 상상부터', scores: { SN: -2 } }
        ]
    },
    {
        id: 5,
        presentation: 'scenario',
        text: "친구가 새 영화를 추천한다. 가장 먼저 묻는 질문은?",
        choices: [
            { emoji: '⭐', text: '"평점 몇 점이야? 러닝타임은?"', scores: { SN: 2 } },
            { emoji: '🎭', text: '"어떤 메시지를 담은 영화야?"', scores: { SN: -2 } },
            { emoji: '🎬', text: '"감독이 누구야? 어떤 스타일?"', scores: { SN: -1, TF: -1 } },
            { emoji: '😂', text: '"재밌어? 한마디로 어때?"', scores: { SN: 1, TF: 1 } }
        ]
    },
    {
        id: 6,
        presentation: 'scenario',
        text: "10년 후 나는?",
        choices: [
            { emoji: '🏠', text: '지금 직장의 안정적 베테랑이 되어 있다', scores: { SN: 2, JP: 1 } },
            { emoji: '🚀', text: '아직 상상하지 못한 일을 하고 있을 것이다', scores: { SN: -2, JP: -1 } },
            { emoji: '📅', text: '구체적 10년 계획표대로 진행 중', scores: { SN: 1, JP: 2 } },
            { emoji: '🌌', text: '여러 분야를 넘나들며 살고 있을 것이다', scores: { SN: -1, JP: -2 } }
        ]
    },

    // T/F scenarios
    {
        id: 7,
        presentation: 'scenario',
        text: "친구가 울면서 '나 회사 그만두고 싶어'라고 한다.",
        choices: [
            { emoji: '🤗', text: '"많이 힘들었구나. 일단 마음부터 추스르자"', scores: { TF: -2 } },
            { emoji: '📊', text: '"이직 시장 상황부터 같이 분석해보자"', scores: { TF: 2 } },
            { emoji: '☕', text: '"커피 사줄게, 천천히 얘기해봐"', scores: { TF: -1, EI: -1 } },
            { emoji: '💡', text: '"퇴사 사유를 정리해보자, 객관적으로"', scores: { TF: 2, JP: 1 } }
        ]
    },
    {
        id: 8,
        presentation: 'scenario',
        text: "팀 회의에서 동료가 명백히 틀린 주장을 하고 있다.",
        choices: [
            { emoji: '🙋', text: '바로 데이터로 반박한다', scores: { TF: 2, EI: 1 } },
            { emoji: '🤐', text: '회의 분위기 봐서 나중에 따로 말한다', scores: { TF: -1, EI: -1 } },
            { emoji: '✍️', text: '회의 후 정리한 자료를 메일로 보낸다', scores: { TF: 1, JP: 2 } },
            { emoji: '😶', text: '그냥 넘어간다. 굳이 부딪힐 필요 없다', scores: { TF: -2 } }
        ]
    },
    {
        id: 9,
        presentation: 'scenario',
        text: "넷플릭스에서 영화를 고를 때 결정 기준은?",
        choices: [
            { emoji: '🍅', text: '로튼토마토 점수와 평론가 리뷰', scores: { TF: 2, SN: -1 } },
            { emoji: '💞', text: '주인공 캐릭터가 매력적인지', scores: { TF: -2 } },
            { emoji: '🎯', text: '내가 원하는 장르에 정확히 들어맞는지', scores: { TF: 1, JP: 2 } },
            { emoji: '🌊', text: '제목과 썸네일 분위기가 끌리는지', scores: { TF: -1, JP: -1 } }
        ]
    },

    // J/P scenarios
    {
        id: 10,
        presentation: 'scenario',
        text: "친구와 일본 여행을 가기로 했다. 출발 한 달 전, 당신은?",
        choices: [
            { emoji: '📋', text: '엑셀로 시간 단위 일정표 작성 완료', scores: { JP: 2, SN: 1 } },
            { emoji: '✈️', text: '비행기와 첫날 숙소만 예약, 나머지는 가서', scores: { JP: -2 } },
            { emoji: '📍', text: '가고 싶은 곳 리스트만 정리해둠', scores: { JP: 1, SN: -1 } },
            { emoji: '🎲', text: '여행 가서 매일 아침 정하기로', scores: { JP: -2, SN: -1 } }
        ]
    },
    {
        id: 11,
        presentation: 'scenario',
        text: "주말 일정이 잡혀 있는데, 친구가 갑자기 다른 제안을 한다.",
        choices: [
            { emoji: '🚫', text: '원래 일정대로 진행. 약속은 약속이다', scores: { JP: 2 } },
            { emoji: '🔄', text: '더 재밌어 보이면 바로 갈아탄다', scores: { JP: -2, EI: 1 } },
            { emoji: '🤔', text: '두 일정 다 가능한지 조합해본다', scores: { JP: -1, SN: -1 } },
            { emoji: '📞', text: '원래 약속한 사람에게 양해를 구해본다', scores: { JP: -1, TF: -1 } }
        ]
    },
    {
        id: 12,
        presentation: 'scenario',
        text: "중요한 발표가 일주일 후로 잡혔다.",
        choices: [
            { emoji: '📑', text: '오늘 당장 슬라이드 초안부터 만든다', scores: { JP: 2, SN: 1 } },
            { emoji: '🎤', text: '발표 전날 밤 몰입해서 한 번에 만든다', scores: { JP: -2 } },
            { emoji: '🧩', text: '큰 그림부터 잡고 며칠에 걸쳐 다듬는다', scores: { JP: 1, SN: -1 } },
            { emoji: '💭', text: '머릿속에서 시뮬레이션부터 시작', scores: { JP: -1, SN: -2 } }
        ]
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MBTI_SCENARIO_QUESTIONS };
}
