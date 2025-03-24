
const addrBtn = document.querySelector('.fuckyou .additionalInfor .address .form1 .form2 input[type="button"]')
console.log(addrBtn)

addrBtn.addEventListener("click",() => {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
            // 예제를 참고하여 다양한 활용법을 확인해 보세요.
            let fullAddr = '';
            let extraAddr = '';

            if(data.userSelectedType === 'R'){
                fullAddr = data.roadAddress;
            }else{
                fullAddr = data.jibunAddress;
            }

            if(data.userSelectedType === 'R') {
                if(data.bname !== '') {
                    extraAddr += data.bname
                }
                if(data.buildingName !== '') {
                    extraAddr += (extraAddr !== '' ? ',' + data.buildingName : data.buildingName)
                }
            fullAddr += extraAddr !== '' ? '(' + extraAddr + ')' : extraAddr
            }

            console.log(data)
            
            document.form1.addr1.value = fullAddr;
            document.form1.zipcode.value = data.zonecode;
        }
    }).open();
})


