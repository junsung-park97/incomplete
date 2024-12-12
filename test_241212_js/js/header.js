$(document).ready(function(){
    let  scrolling = $(window).scrollTop();
    //메뉴에 마우스를 올렸을때 header에 on class add 
    //EventTaget : header, gnb, gnb_wrap, depth1, li
    //Eventhander : mouseenter
    //header에서 마우스를 내렷을때 header에 on class remove 
    //EventTaget : header
    //Eventhander : mouseleave
    //스크롤을 내렸을때 header에 onclass add
    //EventTaget : 
    //Evenhander :  
    //맨위로 스크롤 되었을때 header onclass remove 
    
    $('header .gnb .gnb_wrap ul.depth1 li').on('mouseenter', function(){
        $('header').addClass('on');
        
    })
    
    
    $('header').on('mouseleave', function(){
        if(scrolling == 0){
            $('header').removeClass('on');
        }
    })

    function scroll_chk(){
       
        scrolling = $(window).scrollTop();

        if(scrolling > 0){
            $('header').addClass('on');
            // console.log('0보다 크다');
        } else {
            $('header').removeClass('on');
            // console.log('0이다');
        }
    }
 
    $(window).scroll(function(){
        scroll_chk() //함수의 실행
    })

    $('aside .top').on('click', function(){
		$('html, body').animate({
		  scrollTop : 100
		}, 500);
	});
    
    
})

