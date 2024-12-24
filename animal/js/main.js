$(document).ready(function(){

    /**************************** 변수 ************************************/
    let device_status //브라우저가 pc인지 mobile상태인지
    let window_w //브라우저의 넓이
    let scrolling//브라우저가 스크롤 된 값
    /**************************** visual 팝업 (시작) ************************************/
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */
        effect: "fade", /* fade 효과 */
        autoplay: {  /* 팝업 자동 실행 */
            delay: 5000,
            disableOnInteraction: true,
        },
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.visual .btn_wrap .next',  /* 다음 버튼의 클래스명 */
            prevEl: '.visual .btn_wrap .prev',  
        },
    });
    // swiper.autoplay.stop();  /* 일시정지 기능 */
    // swiper.autoplay.start();  /* 재생 기능 */

    $('.visual .btn_wrap .stop').on('click', function(){
        //console.log('정지 버튼 누름')
        visual_swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide()//stop버튼 숨김
        $('.visual .btn_wrap .play').show() //play 나타남
    })

    $('.visual .btn_wrap .play').on('click', function(){
        //console.log('시작 버튼 누름')
        visual_swiper.autoplay.start();  /* 재생 기능 */
        $(this).hide()//play버튼 숨김
        $('.visual .btn_wrap .stop').show()//stop버튼 나타남
    })
    /**************************** visual 팝업 (종료) ************************************/

    /**************************** pc인지 mobile 구분 (시작)  ***********************************/
    function device_chk(){
        window_w = $(window).width()
        if(window_w > 640){
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
        console.log(device_status)
    }
    device_chk() //로딩 되었을때 1번 실행
    $(window).resize(function(){//브라우저가 리사이즈될때 1번 실행
        device_chk()
    })

    /**************************** pc인지 mobile 구분 (종료)  ***********************************/
    /**************************** header 고정 (시작)  ***********************************
     * 
     * 언제 : 스크롤할때, header에 마우스를 올렸을때
     * 뭘 : header에 fixed
     * 사라질때 : 맨 위로 스크롤 되었을때, header에서 마우스를 아웃했을때
     * 1. 스크롤 내린 상태에서 header에 마우스를 올렸다가 내림 (fixed 사라지면 X )
    */

    $('header').on('mouseenter',function(){
        $(this).addClass('fixed');
    });
    $('header').on('mouseleave',function(){
        // 스크롤을 내린상태에서 마우스를 오버했다가 풀면 header class가 없어짐
        // 스크롤된 값이 0이거나 0보다 작을때만 삭제되야함
        if(scrolling <= 0){
            $(this).removeClass('fixed');
        };
    });

    function scroll_chk(){
        scrolling = $(window).scrollTop();

        if(scrolling > 0){
            $('header').addClass('fixed');
        }else{
            // 검색창이 열려있는 상황에선 class를 remove하지않을꺼야 >> 어떻게 열린상황을 판단할껀데? header에 sch_open class가 있으면 열린상황으로 간주 >> 어떻게 class가 있는상황인지 판단할건데? >> has
            if($('header').hasClass('sch_open') == false){
                if($('header').hasClass('menu_pc') == false){ //메뉴가 열린 상태가 아니라면
                    $('header').removeClass('fixed');
                    console.log('')
                }
                
            };
        };
    };

    $(window).scroll(function(){
        scroll_chk();
    });


    /**************************** header 고정 (종료)  ************************************/
    /*******************************   검색창 열기   *************************************/

    $('header .tnb .search .search_open').on('click',function(){
        $('header').addClass('sch_open');
        $('header').addClass('fixed');
    });
    $('header .tnb .search .search_wrap .search_close').on('click',function(){
        $('header').removeClass('sch_open');
    });

     /******************************   검색창 종료   *************************************/
     /******************************* pc버전 메뉴열기 시작 *************************************/
    //  header .gnb .gnb_wrap ul.depth1 > li
    // over한 li에 overclass 추가
    // header에 menu_pc class 추가

    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin',function(){
        if(device_status = 'pc'){ //pc모드의 경우
            $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
            $(this).addClass('over');
            $('header').addClass('menu_pc');
        }
    })
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave ',function(){
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
        $(this).removeClass('over');
        $('header').removeClass('menu_pc');
    })

    $('header .gnb .gnb_wrap ul.depth1 > li:last-child ul.depth2 > li:last-child').on('focusout',function(){
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over');
        $('header').removeClass('menu_pc')
    })
     /******************************* pc버전 메뉴열기 종료 *************************************/ 




});//document.ready