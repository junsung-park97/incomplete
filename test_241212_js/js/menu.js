$(document).ready(function(){
    /*
        pc버전에서 메뉴에 마우스를 오버하면
        1. header에 menu_pc addClass
        2. header .gnb .gnb_wrap ul.depth1 > li에 active addClass

        >>EventTaget : header .gnb .gnb_wrap ul.depth1 > li = this
    */
   $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter',function(){
        $('header').addClass('menu_pc');
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('active')
        $(this).addClass('active');
   })
   $('header').on('mouseleave',function(){
        $('header').removeClass('menu_pc');
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('active');
   })
})