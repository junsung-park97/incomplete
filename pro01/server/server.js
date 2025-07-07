// 모든 데이터를 한 번에 가져오는 API
app.get('/api/all-data', async (req, res) => {
    try {
        // 장례식장 데이터 가져오기
        const [areas] = await pool.query('SELECT * FROM area');
        const areaData = await Promise.all(areas.map(async (area) => {
            const [districts] = await pool.query('SELECT d.* FROM district d JOIN area_district ad ON d.id = ad.district_id WHERE ad.area_id = ?', [area.id]);
            const districtData = await Promise.all(districts.map(async (district) => {
                const [funerals] = await pool.query('SELECT * FROM funeral WHERE district_id = ?', [district.id]);
                return {
                    id: district.id,
                    name: district.name,
                    funeral: funerals
                };
            }));
            return {
                id: area.id,
                name: area.name,
                gu: districtData
            };
        }));

        // 산역 데이터 가져오기
        const [mountains] = await pool.query('SELECT * FROM mountain');
        const mountainData = mountains.map(mountain => ({
            id: mountain.id,
            name: mountain.name,
            price: mountain.price
        }));

        // 비석 데이터 가져오기
        const [tombstones] = await pool.query('SELECT * FROM tombstone');
        const tombstoneData = tombstones.map(tombstone => ({
            id: tombstone.id,
            name: tombstone.name,
            price: tombstone.price
        }));

        res.json({
            funeral: areaData,
            mountain: mountainData,
            tombstone: tombstoneData
        });
    } catch (error) {
        console.error('데이터 조회 오류:', error);
        res.status(500).json({ error: '데이터를 가져오는데 실패했습니다.' });
    }
}); 