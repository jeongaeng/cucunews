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
	var lnb = $("nav#lnb");
	var lList = lnb.find(">ul");
	var lItem = lList.find(">li");

	function scrollSetting() {
		if(lItem.find(">a").hasClass("active")) {
			lListWidth = lList.outerWidth();
			activeWidth = lItem.find(">a.active").parent().width();
			acitiveOfsLeft = lItem.find(">a.active").parent().offset().left;

			lList.animate({
				"scrollLeft": (acitiveOfsLeft+activeWidth)-lListWidth
			})
		}
	}

	setTimeout(function() {
		scrollSetting()
	},100)
	$(window).on("orientationchange",function() {
		scrollSetting()
	})
}



$(document).ready(function() {
	initGnb() //GNB
	initLNB() //LNB

	// 메인 비쥬얼 슬라이드
	$('.visual-wrap').slick({
		autoplay: true,
		autoplaySpeed: 3000,
	});

	// 뉴스리스트 슬라이드
	$('.news-slide-wrap').slick({
		dots: true,
	});
})