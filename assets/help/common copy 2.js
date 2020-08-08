$(function(){

    /* ========================================================================
    * component: datepicker
    * jquery-ui.js: http://jqueryui.com/datepicker/
    * ======================================================================== */

    // datepicker
    $('.input-datepicker').datepicker({
        showOn: "both", // 버튼과 텍스트 필드 모두 캘린더를 보여준다.
        buttonImage: "../../assets/images/icon-calendar.png", // 버튼 이미지
        buttonImageOnly: true, // 버튼에 있는 이미지만 표시한다.
        changeMonth: true, // 월을 바꿀 수 있는 셀렉트 박스를 표시한다.
        changeYear: true, // 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
        minDate: '-100y', // 현재 날짜로부터 100년 이전까지 년을 표시한다.
        nextText: '다음 달', // next 아이콘의 툴팁.
        prevText: '이전 달', // prev 아이콘의 툴팁.
        numberOfMonths: [1,1], // 한번에 얼마나 많은 월을 표시할 것인가. [2,3] 일 경우, 2(행) x 3(열) = 개의 월을 표시한다.
        stepMonths: 3, // next, prev 버튼을 클릭했을때 얼마나 많은 월을 이동하여 표시하는가.
        yearRange: 'c-100:c+10', // 년도 선택 셀렉트 박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할 것인가.
        showButtonPanel: true, // 캘린더 하단에 버튼 패널을 표시한다.
        currentText: '오늘 날짜' , // 오늘 날짜로 이동하는 버튼 패널
        closeText: '닫기',  // 닫기 버튼 패널
        dateFormat: "yy-mm-dd", // 텍스트 필드에 입력되는 날짜 형식.
        //showAnim: "slide", //애니메이션을 적용한다.
        showMonthAfterYear: true , // 월, 년순의 셀렉트 박스를 년, 월 순으로 바꿔준다.
        dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'], // 요일의 한글 형식.
        monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], // 월의 한글 형식.
        
        // jquery ui 데이트 피커 z-index 디버깅
        beforeShow: function(){
            setTimeout(function(){
                $('.ui-datepicker').css('z-index', 10);
            }, 1);
        }
    });

    // datepicker: 초기값을 오늘 날짜로 설정(-1D: 하루 전, -1M: 한달 전, -1Y: 일년 전), (+1D: 하루 후, -1M: 한달 후, -1Y: 일년 후)
    // $('.input-datepicker').datepicker('setDate', 'today');

    /* ========================================================================
    * component: dropdown
    * ======================================================================== */

    // dropdown: 옵션 리스트 영역 여닫기
    $('.dropdown-box').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropdown-list').slideToggle(200);
    });

    // dropdown: 포커스 아웃 시 옵션 리스트 영역 닫기
    $('.dropdown-box').focusout(function () {
        $(this).removeAttr('tabindex');
        $(this).removeClass('active');
        $(this).find('.dropdown-list').slideUp(200);
    });

    // dropdown: 옵션 리스트 선택
    $('.dropdown-box .dropdown-list li').click(function () {
        $(this).parents('.dropdown-box').find('span').text($(this).text());
    });

    /* ========================================================================
    * component: form
    * ======================================================================== */

    // select: 옵션 리스트 영역 여닫기
    $('.select:not([disabled])').on('click', function(){
        $(this).toggleClass('open').attr('tabindex', 1).focus();
    })

    // select: 포커스 아웃 시 옵션 리스트 영역 닫기
    $('.select:not([disabled])').on('focusout', function(){
        $(this).removeClass('open').removeAttr('tabindex');
    })

    // select: 옵션 리스트 선택
    $('.select .option-list li').click(function () {
        $(this).parents('.select').find('span.current').text($(this).text());
    });

    // search: 자동 검색 영역 show/hide
    $('.search input').keyup(function(e){
        e.preventDefault();
        var value = $(this).val();
        if(value === ''){
            $('.search-history-area').hide();
        }else{
            $('.search-history-area').show();
        }
    });

    // input[type="file"]: 업로드 버튼 클릭 시
    var fileTarget = $('.filebox .upload-hidden');
    fileTarget.on('change', function(){
        if(window.FileReader){
            var filename = $(this)[0].files[0].name;
        }else{
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }
        $(this).parent().siblings('.upload-name').val(filename);
    });



    /* ========================================================================
    * component: popup
    * ======================================================================== */

    // 윈도우 팝업: 변수
    var newName
    var n = 0;

    // 윈도우 팝업: 넘버링 확인
    function newWindow(value){
        n = n + 1;
        newName = value + n;
        console.log(newName);
    }

    // 윈도우 팝업: 사이즈 계산
    function winPopupSize(url){
        var winHeight = document.body.clientHeight; // 현재창의 높이
        var winWidth = document.body.clientWidth; // 현재창의 너비
        var popWidth = winWidth * 0.75; // 화면에 띄울 팝업창 너비
        var popHeight = winHeight * 0.75; // 화면에 띄울 팝업창 높이
        var winX = window.screenX || window.screenLeft || 0; // 현재창의 x축 좌표
        var winY = window.screenY || window.screenTop || 0; // 현재창의 y축 좌표
        var popX = winX + (winWidth - popWidth) / 2; // 팝업창의 x축 좌표
        var popY = winY + (winHeight - popHeight) / 2; // 팝업창의 y축 좌표

        console.log("popX :" + popX);
        console.log("popY :" + popY);
        newWindow("MyWindow");

        window.open(url, newName, "width=" + popWidth + "px, height=" + popHeight + "px, top=" + popY + ", left=" + popX + ", scrollbars=yes");
    }

    // 윈도우 팝업: 열기 버튼 클릭 시
    $('.btn-window-popup-open').click(function(){
        var url = 'winpop.html';
        winPopupSize(url);
    })

    // 모달 팝업: 열기
    function popupOpen(){
        $('body').addClass('popup-open');
        $('.popup-container').addClass('active').fadeIn(200);
        $('.dimmed').addClass('active').fadeIn(200);
        $('.popup').addClass('open').fadeIn(250);
    }
    function popupOpen2(){
        $('body').addClass('popup-open2');
        $('.popup-container2').addClass('active').fadeIn(200);
        $('.dimmed').addClass('active').fadeIn(200);
        $('.popup').addClass('open').fadeIn(250);
    }

    // 모달 팝업: 닫기
    function popupClose(){
        $('body').removeClass('popup-open');
        $('body').removeClass('popup-open2');
        $('.dimmed, .popup-container').removeClass('active').fadeOut(200);
        $('.popup').removeClass('open').fadeOut(250);
    }

    // 모달 팝업: 열기 버튼 클릭 시
    $('.btn-popup-open').on('click', function(){
        popupOpen();
    });
    $('.btn-popup-open2').on('click', function(){
        popupOpen2();
    });

    // 모달 팝업: 닫기 버튼 클릭 시
    $('.btn-popup-close').on('click', function(){
        popupClose();
    });


    /* ========================================================================
    * component: tab
    * ======================================================================== */

    $('.tabs > li').on('click', function(){
        // tab 여닫기
        var idx = $(this).index();
        var target = $(this).parent().next('.tab-contents').children('li');
        $(this).addClass('selected').siblings().removeClass('selected');
        target.eq(idx).addClass('active').siblings().removeClass('active');

        // tab 영역으로 윈도우 스크롤 이동
        var tabSpot = $(this).parent().offset().top;
        var calcHeight = tabSpot - headerHeight;
        window.scroll(0, calcHeight);
    })

    /* ========================================================================
    * 아래 코드는 components.html에서만 사용합니다.
    * ======================================================================== */

    // handler라는 핸들러 사용(이벤트 전파 방지)
    var handler = function(e){
        e.preventDefault();
    };

    // a태그 중 href attribute가 "#"인 경우 클릭 시 이벤트 전파 방지
    $('a[href*="#"]').on("click", handler);

    
    /* ========================================================================
    * component: gnb
    * ======================================================================== */
   
    var menu_v = $('.gnb');
    var sItem = menu_v.find('>ul>li');
    var ssItem = menu_v.find('>ul>li>ul>li');
    var lastEvent = null;
    
    sItem.find('>ul').css('display','none');
    menu_v.find('>ul>li>ul>li[class=active]').parents('li').attr('class','on');
    menu_v.find('>ul>li[class=active]').find('>ul').css('display','block');

    function menu_vToggle(event){
        var t = $(this);
        
        if (this == lastEvent) return false;
        lastEvent = this;
        setTimeout(function(){ lastEvent=null }, 200);
        
        if (t.next('ul').is(':hidden')) {
            sItem.find('>ul').slideUp(100);
            t.next('ul').slideDown(100);
        } else if(!t.next('ul').length) {
            sItem.find('>ul').slideUp(100);
        } else {
            t.next('ul').slideUp(100);
        }
        
        if (t.parent('li').hasClass('on')){
            t.parent('li').removeClass('on');
        } else {
            sItem.removeClass('on');
            t.parent('li').addClass('on');
        }
    }
    sItem.find('>a').click(menu_vToggle).focus(menu_vToggle);
    
    function subMenuActive(){
        ssItem.removeClass('on');
        $(this).parent(ssItem).addClass('on');
    }; 
    ssItem.find('>a').click(subMenuActive).focus(subMenuActive);
    



});

function uiForm() {
    var radioForm = 'input[type=radio]';

    //라디오버튼
    $(radioForm).each(function () {
        if ($(this).prop('checked') == true) {
            var labelFor = $(this).attr('id');
            $('[for="'+labelFor+'"]').addClass('checked');
        } 
        else if( $(this).prop('disabled') == true) { 
            $(this).parent().addClass('disabled');
        }
    });

    $(document).on('click', radioForm, function(){
        var labelFor = $(this).attr('id');
        var n = $(this).attr('name');
        $('[name="' + n + '"]').parent().removeClass('checked');
        $('[for="'+labelFor+'"]').addClass('checked');
    });
}


// document ready
$(document).ready(function(){
    uiForm();

    // datepicker
    $('.input-datepicker').datepicker();

    // 조회결과 요약정보 토글
    $('.summary-wrap .btn-control').click(function () {
        $(this).parent().parent().toggleClass('active');
        $(this).find('.summary-detail-more').slideToggle(200);
    });

    // 공통코드관리
    $('.master-code-list li a').click(function(){
        $(this).parent().addClass('on').siblings().removeClass('on');
    });
    
});