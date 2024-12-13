$(document).ready(function(){
    const swiper = new Swiper('.swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 1000,
            disableOnInteraction: true,
        },

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.popup .btn_wrap .next', 
            prevEl: '.popup .btn_wrap .prev',  
        },

    });
       
    $('.popup .btn_wrap .stop').on('click',function(){
        swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide();
        $('.popup .btn_wrap .play').show();
    })

    $('.popup .btn_wrap .play').on('click',function(){
        swiper.autoplay.start();  /* 재생 기능 */
        $(this).hide();
        $('.popup .btn_wrap .stop').show();
    })
})