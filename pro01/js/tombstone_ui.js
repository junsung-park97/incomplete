import { tombstoneData } from './tombstone_data.js';

// 선택된 아이템을 카테고리별로 저장할 객체
let selectedItems = {};

// 디버깅용 로그 함수
function debugLog(action, data) {
    console.group(`디버깅 - ${action}`);
    console.log('데이터:', data);
    console.log('현재 선택된 아이템들:', selectedItems);
    console.groupEnd();
}

// 초기화 함수
export function initializeTombstoneUI() {
    console.log('비석 UI 초기화 시작');
    const tombstoneList = document.querySelector('.tombstone_list');
    
    if (!tombstoneList) {
        console.error('tombstone_list 요소를 찾을 수 없습니다!');
        return;
    }

    // 데이터 구조 확인
    console.log('데이터 확인:', tombstoneData);

    // 각 카테고리별 UI 생성
    tombstoneData.categories.forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.className = 'category-section';
        
        categorySection.innerHTML = `<h2 class="category-title">${category.name}</h2>`;
        
        // 카테고리 내 아이템들 생성
        category.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'tombstone_infor';
            
            // sizes 배열이 있는지 확인
            const sizesHtml = item.sizes ? `
                <div class="size-control">
                    <label>사이즈:</label>
                    <select class="size-select" data-category-id="${category.id}" data-item-id="${item.id}">
                        <option value="">사이즈 선택</option>
                        ${item.sizes.map(size => `
                            <option value="${size.id}" data-price="${size.defaultPrice}">
                                ${size.size} (${size.defaultPrice.toLocaleString()}원)
                            </option>
                        `).join('')}
                    </select>
                </div>
            ` : '';

            itemDiv.innerHTML = `
                <h3>${item.name}</h3>
                ${item.description ? `<span class="item-description">${item.description}</span>` : ''}
                <div class="item-controls">
                    ${sizesHtml}
                    <div class="quantity-control">
                        <label>수량:</label>
                        <select class="quantity-select" data-category-id="${category.id}" data-item-id="${item.id}">
                            ${Array.from({length: 11}, (_, i) => `
                                <option value="${i}">${i}</option>
                            `).join('')}
                        </select>
                    </div>
                    ${item.options ? `
                        <div class="options-control">
                            ${item.options.lettering ? `
                                <label>
                                    <input type="checkbox" class="option-checkbox" data-option="lettering">
                                    각자
                                </label>
                            ` : ''}
                            ${item.options.installation ? `
                                <label>
                                    <input type="checkbox" class="option-checkbox" data-option="installation">
                                    설치
                                </label>
                            ` : ''}
                        </div>
                    ` : ''}
                    <div class="item-price" data-category-id="${category.id}" data-item-id="${item.id}">0원</div>
                </div>
            `;
            
            setupItemListeners(itemDiv, category, item);
            categorySection.appendChild(itemDiv);
        });
        
        tombstoneList.appendChild(categorySection);
    });

    // 총 가격 표시 영역 추가
    const totalPriceDiv = document.createElement('div');
    totalPriceDiv.className = 'total-price';
    totalPriceDiv.textContent = '총 가격: 0원';
    tombstoneList.appendChild(totalPriceDiv);
}

function setupItemListeners(itemDiv, category, item) {
    const sizeSelect = itemDiv.querySelector('.size-select');
    const quantitySelect = itemDiv.querySelector('.quantity-select');
    const optionCheckboxes = itemDiv.querySelectorAll('.option-checkbox');
    const priceDisplay = itemDiv.querySelector('.item-price');

    const updatePrice = () => {
        const quantity = parseInt(quantitySelect.value) || 0;
        let price = 0;

        if (sizeSelect && item.sizes) {
            const selectedSizeId = sizeSelect.value;
            const selectedSize = item.sizes.find(s => s.id === selectedSizeId);
            if (selectedSize) {
                price = selectedSize.defaultPrice * quantity;
                
                // 옵션 가격 추가
                optionCheckboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        // 여기에 옵션별 추가 가격 로직 구현
                        price += 50000; // 예시 가격
                    }
                });
            }
        } else if (item.price) {
            price = item.price * quantity;
        }

        priceDisplay.textContent = `${price.toLocaleString()}원`;
        
        const itemKey = `${category.id}-${item.id}`;
        if (price > 0) {
            selectedItems[itemKey] = {
                categoryName: category.name,
                itemName: item.name,
                size: sizeSelect ? sizeSelect.options[sizeSelect.selectedIndex].text.split(' ')[0] : '기본',
                quantity: quantity,
                price: price
            };
        } else {
            delete selectedItems[itemKey];
        }

        updateTotalPrice();
    };

    if (sizeSelect) {
        sizeSelect.addEventListener('change', updatePrice);
    }
    quantitySelect.addEventListener('change', updatePrice);
    optionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updatePrice);
    });
}

function updateTotalPrice() {
    const total = Object.values(selectedItems)
        .reduce((sum, item) => sum + item.price, 0);
    
    const totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `총 가격: ${total.toLocaleString()}원`;
    }

    // 디버깅용 로그
    console.log('선택된 항목들:', selectedItems);
    console.log('총 가격:', total);
}

// 디버깅용 전역 접근 설정
window.debugTombstone = {
    selectedItems,
    tombstoneData,
    resetSelections: () => {
        selectedItems = {};
        console.log('선택 항목 초기화됨');
        updateTotalPrice();
    }
}; 