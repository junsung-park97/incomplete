// 산역 메뉴 UI 관련 코드
document.addEventListener('DOMContentLoaded', async () => {
  const menuContainer = document.getElementById('mountain-menu');
  
  try {
    // 산역 메뉴 데이터 로드
    const response = await fetch('http://localhost:3000/api/mountain-menu');
    const menuData = await response.json();
    
    // 메뉴 아이템 생성
    menuData.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.className = 'menu-item';
      menuItem.innerHTML = `
        <div class="menu-info">
          <h3>${item.name}</h3>
          <p class="price">${item.price.toLocaleString()}원</p>
        </div>
        <div class="quantity-control">
          <button class="decrease">-</button>
          <input type="number" min="0" value="0" data-id="${item.id}">
          <button class="increase">+</button>
        </div>
      `;
      menuContainer.appendChild(menuItem);
    });

    // 수량 조절 버튼 이벤트 리스너
    const decreaseButtons = document.querySelectorAll('.decrease');
    const increaseButtons = document.querySelectorAll('.increase');
    const quantityInputs = document.querySelectorAll('input[type="number"]');

    decreaseButtons.forEach(button => {
      button.addEventListener('click', () => {
        const input = button.nextElementSibling;
        const currentValue = parseInt(input.value);
        if (currentValue > 0) {
          input.value = currentValue - 1;
          updateTotalPrice();
        }
      });
    });

    increaseButtons.forEach(button => {
      button.addEventListener('click', () => {
        const input = button.previousElementSibling;
        input.value = parseInt(input.value) + 1;
        updateTotalPrice();
      });
    });

    quantityInputs.forEach(input => {
      input.addEventListener('change', () => {
        if (parseInt(input.value) < 0) {
          input.value = 0;
        }
        updateTotalPrice();
      });
    });

  } catch (error) {
    console.error('산역 메뉴 데이터 로드 오류:', error);
  }
});

// 총 가격 업데이트 함수
function updateTotalPrice() {
  const quantityInputs = document.querySelectorAll('input[type="number"]');
  let totalPrice = 0;

  quantityInputs.forEach(input => {
    const quantity = parseInt(input.value);
    const price = parseInt(input.closest('.menu-item').querySelector('.price').textContent);
    totalPrice += quantity * price;
  });

  document.getElementById('total-price').textContent = totalPrice.toLocaleString() + '원';
} 