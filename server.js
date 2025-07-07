const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 데이터베이스 연결 설정
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'funeral_db'
};

// 데이터베이스 연결 풀 생성
const pool = mysql.createPool(dbConfig);

// 데이터베이스 연결 테스트
async function testDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('데이터베이스 연결 성공');
    connection.release();
    return true;
  } catch (error) {
    console.error('데이터베이스 연결 오류:', error);
    return false;
  }
}

// 서버 시작 시 데이터베이스 연결 테스트
testDatabaseConnection();

// API 라우트 설정
// 지역 데이터 조회 API
app.get('/api/areas', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM area ORDER BY name');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('지역 데이터 조회 오류:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// 구 데이터 조회 API
app.get('/api/districts/:areaId', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const areaId = req.params.areaId;
    
    const [rows] = await connection.query(`
      SELECT d.* FROM district d
      JOIN area_district ad ON d.id = ad.district_id
      WHERE ad.area_id = ?
      ORDER BY d.name
    `, [areaId]);
    
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('구 데이터 조회 오류:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// 동 데이터 조회 API
app.get('/api/neighborhoods/:districtId', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const districtId = req.params.districtId;
    
    const [rows] = await connection.query(`
      SELECT * FROM neighborhood
      WHERE district_id = ?
      ORDER BY name
    `, [districtId]);
    
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('동 데이터 조회 오류:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// 정적 파일 서빙 설정 (API 라우트 이후에 설정)
app.use(express.static('../'));

// 산역 메뉴 데이터 조회 API
app.get('/api/mountain-menu', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM mountain_menu');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('산역 메뉴 데이터 조회 오류:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// 산지 데이터 조회 API
app.get('/api/mountain', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    // 지역 데이터 조회
    const [areas] = await connection.query('SELECT * FROM area');
    
    // 각 지역별 구 데이터 조회
    const result = await Promise.all(areas.map(async (area) => {
      // 지역에 속한 구 조회
      const [districts] = await connection.query(`
        SELECT d.* FROM district d
        JOIN area_district ad ON d.id = ad.district_id
        WHERE ad.area_id = ?
      `, [area.id]);
      
      // 각 구별 산지 데이터 조회
      const districtsWithMountains = await Promise.all(districts.map(async (district) => {
        const [mountains] = await connection.query(
          'SELECT * FROM mountain WHERE district_id = ?',
          [district.id]
        );
        
        return {
          ...district,
          mountain: mountains
        };
      }));
      
      return {
        ...area,
        gu: districtsWithMountains
      };
    }));
    
    connection.release();
    res.json(result);
  } catch (error) {
    console.error('산지 데이터 조회 오류:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// 비석 카테고리 및 아이템 조회 API
app.get('/api/tombstone', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [categories] = await connection.query('SELECT * FROM tombstone_category');
    
    const result = await Promise.all(categories.map(async (category) => {
      const [items] = await connection.query(
        'SELECT * FROM tombstone_item WHERE category_id = ?',
        [category.id]
      );
      
      const itemsWithSizes = await Promise.all(items.map(async (item) => {
        const [sizes] = await connection.query(
          'SELECT * FROM tombstone_size WHERE item_id = ?',
          [item.id]
        );
        
        return {
          ...item,
          sizes
        };
      }));
      
      return {
        ...category,
        items: itemsWithSizes
      };
    }));
    
    connection.release();
    res.json({ categories: result });
  } catch (error) {
    console.error('비석 데이터 조회 오류:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// 장례식장 데이터 조회 API
app.get('/api/funeral', async (req, res) => {
  let connection;
  try {
    console.log('장례식장 데이터 조회 시작');
    connection = await pool.getConnection();
    console.log('데이터베이스 연결 성공');
    
    // 지역 데이터 조회
    console.log('지역 데이터 조회 시작');
    const [areas] = await connection.query('SELECT * FROM area');
    console.log('지역 데이터 조회 완료:', areas.length, '개 지역');
    
    // 각 지역별 구 데이터 조회
    const result = await Promise.all(areas.map(async (area) => {
      // 지역에 속한 구 조회
      const [districts] = await connection.query(`
        SELECT d.* FROM district d
        JOIN area_district ad ON d.id = ad.district_id
        WHERE ad.area_id = ?
      `, [area.id]);
      
      // 각 구별 장례식장 데이터 조회
      const districtsWithFunerals = await Promise.all(districts.map(async (district) => {
        const [funerals] = await connection.query(
          'SELECT * FROM funeral WHERE district_id = ?',
          [district.id]
        );
        
        return {
          ...district,
          funeral: funerals
        };
      }));
      
      return {
        ...area,
        gu: districtsWithFunerals
      };
    }));
    
    console.log('장례식장 데이터 조회 완료');
    connection.release();
    res.json(result);
  } catch (error) {
    console.error('장례식장 데이터 조회 오류:', error);
    if (connection) connection.release();
    res.status(500).json({ error: '서버 오류가 발생했습니다.', details: error.message });
  }
});

// 구별 장례식장 데이터 조회 API (구 선택 시 장례식장 데이터를 가져오는 API)
app.get('/api/funerals/:districtId', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const districtId = req.params.districtId;
    
    // 구에 속한 장례식장 조회
    const [funerals] = await connection.query(`
      SELECT * FROM funeral
      WHERE district_id = ?
      ORDER BY name
    `, [districtId]);
    
    connection.release();
    res.json(funerals);
  } catch (error) {
    console.error('장례식장 데이터 조회 오류:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
}); 