function initGnb() {
	// 햄버거 메뉴 액션
	var header = $('header#header');
	var btnOpen = header.find('.btn-menu-open');
	var globalUserNavi = $('nav#gnb');
	var btnClose = globalUserNavi.find('.btn-menu-close');
	var isOpen = false;
	
	btnOpen.on('click',function() {
		if(isOpen == false) {
			$('html,body').css({
				'overflow':'hidden'
			})
			globalUserNavi.show();
			globalUserNavi.animate({
				'right': '0%'
			},200)
			
			isOpen = true
		}
	})

	btnClose.on('click',function() {
		if(isOpen == true) {
			
			globalUserNavi.animate({
				'right': '-100%'
			},200,function() {
				$('html,body').css({
					'overflow':''
				})
				globalUserNavi.removeAttr('style')
				isOpen = false;
			})
		}
	})
}

//LNB
function initLNB() {
	var lnb = $('nav#lnb');
	var lList = lnb.find('>ul');
	var lItem = lList.find('>li');

	function scrollSetting() {
		if(lItem.find('>a').hasClass('active')) {
			lListWidth = lList.outerWidth();
			activeWidth = lItem.find('>a.active').parent().width();
			acitiveOfsLeft = lItem.find('>a.active').parent().offset().left;

			lList.animate({
				'scrollLeft': (acitiveOfsLeft+activeWidth)-lListWidth
			})
		}
	}

	setTimeout(function() {
		scrollSetting()
	},100)
	$(window).on('orientationchange',function() {
		scrollSetting()
	})
}


$(document).ready(function() {
	initGnb() //GNB
	initLNB() //LNB

	// 헤더 고정
	$(window).scroll(function() { 
		var height = $(window).scrollTop(); 
		if(height > 60) {
			$('.header-wrap').addClass('fixed');
		} else{
			$('.header-wrap').removeClass('fixed');
		}
	});

	// 메인 비쥬얼 슬라이드
	$('#intro-slide-wrap').slick({
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
		dots: true,
	});

	// 임시(테스트중)
	// $('#intro-slide-wrap .ani-item-list > div').each(function(i,el){
	// 	var $this = $(this);
	// 	setTimeout(function(){
	// 		$this.addClass('active');
	// 	}, i*1000);
	// });


	// 뉴스리스트 슬라이드
	$('.news-slide-wrap').slick({
		dots: true,
	});

	
})


