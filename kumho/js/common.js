$(document).ready(function(){

     /*
    * common.js
    * header/footer 공통요소에 들어가는 스크립트 저장 
    * 모든 페이지에서 공통으로 작동되는 스크립트
    */

    //header's addClass fixed and scrollingDown start
        //scrolling이 1만 내려가도 addClass fixed OK
        //하단으로 스크롤되면 addClass scrollingDown OK
        //상단으로 크르롤되면 removeCalss scrollingDown OK
        //맨윗단에서는 allClassRemoveClass 


        //스크롤 방향을 판단 How?? >> 이전스크롤값을 변수에 저장후에 다음의 스크롤 값을 비교하여 판단.

    //이전스크롤값을 변수에 저장
    let scrolling = 0
    let prevScrolle

    function scrollChk(){
        prevScrolle = scrolling // 현재 스크롤 된 값을 이전스크롤값에 대입
        scrolling = $(window).scrollTop()
        if (scrolling > 0) {
            $('header').addClass('fixed') //scrolling이 1만 내려가도 addClass fixed
            if((prevScrolle - scrolling) < 0){
                //하단으로 스크롤되면 addClass scrollingDown
                //console.log("Down")
                $('header').addClass('scroll_down')
            }else {
                //상단으로 크르롤되면 removeCalss scrollingDown
                //console.log("Up")
                $('header').removeClass('scroll_down')
            }
        } else {
            $('header').removeClass('fixed')
        }

        
        console.log(prevScrolle, scrolling)
    }
    //header's addClass fixed and scrollingDown end 
    
    $(window).scroll(function(){
        scrollChk()
    })

}) 
   