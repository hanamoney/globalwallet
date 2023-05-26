function vertical_middle(){
	//에러페이지 등등 중앙정렬
	if ($('.middle_screen').length > 0){
		if ($('.page_footer').length > 0){
			if ($('.tbl_money').length > 0){
				var _height = $('body').height() - $('.page_footer').outerHeight() -  $('.tbl_money').outerHeight();
				$('.box_vertical_middle').css('min-height',_height);
				if ($('.box_vertical_middle').prev().attr('class')==='money_remain'){
					var _height = $('body').height()-$('.money_remain').outerHeight() - $('.page_footer').outerHeight() -  $('.tbl_money').outerHeight();
					$('.box_vertical_middle').css('min-height',_height);
				}
			}else if ($('.box_vertical_middle').prev().attr('class')==='money_remain'){
				var _height = $('body').height()-$('.money_remain').height() - $('.page_footer').outerHeight();
				$('.box_vertical_middle').css('min-height',_height);
			}else if ($('.tab_linkMenu').length > 0){
				var _height = $('body').height() - $('.tab_linkMenu').outerHeight() - $('.page_footer').outerHeight();
				$('.box_vertical_middle').css('min-height',_height);
			}
			else{
				var _height = $('body').height() - $('.page_footer').outerHeight();
				$('.box_vertical_middle').css('min-height',_height);
			}
		}else if ($('.tab_linkMenu').length > 0 && $('.wrap_money_footer').length > 0){
			var _height = $('body').height() - 231;
			$('.box_vertical_middle').css('min-height',_height);
		}else if ($('.section_search').length > 0){
			var _height = $('body').height() - $('.section_search').outerHeight();
			$('.box_vertical_middle').css('min-height',_height);
		}else if ($('.head_popup').length > 0){
			var _height = $('body').height() - $('.head_popup').outerHeight();
			$('.box_vertical_middle').css('min-height',_height);
		}

		if ($('.box_vertical_middle').outerHeight() < $('.middle_screen').outerHeight()){
			$('.box_vertical_middle').css('min-height',$('.middle_screen').outerHeight())
		}

	}//중앙정렬
}
function vertical_m(e){
	if ($('.box_vertical_middleTop').length > 0 || $('.box_vertical_middleBottom').length > 0){
		var _height = $('body').height() - $('.box_vertical_middleTop').outerHeight() - $('.box_vertical_middleBottom').outerHeight();
		if (($('.box_vertical_middle').children().hasClass('swiper-slide')) && ($('.box_vertical_middle').children('.swiper-slide').outerWidth() == 320)){
			$('.box_vertical_middle').css('min-height', e + 'px');
		}else{
			if ($('[data-roll="roulette"]').length > 0){
				$('.box_vertical_middle').css('min-height', _height);
			}else{
				$('.box_vertical_middle').css('min-height', _height);
			}	
		}
	}else{
		$('.box_vertical_middle').css('min-height', $('body').outerHeight());
	}

	$('.box_vertical_middle').children('.swiper-slide').height($('.box_vertical_middle').height());
}

function vertical_mfix(){
	if ($('.box_vertical_middleTop').length > 0 || $('.box_vertical_middleBottom').length > 0){
		var _height = $('body').height() - $('.box_vertical_middleTop').outerHeight() - $('.box_vertical_middleBottom').outerHeight();
		$('.box_vertical_middle').css({
			'height': _height,
			'overflow': 'auto'
		});
	}
}