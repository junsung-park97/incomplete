
$(document).ready(function(){
    let scrolling = $(window).scrollTop()// 현재 스크롤 된 값
    let window_h = $(window).height() //브라우저 높이
    $(window).scroll(function(){
        scrolling = $(window).scrollTop()
        //console.log(scrolling)
    })
    $(window).resize(function(){
        window_h = $(window).height()
        //console.log(window_h)
    })

    /*
    *  .txt_slide .txt_wrap .row span의 넓이를 
    *  0 > 100%로 변경하는 애니메이션
    *  .txt_slide .txt_wrap .row가 여러개 가능..... 
    *  애니메이션의 시작점 .txt_slide 화면에 나타났을때 (대략 200)
    *  애니메이션의 종료점 .txt_slide 화면 상단으로 스크롤 되었을때 (대략 850)
    *  850-200 = 650px 2줄이니까 ..... 325px 스크롤 될때.. 1줄 완성 
    *  200 ~ 525px - 1줄 완성
    *  >> 200 ~ 525px로 될때 0 ~ 100%됨... 
    *  >> 525-200 = 325/100 = 3.25 => 1%
    *  >> 스크롤 값이 400px임 .... 
    *  >> 400 - 200 = 200px 정도 스크롤 
    *  >> 1번이 스크롤 되는 전체 325px의 몇 % -- 200/325*100 = 61%
    * 
    *  >> 0 ~ 200 : 0출력 
    *  >> 200 ~ 525 : 0-100% 퍼센트 계산
    *  >> 525 이상 : 100% 출력 
    * 
    *  525 ~ 850px - 2줄 완성 
    */
    let obj_row = $('.txt_slide .txt_wrap .row') //애니메이션이 들어가는 글자 1줄 
    let obj_wrap = $('.txt_slide') //애니메이션이 들어갈 글자 전체를 감싸는 요소
    let objRowSub = 'span' //나중에 나타나는 글자의 선택자
    let startRatio = 0.3//애니메이션 시작 위치 조정값
    let endRatio = 0.3//애니메이션 종료 위치 조정값

    let scroll_gap //시작부터 스크롤 된 값
    let scroll_percent //스크롤 된 값을 퍼센트로
    let scroll_area //스크롤 적용 범위
    let ani_start //애니메이션 시작점 (기준이 줄단위)
    let ani_end //애니메이션 종료점
    let obj_w //넓이가 조절되는 오브젝트
    let obj_leng = obj_row.length //줄 수 계산
    let obj_area_start //글자 전체의 애니메이션 시작 점
    let obj_area_end //글자 전체의 애니메이션 종료점
    let obj_area_h // 1줄 애니메이션이 들어갈 높이



    function obj_count(){
        obj_area_start = obj_wrap.offset().top - window_h + (window_h * startRatio)
        obj_area_end = obj_wrap.offset().top + obj_wrap.height() - (window_h * endRatio)
        obj_area_h = (obj_area_end - obj_area_start) / obj_leng
        //console.log('스크롤', scrolling, '시작값', obj_area_start, ';종료값', obj_area_end, '1줄의 구간', obj_area_h)
    
        for(i=0; i<obj_leng; i++){
            txt_slide(i) 
        }
    }
    
    function txt_slide(num){
        //console.log(num)
        ani_start = obj_area_start + (obj_area_h * num)
        ani_end = obj_area_start + (obj_area_h * (num + 1))
        obj_w = obj_row.eq(num).find(objRowSub)
        if(scrolling <= ani_start){
            scroll_percent = 0
        }else if((scrolling > ani_start) && (scrolling < ani_end)){
            //스크롤이 200보다 크고, 525보다 작을때, 즉 200~525 사이
            scroll_area = ani_end - ani_start
            scroll_gap = scrolling - ani_start
            scroll_percent = scroll_gap / scroll_area * 100
        }else{
            scroll_percent = 100
        }//if종료
        //console.log(scroll_percent)
        obj_w.width(scroll_percent + '%')
    }//function 종료

    obj_count() //문서가 로딩되면 1번 실행

    $(window).scroll(function(){ //스크롤 할때 마다
        obj_count()

    })
    $(window).resize(function(){ //브라우저가 리사이즈가 될때
        obj_count()

    })

//이미지 넓이조절 에니메이션(시작)

    // .photo_resize .photo의 넓이가 50%에서 100%로 늘어나느 에니메이션
    // 언제 시작할것인지, 언제 종료할 것인지 정의가 필요함.
    //stat => 브라우져에서 이미지가 올라올때
    //end => 영역이 브라우져에서 중간쯤 올라왔을때
    // 넓이가 50% 일때 > 50% ~ 100% > 100% 유지하는 구간?

    let phName = $('.photo_resize .photo') // 요소를 감싸는 영역
    let phStartWidth = 50 // 최초의 넓이
    let phEndWidth = 100 // 마지막의 넓이
    let phWidth // 이미지를 감싸는 요소의 넓이 단위는 % 
    let phGap // 최종 스크롤을 계산하는 높이
    let phStart // 애니메이션 시작 위치
    let phEnd // 애니메이션 종료 위치

    function photoResize (){
        phStart = phName.offset().top - window_h + (window_h * 0.3)
        phEnd = phName.offset().top - (window_h * 0.3)
        console.log('스크롤값', scrolling, '시작점', phStart, '종료점', phEnd)
        if (scrolling < phStart) {
            phWidth = 50
            //console.log('아직 작음')
        } else if (scrolling < phEnd) {
            phGap = phEnd - phStart
            phWidth = (scrolling - phStart)/phGap
            phWidth = (phWidth * (phEndWidth - phStartWidth)) + phStartWidth
            //console.log('늘어나는중')
        } else {
            phWidth = phEndWidth
            //console.log('다 늘어남')
        }
        console.log(phWidth)
        phName.width(phWidth + '%')
    }
    $(window).scroll(function(){ //스크롤 할때 마다
        photoResize()

    })
    $(window).resize(function(){ //브라우저가 리사이즈가 될때
        photoResize()

    })


//이미지 넓이조절 에니메이션(종료)

})