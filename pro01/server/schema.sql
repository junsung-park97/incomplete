-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS funeral_db;
USE funeral_db;

-- 산역 메뉴 테이블
CREATE TABLE IF NOT EXISTS mountain_menu (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price INT NOT NULL
);

-- 지역 테이블
CREATE TABLE IF NOT EXISTS area (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

-- 구 테이블
CREATE TABLE IF NOT EXISTS district (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

-- 지역-구 관계 테이블 (지역과 구의 다대다 관계를 관리)
CREATE TABLE IF NOT EXISTS area_district (
  id INT PRIMARY KEY AUTO_INCREMENT,
  area_id INT NOT NULL,
  district_id INT NOT NULL,
  FOREIGN KEY (area_id) REFERENCES area(id),
  FOREIGN KEY (district_id) REFERENCES district(id),
  UNIQUE KEY unique_area_district (area_id, district_id)
);

-- 산지 테이블
CREATE TABLE IF NOT EXISTS mountain (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  district_id INT NOT NULL,
  FOREIGN KEY (district_id) REFERENCES district(id)
);

-- 비석 카테고리 테이블
CREATE TABLE IF NOT EXISTS tombstone_category (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

-- 비석 아이템 테이블
CREATE TABLE IF NOT EXISTS tombstone_item (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES tombstone_category(id)
);

-- 비석 사이즈 테이블
CREATE TABLE IF NOT EXISTS tombstone_size (
  id INT PRIMARY KEY AUTO_INCREMENT,
  size VARCHAR(50) NOT NULL,
  default_price INT NOT NULL,
  item_id INT NOT NULL,
  FOREIGN KEY (item_id) REFERENCES tombstone_item(id)
);

-- 장례식장 테이블
CREATE TABLE IF NOT EXISTS funeral (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  district_id INT NOT NULL,
  FOREIGN KEY (district_id) REFERENCES district(id)
);

-- 샘플 데이터 삽입
-- 산역 메뉴 데이터
INSERT INTO mountain_menu (name, price) VALUES
('산역견적', 100000),
('산역견적2', 200000),
('산역견적3', 300000);

-- 지역 데이터
INSERT INTO area (id, name) VALUES
(1000, '서울특별시'),
(2000, '경기도'),
(3000, '인천광역시');

-- 구 데이터
INSERT INTO district (id, name) VALUES
(1001, '종로구'),
(1002, '중구'),
(1003, '용산구'),
(2001, '수원시'),
(2002, '성남시'),
(2003, '의정부시'),
(3001, '중구'),
(3002, '동구'),
(3003, '미추홀구');

-- 지역-구 관계 데이터
-- 서울특별시의 구
INSERT INTO area_district (area_id, district_id) VALUES
(1000, 1001),
(1000, 1002),
(1000, 1003);

-- 경기도의 구
INSERT INTO area_district (area_id, district_id) VALUES
(2000, 2001),
(2000, 2002),
(2000, 2003);

-- 인천광역시의 구
INSERT INTO area_district (area_id, district_id) VALUES
(3000, 3001),
(3000, 3002),
(3000, 3003);

-- 산지 데이터
INSERT INTO mountain (id, name, district_id) VALUES
('1001-1', '북한산', 1001),
('1001-2', '인왕산', 1001),
('1002-1', '남산', 1002),
('1003-1', '용산공원', 1003),
('2001-1', '수원화성', 2001),
('2002-1', '성남시민공원', 2002),
('3001-1', '인천대교', 3001);

-- 비석 카테고리 데이터
INSERT INTO tombstone_category (id, name) VALUES
(1, '기본 비석'),
(2, '고급 비석');

-- 비석 아이템 데이터
INSERT INTO tombstone_item (id, name, category_id) VALUES
(101, '기본 비석 A', 1),
(102, '기본 비석 B', 1),
(201, '고급 비석 A', 2);

-- 비석 사이즈 데이터
INSERT INTO tombstone_size (id, size, default_price, item_id) VALUES
(1001, '소형', 1000000, 101),
(1002, '중형', 2000000, 101),
(1003, '대형', 3000000, 101),
(2001, '소형', 1500000, 102),
(2002, '중형', 2500000, 102),
(2003, '대형', 3500000, 102),
(3001, '소형', 2000000, 201),
(3002, '중형', 3000000, 201),
(3003, '대형', 4000000, 201);

-- 장례식장 데이터
INSERT INTO funeral (id, name, district_id) VALUES
('1001-1', '종로비석', 1001),
('1001-2', '인왕비석', 1001),
('1002-1', '남산비석', 1002),
('1003-1', '용산비석', 1003),
('2001-1', '수원비석', 2001),
('2002-1', '성남비석', 2002),
('3001-1', '인천비석', 3001);

