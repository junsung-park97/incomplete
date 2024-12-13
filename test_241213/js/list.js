$(document).ready(function(){

    /* 
        1. .tour .list ul li에 마우스를 hover하면 hover한 li에 active 클래스를 추가함.
            Then, 이전에 들어갔던 active 클래스를 삭제해야함.
            And, active 클래스는 4개의 li중에 한개의 li에만 들어가야함.
        2, li가 많은데 그중에 마우스가 오버한 li만 찾는 문법이 this?
            $(this) => 이벤트 대상
        3, 이전에 오버된 li를 찾는방법?
            오버한 li에 active 클래스를 주기전에 모든 li의 active class를 remove
    */

    $('.tour .list ul li').on('mouseenter',function(){
        $('.tour .list ul li').removeClass('active');
        $(this).addClass('active');
    })

    $('.biz .list ul li').on('mouseenter',function(){
        $('.biz .list ul li').removeClass('active');
        $(this).addClass('active');
    })
    $('.biz .list ul li').on('mouseleave',function(){
        $('.biz .list ul li').removeClass('active');
    })

    //마우스 오버했을때는 전체li on 클래스 삭제함
    //And, 전체li off클래스 추가함
    //오버된 클래스만 on추가함
    //And, 기존에 있던 off클래스 삭제함
    
    $('.banner .list ul li').on('mouseenter',function(){
        $('.banner .list ul li').removeClass('on')
        $('.banner .list ul li').addClass('off')
        $(this).addClass('on')
        $(this).removeClass('off')
    })
    
    
    //    $('.banner .list ul li').on('mouseleave',function(){
    //        $('.biz .list ul li').removeClass('on');
    //        $('.biz .list ul li').removeClass('off');
    //    })
    
    //mouse in , out 을 같은 선택자로 같이 해버리면 안됨.
    //버그있음 집가서 잘 해보셈
    
    //attr 이벤트함수가 뭔지 알아보자
    //attr 이벤트함수는 기존의 값을 삭제하고, 새로운 입력값만 출력됨

    // let slide_name = $('.slide .list ul li:nth-child(2)').attr('data-status','')

    //.banner .list ul li에 data-status속성에 오버한 li는 on값을 , 오버하지않으면 off를
    //오버하면 on을 부여

    $('.slide .list ul li').on('mouseenter',function(){
        $('.slide .list ul li').attr('data-status','off');
        $(this).attr('data-status','on');
    })

    $('.slide .list ul li').on('mouseleave',function(){
        $('.slide .list ul li').attr('data-status','');
    })
})
