// 산역 메뉴 데이터
(function() {
    const menuData = [
        {
            id: 1,
            name: '산역견적',
            price: 100000
        },
        {
            id: 2,
            name: '산역견적2',
            price: 200000
        },
        {
            id: 3,
            name: '산역견적3',
            price: 300000
        }
    ];

    // window 객체에 할당
    window.menuData = menuData;
})();

// 산지 데이터
(function() {
    const mountainData = [
        {
            id: 1000,
            name: '서울특별시',
            gu: [
                {
                    id: 1001,
                    name: '종로구',
                    mountain: [
                        {
                            id: '1001-1',
                            name: '북한산'
                        },
                        {
                            id: '1001-2',
                            name: '인왕산'
                        }
                    ]
                },
                {
                    id: 1002,
                    name: '중구',
                    mountain: [
                        {
                            id: '1002-1',
                            name: '남산'
                        }
                    ]
                },
                {
                    id: 1003,
                    name: '용산구',
                    mountain: [
                        {
                            id: '1003-1',
                            name: '용산공원'
                        }
                    ]
                }
            ]
        }
    ];

    // window 객체에 할당
    window.mountainData = mountainData;
})();