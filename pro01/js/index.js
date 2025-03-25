import {menuData} from './mountain_data.js'
import {calculatePrice} from './price.js'
import {initializeMenu, setupQuantityControls} from './ui.js'

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();
    setupQuantityControls();
});