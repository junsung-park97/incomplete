// 장례식장 UI 관련 코드
export async function initializeFuneralUI() {
    try {
        // 서버에서 장례식장 데이터를 가져옵니다
        const response = await fetch('http://localhost:3000/api/funeral');
        if (!response.ok) {
            throw new Error('서버에서 데이터를 가져오는데 실패했습니다.');
        }
        const funeralData = await response.json();
        
        // 전역 변수로 저장하여 다른 함수에서도 접근 가능하게 합니다
        window.funeralData = funeralData;

        // 지역 선택 드롭다운 초기화
        const areaSelect = document.getElementById('area');
        areaSelect.innerHTML = '<option value="">지역 선택</option>';
        
        funeralData.forEach(area => {
            const option = document.createElement('option');
            option.value = area.id;
            option.textContent = area.name;
            areaSelect.appendChild(option);
        });

        // 지역 선택 시 구 목록 업데이트
        areaSelect.addEventListener('change', async () => {
            const selectedAreaId = parseInt(areaSelect.value);
            const localitySelect = document.getElementById('locality');
            localitySelect.innerHTML = '<option value="">구/군 선택</option>';
            
            if (selectedAreaId) {
                // 선택된 지역의 구/군 데이터를 찾습니다
                const selectedArea = funeralData.find(area => area.id === selectedAreaId);
                
                if (selectedArea && selectedArea.districts) {
                    selectedArea.districts.forEach(district => {
                        const option = document.createElement('option');
                        option.value = district.id;
                        option.textContent = district.name;
                        localitySelect.appendChild(option);
                    });
                }
            }

            // 구 선택이 초기화되면 장례식장도 초기화
            document.getElementById('funeral').innerHTML = '<option value="">장례식장 선택</option>';
        });

        // 구 선택 시 장례식장 목록 업데이트
        document.getElementById('locality').addEventListener('change', async (event) => {
            const selectedAreaId = parseInt(areaSelect.value);
            const selectedDistrictId = parseInt(event.target.value);
            
            const funeralSelect = document.getElementById('funeral');
            funeralSelect.innerHTML = '<option value="">장례식장 선택</option>';
            
            if (selectedDistrictId) {
                // 선택된 구/군의 장례식장 데이터를 찾습니다
                const selectedArea = funeralData.find(area => area.id === selectedAreaId);
                const selectedDistrict = selectedArea?.districts.find(district => district.id === selectedDistrictId);
                
                if (selectedDistrict && selectedDistrict.funerals) {
                    selectedDistrict.funerals.forEach(funeral => {
                        const option = document.createElement('option');
                        option.value = funeral.id;
                        option.textContent = funeral.name;
                        funeralSelect.appendChild(option);
                    });
                }
            }
        });

        // 산역 데이터 초기화
        const mountainSelect = document.getElementById('mountain');
        if (mountainSelect) {
            try {
                const mountainResponse = await fetch('http://localhost:3000/api/mountain');
                if (!mountainResponse.ok) {
                    throw new Error('산역 데이터를 가져오는데 실패했습니다.');
                }
                const mountainData = await mountainResponse.json();
                window.mountainData = mountainData;
                
                mountainSelect.innerHTML = '<option value="">산역 선택</option>';
                mountainData.forEach(mountain => {
                    const option = document.createElement('option');
                    option.value = mountain.id;
                    option.textContent = `${mountain.name} (${mountain.price.toLocaleString()}원)`;
                    mountainSelect.appendChild(option);
                });
            } catch (error) {
                console.error('산역 데이터 로딩 오류:', error);
            }
        }

        // 비석 데이터 초기화
        const tombstoneSelect = document.getElementById('tombstone');
        if (tombstoneSelect) {
            try {
                const tombstoneResponse = await fetch('http://localhost:3000/api/tombstone');
                if (!tombstoneResponse.ok) {
                    throw new Error('비석 데이터를 가져오는데 실패했습니다.');
                }
                const tombstoneData = await tombstoneResponse.json();
                window.tombstoneData = tombstoneData;
                
                tombstoneSelect.innerHTML = '<option value="">비석 선택</option>';
                tombstoneData.forEach(tombstone => {
                    const option = document.createElement('option');
                    option.value = tombstone.id;
                    option.textContent = `${tombstone.name} (${tombstone.price.toLocaleString()}원)`;
                    tombstoneSelect.appendChild(option);
                });
            } catch (error) {
                console.error('비석 데이터 로딩 오류:', error);
            }
        }

    } catch (error) {
        console.error('UI 초기화 오류:', error);
        alert('데이터를 불러오는데 실패했습니다.');
    }
}

// 페이지 로드 시 자동으로 초기화하는 코드
document.addEventListener('DOMContentLoaded', () => {
    initializeFuneralUI();
});
