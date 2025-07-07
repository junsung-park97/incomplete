// 비석 메뉴 데이터
(function() {
    const tombstoneData = {
        categories: [
            {
                id: 1,
                name: '기본 비석',
                items: [
                    {
                        id: 101,
                        name: '기본 비석 A',
                        sizes: [
                            {
                                id: 1001,
                                size: '소형',
                                defaultPrice: 1000000
                            },
                            {
                                id: 1002,
                                size: '중형',
                                defaultPrice: 2000000
                            },
                            {
                                id: 1003,
                                size: '대형',
                                defaultPrice: 3000000
                            }
                        ]
                    },
                    {
                        id: 102,
                        name: '기본 비석 B',
                        sizes: [
                            {
                                id: 2001,
                                size: '소형',
                                defaultPrice: 1500000
                            },
                            {
                                id: 2002,
                                size: '중형',
                                defaultPrice: 2500000
                            },
                            {
                                id: 2003,
                                size: '대형',
                                defaultPrice: 3500000
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                name: '고급 비석',
                items: [
                    {
                        id: 201,
                        name: '고급 비석 A',
                        sizes: [
                            {
                                id: 3001,
                                size: '소형',
                                defaultPrice: 2000000
                            },
                            {
                                id: 3002,
                                size: '중형',
                                defaultPrice: 3000000
                            },
                            {
                                id: 3003,
                                size: '대형',
                                defaultPrice: 4000000
                            }
                        ]
                    }
                ]
            }
        ]
    };

    // window 객체에 할당
    window.tombstoneData = tombstoneData;
})();