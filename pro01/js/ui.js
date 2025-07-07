// menuData는 mountain_data.js에서 window 객체로 로드됨
// import { menuData } from './mountain_data.js';
import { calculatePrice, calculateTotalPrice } from './price.js';

// 메뉴 초기화 함수
export function initializeMenu() {
    const menuContainer = document.querySelector('.reservationMenu');
    if (!menuContainer) {
        console.error('메뉴 컨테이너를 찾을 수 없습니다.');
        return;
    }

    // 데이터 로딩 확인
    if (!window.menuData) {
        console.error('산역 견적 메뉴 데이터가 로드되지 않았습니다.');
        return;
    }

    // 메뉴 아이템 생성
    window.menuData.forEach((item, index) => {
        const menuHtml = `
            <div class="menu-item" data-id="${item.id}">
                <div class="menu-content">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price.toLocaleString()}원</p>
                    <div class="quantity-control">
                        <button class="decrease">-</button>
                        <input type="number" value="0" min="0" max="10">
                        <button class="increase">+</button>
                    </div>
                </div>
            </div>
        `;
        menuContainer.innerHTML += menuHtml;
    });

    // 수량 조절 이벤트 리스너 설정
    setupQuantityControls();
}

// 수량 조절 이벤트 리스너 설정
export function setupQuantityControls() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const itemId = parseInt(item.dataset.id);
        const input = item.querySelector('input');
        const decreaseBtn = item.querySelector('.decrease');
        const increaseBtn = item.querySelector('.increase');
        
        // 감소 버튼
        decreaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(input.value);
            if (currentValue > 0) {
                input.value = currentValue - 1;
                updateDisplayedPrice(itemId, currentValue - 1);
            }
        });
        
        // 증가 버튼
        increaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(input.value);
            if (currentValue < 10) {
                input.value = currentValue + 1;
                updateDisplayedPrice(itemId, currentValue + 1);
            }
        });
        
        // 입력값 변경
        input.addEventListener('change', () => {
            let value = parseInt(input.value);
            if (isNaN(value) || value < 0) value = 0;
            if (value > 10) value = 10;
            input.value = value;
            updateDisplayedPrice(itemId, value);
        });
    });
}

// 표시된 가격 업데이트
function updateDisplayedPrice(itemId, quantity) {
    const price = calculatePrice(itemId, quantity);
    const totalPrice = calculateTotalPrice();
    
    // 총 가격 표시 업데이트
    const totalPriceElement = document.querySelector('.total_price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `총 금액: ${totalPrice.toLocaleString()}원`;
    }
}

// 선택된 메뉴 아이템 가져오기
export function getSelectedItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    const selectedItems = {};
    
    menuItems.forEach(item => {
        const itemId = parseInt(item.dataset.id);
        const quantity = parseInt(item.querySelector('input').value);
        
        if (quantity > 0) {
            selectedItems[itemId] = {
                quantity: quantity,
                price: calculatePrice(itemId, quantity),
                menuData: window.menuData.find(item => item.id === itemId)
            };
        }
    });
    
    return selectedItems;
}

export const num1 = 1

console.log('ok')