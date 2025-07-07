// 연결 테스트용 엔드포인트
router.get('/test', (req, res) => {
    res.json({ status: 'ok', message: '서버가 정상적으로 실행 중입니다.' });
}); 