document.addEventListener('DOMContentLoaded',() => {

    const btn = document.querySelectorAll('.tombstone_estimate .tombstone_list .tombstone_infor .btn_list button')

    btn.forEach(button => {
        button.addEventListener("click", function(){
            this.classList.toggle('active')
        })
    })

    const chk = document.querySelectorAll('.tombstone_estimate .tombstone_list .tombstone_infor .none');

    chk.forEach(checkBox => {
        checkBox.addEventListener("click", () => {
            // 클릭한 요소의 할아버지 요소에 클래스 추가
            const grandparentElement = checkBox.closest('.none').parentNode;
            grandparentElement.classList.toggle('none');
        });
    });

})