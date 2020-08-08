


function initGnb() {
	// 햄버거 메뉴 액션
	var header = $('header#header');
	var btnGnb = header.find('.btn-menu-open')
	var globalUserNavi = $('nav#global-user-navi');
	var gnb = globalUserNavi.find('.gnb');
	var g1Deps = gnb.find('>ul>li');
	var g2Deps = g1Deps.find('>ul>li');
	var btnClose = globalUserNavi.find('.btn-menu-close');
	var isOpen = false;
	var isAll = false;
	
	btnGnb.on('click',function() {
		if(isOpen == false) {
			$('html,body').css({
				'overflow':'hidden'
			})
			globalUserNavi.show();
			globalUserNavi.animate({
				'left': '0%'
			},200)
			
			isOpen = true
		}
	})

	btnClose.on('click',function() {
		if(isOpen == true) {
			
			globalUserNavi.animate({
				'left': '-100%'
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


$(document).ready(function() {
	initHeader() //헤더 Fixed제어
	initGnb() //GNB
	initLNB() //LNB
	initTop() //Top Move

	$('nav.tab-ui').each(function() {
		initTabNavi($(this)); //Tab Navi Ui
	})

	$('.info-agree').each(function() {
		initInfoAgreeMore($(this)) //이용약관 더보기
	})
})