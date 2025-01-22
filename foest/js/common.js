$(document).ready(function(){
    
    let windowWid // 브라우져의 넓이
    let deviceStatus // pc & mobile 현재상태

    function deviceChk (){
        windowWid = $(window).width()
        if(windowWid > 1024){
            deviceStatus = 'pc'
        } else {
            deviceStatus = 'mobile'
        }
    }

    deviceChk()
    $(window).resize(function(){
        deviceChk()
    })

    // 모바일 1차 메뉴 열기

    //header .gnb .gnbWrap ul.depth1 > li > a를 click
    //1. a의 link 삭제
    //2. 상위 li에 addClass open
    //3. if open이 이미 있으면, li의 open remove then, 닫혀있으면 add open

    $('header .gnb .gnbWrap ul.depth1 > li > a').on('click',function(e){
        if(deviceStatus == 'mobile'){
            e.prevenDefault();
            if($(this).parent().hasClass('open') == true){
                $(this).parent().removeClass('open')
            } else {
                $('header .gnb .gnbWrap ul.depth1 > li > a').removeClass('open')
                $(this).parent().addClass('open')
                //console.log('close')
            }
            //console.log('mobile');  
        }
    })
    // 모바일 1차 메뉴 열ㄱㅣ
    // 모바일 메뉴 열기 

    //header .gnb .gnbOpen를 클릭하면 header에 addClass menuMo
    //header .gnb .gnbWrap .gnbClose 를 클릭하면 header에 remove menuMo

    $('header .gnb .gnbOpen').on('click',function(){
        $('header').addClass('menuMo')
    })
    $('header .gnb .gnbWrap .gnbClose').on('click',function(){
        $('header').removeClass('menuMo')
    })

    // 모바일 메뉴 열기 


    // pc 메뉴열기 

    //1. header에 addClass menuPc 
    //2. header .gnb .gnbWrap ul.depth1 > li에 addClass 'over'
    $('header .gnb .gnbWrap ul.depth1 > li').on('mouseenter',function(){
        if(deviceStatus == 'pc'){
            //console.log('over')
            $('header').addClass('menuPc')
            $('header .gnb .gnbWrap ul.depth1 > li').removeClass('over')
            $(this).addClass('over')
        }
    })
    $('header').on('mouseleave',function(){
        if(deviceStatus == 'pc'){
            $('header').removeClass('menuPc')
            $('header .gnb .gnbWrap ul.depth1 > li').removeClass('over')
        }
    })

    $('header.menuPc .tnb .search button').on('focusin',function(){
        if(deviceStatus == 'pc'){
            $('header').removeClass('menuPc')
            $('header .gnb .gnbWrap ul.depth1 > li').removeClass('over')
        }
    })


    // pc 메뉴열기 
})