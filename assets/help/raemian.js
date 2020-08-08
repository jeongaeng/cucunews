//마이페이지 공사진행현황 갤러리
function mypageConstructionProgress(mcpID) {
	var constructionProgress = $(mcpID);
		if(constructionProgress.hasClass("construction_progress") == false) return false;
	var screenshot = constructionProgress.find(".screenshot");
	var galleryList = constructionProgress.find(".gallery_list");
	var slides = galleryList.find("ul.slides");
	var sItem = slides.find("li");
		sItem.eq(0).find("a").addClass("active");

	//스크린 샷 세팅
	function viewScreenshot() {
		imgSrc = sItem.find("a.active").attr("href");
		screenshot.find("img").attr("src",imgSrc);

		if(screenshot.hasClass("load") == false) {
			screenshot.addClass("load")
		}
	}
	viewScreenshot();
	
	//아이템 클릭시 스크린샷 변경
	sItem.find("a").on("click",function() {
		tSrc = $(this).attr("href");
		sItem.find("a").removeClass("active");
		$(this).addClass("active")

		screenshot.find("img").attr("src",tSrc);

		return false;
	})
}

//Top Banner Close
function topBannerClose() {
	var topBanner = $("#top_banner");
	topBanner.slideUp(200);
}

//Header
function initHeader() {
	var topBanner = $("#top_banner");
	var tbHeight = function() {
		if(topBanner.length > 0 && topBanner.is(":hidden") == false) {
			return parseInt(topBanner.css("height"));
		} else {
			return 0
		}
	}
	var header = $("header#headerM");
	var headerHeight = parseInt(header.css("height"))+1;
	var container = $("#container");
	if(container.length == 0) return false;
	var lnb = $("nav#lnb, nav#main_navi");
	var footer = $("footer#footerM");
	var footerHeight;
	if(footer.length > 0) {
		footerHeight = parseInt(footer.css("height"));
	} else {
		footerHeight = 0;
	}
	var quick = $("aside.quickM");
	if(quick.length > 0) {
		var quickHeight = parseInt(quick.css("height"));
	}
	var containOfsTop;
	var lnbOfsTop;
	var hIsFixed = null;
	var oldScrTop;
	var newScrTop;

	if($(window).scrollTop() > headerHeight && hIsFixed == null) {
		header.css({
			"position":"fixed",
			"top": "0px"
		})
		container.css({
			"marginTop":parseInt(headerHeight+tbHeight())+"px"
		})
		if(lnb.length > 0) {
			lnb.css({
				"position":"fixed",
				"top": headerHeight+"px"
			})
		}
	}
	if(lnb.length == 0) {
		header.css({
			"position":"fixed",
			"top": "0px"
		})
		container.css({
			"marginTop":parseInt(headerHeight+tbHeight())+"px"
		})
	}
	if(quick.length > 0) {
		quick.css({
			"bottom": "0px"
		})
	}
	
	setTimeout(function() {
		oldScrTop = $(window).scrollTop();
		newScrTop = $(window).scrollTop();
		containOfsTop = container.offset().top;
		
		if(lnb.length > 0) {
			lnbOfsTop = lnb.offset().top;
		}
		if(quick.length > 0) {
			quickHeight = quick.outerHeight()
		}
		
		if($(window).scrollTop() <= containOfsTop) {
			hIsFixed = true
		} else if($(window).scrollTop() > containOfsTop) {
			hIsFixed = false
		}
	},300)

	$(window).on("scroll orientationchange",function() {
		newScrTop = $(window).scrollTop();
		if($(window).scrollTop() <= containOfsTop && hIsFixed == true) {
			if(lnb.length > 0) {
				header.css({
					"position":"",
					"transition":"",
					"top":""
				})
				container.css({
					"marginTop":""
				})
				lnb.css({
					"position":"",
					"top":"",
					"transition":""
				})
			}
			if(quick.length > 0) {
				quick.css({
					"bottom": "0px"
				})
			}
			hIsFixed = false;
		} else if($(window).scrollTop() > containOfsTop && hIsFixed == false) {
			if(lnb.length > 0) {
				header.css({
					"position":"fixed",
					"top": "-"+headerHeight+"px",
					"transition":"0.2s ease top"
				})
				container.css({
					"marginTop":headerHeight+tbHeight()+"px"
				})
				lnb.css({
					"position":"fixed",
					"top": "0px",
					"transition":"0.2s ease top"
				})
			}
			hIsFixed = true
		}
		
		if(hIsFixed == true) {
			if(newScrTop-oldScrTop > 10) {
				if(lnb.length > 0) {
					header.css({
						"top": "-"+headerHeight+"px"
					})
					lnb.css({
						"top": "0px"
					})
				}
				if(quick.length > 0) {
					quick.css({
						"bottom": "0px"
					})
				}
				oldScrTop = newScrTop
			} else if(newScrTop-oldScrTop < -10) {
				if(lnb.length > 0) {
					header.css({
						"top": "0px",
						"transition":"0.2s ease top"
					})
					lnb.css({
						"top": "0px"
					})
				}
				if(quick.length > 0) {
					quick.css({
						"bottom": "-"+quickHeight+"px"
					})
				}
				oldScrTop = newScrTop
			}
			if($(window).scrollTop() >  document.documentElement.scrollHeight - footerHeight - $(window).height()) {
				if(lnb.length > 0) {
					header.css({
						"top":"0px"
					})
					lnb.css({
						"top": headerHeight+"px"
					})
				}
				if(quick.length > 0) {
					quick.css({
						"bottom": "0px"
					})
				}
			}
		}
	})

	if(topBanner.length > 0) {
		topBanner.find("button.btn_close").on("click",function() {
			containOfsTop = containOfsTop - tbHeight();
		})
	}
}

function initGnb() {
	// 햄버거 메뉴 액션
	var header = $("header#headerM");
	var btnGnb = header.find("a.btn_gnb")
	var globalUserNavi = $("nav#global_user_navi");
	var gnb = globalUserNavi.find(".gnb");
	var btnAll = gnb.find(".btn_all button")
	var g1Deps = gnb.find(">ul>li");
	var g2Deps = g1Deps.find(">ul>li");
	var btnClose = globalUserNavi.find("button.btn_close");
	var isOpen = false;
	var isAll = false;
	
	btnGnb.on("click",function() {
		if(isOpen == false) {
			$("html,body").css({
				"overflow":"hidden"
			})
			globalUserNavi.show();
			globalUserNavi.animate({
				"left": "0%"
			},200)
			
			isOpen = true
		}
	})
	
	btnAll.on("click",function() {
		if(isAll == false) {
			$(this).addClass("active");
			$(this).text("전체닫기");
			g1Deps.find("a").addClass("active");
			g1Deps.find("ul").show();

			isAll = true;
		} else if(isAll == true) {
			$(this).removeClass("active");
			$(this).text("전체열기");
			g1Deps.find("a").removeClass("active");
			g1Deps.find("ul").hide();

			isAll = false;
		}
	})

	g1Deps.find(">a").on("click",function() {
		if(isAll == true) {
			btnAll.removeClass("active");
			btnAll.text("전체열기");
			g1Deps.find("a").removeClass("active");
			g1Deps.find("ul").hide();

			isAll = false;
		}

		if($(this).hasClass("active") == false) {
			g1Deps.find("a").removeClass("active");
			g1Deps.find("ul").hide();

			$(this).addClass("active")
			$(this).next("ul").show();
		} else if($(this).hasClass("active") == true) {
			$(this).removeClass("active")
			$(this).next("ul").hide();
		}
	})

	btnClose.on("click",function() {
		if(isOpen == true) {
			
			globalUserNavi.animate({
				"left": "-100%"
			},200,function() {
				$("html,body").css({
					"overflow":""
				})
				globalUserNavi.removeAttr("style")
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

//Top Button
function initTop() {
	if($("button.btn_top").length == 0) return false;

	var btnTop = $("button.btn_top");
	var footer = $("footer#footerM");
	var fOfsTop;
	var fHeight = parseInt(footer.css("height"))+parseInt(footer.css("padding-top"))+parseInt(footer.css("margin-bottom"));
	var quickMenu = $("aside.quickM");
	var quickHeight = function() {
		if(quickMenu.length > 0) {
			return quickMenu.outerHeight()
		} else {
			return 0
		}
	}
	var oldScrTop = $(window).scrollTop();
	var newScrTop = $(window).scrollTop();
	var isFixed = true;

	$(window).on("scroll resize orientationchange",function() {
		if(footer.length > 0) {
			fOfsTop = document.documentElement.scrollHeight - $("footer#footerM").outerHeight() - quickHeight();
		} else {
			fOfsTop = document.documentElement.scrollHeight;
		}
		newScrTop = $(window).scrollTop();
		winHeight = $(this).height();
		if($(this).scrollTop() >= fOfsTop-winHeight+quickHeight() && isFixed == true) {
			btnTop.css({
				"position":"absolute",
				"bottom": "auto",
				"top": $(document).outerHeight()-fHeight-btnTop.height()-15+"px",
				"marginBottom":""
			})
			isFixed = false
		} else if ($(this).scrollTop() < fOfsTop-winHeight && isFixed == false) {
			btnTop.css({
				"position":"",
				"bottom": "",
				"top": "",
				"marginBottom":""
			})
			isFixed = true
		}
		if(quickMenu.length > 0 && isFixed == true) {
			if($(window).scrollTop() > 100) {
				btnTop.fadeIn(200)
			}
			else if($(window).scrollTop() <= 100) {
				btnTop.fadeOut(200)
			}
			if(newScrTop-oldScrTop > 10) {
				btnTop.css({
					"marginBottom": quickMenu.outerHeight()+"px"
				})
				oldScrTop = newScrTop
			} else if(newScrTop-oldScrTop < -10) {
				
				btnTop.css({
					"marginBottom": "0px"
				})
				oldScrTop = newScrTop
			}
		}
	})

	btnTop.on("click",function() {
        $("html,body").animate({
            "scrollTop": 0
        },300)
    })
}

//Tab Navi Ui
function initTabNavi(tNav) {
	var tabNavi = tNav;
	var tnLIst = tNav.find("ul");
	var tnGroup;
	var tnItem = tnLIst.find("li")

	tnItem.find("a").on("click",function() {
		if($(this).hasClass("link") == false) {
			tnGroup = $(this).parents("ul").attr("data-tab-group");
			//console.log(tnGroup)
			tContId = $(this).attr("href");

			tnItem.find("a").removeClass("active");
			$(this).addClass("active");

			$(".tab_content[data-tab-group='"+tnGroup+"']").hide();
			$(tContId).show();

			return false;
		}
	})
}

//Open Layer Popup
function openLayerPopup(popupID,retrunTarget) {
	var btnTop = $("body>button.btn_top");
	var btOfsTop = 0;
	var btOfsLeft = 0;
	var bgModal = $("#bg_modal");
	var tPopup = $(popupID);
	var btnClose = tPopup.find(">button.btn_close");
	var openIs = false;

	if(btnTop.length > 0) {
		btOfsTop = btnTop.offset().top;
		btOfsLeft = btnTop.offset().left;
	}
	$("body").css({
		"overflow": "hidden"
	})
	btnTop.css({
		"position": "absolute",
		"right": "auto",
		"bottom": "auto",
		"top": btOfsTop+"px",
		"left": btOfsLeft+"px"
	})
	bgModal.fadeIn(200)
	tPopup.show()
	function lpSetting() {
		tPopup.css({
			"width": $(window).width()-50+"px",
		})
		
		if(tPopup.hasClass("layer_popup") == true) {
			lpHeader = tPopup.find("h3");
			lpHeaderHeight = lpHeader.outerHeight();
			lpContent = tPopup.find(".lp_content");
			lpContentHeight = lpContent.outerHeight();
			btnLpSet = tPopup.find(".btn_lp_set");
			btnLpSetHeight = btnLpSet.outerHeight();

			if(tPopup.find(".btn_lp_set").length == 0) {
				tPopup.css({
					"padding-bottom":"30px"
				})
			}
			
			if($(window).height() <= tPopup.outerHeight()+60) {
				tPopup.css({
					"height": $(window).height()-60+"px"
				})
				lpContent.css({
					"height": $(window).height()-lpHeaderHeight-btnLpSetHeight-112+"px"
				})
			} else {
				tPopup.css({
					"height": ""
				})
				lpContent.css({
					"height": ""
				})
			}
		} else if(tPopup.hasClass("tooltip_popup") == true) {
			tpHeader = tPopup.find("h3");
			tpHeaderHeight = tpHeader.outerHeight();
			tpContent = tPopup.find(".tp_content");
			tpContentHeight = tpContent.outerHeight();
			btnTpSet = tPopup.find(".btn_tp_set");
			btnTpSetHeight = btnTpSet.outerHeight();
			
			if($(window).height() <= tPopup.outerHeight()+60) {
				tPopup.css({
					"height": $(window).height()-60+"px"
				})
				tpContent.css({
					"height": $(window).height()-tpHeaderHeight-btnTpSetHeight-60+"px"
				})
			} else {
				tPopup.css({
					"height": ""
				})
				tpContent.css({
					"height": ""
				})
			}
		}
	}
	lpSetting();
	$(window).on("resize orientationchange",function() {
		lpSetting()
	})
	tPopup.animate({
		"opacity":1
	},300,function() {
		if(openIs == false) {
			openIs = true;
		}
	})

	btnClose.on("click",function() {
		if(openIs == true && $(this).hasClass("cb") == false) {
			tPopup.animate({
				"opacity":0
			},300,function() {
				tPopup.hide()
			});

			$("body").css({
				"overflow": ""
			})
			btnTop.css({
				"position": "",
				"right": "",
				"bottom": "",
				"top": "",
				"left": ""
			})
			//initTopMove();
			$(window).resize();
			bgModal.css("overflow-y","")
			bgModal.fadeOut(200)
			openIs = false;
		}
	})
}

//Close Layer Popup
function closeLayerPopup(tPopup) {
	var bgModal = $("#bg_modal");
	var closePopup = $(tPopup);
	var btnQuickSearch = $("body>a.btn_quick_search");
	var btnTop = $("body>button.btn_top");

	closePopup.animate({
		"opacity":0
	},200,function() {
		closePopup.hide()
	});
	
	$("body").css({
		"width": "",
		"overflow": ""
	})
	bgModal.css("overflow-y","")
	bgModal.fadeOut(200)
	btnQuickSearch.css({
		"position": "",
		"right": "",
		"top": "",
		"left": "",
		"marginTop": ""
	})
	btnTop.css({
		"position": "",
		"right": "",
		"bottom": "",
		"top": "",
		"left": ""
	})
	//initTopMove();
	$(window).resize();
	
}

// 단지 검색
function initSearchFilter() {
	var searchfilter = $("#searchfilter");
	var btnClose = searchfilter.find(".close");

	$("html").addClass("fix");
	searchfilter.addClass("on");

	btnClose.click(function(){
		$("html").removeClass("fix");
		$("#searchfilter").removeClass("on");
		$("#sbox").val("");
	});
}

//이용약관 더보기
function initInfoAgreeMore(tCont) {
	var infoAgree = tCont;
	var detail = infoAgree.find(".agree_content .detail");
	var btnMore = detail.find("button.more");

	btnMore.on("click",function() {
		if($(this).hasClass("on") == false) {
			$(this).addClass("on")
			$(this).text("접어보기");
			$(this).parent().css({
				"height": "auto"
			})
		} else if($(this).hasClass("on") == true) {
			$(this).removeClass("on")
			$(this).text("펼쳐보기");
			$(this).parent().css({
				"height": ""
			})
		}
	})
}
	
//메인 이벤트 팝업 슬라이드
function initMainLayerPopup() {
	var mainLayerPopup = $(".main_layer_popup");
	var mlpSlider = mainLayerPopup.find(".mlp_slider")
	var mlpPaging = mainLayerPopup.find(".mlp_paging")

	mlpSlider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
		var i = (currentSlide ? currentSlide : 0) + 1;
		mlpPaging.text(i + '/' + slick.slideCount);

		if(slick.slideCount == 1) {
			mlpPaging.hide();
		}
	});
	
	mlpSlider.slick({
		dots: false,
		arrows: false,
		adaptiveHeight: true
	});
}

/* 메인 스크롤 인터렉션 */
function mainScrollInt() {
	var mainContainer = $("#container");
	var mainVisuial = mainContainer.find("#main_visual");
	var quick = $("aside.quick")
	var mainCont = mainContainer.find("article.main_content, aside.main_event_list");
	var msOfsTop = new Array();
	var msHeight = new Array();
	var msIsView = new Array();

	mainCont.each(function(i) {
		msOfsTop[i] = mainCont.eq(i).offset().top;
		msHeight[i] = mainCont.eq(i).outerHeight();
		msIsView[i] = false
	})

	$(window).on("load resize scroll",function() {
		mainCont.each(function(k) {
			//console.log(Math.ceil((msOfsTop[k])-parseInt($(window).height()/3) ))
			if($(window).scrollTop() >= Math.ceil((msOfsTop[k])-(parseInt($(window).height()-($(window).height()/4))))-quick.outerHeight() && msIsView[k] == false) {
				mainCont.eq(k).addClass("view")
				msIsView[k] = true;
			}
		})
	})
}

/* 메인 비주얼 롤링 */
function mainVisualSlide() {
	var mainVisual = $("article#main_visual");
	var mvSlider =  mainVisual.find(".mv_slider");
	var btnNavi = mainVisual.find(".btn_navi")
	var btnPlayer = btnNavi.find(".btn_player");
	var autoIs = true;
	
	//슬릭 초기화
	mvSlider.on('init', function(event, slick){
		if(mvSlider.find(".slick-slide:eq(1) video").length > 0) {
			mvSlider.find(".slick-slide:eq(1) video").get(0).play();
		}

		if(slick.slideCount == 1) {
			btnPlayer.hide();
		}
	});

	//슬릭 슬라이더 최초 세팅
	mvSlider.slick({
		slidesToShow: 1,
		dots: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
		dotsClass: "indicator",
		appendDots: mainVisual.find(".btn_navi")
	});
	btnPlayer.appendTo(btnNavi)

	//Play,Pause 버튼 클릭시
	btnPlayer.find("button").on("click",function() {
		if(autoIs == true) {
			$(this).addClass("play");
			mvSlider.slick('slickPause')
			autoIs = false;
		} else if(autoIs == false) {
			$(this).removeClass("play");
			mvSlider.slick('slickPlay')
			autoIs = true;
		}
	})

	//슬라이드 변경 전 영상 리셋
	mvSlider.on('beforeChange',function(event, slick, currentSlide) {
		if(mvSlider.find(".slick-slide:eq("+(currentSlide+1)+") video").length > 0) {
			mvSlider.find(".slick-slide:eq("+(currentSlide+1)+") video").get(0).pause();
			mvSlider.find(".slick-slide:eq("+(currentSlide+1)+") video").get(0).currentTime = 0;
		}
	})
	
	//슬라이드 변경 후 영상 재생
	mvSlider.on('afterChange',function(event, slick, currentSlide) {
		if(mvSlider.find(".slick-slide:eq("+(currentSlide+1)+") video").length > 0) {
			mvSlider.find(".slick-slide:eq("+(currentSlide+1)+") video").get(0).play();
		}
	});
}

//메인 래미안 단지정보
function initMainPreSale() {
	var mainPreSale = $("article#main_pre_sale");
	var mpsSlider = mainPreSale.find(".sale_list");

	mpsSlider.slick({
		dots: true,
		arrows: false,
		variableWidth: true,
		centerMode: true,
		infinite: false,
		dotsClass: "indicator",
		appendDots: mainPreSale
	});
}

//메인 스토리지 팝업
function mainStoragePopup() {
	if($(".main_storage_popup").length == 0) return false;
	
	var mainStoragePopup = $(".main_storage_popup");
	var btnClose = mainStoragePopup.find("button.btn_close");
	var btnTop = $("button.btn_top");
		if(btnTop.length > 0) {
			btnTop.css({
				"transform": "translateY(-"+parseInt(mainStoragePopup.outerHeight()+13)+"px)"
			})
		}
	var footer = $("footer#footerM");
	var fOfsTop;
	var fHeight = parseInt(footer.css("height"))+parseInt(footer.css("padding-top"))+parseInt(footer.css("margin-bottom"));
	var quickMenu = $("aside.quickM");
	var quickHeight = function() {
		if(quickMenu.length > 0) {
			return quickMenu.outerHeight()
		} else {
			return 0
		}
	}
	var oldScrTop = $(window).scrollTop();
	var newScrTop = $(window).scrollTop();
	var isFixed = true;

	$(window).on("scroll resize orientationchange",function() {
		if(footer.length > 0) {
			fOfsTop = document.documentElement.scrollHeight - $("footer#footerM").outerHeight() - quickHeight();
		} else {
			fOfsTop = document.documentElement.scrollHeight;
		}
		newScrTop = $(window).scrollTop();
		winHeight = $(this).height();
		
		//console.log($(window).scrollTop()+" , "+parseInt(fOfsTop+btnTop.height()-winHeight+15))
		if($(window).scrollTop() >= fOfsTop-winHeight+quickHeight() && isFixed == true) {
			mainStoragePopup.css({
				"position":"absolute",
				"bottom": "auto",
				"top": $(document).outerHeight()-fHeight-mainStoragePopup.height()-30+"px",
				"transform":"translateY(0)",
				"transition": "none"
			})
			isFixed = false
		} else if ($(window).scrollTop() < fOfsTop-winHeight && isFixed == false) {
			mainStoragePopup.css({
				"position":"",
				"bottom": "",
				"top": "",
				"transform":"translateY(0)",
				"transition": "none"
			})
			isFixed = true
		}
		if(quickMenu.length > 0 && isFixed == true) {
			if (newScrTop-oldScrTop > 10  || $(window).scrollTop() <= 100) {
				mainStoragePopup.css({
					"transform":"translateY(0)"
				})
				oldScrTop = newScrTop
			} else if(newScrTop-oldScrTop < -10 && $(window).scrollTop() > 100) {
				mainStoragePopup.css({
					"transform":"translateY(64px)"
				})
				oldScrTop = newScrTop
			}

			if($(window).scrollTop() > 100) {
				mainStoragePopup.css({
					"transition": ""
				})
			}
		}
	})

	btnClose.on("click",function() {
		mainStoragePopup.hide();
		btnTop.css({
			"transform": "translateY(0px)"
		})
	})
}



/* 경고문 & 주의사항 & 유의사항 */
function initWarningListMore(tListID,tItemLen) {
	if($(tListID).find("button.more").length == 0) return false;

	var iwList = $(tListID);
	var iwItem = iwList.find(">ul>li");
	var iwItemLen = tItemLen;
	var btnMore = iwList.find("button.more");

	iwItem.eq(tItemLen-1).nextAll().hide();

	btnMore.on("click",function() {
		if($(this).hasClass("on") == false) {
			$(this).addClass("on")
			$(this).text("접어보기");
			iwItem.show();
		} else if($(this).hasClass("on") == true) {
			$(this).removeClass("on")
			$(this).text("펼쳐보기");
			iwItem.eq(tItemLen-1).nextAll().hide();
		}
	})
}

//헤스티아 서비스
function initHestia() {
	var serviceContents = $("#contents");
	var sCont = serviceContents.find(".service_content");
	var sOfsTop = new Array();
	var sHeight = new Array();
	var sIsView = new Array();

	sCont.each(function(i) {
		sOfsTop[i] = sCont.eq(i).offset().top;
		sHeight[i] = sCont.eq(i).outerHeight();
		sIsView[i] = false
	})

	$(window).on("load resize scroll",function() {
		sCont.each(function(k) {
			if($(window).scrollTop() >= Math.ceil(sOfsTop[k]-($(window).height()/1.8)) && sIsView[k] == false) {
				sCont.eq(k).addClass("view")
				sIsView[k] = true;
			}
		})
	})
}

//브랜드
function initBrand() {
	var brandContents = $("#contents");
	var bCont = brandContents.find(".brand");
	var sOfsTop = new Array();
	var bHeight = new Array();
	var bIsView = new Array();

	bCont.each(function(i) {
		sOfsTop[i] = bCont.eq(i).offset().top;
		bHeight[i] = bCont.eq(i).outerHeight();
		bIsView[i] = false
	})

	$(window).on("load resize scroll",function() {
		bCont.each(function(k) {
			if($(window).scrollTop() >= Math.ceil(sOfsTop[k]-($(window).height()/1.02)) && bIsView[k] == false) {
				bCont.eq(k).addClass("view")
				bIsView[k] = true;
			}
		})
	})
}


//래미안 조경의 진화
function initLandscapeEvolution() {
	var popupLandscapeEvolution = $(".raemian_landscape_evolution");
	var rleTit = popupLandscapeEvolution.find("h3")
	var rleTitOfsTop = parseInt(rleTit.css("top"));
	var rleTitFixed = false;
	var rleTab = popupLandscapeEvolution.find("nav.rle_tab");
	var btnTermMove = popupLandscapeEvolution.find(".btn_term_move button");
	var btnClose = popupLandscapeEvolution.find("button.btn_close");
	
	//조경팝업 열기
	initRleCont(0); //래미안 조경의 진화 컨텐츠 인터렉션 최초 실행
	
	//조경팝업 스크롤시
	$(window).on("load scroll orientationchange",function() {
		if($(this).scrollTop() > rleTitOfsTop && rleTitFixed == false) {
			rleTit.css({
				"position":"fixed",
				"font-size": "20px",
				"padding": "12px 0px 20px"
			})
			rleTab.css({
				"position":"fixed",
				"top": "60px",
				"padding-top": "8px",
				"height": "auto"
			})
			rleTab.find("ul>li>a").css({
				"height": "auto",
				"font-size": "13px",
				"line-height": "19px",
				"padding-bttom": "10px"
			})
			rleTitFixed = true
		} else if($(this).scrollTop() <= rleTitOfsTop && rleTitFixed == true) {
			rleTit.css({
				"position":"",
				"font-size": "",
				"padding": ""
			})
			rleTab.css({
				"position":"",
				"top": "",
				"padding-top": "",
				"height": ""
			})
			rleTab.find("ul>li>a").css({
				"height": "",
				"font-size": "",
				"line-height": "",
				"padding-bttom": ""
			})
			rleTitFixed = false
		}
	})

	//탭 클릭시
	rleTab.find("ul>li>a").on("click",function() {
		$(window).scrollTop(0);
		tIndex = $(this).parent().index();
		initRleCont(tIndex); //래미안 조경의 진화 컨텐츠 인터렉션
		//console.log(tIndex)
	})

	//하단 년도 이동 버튼 클릭시
	btnTermMove.on("click",function() {
		tIndex = parseInt($(this).attr("data-rle-index"));
		rleTab.find("ul>li:eq("+(tIndex-1)+")>a").click();
	})
}
		
//래미안 조경의 진화 컨텐츠 인터렉션
function initRleCont(wrapIdx) {
	var popupLandscapeEvolution = $(".raemian_landscape_evolution");
	var rleTab = popupLandscapeEvolution.find("nav.rle_tab");
	var rleTabheight = rleTab.outerHeight();
	var rleContent = popupLandscapeEvolution.find(".rle_content");
		rleContent.find(".product_intro .pi_cont").removeClass("view");
		rleContent.find(".adjacent_area_intro figure.aai_cont").removeClass("view");
	var piOfsTop = [];
	var piView = [];
	var aaiOfsTop = [];
	var aaiView = [];
	
	
	//console.log(rleContent.eq(wrapIdx).attr("id"))
	//console.log(rleContent.eq(wrapIdx).find(".product_intro").position().top)

	//컨텐츠 위치 구하기
	function posSetting() {
		piOfsTop = []
		piView = []
		rleContent.eq(wrapIdx).find(".product_intro").each(function(h) {
			rleContent.eq(wrapIdx).find(".product_intro").eq(h).find(".pi_cont").each(function(i) {
				piOfsTop.push(rleContent.eq(wrapIdx).find(".product_intro").eq(h).find(".pi_cont").eq(i).position().top + rleContent.eq(wrapIdx).find(".product_intro").eq(h).position().top - $(window).height()/2);
				piView.push(false);
			})
		})
		//console.log(piOfsTop)

		aaiOfsTop = [];
		aaiView = [];
		rleContent.eq(wrapIdx).find(".adjacent_area_intro").each(function(a) {
			rleContent.eq(wrapIdx).find(".adjacent_area_intro").eq(a).find("figure.aai_cont").each(function(b) {
				aaiOfsTop.push(rleContent.eq(wrapIdx).find(".adjacent_area_intro").eq(a).find("figure.aai_cont").eq(b).position().top - $(window).height()/1.8);
				aaiView.push(false);
			})
		})
	}
	setTimeout(function() {
		posSetting()
	},300)

	//스크롤 시 컨텐츠 인터렉션
	$(window).on("scroll orientationchange",function() {
		posSetting()

		//console.log($(window).scrollTop()+" , "+aaiOfsTop)
		rleContent.eq(wrapIdx).find(".pi_cont").each(function(k) {
			if($(window).scrollTop() >= piOfsTop[k] && piView[k] == false) {
				rleContent.eq(wrapIdx).find(".pi_cont").eq(k).addClass("view");
				piView[k] = true;
			}
		})
		
		rleContent.eq(wrapIdx).find("figure.aai_cont").each(function(c) {
			if($(window).scrollTop() >= aaiOfsTop[c] && aaiView[c] == false) {
				rleContent.eq(wrapIdx).find("figure.aai_cont").eq(c).addClass("view");
				aaiView[c] = true;
			}
		})
	})
}

//단지검색
function initCenterMap(tabContID) {
	if($(tabContID).hasClass("tab_content") == false) return false;

	var mapImgWrap = $(tabContID).find(".map_img_wrap");
	var winWidth = $(window).width();
	var imgWidth = mapImgWrap.find(".map_img").width();
	var scrMove = parseInt((imgWidth - winWidth)/2)

	//지도 가운데 스크롤
	mapImgWrap.css({"opacity":0})
	setTimeout(function() {
		//console.log(scrMove)
		mapImgWrap.animate({
			"scrollLeft":scrMove,
			"opacity":1
		},100)
	},10)
}


$(document).ready(function() {
	initHeader() //헤더 Fixed제어
	initGnb() //GNB
	initLNB() //LNB
	initTop() //Top Move

	$("nav.tab_ui").each(function() {
		initTabNavi($(this)); //Tab Navi Ui
	})

	$(".info_agree").each(function() {
		initInfoAgreeMore($(this)) //이용약관 더보기
	})
})