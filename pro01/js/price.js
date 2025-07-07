// menuData는 mountain_data.js에서 window 객체로 로드됨
// import { menuData } from './mountain_data.js';

// 개별 아이템 가격 계산
export function calculateItemPrice(itemId, quantity) {
    const item = window.menuData.find(item => item.id === itemId);
    if (!item) return 0;
    return item.price * quantity;
}

// 가격 계산 함수
export function calculatePrice(itemId, quantity) {
    const item = window.menuData.find(item => item.id === itemId);
    if (!item) {
        console.error("잘못된 항목입니다!");
        return 0;
    }
    return item.price * quantity; 
}

export function calculateTotalPrice(quantities) {
    return Object.entries(quantities).reduce((total, [itemId, quantity]) => {
        return total + calculatePrice(parseInt(itemId), quantity);
    }, 0);
}
