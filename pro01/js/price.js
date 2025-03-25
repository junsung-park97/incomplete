// 데이터 import
import { menuData } from './mountain_data.js';

// 가격 계산 함수
export function calculatePrice(itemId, quantity) {
    const item = menuData.find(item => item.id === itemId);
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

