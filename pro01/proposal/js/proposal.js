// funeral_data.js, mountain_data.js, tombstone_data.js는 index.html에서 로드됨
// import { funeralData } from '../../js/funeral_data.js';
// import { menuData } from '../../js/mountain_data.js';
// import { tombstoneData } from '../../js/tombstone_data.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('proposal.js 시작');
    
    // 데이터 로딩 확인
    if (!window.funeralData) {
        console.error('장례식장 데이터가 로드되지 않았습니다.');
        return;
    }
    
    loadAndDisplayData();
    
    // 예약하기 버튼 이벤트 리스너 추가
    const confirmButton = document.getElementById('confirmReservation');
    if (confirmButton) {
        confirmButton.addEventListener('click', handleReservation);
    }
});

// 예약하기 버튼 클릭 처리 함수
async function handleReservation() {
    try {
        // localStorage에서 데이터 가져오기
        const savedData = localStorage.getItem('reservationData');
        if (!savedData) {
            throw new Error('저장된 데이터가 없습니다');
        }

        // JSON 파싱
        const data = JSON.parse(savedData);
        console.log('서버로 전송할 데이터:', data);
        
        // 서버에 데이터 전송
        const response = await fetch('http://localhost:3000/api/reservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('서버 응답:', result);
            alert('예약이 성공적으로 완료되었습니다.');
            
            // 서버에서 반환된 리다이렉트 URL 사용
            if (result.redirectUrl) {
                window.location.href = result.redirectUrl;
            } else {
                // 기본 리다이렉트 URL (서버에서 URL을 반환하지 않은 경우)
                window.location.href = 'http://localhost:3000/if/client/index.html';
            }
        } else {
            throw new Error('서버 응답 오류: ' + response.status);
        }
    } catch (error) {
        console.error('예약 처리 중 오류 발생:', error);
        alert('예약 처리 중 오류가 발생했습니다: ' + error.message);
    }
}

function loadAndDisplayData() {
    try {
        // localStorage에서 데이터 가져오기
        const savedData = localStorage.getItem('reservationData');
        console.log('저장된 데이터 문자열:', savedData);

        if (!savedData) {
            throw new Error('저장된 데이터가 없습니다');
        }

        // JSON 파싱
        const data = JSON.parse(savedData);
        console.log('파싱된 데이터:', data);
        console.log('장례식장 데이터:', data.funeral);
        console.log('고객 데이터:', data.customer);
        console.log('만나실분 데이터:', data.meeting);
        console.log('산역 견적 데이터:', data.mountain);
        console.log('비석견적 데이터:', data.tombstone);

        // UI 업데이트
        updateUI(data);

    } catch (error) {
        console.error('데이터 로드 오류:', error);
        console.error('오류 상세 정보:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        alert('예약 정보를 불러올 수 없습니다. 오류: ' + error.message);
        window.location.href = '../index.html';
    }
}

function updateUI(data) {
    console.log('UI 업데이트 시작', data);

    // 고객 정보
    const customerInfo = document.getElementById('customerInfo');
    if (customerInfo) {
        customerInfo.innerHTML = `
            <div class="info-item">
                <div class="inner">
                    <h3>주문자</h3>
                    <p><strong>이름:</strong> ${data.customer?.name || '정보 없음'}</p>
                    <p><strong>연락처:</strong> ${data.customer?.phone || '정보 없음'}</p>
                </div>
                <div class="inner">
                    <h3>만나실분</h3>
                    <p><strong>이름:</strong> ${data.meeting?.name || '정보 없음'}</p>
                    <p><strong>연락처:</strong> ${data.meeting?.phone || '정보 없음'}</p>
                </div>
            </div>
        `;
    }

    // 장례식장 정보
    const funeralElement = document.getElementById('funeralInfo');
    if (funeralElement && data.funeral) {
        // 장례식장 ID에 해당하는 name 찾기
        let funeralName = '정보 없음';
        let areaName = '정보 없음';
        let localityName = '정보 없음';
        
        // funeral_data.js에서 가져온 데이터로 ID에 해당하는 name 찾기
        if (data.funeral.area) {
            const areaId = parseInt(data.funeral.area);
            console.log('지역 ID:', areaId);
            const area = window.funeralData.find(a => a.id === areaId);
            console.log('찾은 지역:', area);
            
            if (area) {
                areaName = area.name;
                
                if (data.funeral.locality) {
                    const localityId = parseInt(data.funeral.locality);
                    console.log('구/군 ID:', localityId);
                    const locality = area.gu.find(g => g.id === localityId);
                    console.log('찾은 구/군:', locality);
                    
                    if (locality) {
                        localityName = locality.name;
                        
                        if (data.funeral.funeral) {
                            const funeralId = data.funeral.funeral;
                            console.log('장례식장 ID:', funeralId);
                            console.log('장례식장 목록:', locality.funeral);
                            
                            // 문자열 ID로 비교
                            const funeral = locality.funeral.find(f => String(f.id) === String(funeralId));
                            console.log('찾은 장례식장:', funeral);
                            
                            if (funeral) {
                                funeralName = funeral.name;
                            }
                        }
                    }
                }
            }
        }
        
        funeralElement.innerHTML = `
            <div class="info-item">
                <div class="inner">
                    <h3>장례식장 정보</h3>
                    <p><strong>지역:</strong> ${areaName}</p>
                    <p><strong>구/군:</strong> ${localityName}</p>
                    <p><strong>장례식장:</strong> ${funeralName}</p>
                </div>
            </div>
        `;
    }

    // gravedigger 정보
    const gravediggerElement = document.getElementById('gravediggerInfo');
    if (gravediggerElement && data.gravedigger) {
        const gravedigger = data.gravedigger;
        
        let cateringTruckStatus = '정보 없음';
        if (gravedigger.cateringTruck) {
            if (gravedigger.cateringTruck.hasTruck) {
                cateringTruckStatus = `유 (${gravedigger.cateringTruck.count || '수량 미지정'})`;
            } else if (gravedigger.cateringTruck.noTruck) {
                cateringTruckStatus = '무';
            }
        }

        let ritualFoodStatus = '정보 없음';
        if (gravedigger.ritualFood) {
            const foods = [];
            if (gravedigger.ritualFood.noje) foods.push('노제');
            if (gravedigger.ritualFood.bongbun) foods.push('봉분제물');
            if (gravedigger.ritualFood.none) foods.push('무');
            ritualFoodStatus = foods.length > 0 ? 
                `${foods.join(', ')} (${gravedigger.ritualFood.count || '수량 미지정'})` : 
                '정보 없음';
        }

        gravediggerElement.innerHTML = `
            <div class="info-item">
                <div class="inner">
                    <h3>작업 정보</h3>
                    <p><strong>상가 도착 예정시간:</strong> ${gravedigger.bereavedArrive || '정보 없음'}</p>
                    <p><strong>작업팀 도착 예정시간:</strong> ${gravedigger.workerArrive || '정보 없음'}</p>
                    <p><strong>식사차량:</strong> ${cateringTruckStatus}</p>
                    <p><strong>제사음식:</strong> ${ritualFoodStatus}</p>
                </div>
            </div>
        `;
    }

    // 주소 정보
    const addressElement = document.getElementById('addressInfo');
    if (addressElement && data.address) {
        const address = data.address;
        
        addressElement.innerHTML = `
            <div class="info-item">
                <h3>주소 정보</h3>
                <div class="inner">
                    <p><strong>우편번호:</strong> ${address.zipcode || '정보 없음'}</p>
                    <p><strong>주소:</strong> ${address.addr1 || '정보 없음'}</p>
                    <p><strong>상세주소:</strong> ${address.addr2 || '정보 없음'}</p>
                </div>
            </div>
        `;
    }

    // 산역 견적 정보
    const mountainInfo = document.getElementById('mountainInfo');
    let mountainTotalPrice = 0;
    
    if (mountainInfo && data.mountain) {
        let mountainItemsHtml = '';
        
        if (data.mountain.items && Object.keys(data.mountain.items).length > 0) {
            mountainItemsHtml = '<ul class="mountain-items">';
            
            for (const [itemId, itemData] of Object.entries(data.mountain.items)) {
                const menuItem = window.menuData.find(item => item.id === parseInt(itemId));
                if (menuItem) {
                    const itemTotalPrice = itemData.price;
                    mountainTotalPrice += itemTotalPrice;
                    
                    mountainItemsHtml += `
                        <li>
                            <span class="item-name">${menuItem.name}</span>
                            <span class="item-quantity">${itemData.quantity}개</span>
                            <span class="item-price">${itemData.price.toLocaleString()}원</span>
                        </li>
                    `;
                }
            }
            
            mountainItemsHtml += '</ul>';
        } else {
            mountainItemsHtml = '<p>선택된 항목이 없습니다.</p>';
        }
        
        const additionalValue = parseInt(data.mountain.additional || '0');
        mountainTotalPrice += additionalValue;
        
        mountainInfo.innerHTML = `
            <div class="info-item">
                ${mountainItemsHtml}
                <p class="additional">추가 금액: ${additionalValue.toLocaleString()}원</p>
                <p class="total-price">총 금액: ${mountainTotalPrice.toLocaleString()}원</p>
            </div>
        `;
    }

    // 비석견적 정보
    const serviceInfo = document.getElementById('serviceInfo');
    let tombstoneTotalPrice = 0;
    
    if (serviceInfo && data.tombstone) {
        let tombstoneHtml = '';
        
        if (data.tombstone.selected && data.tombstone.selected.items && Object.keys(data.tombstone.selected.items).length > 0) {
            // 비석 데이터 찾기
            let tombstoneItemsHtml = '';
            
            // 선택된 비석 데이터 표시
            for (const [key, item] of Object.entries(data.tombstone.selected.items)) {
                tombstoneTotalPrice += item.price;
                
                tombstoneItemsHtml += `
                    <div class="tombstone-item">
                        <p><strong>카테고리:</strong> ${item.categoryName}</p>
                        <p><strong>비석 종류:</strong> ${item.itemName}</p>
                        <p><strong>사이즈:</strong> ${item.size}</p>
                        <p><strong>수량:</strong> ${item.quantity}개</p>
                        <p><strong>가격:</strong> ${item.price.toLocaleString()}원</p>
                    </div>
                `;
            }
            
            tombstoneHtml = `
                <div class="info-item">
                    <div class="inner">
                        <h3>비석 정보</h3>
                        ${tombstoneItemsHtml}
                        <p class="total-price">총 금액: ${tombstoneTotalPrice.toLocaleString()}원</p>
                    </div>
                </div>
            `;
        } else {
            tombstoneHtml = '<p>선택된 비석이 없습니다.</p>';
        }
        
        serviceInfo.innerHTML = tombstoneHtml;
    }

    // 총 견적 정보
    const totalPriceInfo = document.getElementById('totalPriceInfo');
    if (totalPriceInfo) {
        const totalPrice = mountainTotalPrice + tombstoneTotalPrice;
        
        totalPriceInfo.innerHTML = `
            <div class="info-item">
                <div class="inner">
                    <h3>총 견적</h3>
                    <div class="price-breakdown">
                        <p><strong>산역 견적:</strong> ${mountainTotalPrice.toLocaleString()}원</p>
                        <p><strong>비석견적:</strong> ${tombstoneTotalPrice.toLocaleString()}원</p>
                    </div>
                    <p class="grand-total">총 금액: ${totalPrice.toLocaleString()}원</p>
                </div>
            </div>
        `;
    }
}
