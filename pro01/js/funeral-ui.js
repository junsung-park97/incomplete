import { funeralData } from './funeral_data.js';

export function initializeFuneralUI() {
    console.log('장례식장 UI 초기화 시작');
    const areaSelect = document.querySelector('select[name="area"]');
    const localitySelect = document.querySelector('select[name="locality"]');
    const funeralSelect = document.querySelector('select[name="funeral"]');

    if (!areaSelect || !localitySelect || !funeralSelect) {
        console.error('select 요소를 찾을 수 없습니다');
        return;
    }

    // 데이터 구조 확인
    console.log('장례식장 데이터:', funeralData);

    try {
        // 지역 옵션 생성
        populateAreaOptions(areaSelect);

        // 지역 선택 이벤트 리스너
        areaSelect.addEventListener('change', (e) => {
            const selectedArea = e.target.value;
            updateLocalityOptions(selectedArea, localitySelect);
        });

        // 시/도 선택 이벤트 리스너
        localitySelect.addEventListener('change', (e) => {
            const selectedArea = areaSelect.value;
            const selectedLocality = e.target.value;
            updateFuneralOptions(selectedArea, selectedLocality, funeralSelect);
        });

        // 초기 상태 설정
        localitySelect.disabled = true;
        funeralSelect.disabled = true;

    } catch (error) {
        console.error('장례식장 UI 초기화 중 오류 발생:', error);
    }
}

function populateAreaOptions(areaSelect) {
    // 기본 옵션
    areaSelect.innerHTML = '<option value="">지역 선택</option>';

    // 지역 옵션 추가
    funeralData.forEach(area => {
        const option = document.createElement('option');
        option.value = area.id;
        option.textContent = area.name;
        areaSelect.appendChild(option);
    });
}

function updateLocalityOptions(selectedAreaId, localitySelect) {
    // 기본 옵션으로 리셋
    localitySelect.innerHTML = '<option value="">시/도 선택</option>';

    if (!selectedAreaId) {
        localitySelect.disabled = true;
        return;
    }

    // 선택된 지역의 시/도 목록 가져오기
    const selectedArea = funeralData.find(area => area.id === parseInt(selectedAreaId));
    
    if (selectedArea && selectedArea.gu && selectedArea.gu.length > 0) {
        selectedArea.gu.forEach(locality => {
            const option = document.createElement('option');
            option.value = locality.id;
            option.textContent = locality.name;
            localitySelect.appendChild(option);
        });
        localitySelect.disabled = false;
    } else {
        localitySelect.disabled = true;
        console.log(`${selectedArea.name}에는 시/도 정보가 없습니다.`);
    }
}

function updateFuneralOptions(selectedAreaId, selectedLocalityId, funeralSelect) {
    // 기본 옵션으로 리셋
    funeralSelect.innerHTML = '<option value="">장례식장 선택</option>';

    if (!selectedAreaId || !selectedLocalityId) {
        funeralSelect.disabled = true;
        return;
    }

    // 선택된 지역과 시/도의 장례식장 목록 가져오기
    const selectedArea = funeralData.find(area => area.id === parseInt(selectedAreaId));
    const selectedLocality = selectedArea?.gu?.find(locality => locality.id === parseInt(selectedLocalityId));
    
    if (selectedLocality && selectedLocality.funeral && selectedLocality.funeral.length > 0) {
        selectedLocality.funeral.forEach(funeral => {
            if (funeral.name) {
                const option = document.createElement('option');
                option.value = funeral.id;
                option.textContent = funeral.name;
                funeralSelect.appendChild(option);
            }
        });
        funeralSelect.disabled = false;
    } else {
        funeralSelect.disabled = true;
        console.log('장례식장 정보가 없습니다.');
    }
} 