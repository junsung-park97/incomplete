$(window).ready(function(){
    console.log('ok')
    //스크롤 내리면 

    // .inner_left ul li a에 마우스를 오버하면
    // 전체 li의 클래스를 지우고
    // 내가 오버한 this .inner_left ul li에 over클래스 추가

    $('.inner_left ul li a').on('mouseenter',function(){
        // console.log('yes')
        $('.inner_left ul li a').removeClass('over')
        $(this).addClass('over')
    })
    $('.inner_left ul li').on('mouseleave',function(){
        console.log('yes')
        $('.inner_left ul li a').removeClass('over')
    })
})