const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000; // 포트 번호가 일치하는지 확인

// CORS 설정 - pro01 도메인 허용
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], // pro01이 실행되는 주소
    methods: ['GET', 'POST'],
    credentials: true
})); 

app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
}); 