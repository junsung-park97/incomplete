/*
* contents.js
* 각각의 콘텐츠 페이지에서 작동될 스크립트 저장
*/
$(document).ready(function () {
    let lastScrollTime = Date.now(); // 마지막 스크롤 시간 저장
    let allScrollInter = [];
    let averageScrollInterval = 200; // 초기 평균 스크롤 간격
    let scrollTimer; // 타이머를 저장할 변수

    $(window).on("scroll", function () {
        const currentTime = Date.now(); // 현재 시간
        const interval = currentTime - lastScrollTime; // 현재와 마지막 스크롤 간의 시간 차이

        // 50ms 이상일 경우만 간격 기록 (너무 짧은 간격은 무시)
        if (interval > 50) {
            allScrollInter.push(interval);

            // 최근 10개의 간격만 유지 (필요 이상으로 쌓이지 않도록)
            if (allScrollInter.length > 10) {
                allScrollInter.shift();
                
            }

            // 평균 스크롤 간격 계산
            averageScrollInterval =
                allScrollInter.reduce((sum, val) => sum + val, 0) /
                allScrollInter.length;
                
        }

        // 스크롤 중에는 버튼 바 숨김
        $(".cnt_history .history_tab").fadeOut(100);

        // 스크롤이 멈췄는지 확인
        clearTimeout(scrollTimer); // 기존 타이머 초기화
        scrollTimer = setTimeout(function () {
            // 평균 스크롤 간격 이후에 버튼 바 표시
            $(".cnt_history .history_tab").fadeIn(100);
        }, averageScrollInterval);

        lastScrollTime = currentTime; // 마지막 스크롤 시간 업데이트
    });
});