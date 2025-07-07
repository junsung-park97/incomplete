const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// CORS 설정
app.use(cors());

// JSON 파싱 미들웨어
app.use(express.json());

// 테스트 API 엔드포인트
app.get('/api/test', (req, res) => {
    res.json({ message: '서버가 정상적으로 실행 중입니다.' });
});

// 예약 데이터 저장 API
app.post('/api/reservation', (req, res) => {
    const reservationData = req.body;
    console.log('받은 예약 데이터:', reservationData);
    
    // 여기에 데이터베이스 저장 로직 추가 가능
    
    // 회사 웹사이트 URL
    const companyWebsiteUrl = 'http://localhost:3000/if/client/index.html';
    
    res.json({ 
        success: true, 
        message: '예약 데이터가 성공적으로 저장되었습니다.',
        data: reservationData,
        redirectUrl: companyWebsiteUrl
    });
});

// 예약 데이터 조회 API
app.get('/api/reservation', (req, res) => {
    // 여기에 데이터베이스 조회 로직 추가 가능
    
    // 임시 데이터 반환
    res.json({
        success: true,
        message: '예약 데이터 조회 성공',
        data: {
            customer: {
                name: '홍길동',
                phone: '010-1234-5678'
            },
            meeting: {
                name: '김만나',
                phone: '010-8765-4321'
            },
            funeral: {
                area: '서울',
                locality: '강남구',
                funeral: '강남장례식장'
            }
        }
    });
});

// 회사 웹사이트로 리다이렉트 API
app.get('/redirect-to-company', (req, res) => {
    // 회사 웹사이트 URL
    const companyWebsiteUrl = 'http://localhost:3000/if/client/index.html';
    
    // 쿼리 파라미터로 예약 ID를 전달 (실제 구현 시 필요)
    const reservationId = req.query.id || 'test-id';
    
    // 회사 웹사이트로 리다이렉트
    res.redirect(`${companyWebsiteUrl}?id=${reservationId}`);
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
}); 