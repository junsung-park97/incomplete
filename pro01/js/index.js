import {menuData} from './mountain_data.js'
import {calculatePrice} from './price.js'
import {initializeMenu, setupQuantityControls} from './ui.js'
import {tombstoneData} from './tombstone_data.js'
import{initializeTombstoneUI} from './tombstone_ui.js'
import { initializeFuneralUI } from './funeral-ui.js';


// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 로드 완료');
    // 기존 메뉴 초기화
    if(typeof initializeMenu === 'function') {
        initializeMenu();
        setupQuantityControls();
    }
    
    // 디버깅용 로그
    console.log('파일 로드 확인:', {
        menuData: !!menuData,
        calculatePrice: !!calculatePrice,
        initializeMenu: !!initializeMenu,
        tombstoneData: !!tombstoneData
    });

    initializeTombstoneUI();  // 이 함수가 실행되는지 확인
    initializeFuneralUI();
});