// Daum 우편번호 서비스 스크립트 동적 로드
function loadDaumPostcodeScript() {
    return new Promise((resolve, reject) => {
        if (window.daum && window.daum.Postcode) {
            resolve(window.daum.Postcode);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        script.onload = () => resolve(window.daum.Postcode);
        script.onerror = () => reject(new Error('Daum 우편번호 서비스 스크립트 로드 실패'));
        document.head.appendChild(script);
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', async () => {
    const addrBtn = document.querySelector('.fuckyou .additionalInfor .address .form1 .form2 input[type="button"]');
    console.log('주소 버튼:', addrBtn);

    if (addrBtn) {
        addrBtn.addEventListener("click", async () => {
            try {
                const Postcode = await loadDaumPostcodeScript();
                
                new Postcode({
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

                        console.log('주소 데이터:', data);
                        
                        document.form1.addr1.value = fullAddr;
                        document.form1.zipcode.value = data.zonecode;
                    }
                }).open();
            } catch (error) {
                console.error('우편번호 서비스 오류:', error);
                alert('우편번호 서비스를 불러오는 중 오류가 발생했습니다.');
            }
        });
    } else {
        console.error('주소 버튼을 찾을 수 없습니다.');
    }
});




