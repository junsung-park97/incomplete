// menuData는 mountain_data.js에서 window 객체로 로드됨
// import {menuData} from './mountain_data.js'
import {calculatePrice} from './price.js'
import {initializeMenu, setupQuantityControls} from './ui.js'
// tombstoneData는 tombstone_data.js에서 window 객체로 로드됨
// import {tombstoneData} from './tombstone_data.js'
import{initializeTombstoneUI} from './tombstone_ui.js'
import { initializeFuneralUI } from './funeral-ui.js';

// 데이터베이스에서 데이터를 가져오는 함수
async function fetchDataFromServer() {
  try {
    console.log('서버에서 데이터 가져오기 시작');
    
    // 산역 메뉴 데이터 가져오기
    const menuResponse = await fetch('http://localhost:3000/api/mountain-menu');
    if (!menuResponse.ok) throw new Error('산역 메뉴 데이터를 가져오는데 실패했습니다.');
    const menuData = await menuResponse.json();
    window.menuData = menuData;
    console.log('산역 메뉴 데이터 로드 완료:', menuData);
    
    // 산지 데이터 가져오기
    const mountainResponse = await fetch('http://localhost:3000/api/mountain');
    if (!mountainResponse.ok) throw new Error('산지 데이터를 가져오는데 실패했습니다.');
    const mountainData = await mountainResponse.json();
    window.mountainData = mountainData;
    console.log('산지 데이터 로드 완료:', mountainData);
    
    // 비석 데이터 가져오기
    const tombstoneResponse = await fetch('http://localhost:3000/api/tombstone');
    if (!tombstoneResponse.ok) throw new Error('비석 데이터를 가져오는데 실패했습니다.');
    const tombstoneData = await tombstoneResponse.json();
    window.tombstoneData = tombstoneData;
    console.log('비석 데이터 로드 완료:', tombstoneData);
    
    // 장례식장 데이터 가져오기
    console.log('장례식장 데이터 가져오기 시작');
    const funeralResponse = await fetch('http://localhost:3000/api/funeral');
    if (!funeralResponse.ok) {
      const errorText = await funeralResponse.text();
      console.error('장례식장 데이터 응답 오류:', funeralResponse.status, errorText);
      throw new Error(`장례식장 데이터를 가져오는데 실패했습니다. (${funeralResponse.status})`);
    }
    const funeralData = await funeralResponse.json();
    window.funeralData = funeralData;
    console.log('장례식장 데이터 로드 완료:', funeralData);
    
    return true;
  } catch (error) {
    console.error('데이터 가져오기 오류:', error);
    return false;
  }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', async () => {
    console.log('index.js 시작');
    
    // 서버에서 데이터 가져오기
    const dataLoaded = await fetchDataFromServer();
    
    if (!dataLoaded) {
        console.error('데이터 로딩에 실패했습니다. 기본 데이터를 사용합니다.');
        // 기본 데이터 로드 (기존 JS 파일에서)
        loadDefaultData();
    }
    
    // 기존 메뉴 초기화
    if(typeof initializeMenu === 'function') {
        initializeMenu();
        setupQuantityControls();
    }
    
    // 디버깅용 로그
    console.log('파일 로드 확인:', {
        menuData: !!window.menuData,
        calculatePrice: !!calculatePrice,
        initializeMenu: !!initializeMenu,
        tombstoneData: !!window.tombstoneData
    });

    initializeTombstoneUI();  // 이 함수가 실행되는지 확인
    initializeFuneralUI();

    // .link a 요소 찾기
    const proposalLink = document.querySelector('.link button');
    
    if (proposalLink) {
        console.log('링크 요소 찾음');
        
        proposalLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('예약하기 버튼 클릭됨');
            
            try {
                // 입력 요소 찾기
                const inputs = {
                    customer: {
                        name: document.querySelector('.customer input[name="name"]'),
                        phone: document.querySelector('.customer input[name="phon"]')
                    },
                    meeting: {
                        name: document.querySelector('.meeting input[name="name"]'),
                        phone: document.querySelector('.meeting input[name="phon"]')
                    },
                    funeral: {
                        area: document.querySelector('select[name="area"]'),
                        locality: document.querySelector('select[name="locality"]'),
                        funeral: document.querySelector('select[name="funeral"]')
                    },
                    gravedigger: {
                        bereavedArrive: document.querySelector('.bereaved_arrive input[type="time"]'),
                        workerArrive: document.querySelector('.worker_arrive input[type="time"]'),
                        cateringTruck: {
                            hasTruck: document.querySelector('.catering_truck input[name="유"]'),
                            noTruck: document.querySelector('.catering_truck input[name="무"]'),
                            count: document.querySelector('.catering_truck select[name="num"]')
                        },
                        ritualFood: {
                            noje: document.querySelector('.ritual_food input[name="노재"]'),
                            bongbun: document.querySelector('.ritual_food input[name="봉분제물"]'),
                            none: document.querySelector('.ritual_food input[name="무"]'),
                            count: document.querySelector('.ritual_food select[name="num"]')
                        }
                    },
                    address: {
                        zipcode: document.querySelector('input[name="zipcode"]'),
                        addr1: document.querySelector('input[name="addr1"]'),
                        addr2: document.querySelector('input[name="addr2"]')
                    },
                    mountain: {
                        items: document.querySelectorAll('.mountain_menu input[type="number"]'),
                        additional: document.querySelector('#additional')
                    }
                };

                // 입력 요소 존재 확인
                console.log('찾은 입력 요소:', inputs);

                // 필수 입력값 검증
                if (!inputs.customer.name || !inputs.customer.phone) {
                    console.error('필수 입력 요소를 찾을 수 없음:', {
                        name: inputs.customer.name,
                        phone: inputs.customer.phone
                    });
                    throw new Error('주문자 정보 입력 요소를 찾을 수 없습니다.');
                }

                // 값 존재 확인
                if (!inputs.customer.name.value || !inputs.customer.phone.value) {
                    console.error('필수 입력값이 비어있음:', {
                        name: inputs.customer.name.value,
                        phone: inputs.customer.phone.value
                    });
                    throw new Error('주문자 정보를 입력해주세요.');
                }

                // 산역 견적 데이터 수집
                const mountainItems = {};
                inputs.mountain.items.forEach(input => {
                    const itemId = parseInt(input.dataset.id);
                    const quantity = parseInt(input.value) || 0;
                    if (quantity > 0) {
                        mountainItems[itemId] = {
                            quantity: quantity,
                            price: calculatePrice(itemId, quantity)
                        };
                    }
                });

                const additionalValue = inputs.mountain.additional?.value || '0';
                
                // 데이터 객체 생성
                const reservationData = {
                    customer: {
                        name: inputs.customer.name.value.trim(),
                        phone: inputs.customer.phone.value.trim()
                    },
                    meeting: {
                        name: inputs.meeting.name?.value?.trim() || '',
                        phone: inputs.meeting.phone?.value?.trim() || ''
                    },
                    funeral: {
                        area: inputs.funeral.area?.value || '',
                        locality: inputs.funeral.locality?.value || '',
                        funeral: inputs.funeral.funeral?.value || ''
                    },
                    gravedigger: {
                        bereavedArrive: inputs.gravedigger.bereavedArrive?.value || '',
                        workerArrive: inputs.gravedigger.workerArrive?.value || '',
                        cateringTruck: {
                            hasTruck: inputs.gravedigger.cateringTruck.hasTruck?.checked || false,
                            noTruck: inputs.gravedigger.cateringTruck.noTruck?.checked || false,
                            count: inputs.gravedigger.cateringTruck.count?.value || ''
                        },
                        ritualFood: {
                            noje: inputs.gravedigger.ritualFood.noje?.checked || false,
                            bongbun: inputs.gravedigger.ritualFood.bongbun?.checked || false,
                            none: inputs.gravedigger.ritualFood.none?.checked || false,
                            count: inputs.gravedigger.ritualFood.count?.value || ''
                        }
                    },
                    address: {
                        zipcode: inputs.address.zipcode?.value || '',
                        addr1: inputs.address.addr1?.value || '',
                        addr2: inputs.address.addr2?.value || ''
                    },
                    mountain: {
                        items: mountainItems,
                        additional: additionalValue
                    },
                    tombstone: {
                        selected: getSelectedTombstoneData()
                    }
                };

                // 장례식장 데이터 디버깅
                console.log('장례식장 데이터:', {
                    area: inputs.funeral.area?.value,
                    locality: inputs.funeral.locality?.value,
                    funeral: inputs.funeral.funeral?.value
                });

                // 비석견적 데이터 디버깅
                console.log('비석견적 데이터:', {
                    selected: getSelectedTombstoneData()
                });

                console.log('저장할 데이터:', reservationData);

                // localStorage에 데이터 저장
                localStorage.setItem('reservationData', JSON.stringify(reservationData));
                
                // proposal 페이지로 이동
                window.location.href = './proposal/index.html';

            } catch (error) {
                console.error('상세 오류 정보:', error);
                alert(error.message || '데이터 저장에 실패했습니다.');
            }
        });
    } else {
        console.error('.link a 요소를 찾을 수 없습니다.');
    }

    // 페이지 로드 시 기존 데이터 확인
    console.log('페이지 로드됨');
    const existingData = localStorage.getItem('reservationData');
    console.log('기존 저장된 데이터:', existingData);
});

// 비석 선택 데이터 수집 함수
function getSelectedTombstoneData() {
    const tombstoneSelections = {};
    
    // 디버깅용 로그
    console.log('비석 데이터 수집 시작');
    
    // 선택된 비석 데이터 수집
    const selectedItems = window.debugTombstone?.selectedItems || {};
    console.log('선택된 비석 항목들:', selectedItems);
    
    // 선택된 항목이 있는 경우에만 처리
    if (Object.keys(selectedItems).length > 0) {
        tombstoneSelections.items = selectedItems;
    } else {
        console.log('선택된 비석 항목이 없습니다.');
    }
    
    console.log('수집된 비석 데이터:', tombstoneSelections);
    return tombstoneSelections;
}

// 총 가격 계산 함수
function calculateTotalPrice() {
    let total = 0;
    // 여기에 가격 계산 로직 추가
    // 각 선택된 항목의 가격을 합산
    return total;
}

// 서버 연결 테스트
async function testServerConnection() {
    try {
        // 서버 상태 확인
        console.log('서버 연결 테스트 시작...');
        
        // localStorage 테스트
        console.log('localStorage 테스트:');
        const testData = { test: 'data' };
        localStorage.setItem('test', JSON.stringify(testData));
        const retrievedData = JSON.parse(localStorage.getItem('test'));
        console.log('localStorage 저장/조회 테스트:', retrievedData);
        
        // 데이터 유효성 검사
        const reservationData = localStorage.getItem('reservationData');
        if (reservationData) {
            const parsedData = JSON.parse(reservationData);
            console.log('저장된 예약 데이터 구조:', {
                hasCustomer: !!parsedData.customer,
                hasMeeting: !!parsedData.meeting,
                hasFuneral: !!parsedData.funeral,
                hasGravedigger: !!parsedData.gravedigger,
                hasAddress: !!parsedData.address,
                hasMountain: !!parsedData.mountain,
                hasTombstone: !!parsedData.tombstone
            });
        }

        // 서버 연결 테스트
        try {
            const response = await fetch('http://localhost:3000/api/areas', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('서버 연결 성공:', data);
                return true;
            } else {
                console.error('서버 응답 오류:', response.status);
                return false;
            }
        } catch (serverError) {
            console.error('서버 연결 실패:', serverError);
            return false;
        }
    } catch (error) {
        console.error('테스트 중 오류 발생:', error);
        return false;
    }
}

// 예약 데이터를 서버에 저장
async function saveReservationToServer(reservationData) {
    try {
        const response = await fetch('http://localhost:3000/api/reservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationData)
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('서버에 데이터 저장 성공:', result);
            return true;
        } else {
            console.error('서버 응답 오류:', response.status);
            return false;
        }
    } catch (error) {
        console.error('서버에 데이터 저장 실패:', error);
        return false;
    }
}

// 서버에서 예약 데이터 조회
async function getReservationFromServer() {
    try {
        const response = await fetch('http://localhost:3000/api/reservation', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('서버에서 데이터 조회 성공:', result);
            return result.data;
        } else {
            console.error('서버 응답 오류:', response.status);
            return null;
        }
    } catch (error) {
        console.error('서버에서 데이터 조회 실패:', error);
        return null;
    }
}

// 페이지 로드 시 테스트 실행
document.addEventListener('DOMContentLoaded', async () => {
    console.log('페이지 로드됨');
    const testResult = await testServerConnection();
    console.log('테스트 결과:', testResult);
    
    const existingData = localStorage.getItem('reservationData');
    console.log('기존 저장된 데이터:', existingData);
});