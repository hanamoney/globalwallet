
$(document).ready(function(){
	
	/*var page_navFixed = $( '.page_header_fix' ).offset();//
	var navFixed = $( '.tab_linkMenu' ).offset();
	if ($('.page_header_fix').length > 0){
		if ($('.tab_linkMenu').length > 0){
			$(window).scroll(function(){
				if ( $( document ).scrollTop() > navFixed.top + 56 ) {
					$( '.page_header_fix' ).addClass( 'nav_fix' );
				  }
				  else {
					$( '.page_header_fix' ).removeClass( 'nav_fix' );
				  }
			})
		}else{
			$(window).scroll(function(){
				if ( $( document ).scrollTop() > page_navFixed.top + 55 ) {
					$( '.page_header_fix' ).addClass( 'nav_fix' );
				  }
				  else {
					$( '.page_header_fix' ).removeClass( 'nav_fix' );
				  }
			})	
		}
	}*///fixgnb
    
	/*var money_swiper = new Swiper('.wrap_money_7_topSlide .swiper-container', {
	pagination: {
		el: '.swiper-pagination',
	},
	});
    
	var money_swiper = new Swiper('.wrap_money_brand .swiper-container', {
		slidesPerView: 3.6,
	});

	var money_swiper = new Swiper('.wrap_money_brandFix .swiper-container', {
		slidesPerView: 3.6,
	});

	var money_swiper = new Swiper('.basic_showTarget.swiper-container', {
			slidesPerView: 5.6,
	});*/
	
	//룰렛하단배너
	/*var roul_banner_swiper = new Swiper('.rouletteSlider .swiper-container', {
			//slidesPerView: 5.6,
	});*/

	/*
	**** 레이어팝업
	*/
	//if($('button').hasClass('openPop')){
		//var _openPop = $('body').find('.openPop');//팝업 발생 버튼
		//var _layerPop = $('body').find('.layer_pop');//팝업
		//_openPop.each(function(){
			//var _this = $(this);
			//var _this_id ="#" + $(this).attr('data-name');//팝업 발생 버튼 data-name
			//_this.on('click',function(){
				//openLayerPop($(_this_id));
				// var _layerPop_close = $(_this_id).find('.btn_layerClose');//팝업닫기버튼
				//_layerPop_close.on('click',function(){
				//	closeLayerPop($(_this_id), _this);
				//});
			//});
		//})//레이어팝업

		//레이어팝업 열기 openLayerPop 호출시에는 $target에 들어갈 값은 현재 선택된 객체의 data-name값을 같이 보내 줘야 합니다.
		


		//레이어팝업 - 페이지가 열리자 마자 레이어팝업이 떠있는 경우
//		_layerPop.each(function(e){
//			var layerPopContainer = $('.layer_pop')
//			if(layerPopContainer.has(e.target).length === 0){
//				if(layerPopContainer.is(':visible')){
//					//alert('y')	
//				}else{
//					//alert('no')	
//				}
//			}
//		})
	//}	

	//[S] tooltip
	/*var _openTooltip = $('body').find('.openTooltip');//팝업 발생 버튼
	var _layerTooltip = $('body').find('.layer_tooltip');//팝업
	_openTooltip.each(function(){
		var _this = $(this);
		var _this_id ="#" + $(this).attr('data-name');//팝업 발생 버튼 data-name
		_this.on('click',function(){
			$(_this_id).toggleClass('on');
			if ($(_this_id).hasClass('on')){
				$(_this_id).slideToggle(600,'easeInOutCubic');
			}else{
				$(_this_id).slideUp(600,'easeInOutCubic');
				_this.focus();//팝업 발생 버튼 포커스
			}
			$(_this_id).find('.inner_layer').attr('tabindex','0').focus();//레이어 팝업 포커스
			 var _layerPop_close = $(_this_id).find('.btn_layerClose');//팝업닫기버튼
			_layerPop_close.on('click',function(){
				$(_this_id).removeClass('on');
				$(_this_id).slideUp(600,'easeInOutCubic');//팝업닫기
				_this.focus();//팝업 발생 버튼 포커스
			})
		});
	})*/
	//[E] tooltip


	/*
	**** 혜택 event 하위메뉴 펼치기
	*/
	var wrap_eventList_li = $('.wrap_eventList').find('.list_lineBasic');
	
	/*$('.basic_showTarget').each(function(){
		var _this = $(this);
		var showEve_list = $(this).find('.showEve_list:last-child');
		showEve_list.on('focusout',function(){
			if ($('.basic_showTarget').hasClass('show')){
				$('.wrap_eventList').find('.lineBasic_list').eq(1).find('.box_link').focus();
				$('.basic_showTarget').attr('tabindex','-1').find('.box_link').attr('tabindex','-1');
			}
			$('.list_lineBasic').removeClass('open');
			//$('.basic_show').removeClass('on');
			$(this).closest('.basic_showTarget').removeClass('show');
		})
	})

	$('.btn_linkmenu').each(function(idx){
		$(this).on('click', function(){
			if ($('.basic_show').hasClass('on')){
				$(this).closest('.list_lineBasic').toggleClass('open');
				$('.basic_showTarget').attr('tabindex','0').toggleClass('show').focus().find('.box_link').attr('tabindex','0');
				if (!$('.basic_showTarget').hasClass('show')){
					$('.basic_showTarget').attr('tabindex','-1').find('.box_link').attr('tabindex','-1');
					$(this).focus();
				}
			}//if
			
			
		})
	})*/
	
	//좋아요 클릭시
	if($('span[class*="_hit"]').length>0){
		$('.btn_like').each(function(){
			if($(this).hasClass('on')){
				TweenMax.to($(this).children('span[class*="_hit"]'),0,{scale:1,autoAlpha:1,display:'block'});
				TweenMax.to($(this).children('.ico_sp_like'),0,{scale:0.3,autoAlpha:0,display:'none'}); //2018-04-19 추가
				$(this).attr('aria-pressed','true');
			}else{
				TweenMax.to($(this).children('span[class*="_hit"]'),0,{scale:0.3,autoAlpha:0,display:'none'});
				TweenMax.to($(this).children('.ico_sp_like'),0,{scale:1,autoAlpha:1,display:'block'}); //2018-04-19 추가
				$(this).attr('aria-pressed','false');
			}
		})
		
	}
	
	$('.ico_sp_like').find('.screen_out').text('좋아요 선택하기');
	$('.ico_sp_like_hit').find('.screen_out').text('좋아요 선택취소하기');
	$('.btn_like').find('.like_txt').append('<span class="screen_out">명이 좋아합니다.</span>')

	$('.btn_like').on('click',function(){
		//if($(this).children('span[class*="_hit"]').is(':visible')){
		if($(this).children('span[class*="_hit"]').css('display') == 'block'){
			$(this).removeClass('on');
			$(this).children('span[class*="_hit"]').css('display','none');
			TweenMax.to($(this).children('.ico_sp_like'),1,{scale:1,autoAlpha:1,display:'block',ease:Elastic.easeOut}); //2018-04-19 display 추가
			TweenMax.to($(this).children('span[class*="_hit"]'),1,{scale:0.1,autoAlpha:0,ease:Elastic.easeOut})	
			$(this).attr('aria-pressed','false');
		}else{
			$(this).addClass('on');
			$(this).children('span[class*="_hit"]').css('display','block');
			TweenMax.to($(this).children('.ico_sp_like'),1,{scale:0.1,autoAlpha:0,display:'none',ease:Elastic.easeOut}); //2018-04-19 display 추가
			TweenMax.to($(this).children('span[class*="_hit"]'),1,{scale:1,autoAlpha:1,ease:Elastic.easeOut})
			$(this).attr('aria-pressed','true');
		}
		
	})


	if ($('.list_tab_linkMenu').length  > 0)
	{
		$('.list_tab_linkMenu').each(function(){
			var _idx_tabList = $(this).children('.tab_linkMenu_list');//list_tab_linkMenu의 li
			var _width_tabList = (100 / _idx_tabList.length);//list_tab_linkMenu의 li의 가로사이즈
			if(_idx_tabList.length === 4){//list_tab_linkMenu의 li의 개수가 4개면
				$(this).closest('.tab_linkMenu').addClass('box_center');//부모 tab_linkMenu에 box_center 클레스 추가
			}
		})
	}
	
	/*
	**** tab
	*/
	if ($('.tab_container').length > 0)
	{
		$('.tab_container').each(function(){
			var tabBtn = $(this).children('.list_tab').find('.btn_tab');//tab 버튼 찾기
			var tabContent = $(this).children('.content_tab');//tab 컨텐츠 요소 찾기
			var tab_list = $(this).children('.list_tab').find('.tab_list');//tab의 버튼 개수
			var width_btnTab = 100/(tab_list.length) + '%';//tab의 버튼 가로사이즈
			tab_list.each(function(idx, item){
				$(this).css('width', width_btnTab);//tab의 버튼 가로사이즈 css
				var _click = $(this).find('.btn_tab');//tab 버튼
				if (_click.hasClass('on')){
					_click.attr('role','tab').attr('aria-selected','true');
				}else{
					_click.attr('role','tab').attr('aria-selected','false');
				}

				_click.on({
					click : function(){
						tabBtn.removeClass('on');
						tabBtn.attr('aria-selected','false')
						$(this).addClass('on');
						$(this).attr('aria-selected','true')
						tabContent.removeClass('show');
						tabContent.eq(idx).addClass('show');//click 하는 버튼의 index에 따라 보여지는 컨텐츠
						
					}
				})
			})
		 })
	}
	
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
	
	//swiper 버튼 안 인덱스 값

	//쿠폰 바코드 팝업 사이징
	/*var _bodywidth = $('body').width();
	var _bodyheight = $('body').height();
	$('.view_coupon .content_popup').width(_bodyheight);*/
	//쿠폰 바코드 팝업 사이징

	
	//에러페이지 등등 중앙정렬
	/*if ($('.middle_screen').length > 0){
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

	}*///중앙정렬

	/*if ($('.box_vertical_middleTop').length > 0 || $('.box_vertical_middleBottom').length > 0){
		var _height = $('body').height() - $('.box_vertical_middleTop').outerHeight() - $('.box_vertical_middleBottom').outerHeight();
		//console.log( $('.box_vertical_middleTop').outerHeight())
		$('.box_vertical_middle').css('min-height', _height);
	}*/
	
	function init(){
		_tabAcdList.each(function(idx){
			_tabAcdArr[idx] = _tabAcdList.eq(idx);
		})
	}
	
	$('.lab_checkbox.all').on('click',function(){
		
	});
	
	/*
	**** 브랜드 카데고리 시작
	*/
	
	var _winScroll;
	var _objTop = $('.wrap_money_brand');
	var _scWoverBool = true;
	
	$(window).scroll(function(){
		_winScroll = $(window).scrollTop();	
		if(_winScroll >= 100){
			if(_scWoverBool){
				brandMenuFix(1); //addClass
				_scWoverBool = false;	
			}
			
		}else{
			if(_scWoverBool == false){
				brandMenuFix(0); //removeClass
				_scWoverBool = true;
			}
			
		}
	});
	
	var _brandIcoBtn = $('.wrap_money_brand .box_link'); //브랜드카테고리 버튼
	var _listTabAcd = $('.list_tab_acd'); //공통 탭 부모
	var _tabAcdList = $('.tab_acd_list'); //공통 탭 리스트
	var _tabAcdArr = [];
	
	//브랜드 아이콘 클릭시
	_brandIcoBtn.each(function(idx){
		$(this).on('click',function(){
			//brandMenuFix(1);
			stageMove(idx);
		})
	});
	
	//금융상품몰 한도조회 약관동의 전체동의 버튼
	//[S] 2018-07-12 수정
	$('.acd_agree_btn').attr('role','button');
	$('.acd_agree_btn').find('.btn_acdAgree_open').attr('aria-expanded','true');
	$('.acd_agree_btn').on('click', function(e){
		e.preventDefault();
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			$(this).siblings('.acd_agree_content').slideDown(600, 'easeInOutCubic');
			$(this).find('.btn_acdAgree_open').attr('aria-expanded','true');
		}else{
			$(this).addClass('on');
			$(this).siblings('.acd_agree_content').slideUp(600, 'easeOutCubic');
			$(this).find('.btn_acdAgree_open').attr('aria-expanded','false');
		}
	})
	//[E] 2018-07-12 수정
	
	$(".acd_agree_btn input[type='checkbox']").on('click', function(e){
		e.stopPropagation();
		var chk = $(this).is(':checked');
		var idx = $(".acd_agree_btn input[type='checkbox']").index(this);
		
		if(chk){
			$(this).parent().parent().addClass('on');
			$(this).parent().parent().siblings('.acd_agree_content').hide();
			
			if(idx != $('.acd_agree_btn').length-1){
				TweenMax.to($('body, html').eq(0),1,{scrollTop:$(this).closest('.acd_agree_list').next().offset().top,ease:Cubic.easeOut});	
			}	
		}
		
		
	})
	
	//전체동의 클릭
	$(".lab_checkbox.all").on('click',function(e){
		//alert('test')
		e.preventDefault();
		if($(this).children("input[type='checkbox']").prop('checked')){
			$(this).children("input[type='checkbox']").prop('checked', false);
			chkAllClick('off');
		}else{
			$(this).children("input[type='checkbox']").prop('checked', true);
			chkAllClick('on');
		}
		//console.log('all')
	})
	
	//전체동의 체크박스 클릭
	$(".lab_checkbox.all input[type='checkbox']").on('click',function(e){
		e.stopPropagation();
		var chk = $(this).is(':checked');
		if(chk){
			chkAllClick('on');
		}else{
			chkAllClick('off');
		}
//		if($(this).prop('checked')){
//			chkAllClick('on');
//		}else{
//			chkAllClick('off');
//		}
		//console.log('all chk')
	})
	
	//처음 체크박스 닫힌 상태로 접어두기.
	$('.con_tab_acd').hide();
	
	var maxLen = $(".tab_acd_list input[type='checkbox']").length; //체크박스 전체갯수
	var chk = 0; //체크박스 클릭한 갯수
	
	//체크박스 클릭시
	$(".tab_acd_list input[type='checkbox']").on('click',function(e){
		e.stopPropagation();
		chk = $(".tab_acd_list input[type='checkbox']:checked").length;
		if($(this).prop('checked') && !$('body').find('.wrap_moneyChange_agree')){
			$(this).parent().parent().parent().children('.con_tab_acd').slideUp();
			$(this).parent().parent().parent().removeClass('on');
//			$(this).parent().parent().parent().addClass('on');
		}else{
			//$(this).parent().parent().parent().children('.con_tab_acd').slideDown(600,'easeInOutCubic');
		}
		
		if(chk == maxLen){
			chkAllActive('on');
		}else{
			chkAllActive('off');
		}
		//console.log('chk');
	})
	
	//[S] 2018-07-13 수정
	//label 클릭시
	//$(".tab_acd_list label").attr('role','button').attr('aria-expanded','false');
	//if ($(".tab_acd_list label").find('.ico_sp_down')){
		//$(".tab_acd_list label").children('.ico_sp_down').find('.screen_out').text('하위내용 보기');
	//}
	$(".tab_acd_list label").children('.ico_sp_down').on('click',function(e){
		e.preventDefault();
		$(this).closest('.tab_acd_list').toggleClass('on');
		$(this).closest('.tab_acd_list').siblings('.tab_acd_list').removeClass('on');
		if($(this).closest('.tab_acd_list').children('.con_tab_acd').is(':visible')){
			$('.con_tab_acd').slideUp(600,'easeInOutCubic');
		}else{
			$('.con_tab_acd').slideUp(600,'easeInOutCubic');
			$(this).closest('.tab_acd_list').children('.con_tab_acd').slideToggle(600,'easeInOutCubic');
		}
		if ($(this).closest('.tab_acd_list').hasClass('on')){
			//$(".tab_acd_list label").attr('aria-expanded','false');
			$(this).attr('aria-expanded','true');
		}else{
			$(this).attr('aria-expanded','false');
		}
	})
	//[E] 2018-07-13 수정
	
	//텝 리스트 클릭시(브랜드 외에 전체 아코디언 적용)
	_tabAcdList.each(function(idx){
		var _this = $(this);
		if ($(this).hasClass('on')){
			$(this).find('button.box_link').attr('aria-expanded','true');
		}else{
			$(this).find('button.box_link').attr('aria-expanded','false');
		}
		$(this).find('button').on('click',function(e){
			if(_tabAcdList.hasClass('tab_brand')){
				//$(this).toggleClass('on');
				if($('.tab_acd_list').eq(idx).hasClass('on')){
					$('.tab_acd_list').eq(idx).removeClass('on');
				}else{
					$('.tab_acd_list').eq(idx).addClass('on');
				}
				//$(this).closest('.tab_acd_list').siblings('.tab_acd_list').find('button').removeClass('on');
				//e.preventDefault();
				if($(this).parent().parent().children('.con_tab_acd').is(':visible') == false){
					$(this).parent().parent().children('.con_tab_acd').slideDown(600,'easeInOutCubic');
				}else{
					$(this).parent().parent().children('.con_tab_acd').slideUp(600,'easeInOutCubic');
				}
			}else{
				$(this).closest('.tab_acd_list').toggleClass('on');
				$(this).closest('.tab_acd_list').siblings('.tab_acd_list').removeClass('on');
				if($(this).parent().parent().children('.con_tab_acd').is(':visible')){
					$('.con_tab_acd').slideUp(600,'easeInOutCubic');
				}else{
					$('.con_tab_acd').slideUp(600,'easeInOutCubic');
					$(this).parent().parent().children('.con_tab_acd').slideToggle(600,'easeInOutCubic');
				}

				if (_this.hasClass('on')){
					_this.siblings('.tab_acd_list').find('button.box_link').attr('aria-expanded','false');
					_this.find('button.box_link').attr('aria-expanded','true');
				}else{
					_this.find('button.box_link').attr('aria-expanded','false');
				}
			}
			
		})

	})
	
	//브랜드 카테고리 메뉴 상단 고정/헤재
	function brandMenuFix(stat){
		//console.log(stat);
		if(stat == 0){
			_objTop.removeClass('nav_fix');
		}else{
			_objTop.addClass('nav_fix');
		}
	}
	
	//바디 스크롤
	function stageMove(num){
		if($('.con_tab_acd').eq(num).is(':visible') == false){
			$('.con_tab_acd').eq(num).slideDown(500,'easeInOutCubic');
			$('.tab_acd_list').eq(num).addClass('on');
		}
		TweenMax.to($("html, body"),1,{scrollTop:_tabAcdArr[num].offset().top-134,ease:Quart.easeInOut,onComplete:brandMenuFix,onCompletePararm:[1]});
	}
	
	//전체선택 활성/비활성
	function chkAllActive(status){
		if(status == 'on'){
			//chkAllClick('on');
			$(".lab_checkbox.all").addClass('on');
			$(".lab_checkbox.all input[type='checkbox']").prop('checked', true);
		}else{
			//chkAllClick('off');
			$(".lab_checkbox.all").removeClass('on');
			$(".lab_checkbox.all input[type='checkbox']").prop('checked', false);
		}
	}
	
	//전체선택 클릭시 체크박스 활성/비활성
	function chkAllClick(status){
		if(status == 'on'){
			$(".lab_checkbox.all").addClass('on');
			$(".tab_acd_list input[type='checkbox']").prop('checked',true);
			$('.con_tab_acd').slideUp();
			$('.tab_acd_list').removeClass('on');
			//chkNum = maxLen; //전체선택시 체크박스 갯수만큼 채워준다.
			//$(".tab_acd_list input[type='checkbox']").prop('checked',true)
		}else{
			$(".lab_checkbox.all").removeClass('on');
			$(".tab_acd_list input[type='checkbox']").prop('checked',false);
			//chkNum = 0; //전체선택 해지시 체크박스 갯수를 초기화 시킨다.
			//$(".tab_acd_list input[type='checkbox']").prop('checked', false)
		}
	}
	
	/*
	**** 브랜드 카데고리 끝
	*/
	
	
	
	/*머니 전환 checkbox title*//*[S] 2018-07-16 수정*/
	$('.inner_moneyChange_list').each(function(){
		if ($(this).find('checkbox')){
			if ($(this).find('figcaption').length > 0){
				$(this).find('.tf_checkbox').attr('title', $(this).find('figcaption').text() + '선택');					
			}else{
				$(this).find('.tf_checkbox').attr('title', $(this).find('.cooperate_logo > img').attr('alt') + '선택');
	
			}
		}
	})/*[E] 2018-07-16 수정*/

	/* tab link 선택*//*[S] 2018-07-16 수정*/
	$('.list_tab_linkMenu').attr('role','tablist');//2018-07-16 추가
	$('.list_tab_linkMenu a.box_link').closest('.tab_linkMenu_list').attr('role','tab');
	$('.list_tab_linkMenu a.box_link').each(function(){
		if ($(this).closest('.tab_linkMenu_list').hasClass('on') || $(this).hasClass('on')){
			$(this).closest('.tab_linkMenu_list').attr('aria-selected','true');
		}else{
			$(this).closest('.tab_linkMenu_list').attr('aria-selected','false');
		}
		$(this).on({
			click : function(){
				if ($(this).closest('.tab_linkMenu_list').hasClass('on') || $(this).hasClass('on')){
					$(this).closest('.tab_linkMenu_list').siblings('.tab_linkMenu_list').attr('aria-selected','false')
					$(this).closest('.tab_linkMenu_list').attr('aria-selected','true');
				}
			}
		})
	})
	/*[E] 2018-07-16 수정*/

	/*hot new 혜택 검색결과리스트 탭*/
	$('.result_search,.wrap_eventList, .wrap_eventList_filter').find('.box_link').each(function(){
		$(this).attr('role','tab');
		if ($(this).hasClass('on')){
			$(this).attr('aria-selected','true');
		}else{
			$(this).attr('aria-selected','false');
		}
		$(this).on({
			click : function(){
				if ($(this).hasClass('on')){
					$('.result_search').find('.box_link').attr('aria-selected','false');
					$(this).attr('aria-selected','true');
				}
			}
		})
	})
	
	$('.ico_sp_down').each(function(){
		var screenout = $(this).find('.screen_out');
		if (!screenout.text() == '')
		{
			screenout.remove();
		}
	})//2018-07-11 추가
	
	//[S] 2018-07-13 수정
	$('.btn_linkmenu').attr('aria-expanded','false')
	$('.btn_linkmenu').on('click', function(){
		if ($(this).hasClass('open'))
		{
			//$(this).removeClass('open');
			//$('.basic_showTarget').removeClass('show')
			$(this).attr('aria-expanded','false');
		}else{
			//$(this).addClass('open');
			//$('.basic_showTarget').addClass('show')
			$(this).attr('aria-expanded','true');
			$('.basic_showTarget .swiper-slide-active a').focus();
		}
	})//[E] 2018-07-13 수정

	$('.basic_showTarget .swiper-slide:last-child a').on('focusout', function(){
		$(this).closest('.basic_showTarget').removeClass('show');
		$('.btn_linkmenu').removeClass('on');
		$('.basic_show').closest('.lineBasic_list').next('.lineBasic_list').find('a').focus();
	})//2018-07-12 추가

	$('.wrap_moneyChange_agree .tab_acd_list .ico_sp_down').attr('role','button').attr('aria-expanded','false');//2018-07-12 추가
	

	//초기셋팅
	init();

})//ready

function openLayerPop($target){
	//var _openPop = $('body').find('.openPop');//팝업 발생 버튼
	//var _layerPop = $('body').find('.layer_pop');//팝업

	var _this = $('body').find('.openPop');//팝업 발생 버튼
	var _this_id ="#" + $target;//팝업 발생 버튼 data-name
	
	$(_this_id).toggleClass('show');
	//TweenMax.to($(_this_id), 1, {display:'block',autoAlpha:1});
	//TweenMax.fromTo($('.inner_layer') , 1, {y:$('.inner_layer').height()},{y:0});
	if($(_this_id).hasClass('show')){
		$(_this_id).append("<div class='dim' aria-hidden='true'></div>");
		$('.dim').on('click', function(){
			//openLayerPop($(_this_id));
			// var _layerPop_close = $(_this_id).find('.btn_layerClose');//팝업닫기버튼
			//_layerPop_close.on('click',function(){
			//	closeLayerPop($(_this_id), _this);
			$('body, html').toggleClass('open_pop');
			$(_this_id).toggleClass('show');
			
			$('.dim').remove();
			//var opener = $('[data-name="' + $(_this_id).attr('id') + '"]');
			closeLayerPop($(_this_id), _this);
		})
		var _layerPop_close = $(_this_id).find('.btn_layerClose');//팝업닫기버튼
		_layerPop_close.on('click',function(){
			closeLayerPop($(_this_id), _this);
		});

		$('.btn_popupClose').on('click',function(){
			closeLayerPop($(_this_id), _this);
		});
	}
	
	$('body, html').toggleClass('open_pop');
	if ($(_this_id).find('h2').hasClass('tit_layer')){
		$(_this_id).find('h2').attr('tabindex', '0').focus();
	}else{
		$(_this_id).find('.inner_layer').children(':first').attr('tabindex', '0').focus();			
	}

}


//레이어팝업 닫기
function closeLayerPop($target, $opener){
	
	//TweenMax.to($target, 1, {display:'none',autoAlpha:0});
	//TweenMax.to($('.inner_layer') , 1, {y:$('.inner_layer').height()});
	
	$target.removeClass('show');//팝업닫기
	$('.dim').remove()
	$('body, html').removeClass('open_pop');//스크롤 막기
	$opener.focus();//팝업 발생 버튼 포커스
}
/*
**** popup 버튼 사이즈
*/
function btnPopup(){
	var pop_btn = $('.pop_btn').find('.btn_popup');
	var wPop_btn = 100 / pop_btn.length + '%';
	pop_btn.each(function(){
		$(this).css('width',wPop_btn);
	})
}



/*
**** 맨위로 가기
*/
function winScrollTop(){
	$('html, body').animate({scrollTop:0},600, "easeInOutExpo");
}

function mySwiper_aria(e){
	$('.swiper-slide').each(function(){
		if ($(this).hasClass('swiper-slide-active'))
		{
			$(this).attr('aria-hidden','false');
		}else{
			$(this).attr('aria-hidden','true');
		}		
	})

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
