document.addEventListener('DOMContentLoaded',() => {



    const btn = document.querySelectorAll('.tombstone_estimate .tombstone_list .tombstone_infor .btn_list button')

    btn.forEach(button => {
        button.addEventListener("click", function(){
            this.classList.toggle('active')
        })
    })

    const chk = document.querySelectorAll('.tombstone_estimate .tombstone_list .tombstone_infor .none input');

    chk.forEach(checkBox => {
        checkBox.addEventListener("click", () => {
            // 클릭한 요소의 할아버지 요소에 클래스 추가
            const grandparentElement = checkBox.closest('.none').parentNode;
            grandparentElement.classList.toggle('none');
        });
    });

    // 식사차량 관련 요소
    const cateringNoCheck = document.querySelector('.catering_truck input[name="무"]');
    const cateringSelect = document.querySelector('.catering_truck .count select');

    // 제사음식 관련 요소
    const ritualNoCheck = document.querySelector('.ritual_food input[name="무"]');
    const ritualSelect = document.querySelector('.ritual_food .count select');

    // 식사차량 체크박스 이벤트
    if (cateringNoCheck && cateringSelect) {
        cateringNoCheck.addEventListener('change', (e) => {
            cateringSelect.disabled = e.target.checked;
            if (e.target.checked) {
                cateringSelect.value = "one"; // 기본값으로 리셋
            }
        });
    }

    // 제사음식 체크박스 이벤트
    if (ritualNoCheck && ritualSelect) {
        ritualNoCheck.addEventListener('change', (e) => {
            ritualSelect.disabled = e.target.checked;
            if (e.target.checked) {
                ritualSelect.value = "one"; // 기본값으로 리셋
            }
        });
    }

})