$(document).ready(function(){
    
	const myFullpage = new fullpage('#fullpage', {  /* html에서 페이지 전체를 감싸는 요소 */

        navigation: false, /* 오른쪽에 각 페이지의 paging */
        navigationPosition: 'left', /* 위치 */
        navigationTooltips: ['main', '나무심기', '숲 활동', '활동이야기'], /* 툴팁 */
        showActiveTooltip: true, /* 현재 활성화된 페이지의 툴팁에 특정 클래스 주기 */
        
        lockAnchors: false,
        anchors: ['main', 'tree', 'introduce', 'story'], /* href="#link1" 이렇게 코딩하면 해당 링크명으로 이동 */

        autoScrolling:true, /* 한페이지씩 스크롤 */
        scrollHorizontally: true,

        verticalCentered: true, /* 컨텐츠 요소 위아래 가운데 */
        
        scrollOverflow: false, /* scrollOverflow 컨텐츠가 디스플레이를 넘어가면 보이느냐 안보이느냐 false시에 컨텐츠가 넘쳐도 스크롤 금지 */

        afterLoad: function(origin, destination, direction, trigger){
            $('.quickNav ul li').removeClass('active');
            $('.quickNav ul li').eq(destination.index).addClass('active');
            if(destination.index == 0){ /* index가 2면 슬라이드는 세번째 슬라이드입니다. index 수는 0/1/2/3 */
                $('.quickNav').removeClass('dark');
                $('.quickLink').removeClass('color2')
                //console.log('1');
            }else if (destination.index == 1){
                $('.quickNav').addClass('dark');
                $('.quickLink').addClass('color2')
                //console.log('2');
            } else if (destination.index == 2){
                $('.quickNav').removeClass('dark');
                $('.quickLink').removeClass('color2')
                //console.log('3');
            } else {
                
                $('.quickNav').addClass('dark');
                $('.quickLink').addClass('color2')
                //console.log('4');
            }
    },

    responsiveWidth: 1025, /* fullpage를 적용시키지 않을 모바일 사이즈 */
    responsiveHeight: 700,
});
let visualName = ['생명의숲','#같이가치 #매달기부', '서울마이트리', '고목나무']
//console.log(visualName);
    
    const visualSwiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */
    
    
        autoplay: {  /* 팝업 자동 실행 */
            delay: 2500,
            disableOnInteraction: true,
        },

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.swiper .paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            /* type: 'fraction',   type fraction을 주면 paging이 숫자로 표시됨 */
            renderBullet: function (index, className) {   /* paging에 특정 코드 넣기 */
              return '<div class="abc' + className + '"><button>' + visualName[index] + "</button></div>";
            },
        },
        

        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.swiper-button-next',  /* 다음 버튼의 클래스명 */
            prevEl: '.swiper-button-prev',  
        },

    });
})//doc.ready