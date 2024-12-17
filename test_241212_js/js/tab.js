$(document).ready(function(){
    //1. 클릭한 .news .tab_list ul li에 active addClass
    //2. 클릭한 .news .tab_list ul li button의 title=선택됨을 할당
    //3, 클릭한 .news .tab_list ul li의 data-panel값을 받아서 
    //      .news .tab_contents .tab_pannel중에 data-penel값이 같은것에 active addClass
    //4. 이전에 보이던 li의 active removeClass
    //5. 이전에 보이던 button에 title-선택됨 삭제
    //6. 이전에 보이던 .news .tab_contents .tab_pannel의 active removeClass

    let curr_panel  = 'news1' // 현재 클릭한 패널이름
    let prev_panel // 이전에 클릭한 패널이름
    let cont_h //콘텐츠 높이

    $('.news .tab_list ul li').on('click',function(){
        // if($(this).hasClass('active') == false){
        //     console.log('없음')
        // }else{
        //     conssole.log('있음')
        // }

        if($(this).hasClass('active') == false){
            prev_panel = curr_panel //다른 패널을 클릭하면 오버되어있던 탭의 이름을 이전탭이름으로 저장
            curr_panel = $(this).attr('data-panel');
            //이전에 선택되있던 패널
            // prev_panel
            $('.news .tab_list ul li[data-panel="'+prev_panel+'"]').removeClass('active');
            $('.news .tab_list ul li[data-panel="'+prev_panel+'"]').find('button').attr('title','');
            $('.news .tab_contents .tab_pannel[data-panel="'+prev_panel+'"]').removeClass('active');

            $(this).addClass('active');
            $(this).find('button').attr('title','선택됨');
            $('.news .tab_contents .tab_pannel[data-panel="'+prev_panel+'"]').addClass('active');
        }
        
        function notice_h (){
            cont_h = $('.notice .list ul li.active button') + $('.notice .list ul li.active .tab_contents').height()
            $('.notice .list ul').height(cont_h)
        }//function

        notice_h ()

        $('.notice .list ul li').on('click',function(){

            if($(this).hasClass('active') == false){
                $('.notice .list ul li').removeClass('active');
                $(this).addClass('active');
                cont_h = $(this).find('.tab_contents').height() + $(this).find('.tab_contents').height();
                console.log(cont_h);
                $('.notice .list ul').height(cont_h);
            }

        })
        
    })

})//$(document).ready