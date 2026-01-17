// ===== Personality Database (PDB) Data =====
// Famous people and characters for each MBTI and Enneagram type

const PDB_DATA = {
    // MBTI Type Data
    mbti: {
        INTJ: {
            celebrities: [
                { name: "일론 머스크", category: "기업인", image: "🚀" },
                { name: "크리스토퍼 놀란", category: "감독", image: "🎬" },
                { name: "아이작 뉴턴", category: "과학자", image: "🔭" }
            ],
            characters: [
                { name: "간달프", work: "반지의 제왕", image: "🧙" },
                { name: "월터 화이트", work: "브레이킹 배드", image: "🧪" },
                { name: "Dr. 스트레인지", work: "마블", image: "✨" }
            ]
        },
        INTP: {
            celebrities: [
                { name: "알베르트 아인슈타인", category: "과학자", image: "⚛️" },
                { name: "빌 게이츠", category: "기업인", image: "💻" },
                { name: "래리 페이지", category: "기업인", image: "🔍" }
            ],
            characters: [
                { name: "셜록 홈즈", work: "셜록", image: "🔎" },
                { name: "네오", work: "매트릭스", image: "👤" },
                { name: "엘", work: "데스노트", image: "🍰" }
            ]
        },
        ENTJ: {
            celebrities: [
                { name: "스티브 잡스", category: "기업인", image: "🍎" },
                { name: "마거릿 대처", category: "정치인", image: "🇬🇧" },
                { name: "나폴레옹", category: "역사인물", image: "⚔️" }
            ],
            characters: [
                { name: "세르세이", work: "왕좌의 게임", image: "👑" },
                { name: "마일즈 대령", work: "아바타", image: "🌿" },
                { name: "코듀로이", work: "크루엘라", image: "🐾" }
            ]
        },
        ENTP: {
            celebrities: [
                { name: "마크 트웨인", category: "작가", image: "✍️" },
                { name: "토마스 에디슨", category: "발명가", image: "💡" },
                { name: "레오나르도 다 빈치", category: "예술가", image: "🎨" }
            ],
            characters: [
                { name: "조커", work: "다크 나이트", image: "🃏" },
                { name: "토니 스타크", work: "마블", image: "🦾" },
                { name: "잭 스패로우", work: "캐리비안의 해적", image: "🏴‍☠️" }
            ]
        },
        INFJ: {
            celebrities: [
                { name: "마틴 루터 킹", category: "활동가", image: "✊" },
                { name: "넬슨 만델라", category: "정치인", image: "🇿🇦" },
                { name: "칼 융", category: "심리학자", image: "🧠" }
            ],
            characters: [
                { name: "간달프", work: "반지의 제왕", image: "🧙" },
                { name: "아라곤", work: "반지의 제왕", image: "⚔️" },
                { name: "데이너리스", work: "왕좌의 게임", image: "🐉" }
            ]
        },
        INFP: {
            celebrities: [
                { name: "윌리엄 셰익스피어", category: "작가", image: "🎭" },
                { name: "오드리 햅번", category: "배우", image: "👗" },
                { name: "존 레논", category: "음악가", image: "🎸" }
            ],
            characters: [
                { name: "프로도", work: "반지의 제왕", image: "💍" },
                { name: "루나 러브굿", work: "해리포터", image: "🌙" },
                { name: "아멜리", work: "아멜리", image: "🍀" }
            ]
        },
        ENFJ: {
            celebrities: [
                { name: "오프라 윈프리", category: "방송인", image: "📺" },
                { name: "버락 오바마", category: "정치인", image: "🇺🇸" },
                { name: "마야 안젤루", category: "작가", image: "📝" }
            ],
            characters: [
                { name: "모르페우스", work: "매트릭스", image: "🔴" },
                { name: "마고 롭슨", work: "바비", image: "🎀" },
                { name: "엘리자베스 베넷", work: "오만과 편견", image: "📚" }
            ]
        },
        ENFP: {
            celebrities: [
                { name: "로빈 윌리엄스", category: "배우", image: "😄" },
                { name: "월트 디즈니", category: "기업인", image: "🏰" },
                { name: "오스카 와일드", category: "작가", image: "🌹" }
            ],
            characters: [
                { name: "안나", work: "겨울왕국", image: "❄️" },
                { name: "피터팬", work: "피터팬", image: "🧚" },
                { name: "래푼젤", work: "라푼젤", image: "👸" }
            ]
        },
        ISTJ: {
            celebrities: [
                { name: "조지 워싱턴", category: "정치인", image: "🏛️" },
                { name: "앙겔라 메르켈", category: "정치인", image: "🇩🇪" },
                { name: "워렌 버핏", category: "투자자", image: "📈" }
            ],
            characters: [
                { name: "에딘 스타크", work: "왕좌의 게임", image: "🐺" },
                { name: "허마이오니", work: "해리포터", image: "📖" },
                { name: "캡틴 아메리카", work: "마블", image: "🛡️" }
            ]
        },
        ISFJ: {
            celebrities: [
                { name: "마더 테레사", category: "활동가", image: "🙏" },
                { name: "케이트 미들턴", category: "왕족", image: "👑" },
                { name: "로사 파크스", category: "활동가", image: "🚌" }
            ],
            characters: [
                { name: "샘와이즈", work: "반지의 제왕", image: "🌿" },
                { name: "니빌 롱바텀", work: "해리포터", image: "🪴" },
                { name: "스티브 로저스", work: "마블", image: "🛡️" }
            ]
        },
        ESTJ: {
            celebrities: [
                { name: "헨리 포드", category: "기업인", image: "🚗" },
                { name: "힐러리 클린턴", category: "정치인", image: "🗳️" },
                { name: "재판관 주디", category: "방송인", image: "⚖️" }
            ],
            characters: [
                { name: "드와이트 슈루트", work: "오피스", image: "📋" },
                { name: "파리스 겔러", work: "길모어 걸스", image: "📚" },
                { name: "레귤러스 블랙", work: "해리포터", image: "🐍" }
            ]
        },
        ESFJ: {
            celebrities: [
                { name: "테일러 스위프트", category: "음악가", image: "🎤" },
                { name: "제니퍼 가너", category: "배우", image: "🎬" },
                { name: "휴 잭맨", category: "배우", image: "🎭" }
            ],
            characters: [
                { name: "모니카 겔러", work: "프렌즈", image: "🍳" },
                { name: "몰리 위즐리", work: "해리포터", image: "🧶" },
                { name: "우디", work: "토이스토리", image: "🤠" }
            ]
        },
        ISTP: {
            celebrities: [
                { name: "마이클 조던", category: "운동선수", image: "🏀" },
                { name: "클린트 이스트우드", category: "배우", image: "🤠" },
                { name: "톰 크루즈", category: "배우", image: "✈️" }
            ],
            characters: [
                { name: "존 윅", work: "존 윅", image: "🔫" },
                { name: "제임스 본드", work: "007", image: "🍸" },
                { name: "해리슨 포드", work: "인디아나 존스", image: "🎩" }
            ]
        },
        ISFP: {
            celebrities: [
                { name: "마이클 잭슨", category: "음악가", image: "👐" },
                { name: "밥 딜런", category: "음악가", image: "🎵" },
                { name: "프리다 칼로", category: "예술가", image: "🌺" }
            ],
            characters: [
                { name: "해리 포터", work: "해리포터", image: "⚡" },
                { name: "아리엘", work: "인어공주", image: "🧜‍♀️" },
                { name: "오로라", work: "잠자는 숲속의 공주", image: "👸" }
            ]
        },
        ESTP: {
            celebrities: [
                { name: "어니스트 헤밍웨이", category: "작가", image: "✒️" },
                { name: "마돈나", category: "음악가", image: "💃" },
                { name: "에디 머피", category: "배우", image: "😂" }
            ],
            characters: [
                { name: "한 솔로", work: "스타워즈", image: "🚀" },
                { name: "제임스 본드", work: "007", image: "🍸" },
                { name: "바트 심슨", work: "심슨 가족", image: "🛹" }
            ]
        },
        ESFP: {
            celebrities: [
                { name: "마릴린 먼로", category: "배우", image: "💄" },
                { name: "엘튼 존", category: "음악가", image: "🎹" },
                { name: "제이미 폭스", category: "배우", image: "🎤" }
            ],
            characters: [
                { name: "도니", work: "왕좌의 게임", image: "⚔️" },
                { name: "티몬", work: "라이온 킹", image: "🐗" },
                { name: "케이티 페리", work: "본인", image: "🎤" }
            ]
        }
    },

    // Enneagram Type Data
    enneagram: {
        1: {
            celebrities: [
                { name: "간디", category: "활동가", image: "🕊️" },
                { name: "미셸 오바마", category: "활동가", image: "📚" },
                { name: "마거릿 대처", category: "정치인", image: "🇬🇧" }
            ],
            characters: [
                { name: "허마이오니", work: "해리포터", image: "📖" },
                { name: "메리 포핀스", work: "메리 포핀스", image: "☂️" },
                { name: "스팍", work: "스타트렉", image: "🖖" }
            ]
        },
        2: {
            celebrities: [
                { name: "마더 테레사", category: "활동가", image: "🙏" },
                { name: "돌리 파튼", category: "음악가", image: "🎤" },
                { name: "데스몬드 투투", category: "성직자", image: "✝️" }
            ],
            characters: [
                { name: "샘와이즈", work: "반지의 제왕", image: "🌿" },
                { name: "몰리 위즐리", work: "해리포터", image: "🧶" },
                { name: "페파 피그", work: "페파 피그", image: "🐷" }
            ]
        },
        3: {
            celebrities: [
                { name: "오프라 윈프리", category: "방송인", image: "📺" },
                { name: "톰 크루즈", category: "배우", image: "🎬" },
                { name: "테일러 스위프트", category: "음악가", image: "🎤" }
            ],
            characters: [
                { name: "드라코 말포이", work: "해리포터", image: "🐍" },
                { name: "레이첼 그린", work: "프렌즈", image: "👗" },
                { name: "가스톤", work: "미녀와 야수", image: "💪" }
            ]
        },
        4: {
            celebrities: [
                { name: "에드거 앨런 포", category: "작가", image: "🪶" },
                { name: "프리다 칼로", category: "예술가", image: "🌺" },
                { name: "버지니아 울프", category: "작가", image: "📝" }
            ],
            characters: [
                { name: "로키", work: "마블", image: "🦹" },
                { name: "벨", work: "미녀와 야수", image: "📚" },
                { name: "엘사", work: "겨울왕국", image: "❄️" }
            ]
        },
        5: {
            celebrities: [
                { name: "알베르트 아인슈타인", category: "과학자", image: "⚛️" },
                { name: "스티븐 호킹", category: "과학자", image: "🌌" },
                { name: "빌 게이츠", category: "기업인", image: "💻" }
            ],
            characters: [
                { name: "셜록 홈즈", work: "셜록", image: "🔎" },
                { name: "스크루지", work: "크리스마스 캐롤", image: "💰" },
                { name: "5", work: "엄브렐라 아카데미", image: "☂️" }
            ]
        },
        6: {
            celebrities: [
                { name: "엘리너 루스벨트", category: "정치인", image: "🏛️" },
                { name: "톰 행크스", category: "배우", image: "🎬" },
                { name: "조지 H.W. 부시", category: "정치인", image: "🇺🇸" }
            ],
            characters: [
                { name: "해리 포터", work: "해리포터", image: "⚡" },
                { name: "마린", work: "보스 베이비", image: "👶" },
                { name: "우디", work: "토이스토리", image: "🤠" }
            ]
        },
        7: {
            celebrities: [
                { name: "로빈 윌리엄스", category: "배우", image: "😄" },
                { name: "짐 캐리", category: "배우", image: "🎭" },
                { name: "리차드 브랜슨", category: "기업인", image: "🎈" }
            ],
            characters: [
                { name: "피터팬", work: "피터팬", image: "🧚" },
                { name: "티몬", work: "라이온 킹", image: "🐗" },
                { name: "바트 심슨", work: "심슨 가족", image: "🛹" }
            ]
        },
        8: {
            celebrities: [
                { name: "윈스턴 처칠", category: "정치인", image: "🇬🇧" },
                { name: "마틴 루터 킹", category: "활동가", image: "✊" },
                { name: "카멀라 해리스", category: "정치인", image: "🇺🇸" }
            ],
            characters: [
                { name: "다스 베이더", work: "스타워즈", image: "🔴" },
                { name: "세르세이", work: "왕좌의 게임", image: "👑" },
                { name: "미란다 프리슬리", work: "악마는 프라다를 입는다", image: "👠" }
            ]
        },
        9: {
            celebrities: [
                { name: "달라이 라마", category: "종교지도자", image: "🧘" },
                { name: "에이브러햄 링컨", category: "정치인", image: "🎩" },
                { name: "키아누 리브스", category: "배우", image: "🎬" }
            ],
            characters: [
                { name: "프로도", work: "반지의 제왕", image: "💍" },
                { name: "마지 심슨", work: "심슨 가족", image: "💙" },
                { name: "빅 레보스키", work: "빅 레보스키", image: "🎳" }
            ]
        }
    },

    // Combined MBTI + Enneagram celebrities (less common, showing notable combinations)
    combined: {
        "INTJ-1": ["히틀러보다 엄격한 교수", "완벽주의 전략가"],
        "INTJ-5": ["니콜라 테슬라", "스티븐 호킹"],
        "INFJ-4": ["F. 스콧 피츠제럴드", "니코 로빈(원피스)"],
        "INFP-4": ["에드거 앨런 포", "버지니아 울프"],
        "ENFP-7": ["로빈 윌리엄스", "짐 캐리"],
        "ENTP-7": ["잭 스패로우", "토니 스타크"],
        "ENTJ-8": ["스티브 잡스", "마거릿 대처"],
        "ISFJ-2": ["마더 테레사", "샘와이즈 갬지"],
        "ESFJ-2": ["테일러 스위프트", "모니카 겔러"],
        "ISTP-5": ["셜록 홈즈", "제임스 본드"],
        "ESTP-8": ["어니스트 헤밍웨이", "프랭크 시내트라"]
    }
};

// Function to get matching celebrities for a type combination
function getMatchingPersonalities(mbtiType, enneagramType, instinct) {
    const results = {
        mbtiMatches: [],
        enneagramMatches: [],
        combinedMatches: []
    };

    // Get MBTI matches
    if (PDB_DATA.mbti[mbtiType]) {
        results.mbtiMatches = [
            ...PDB_DATA.mbti[mbtiType].celebrities,
            ...PDB_DATA.mbti[mbtiType].characters
        ];
    }

    // Get Enneagram matches
    if (PDB_DATA.enneagram[enneagramType]) {
        results.enneagramMatches = [
            ...PDB_DATA.enneagram[enneagramType].celebrities,
            ...PDB_DATA.enneagram[enneagramType].characters
        ];
    }

    // Get combined matches
    const combinedKey = `${mbtiType}-${enneagramType}`;
    if (PDB_DATA.combined[combinedKey]) {
        results.combinedMatches = PDB_DATA.combined[combinedKey];
    }

    return results;
}
