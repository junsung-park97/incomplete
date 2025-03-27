import { menuData } from './mountain_data.js';
import { calculatePrice, calculateTotalPrice } from './price.js';

// 메뉴 아이템 초기화
export function initializeMenu() {
    const leftBtn = document.querySelector('.left_btn');
    const rightBtn = document.querySelector('.right_btn');
    
    menuData.forEach((item, index) => {
        const menuHtml = `
            <div class="mountain_menu">
                <div class="contain">
                    <h4>${item.name}</h4>
                    <div class="number">
                        <span>수량</span>
                        <input type="number" value="0" min="0" data-id="${item.id}">
                    </div>
                </div>
                <div class="price">
                    <span>가격</span>
                    <p>0원</p>
                </div>
            </div>
        `;
        
        if (index % 2 === 0) {
            leftBtn.insertAdjacentHTML('beforeend', menuHtml);
        } else {
            rightBtn.insertAdjacentHTML('beforeend', menuHtml);
        }
    });
}

// 수량 변경 이벤트 핸들러
export function setupQuantityControls() {
    const quantities = {};
    
    document.querySelectorAll('.mountain_menu input[type="number"]').forEach(input => {
        input.addEventListener('change', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            const quantity = parseInt(e.target.value) || 0;
            
            console.log('입력된 값:', {
                itemId,
                quantity,
                rawId: e.target.dataset.id,
                rawValue: e.target.value
            });
            
            quantities[itemId] = quantity;
            
            // 해당 항목의 가격 업데이트
            const menuItem = e.target.closest('.mountain_menu');
            const priceElement = menuItem.querySelector('.price p');
            const itemPrice = calculatePrice(itemId, quantity);
            
            console.log('계산된 가격:', {
                itemPrice,
                menuData: menuData.find(item => item.id === itemId)
            });
            
            priceElement.textContent = `${itemPrice.toLocaleString()}원`;
            
            // 총 가격 업데이트
            updateTotalPrice(quantities);
        });
    });
}

// 총 가격 업데이트
function updateTotalPrice(quantities) {
    const totalPrice = calculateTotalPrice(quantities);
    const totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `총 가격: ${totalPrice.toLocaleString()}원`;
    }
}

export const num1 = 1

console.log('ok')