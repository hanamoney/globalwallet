$(document).ready(function(){
	//[S]2018-07-12 추가
	$('.ico_sp_like').find('.screen_out').text('좋아요 선택하기');
	$('.ico_sp_like_hit').find('.screen_out').text('좋아요 선택취소하기');
	$('.btn_like').find('.like_txt').append('<span class="screen_out">명이 좋아합니다.</span>')
	//[E]2018-07-12 추가

	$('.ico_sp_down').each(function(){
		var screenout = $(this).find('.screen_out');
		$(this).attr('role','button').attr('tabindex','0');
		if ($(this).closest('.wrap_check.tit_tab_acd').siblings('.con_tab_acd').css('display') == 'none'){
			$(this).attr('aria-expanded','false');
		}else{
			$(this).attr('aria-expanded','true');
		}
		if (!screenout.text() == '')
		{
			screenout.remove();
		}
	});
	
})

function mySwiper_aria(e){
	var target = e.passedParams.el;
	$(target).find('.swiper-slide').each(function(){
		if ($(this).hasClass('swiper-slide-active'))
		{
			$(this).attr('aria-hidden','false');
		}else{
			$(this).attr('aria-hidden','true');
		}		
	})//2018-07-18 수정

	$('.swiper-pagination-bullet').each(function(){
		if ($(this).hasClass('swiper-pagination-bullet-active'))
		{
			$(this).attr('aria-pressed','true');
		}else{
			$(this).attr('aria-pressed','false');
		}		
	})
	
	e.on('slideChange', function(){
		$('.swiper-slide').attr('aria-hidden','true').eq(e.realIndex).attr('aria-hidden','false');
		$('.swiper-pagination-bullet').attr('aria-pressed','false').eq(e.realIndex).attr('aria-pressed','true');
	});
	
}//2018-07-11 추가

//2018-07-13 추가
function change_click(){
	
	//TweenMax.to('.box_circle_bdGray > .translate50 > p', 0, {display:'none', autoAlpha:0});
	
	//TweenMax.to('.box_circle_bdGray > .translate50 > p', 0, {display:'none', autoAlpha:0});
	//var money = $('.box_circle_bdGray > .translate50 > p');
	//TweenMax.to(money, 0, {display:'none', autoAlpha:0});
	if($(".view_moneyChange_symbol input:checkbox.type_green").prop('checked')){
		TweenMax.to('.cooperate_logo',0,{scale:0.59});
		//TweenMax.to('.box_circle_bdGray > .translate50 > p',0,{display:'block', autoAlpha:1});
	}else{
		TweenMax.to('.cooperate_logo',0,{scale:1});
		//TweenMax.to('.box_circle_bdGray > .translate50 > p',0,{display:'none', autoAlpha:0});
	}

	var money = $('.box_circle_bdGray > .translate50 > p');

	$('.box_circle_bdGray > .translate50').each(function(){
		var money = $(this).find('p');
		if ($(this).find('img').length > 0){
			//TweenMax.to(money, 0, {display:'none', autoAlpha:0});

			if($(".view_moneyChange_chk input:checkbox.type_green").prop('checked')){
				TweenMax.to('.cooperate_logo',0,{scale:1});
				//TweenMax.to('.box_circle_bdGray > .translate50 > p',0,{display:'block', autoAlpha:1});
			}else{
				TweenMax.to('.cooperate_logo',0,{scale:1});
				//TweenMax.to('.box_circle_bdGray > .translate50 > p',0,{display:'none', autoAlpha:0});
			}

			$(".view_moneyChange_chk input:checkbox.type_green").on('click',function(){
				if($("input:checkbox.type_green").prop('checked')){
					TweenMax.fromTo('.cooperate_logo',1,{scale:0.3},{scale:1, ease:Expo.easeInOut})
					//TweenMax.fromTo('.box_circle_bdGray > .translate50 > p',1,{display:'block', scale:0.3},{display:'block', scale:1, ease:Expo.easeInOut})
				}else{				
					TweenMax.fromTo('.cooperate_logo',1,{scale:0.3},{scale:1, ease:Expo.easeInOut})
					//TweenMax.fromTo('.box_circle_bdGray > .translate50 > p',1,{display:'none', scale:0.3},{display:'none', scale:0, ease:Expo.easeInOut})
				}
			});//click
		}//if
	})//each
	$(".view_moneyChange_chk input:checkbox.type_green").on('click',function(){
		if($("input:checkbox.type_green").prop('checked')){
			TweenMax.fromTo('.cooperate_logo',1,{scale:1},{scale:0.59, ease:Expo.easeInOut})
			//TweenMax.fromTo('.box_circle_bdGray > .translate50 > p',1,{display:'block', scale:0},{display:'block', scale:1, ease:Expo.easeInOut})
		}else{				
			TweenMax.fromTo('.cooperate_logo',1,{scale:0.59},{scale:1, ease:Expo.easeInOut})
			//TweenMax.fromTo('.box_circle_bdGray > .translate50 > p',1,{display:'none', scale:1},{display:'none', scale:0, ease:Expo.easeInOut})
		}
	});//click

}//change_click
change_click();
//2018-07-13 추가

$('.view_moneyChange_chk .btn_round_tblGreen').on('click', function(){
		TweenMax.fromTo('.cooperate_logo',1,{scale:1},{scale:0.59, ease:Expo.easeInOut});
		//TweenMax.fromTo('.box_circle_bdGray > .translate50 > p',1,{display:'block', scale:0.3},{display:'block', scale:1, ease:Expo.easeInOut});
})//2018-07-13 추가

function img_resizing(e){
	$('.'+ e).each(function(){
		if($(this).width() >  $(this).height()){
			$(this).css({
				'width':'100%',
				'height':'auto',
				'maxWidth':'inherit'
			});
		}else{
			$(this).css({
				'height':'100%',
				'width':'auto',
				'maxWidth':'inherit'
			});
		}
	});
}//2018-07-13

$('.view_moneyChange_symbol').find('.cooperate_logo').children('img').each(function(){
	$(this).addClass('resize_img');
	 img_resizing('resize_img')
})//2018-07-13 추가


//swiper 버튼 안 인덱스 값
if ($('.swiper-pagination').length > 0){
	$('.swiper-pagination').each(function(){
		var swiper_bullet = $(this).find('.swiper-pagination-bullet');
		swiper_bullet.each(function(idx){
			idx = idx + 1;
			$(this).append('<span class="screen_out">' + idx + '</span>');
		})
	})
}

if ($('.btn_searchDel').find('.screen_out').length > 0)
{
	$('.btn_searchDel').find('.screen_out').text('입력 내용 지우기');
}else{
	$('.btn_searchDel').find('.ico_sp_searchDel').append('<span class="screen_out">입력 내용 지우기</span>')
}

/*function toggleCatList(){
	$('.btn_linkmenu').on({
		click : function(){
			$(this).closest('.lineBasic_list').toggleClass('open');
			$('.basic_showTarget').toggleClass('show')
			//$('.basic_showTarget').toggleClass('show').focus().find('.box_link').attr('tabindex','0');
			if ($('.basic_showTarget').hasClass('show')){
				$('.basic_showTarget').find('.showEve_list').eq(0).find('.box_link').focus();
			}else{
				$('.basic_showTarget').find('.box_link').attr('tabindex','-1');
				$(this).focus();
			}
			if ($(this).parents('[data-roll="money_benefit"]').hasClass('fixon')){
				$(this).addClass('on');
			}else{
				$(this).toggleClass('on');
			}
		}
	})
	$('.basic_showTarget .showEve_list:last-child a').on('focusout', function(){
		$('.lineBasic_list').toggleClass('open');
		$(this).closest('.basic_showTarget').removeClass('show');
		$('.btn_linkmenu').removeClass('on');
		$('.basic_show').closest('.lineBasic_list').next('.lineBasic_list').find('a').focus();
	})
}*///tabcoupon

//toggleCatList()