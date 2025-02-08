$(document).ready(function(){
    
    const swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 2500,
            disableOnInteraction: true,
        },

        //effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.swiper-pagination', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
            renderBullet: function (index, className) {   /* paging에 특정 코드 넣기 */
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
        

        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.swiper-button-next',  /* 다음 버튼의 클래스명 */
            prevEl: '.swiper-button-prev',  
        },

    });
    swiper.autoplay.stop();  /* 일시정지 기능 */
    swiper.autoplay.start();  /* 재생 기능 */

    let tab_name

<<<<<<< Updated upstream
    



    $('.exhibit .ex_tab_cnt .ex_tabs ul li').on('click',function(){
        $('.exhibit .ex_tab_cnt .ex_tabs ul li').removeClass('on')
        $(this).addClass('on')
        $('.exhibit .ex_tab_cnt .ex_tab_list .tab_panel').removeClass('on')
        tab_name = $(this).attr('data-ex_tab')
        //console.log(tab_name)
        $('.exhibit .ex_tab_cnt .ex_tab_list').find('[data-ex_tab="'+tab_name+'"]').addClass('on')
    })


    $('.stady_program .sp_cnt .sp_tabs ul li').on('click',function(){
        $('.stady_program .sp_cnt .sp_tabs ul li').removeClass('on')
        $(this).addClass('on')
        $('.stady_program .sp_cnt .tab_cnt .tab_panel').removeClass('on')
        tab_name = $(this).attr('data-ex_tab')
        //console.log(tab_name)
        $('.stady_program .sp_cnt .tab_cnt').find('[data-ex_tab="'+tab_name+'"]').addClass('on')
    })

=======
    $('.exhibit .ex_tab_cnt .ex_tabs ul li').on('click',function(){
        $('.exhibit .ex_tab_cnt .ex_tabs ul li').removeClass('on')
        $(this).addClass('on')
        tab_name = $(this).attr('data-ex_tab')
        console.log(tab_name)
        $('.exhibit .ex_tab_cnt .ex_tab_list .tab_panel').removeClass('on')
        $('.exhibit .ex_tab_cnt .ex_tab_list').find('[data-ex_tab="'+tab_name+'"]').addClass('on')
    })

    let tab_name
>>>>>>> Stashed changes

    $('.collrection .coll_cnt .right ul li a').on('mouseenter',function(){
        // console.log('yes')
        $('.collrection .coll_cnt .right ul li a').removeClass('over')
        $(this).addClass('over')
    })
    $('.collrection .coll_cnt .right ul li').on('mouseleave',function(){
        //console.log('yes')
        $('.collrection .coll_cnt .right ul li a').removeClass('over')
    })


    $('.story .news_cnt .tab_list ul li').on('click',function(){
        $('.story .news_cnt .tab_list ul li').removeClass('active')
        $(this).addClass('active')
        $('.story .tab_cnt .tab_panel').removeClass('active')
        tab_name = $(this).attr('data-news_tab')
        console.log(tab_name)
        $('.story .tab_cnt').find('[data-news_tab="'+tab_name+'"]').addClass('active')
    })

})