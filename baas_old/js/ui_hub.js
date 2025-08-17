$(function(){
	
	/* ==============================
	 * common
	 * ============================== */
	
	// util menu display
	AlramMenu();
	
	// util menu display
	UserUtil();

	
	/* ==============================
	 * lnb 
	 * ============================== */
	Lnb();

	//Input Reset
	InputReset();
});




// functions

// LNB
function Lnb() {
    $('.btn_allmenu').click(function() {
        $(this).toggleClass('active');
        $('.lnb').toggleClass('open');

		if ($(this).hasClass('active')){
			$('body').css('overflow-y', 'hidden');
		} else {
			$('body').css('overflow-y', '');
		}
    });
}

// alram menu display
function AlramMenu() {
	$('.alram_wrap').find('.btn_alram').on('click', function(){
		if ( $('.alram_box').css('display') == 'none')
		{
			$('.alram_box').show();
		} else {
			$('.alram_box').hide();
		}
	});
	$('.alram_box').find('.btn_close').on('click', function(){
		$(this).closest('.alram_box').hide();
	});
}

// util menu display
function UserUtil() {
	$('.user_util_wrap').find('.btn_user_util').on('click', function(){
		if ( $('.user_util_box').css('display') == 'none')
		{
			$('.user_util_box').show();
		} else {
			$('.user_util_box').hide()
		}
	});
	$('.user_util_wrap').find('.btn_close').on('click', function(){
		$(this).closest('.user_util_box').hide();
	});
}



// input reset
function InputReset() {
	// input reset
	$('.inpReset').click(function(){
		$(this).closest('.inputBox').find('.inp').val('');
		$(this).hide();
	});

	// input reset button display
	var InpObj = $('input:text, input:password');
	$(InpObj).on('keyup', function(e) {
		if($(this).val().length >= 1) {
			$(this).closest('.inputBox').find('button').css('display','block');
		}
		if ( $(this).val().length == 0 )
		{
			$(this).next('button').css('display','none');
		}
	});

	$(InpObj).unbind('focusin').focusin(function(){
		if($(this).val().length >= 1) {
			$(this).closest('.inputBox').find('button').css('display','block');
		}
	});

	$('.inpReset').unbind('focusout').focusout(function(){
		//$(this).prev('.inp').removeClass('focus');
		$(this).closest('.inputBox').find('.inp').last().removeClass('focus');
		$(this).hide();
	});

	$('.inpReset').unbind('focusin').focusin(function(){
		$(this).closest('.inputBox').find('.inp').last().addClass('focus');
	});

	$(InpObj).unbind('focusout').focusout(function(){
		obj = this;
		setTimeout(function(){
			if ( !$(obj).closest('.inputBox').find('.inpReset').is(':focus'))
			{
				$(obj).closest('.inputBox').find('.inpReset').hide();
			}
		}, 10);
	});
}