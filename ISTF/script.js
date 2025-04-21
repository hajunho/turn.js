$(document).ready(function() {
    // turn.js 초기화
    $('#book').turn({
        width: $('.book-container').width(),
        height: $('.book-container').height(),
        autoCenter: true,
        gradients: true,
        acceleration: true,
        elevation: 50,
        duration: 1000,
        display: 'single', // 한 페이지씩 보기 모드 (double로 변경 시 두 페이지 보기)
        // 드래그를 위한 설정
        turnCorners: 'bl,br',
        // 넘기기 허용
        enabled: true,
        // 이벤트 핸들러
        when: {
            turning: function(event, page, pageObject) {
                // 페이지 넘김 이벤트
            },
            turned: function(event, page, pageObject) {
                // 페이지 번호 업데이트
                $('#page-number').text(page);
            }
        }
    });

    // 버튼 이벤트
    $('#prev').click(function(e) {
        e.preventDefault();
        $('#book').turn('previous');
    });

    $('#next').click(function(e) {
        e.preventDefault();
        $('#book').turn('next');
    });

    // 총 페이지 수 설정
    var totalPages = $('#book').turn('pages');
    $('#total-pages').text(totalPages);

    // 반응형 처리
    $(window).resize(function() {
        var width = $('.book-container').width();
        $('#book').turn('size', width, $('.book-container').height());
    });

    // 직접 드래그 활성화 (모바일 터치 이벤트 처리)
    $('#book').on('touchstart touchmove touchend', function(e) {
        e.stopPropagation();
    });

    // 키보드 이벤트 추가
    $(document).keydown(function(e) {
        switch(e.keyCode) {
            case 37: // 왼쪽 화살표
                $('#book').turn('previous');
                break;
            case 39: // 오른쪽 화살표
                $('#book').turn('next');
                break;
        }
    });
});