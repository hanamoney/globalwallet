/*
 * @설 명 : jQuery Fnc.
 * @dependency : jQuery-2.0 이상 버전.
 * @===========================================================================
 * @변경이력:
 * @DATE 		AUTHOR 			DESCRIPTION
 * 2017.09.10 	finecore.co.kr 	Initialize.
 * @--------------------------------------------------------------------------- 
 * @변경 이력은 이곳에 추가 합니다.
 */
(function($) {
	/**
	 * ECMAScript 5 Strict Mode.
	 */
	"use strict";
	
	ext.ui = {};
	
	ext.ui.newGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    
	//**********************************************
	// 공통 UI 콤보박스 클래스 시작 
	//**********************************************
	ext.ui.comboBox = function (element, options) {
		
		this.defaultOptions = {
			version : 1,
			id : ext.ui.newGuid(),
			name : '',
			title : '',
			selectedValue : '',
			items : null,
			enable : true,
			changeEvent : null,
			_scroll : 0
		};

		this.$modal = null;
		this.$input = null;
		this.block = null;
		this.selectedItem = null;
		this.init(element, options);
	};
	

	/**
	 * 
	 */
	ext.ui.comboBox.prototype = {
		constructor : ext.ui.comboBox, 
		init : function (element, options) {
			var that = this;
			that.$el = $(element);
			
			that.options = $.extend(this.defaultOptions, that.options || {}, options);
			
			that.enable = this.options.enable;
			that.block = new ext.block({
				blockContainer : PopupLayer.popLayerInstances.length > 0 ? '.layer_all' : '.pageStack:last-child',
				beforeClose : function () {
					that.close();
				}
			});
			
			that.setModal(this.getModal() || this.createModal());
			that.getModal().html(that.template());
			
			var $modal = that.getModal();
			
			var $input = that.$el.find('input.inputH');
			var $dropUp = $modal.find('div.ly_drop');
			var $dropList = $modal.find('ul.drop_list');
			var selectedValue = that.options.selectedValue;		//초기 값

			//타이틀 처리
			$dropUp.find('h2.ly_tit').html(this.options.title);
			$input.attr('readonly', true);
			
			//placeholder 처리
			$dropUp.attr('title', this.options.placeholder);
			//$label.attr('placeholder', this.options.placeholder);
			
			if (this.options.placeholder) {
				that.$el.find('span.placeholder').html(this.options.placeholder);
			}
			
			//data filter 처리
			if (that.options.filter) {
				$input.attr('data-filter', that.options.filter);
				$input.attr('readonly', true);
			}
			
			//options.enable 이 false 인경우 disabled class를 추가한다.
			if (!that.isEnabled()) {
				that.$el.addClass('disabled');
			}
			
			if(that.options.listClass) {
				$dropList.addClass(that.options.listClass);
			}

			that.render();
		},
		
		createModal : function () {
			var $html = $('<div class="layer_up"></div>');
			$html.attr('id', this.options.id);
			this.$el.data('ui.combobox.id', this.options.id);
			return $html;
		},
		
		getModal : function () {
			return this.$modal;
		},
		
		setModal : function ($modal) {
			this.$modal = $modal;
		},
		
		getId : function () {
			return this.id;
		},
		
		getItem : function (value) {
			var selected = null;
			$.each(this.options.items, function (idx, obj) {
				if (value == obj.value) {
					selected = obj;
					return false;
				}
			});
			return selected;
		},
		
		template : function () {
			var html = '';
			html += '<div class="ly_drop">';
			html += '	<h2 class="ly_tit"></h2>';
			html += '	<div class="ly_scroll">';
			html += '		<ul class="drop_list"></ul>';
			html += '	</div>';
			html += '	<button class="btn_lyclose">닫기</button>';
			html += '</div>';
			return html;
		},
		
		render : function () {
			var that = this;
			var $modal = that.getModal();
			var $ul = $modal.find('div.ly_drop>div.ly_scroll>ul');
			var $h2 = $modal.find('div.ly_drop>h2');
			var $input = that.$el.find('input.inputH');
			var selectedValue = that.options.selectedValue;		//초기 값
			var items = that.options.items;
			
			if (items && items.length > 0) {
				var checked = false;
				
				$.each(items, function (idx, obj) {
					var $li = $('<li class="fnOption" data-option="' + obj.value + '">' + obj.text + '</li>');
					if (selectedValue != null) {
						if (selectedValue === obj.value) {
							//이미 선택된 내용도 다시 선택할수 있도록 변경(2019.01.18 현업 요청)
//							$li.addClass('selected').addClass('active');
							$li.attr('style', 'color:#cb2b11;font-weight:600');
							that.$el.find('.placeholder').hide();
							that.$el.find('span.label').text(obj.text).parents('.select_box').addClass('on');
							$input.val(obj.value).trigger('change.valid');
							that.selectedItem = obj;
							checked = true;
						}//end if
					}//end if
					
					$ul.append($li);
				});
				
				if(that.options.version==1 && !checked){
					that.$el.find('span.label').text(selectedValue).parents('.select_box').addClass('on');
					$input.val(selectedValue).trigger('change.valid');
				}
				else if(that.options.version==2 && checked) {
					that.$el.find('span.label').text(selectedValue).parents('.select_box').addClass('on');
					$input.val(selectedValue).trigger('change.valid');
				}
			} else {
				$modal.empty();
			}
//			$(document).find(PopupLayer.isOpen() ? '.layer_all' : '.pageStack:last-child').append(that.getModal());
			
			if (IS_APP) {
				if(RENDER_MODE == 'S'){
					var dataName = $(document).find('.pageStack:last-child').find('>div:first').data('menu-name');
					if(dataName){
						$(document).find(PopupLayer.popLayerInstances.length > 0 ? '.layer_all' : '.pageStack:last-child').find('>div:first').append(that.getModal());	
					} else {
						$(document).find(PopupLayer.popLayerInstances.length > 0 ? '.layer_all' : '.pageStack:last-child').find('>div:first').find('>div:first').append(that.getModal());
					}
				} else {
					$(document).find(PopupLayer.popLayerInstances.length > 0 ? '.layer_all' : '.pageStack:last-child').append(that.getModal());		
				}
			} else {
				if(RENDER_MODE == 'L'){
					$(document).find(PopupLayer.popLayerInstances.length > 0 ? '.layer_all' : '.pageStack:last-child').append(that.getModal());
				} else {
					var dataName = $(document).find('.pageStack:last-child').find('>div:first').data('menu-name');
					if(dataName){
						$(document).find(PopupLayer.popLayerInstances.length > 0 ? '.layer_all' : '.pageStack:last-child').find('>div:first').append(that.getModal());						
					} else {
						$(document).find(PopupLayer.popLayerInstances.length > 0 ? '.layer_all' : '.pageStack:last-child').append(that.getModal());
					}
				}
			}
			
			
			that.handleEvent();
		},
		
		handleEvent : function () {
			var that = this;
			var $modal = that.getModal();
			var $input = that.$el.find('input.inputH');
			//that.$el.find('span.label').unbind('click.ui.combobox').bind('click.ui.combobox', function () {
			that.$el.find('span.label').unbind('click.ui.combobox').bind('click.ui.combobox', function () {
				//비활성 상태인 경우 이벤트를 처리하지 않는다.
				if (!that.isEnabled()) {
					return false;
				}
				
				if (that.options.items.length > 0) {
					that.show();
					
					if (that.options.autoFocus == true) {
						that.setAutoFocus();
					}
				}
			});
			
			$modal.find('.btn_lyclose').unbind('click.ui.combobox').bind('click.ui.combobox', function(){
				that.block.hide();
				that.close();
			});
			
			var $label = that.$el.find('span.label');
			$modal.find('ul.drop_list').find('li').unbind('click.ui.combobox').bind('click.ui.combobox', function(){
				//이미 선택된 내용도 다시 선택할수 있도록 변경(2019.01.18 현업 요청)
//				$modal.find('ul.drop_list').find('li.selected').removeClass('selected').removeClass('active');
//				$(this).addClass('selected').addClass('active');
				
				$modal.find('ul.drop_list').find('li').removeAttr('style');
				$(this).attr('style', 'color:#cb2b11;font-weight:600');
				
				var text = $(this).text();
				var value = $(this).data('option');
				$label.text(text).parents('.select_box').addClass('on');
				that.$el.find('input.inputH').val(value).trigger('change.valid');
				that.setSelectedItem(that.getItem(value));
				that.$el.parent().find('span.txt_err').remove();
				that.$el.find('.placeholder').hide();
				//change 이벤트 처리
				that.handleChangeEvent(value);
				//닫기
				that.block.hide();
				that.close();
				
				that.$el.parent().nextAll('.err_area').remove();
				
				return false;
			});
		},
		
		show : function (thisBtn) {
			var that = this;
			
			// S - 송병상추가분 -
			try {
				var tObj 			= thisBtn || that.$el; //20.08.31 임수현  thisBtn || 추가
				//var pScrollObj      = $(tObj).parents('#contents').find('[class^="ctg_"]');
				var pScrollObj    =  $(tObj).closest(".pageStack:last-child").find("div[class^='ctg_']");//20.11.23 임수현 수정 ;$(tObj).closest("div[class^='ctg_']") || $page_ID.find("div[class^='ctg_']")

				// 초기화
				//$(pScrollObj).css("margin-bottom", "auto");
				
				var scrollTop		= $(pScrollObj).scrollTop();						// 현재ScrollTop
				var scrollHeight = $(pScrollObj).prop("scrollHeight");				// Scroll 의 높이
				var offTop			= $(tObj).offset().top - scrollTop;					// 부모창으로 부터의 내 Offset ( ScrollTop 감안 )
				var tOffSet		= Math.ceil($(pScrollObj).height() * 0.3);			// 기준 위치
				var tmpScroll		= scrollHeight - $(pScrollObj).height() - scrollTop;// 남은 Scroll
				var moveNum	= $(tObj).offset().top - 200;//(scrollTop + $(tObj).offset().top) - 220;
				// 객체가 기준보다 아래있는 경우 ( 스크롤 내려야 하는 경우 ) 
				if ( offTop - tOffSet > 0 ) {
					var tmpNum = offTop - tOffSet;
					
					// 이동 할 만큼 스크롤이 여유가 없으면 Padding-bottom 추가
					if ( tmpScroll < tmpNum ) {
						//var addPadding = tmpNum - tmpScroll;
						// 본문 영역이 작은 경우 원하는 margin 만 붙여서는 스크롤 영역이 작을 수 있다.
						// 계산 할까 하다... 그것도 귀찮....그냥 window 높이의 절반을 더 주자.
						//$(pScrollObj).css("padding-bottom", $(pScrollObj).height()+"px");
						$(pScrollObj).css("padding-bottom", $(window).height()/2+"px");
					}
					
					if(pScrollObj.css('top').replace('px','') <= 0){
						//select모달 올라와 있을 때
						var ctgTop =  pScrollObj.css('top').replace('px','')*-1;
						moveNum = ctgTop + moveNum + 57;
					}else if(moveNum <= 57){
						moveNum = -57;
					}
					
				}
				// 객체가 기준보다 위에있는 경우 ( 스크롤 올려야 하는 경우 )
				else {
					// 스크롤만 위로 이동
					if(pScrollObj.css('top').replace('px','') <= 0){
						//select모달 올라와 있을 때
						var ctgTop =  pScrollObj.css('top').replace('px','')*-1;
						moveNum = ctgTop + moveNum + 57;
					}else if(moveNum <= 57){
						moveNum = -57;
					}else{
						moveNum = scrollTop - (offTop - tOffSet);
					}					
				}				
				$(tObj).data("pScrollObj", pScrollObj);
				
			} catch(e) {}
			// S - 송병상추가분 - 
			
			that.block.open(function () {
				var $modal = that.getModal();
				var $id = "#"+that.options.id;
				$modal.show();
				that.getModal().find('h2.ly_tit').html(that.options.title);
				
			    var screenScroll = $(window).scrollTop();
			    var $target = that.$el.find('input.inputH');
			    
			   /*21.03.05 임수현 수정 $('#contents [class^="ctg_"]').addClass('ctg_fixed');
		        $('#contents .ctg_fixed').animate({'top':-moveNum},300);*/
			    $(pScrollObj).addClass('ctg_fixed').animate({'top':-moveNum},300);
			    
		        $modal.attr('data-scroll-fiexed', moveNum);		        
			    $(pScrollObj).bind('scroll', function(e){/*21.03.05 임수현 수정 */
			        e.preventDefault();
			    });
			    
			    $('.header, .footer').addClass('remove');
			    
			    setTimeout(function(){
					layerScroll();
				},300);
			});
		},
		
		/**
		 * 
		 */
		close : function () {
			var that = this;
			that.getModal().addClass('close');
			that.getModal().removeClass('close').removeAttr('style');

			var pageTop = that.getModal().data('scroll-fiexed');
			
			var pageStack = $(document).find('.pageStack:last-child');
			$('.header, .footer').removeClass('remove');
			if($('.layer_up').is(':visible') != true){//19.12.11 임수현 : select modal open시 하단 padding-bottom 추가
    			var pScrollObj	= $(that.$el).closest("div[class^='ctg_']");
    			$(pageStack).find('[class^="ctg_"]').removeClass('ctg_fixed').css({'padding-bottom':'','top':''});
    		}
			var scrollBody = $(pageStack).parents('.layer_all').length > 0 ? $(this).parents('.lybx') : $(window);
	    	scrollBody.scrollTop(pageTop);
		},
		
		/**
		 * 콤보박스 chage 이벤트를 처리한다.
		 * @param selectedValue 목록에서 선택한 값
		 */
		handleChangeEvent : function (selectedValue) {
			var that = this;
			
			var selectedObj = that.getItem(selectedValue);
			
			var itemChanged = function () {
				return !that.selectedItem || (that.selectedItem.value != selectedObj.value);
			};
			//선택한 item이 존재하고 변경된 값이 다른 경우에만 change 이벤트를 처리한다.
			var callback = that.options.changeEvent;
			if (callback && typeof callback === 'function') {
				callback(that.$el, selectedObj);
			}//end if
		},
		
		setSelectedItem : function (item) {
			this.selectedItem = item;
		},
		
		/**
		 * combobox를 비활성화 시킨다.
		 */
		disabled : function () {
			var that = this;
			if (that.$el.hasClass('disabled')) {
				return;
			}
			
			that.$el.addClass('disabled');
			that.$el.find('input.inputH').attr('disabled', true);
			this.enable = false;
		},
		
		/**
		 * combobox를 활성화 시킨다.
		 */
		enabled : function () {
			
			if (!this.$el.hasClass('disabled')) {
				return;
			}
			
			if (this.$el.hasClass('disabled')) {
				this.$el.removeClass('disabled')
			}
			this.$el.find('input.inputH').attr('disabled', false);
			this.enable = true;
		},
		
		/**
		 * 활성화 여부를 가져온다.
		 */
		isEnabled : function () {
			return this.enable;
		},
		
		/**
		 * combobox 값을 설정한다.
		 * @param selectValue
		 */
		setValue : function (val) {
			var that = this;
			var selectedObj = that.getItem(val);
		
			var $el			 = that.$el;
			var $modal		 = that.getModal();
			var $input 		 = $el.find('input.inputH');
			var $label 		 = $el.find('span.label');
			var $placeholder = $el.find('span.placeholder');
			var $a 			 = null;
			if ($modal.find('div.ly_scroll').length > 0) {
				$a = $modal.find('div.ly_scroll > ul > li.fnOption');
			} else {
				$a = $modal.find('div.ly_drop > ul > li.fnOption');
			}
			
			if (val == '' || val == null) {
				$label.text('');
				$input.val('').trigger('change.valid');
				$el.removeClass('on');
				$placeholder.show();
				$a.parents('li').removeClass('selected').removeClass('active');
			} else {
				$.each($a, function () {
					var value = $(this).data('option');
					if($(this).parents('li').hasClass('selected')) {
						if (value == val) {
							return false;
						} else {
							$(this).parents('li').removeClass('selected').removeClass('active')
						}
					} else {
						if (value == val) {
							$(this).parents('li').addClass('selected').addClass('active');
							$label.text(selectedObj.text);
							$input.val(selectedObj.value).trigger('change.valid');;
							$el.find('span.placeholder').removeClass('placeholder');
							that.setSelectedItem(selectedObj);
							return false;
						} else {
							$(this).parents('li').removeClass('selected')
						}
					}
				});
			}
		},
		
		setAutoFocus : function () {
			var that = this;
			if (that.options.autoFocus == false) {
				return;
			}
			
			var $modal	= that.getModal();
			if ($modal.find('.ly_scroll').length > 0) {
				var $selected = $modal.find('div.ly_scroll > ul > li.selected');
				if ($selected) {
					var scrollTop = $modal.find('.ly_scroll').scrollTop();
					var top = 0;
					if ($selected.position()) {
						top = $selected.position().top;
					}
					var position = (top + scrollTop) - ($selected.outerHeight() * 3);
					setTimeout(function(){
						$modal.find('.ly_scroll').animate({
							scrollTop : position
						}, 300);
					}, 300);
				}
			}
		},
		
		/**
		 * 콤보박스 list change 이벤트를 처리한다.
		 */
		change : function (callback) {
			this.options.changeEvent = callback || null;
		},
		
		/**
		 * 
		 */
		update : function (element, options) {
			var that = this;
			that.setValue('');
			var $modal = that.getModal() 
			that.getModal().find('div.ly_drop').remove();
			that.init(element, options);
		},
		/**
		 * 아이템 변경
		 */
		changeItems : function(_items) {
			this.update(this.$el, $.extend(this.options, {items:_items}));
		}
	};
	//**********************************************
	// 공통 UI 콤보박스 클래스 끝
	//**********************************************
	
	//**********************************************
	// 공통 UI 리스트박스 클래스 시작
	//**********************************************
	
	/**
	 * 리스트 박스 constructor
	 */
	ext.ui.listBox = function (element, options) {
		this.defaultOptions = {
			id : ext.ui.newGuid(),
			title : '',
			selectedValue : '',
			selectedDefaultUse : null,
			itemKey : null,
			items : null,
			enable : true,
			changeEvent : null,
			_scroll : 0
		};

		this.$modal = null;
		this.block = null;
		this.selectedItem = null;
		this.init(element, options);
	};
	
	ext.ui.listBox.prototype = {
		init : function (element, options) {
			var that = this;
			this.$el = $(element);
			that.options = $.extend(true, this.defaultOptions, options);
			that.enable = that.options.enable;
			
			var selectedValue = that.options.selectedValue;		//초기 값
			
			//options.enable 이 false 인경우 disabled class를 추가한다.
			if (!that.isEnabled()) {
				that.$el.addClass('disabled');
			}
			that.block = new ext.block({
				blockContainer : PopupLayer.popLayerInstances.length > 0 ? '.layer_all' : '.pageStack:last-child',
				beforeClose : function () {
					that.close();
				}
			});
			
			that.setModal(this.getModal() || this.createModal());
			that.getModal().append(that._template());
			
			var $dropUp = that.getModal().find('div.ly_drop');
			var _template = _.template($(that.options.template).html());
			var data = {
				items : that.options.items
			};
			
			//데이터 포매터가 있는 경우 템플릿에서 처리할 수 있도록 한다.
			var formatter = that.options.formatter;
			if (formatter && typeof formatter === 'object') {
				$.extend(true, data, formatter);
			}
			
			$dropUp.html(_template(data));
			$dropUp.append('<button class="btn_lyclose">닫기</button>');
			
			if (IS_APP) {
				if(RENDER_MODE == 'S'){
					var dataName = $(document).find('.pageStack:last-child').find('>div:first').data('menu-name');
					if(dataName){//위젯호출 처리
						$(document).find(PopupLayer.popLayerInstances.length > 0 ? '.layer_all' : '.pageStack:last-child').find('>div:first').append(that.getModal());	
					} else {//메뉴호출 처리
						$(document).find(PopupLayer.popLayerInstances.length > 0 ? '.layer_all' : '.pageStack:last-child').find('>div:first').find('>div:first').append(that.getModal());
					}
				} else {//일반 HTML
					$(document).find(PopupLayer.popLayerInstances.length > 0 ? '.layer_all' : '.pageStack:last-child').append(that.getModal());		
				}
			} else {
				if(RENDER_MODE == 'L'){
					$(document).find(PopupLayer.popLayerInstances.length > 0 ? '.layer_all' : '.pageStack:last-child').append(that.getModal());
				} else {
					var dataName = $(document).find('.pageStack:last-child').find('>div:first').data('menu-name');
					if(dataName){
						$(document).find(PopupLayer.popLayerInstances.length > 0 ? '.layer_all' : '.pageStack:last-child').find('>div:first').append(that.getModal());						
					} else {
						$(document).find(PopupLayer.popLayerInstances.length > 0 ? '.layer_all' : '.pageStack:last-child').append(that.getModal());
					}
				}
			}
			
			this.initValue();
			this.handleEvent();
		},
		
		createModal : function () {
			var $html = $('<div class="layer_up"></div>');
			$html.attr('id', this.options.id);
			this.$el.data('ui.combobox.id', this.options.id);
			return $html;
		},
		
		getModal : function () {
			return this.$modal;
		},
		
		setModal : function ($modal) {
			this.$modal = $modal;
		},
		
		getItemKey : function () {
			return this.options.itemKey;
		},
		
		getItem : function (value) {
			var that = this;
			var selected = null;
			$.each(this.options.items, function (idx, obj) {
				if (value == obj[that.getItemKey()]) {
					selected = obj;
					return false;
				}
			});
			return selected;
		},
		
		_template : function () {
			var html = '';
			html += '<div class="ly_drop">';
			html += '</div>';
			return html;
		},
		
		initValue : function () {
			var that = this;
			if (that.options.selectedValue) {
				var $modal 	= that.getModal();
				var $dropUp	= $modal.find('div.ly_drop');
				var $li 	= $dropUp.find('ul>li');
				var $el 	= that.$el;
				var $label 	= $el.find('span.label');
				
				var value = that.options.selectedValue;
				var selectedDefaultUse = that.options.selectedDefaultUse;
				if(selectedDefaultUse == null) selectedDefaultUse = true;
				
				var selectedItem = that.getItem(value);
				if (selectedItem) {
					if (that.options.formatter.toLabel && typeof that.options.formatter.toLabel === 'function') {
						var toLabel = that.options.formatter.toLabel;
						var _html = toLabel(that.getItem(value));
							$label.html(_html).parents('.select_box').addClass('on');
					} else {
						var obj = that.getItem(value);
						if (obj) {
							var _objValue = JUtilFormat.toAccount('032', obj[that.options.itemKey]);
							$label.html(_objValue).parents('.select_box').addClass('on');
						}
					}
					$el.find('input.inputH').val(value).trigger('change.valid');
					$dropUp.removeClass('active').addClass('close');
					that.$el.find('.placeholder').hide();
					
					var item = that.getItem(value);
					that.setSelectedItem(that.getItem(value));
					
					that.$el.parent().find('span.txt_err').remove();
					
					//----------------------------------------------------
					// [2018.12.04 최성돈] 초기 선택 클래스처리
					//----------------------------------------------------
					$.each($li, function () {
						var $wrap = $(this).find('div.wrap');
						var $li = $wrap.find('[data-option]');
						var $parents =  $wrap.parents('li');
						var optionValue = $li.data('option');
						if (value == optionValue) {
							$parents.addClass('active');
							$li.addClass('selected');
						}
					});
					
					//change 이벤트 처리
					if(selectedDefaultUse){
						that.handleChangeEvent(value);
					}
				}
			}
		},
		
		handleEvent : function () {
			var that = this;
			
			var $modal 	= that.getModal();
			var $dropUp	= $modal.find('div.ly_drop');
			var $li 	= $dropUp.find('ul>li');
			var $el 	= that.$el;
			var $label 	= $el.find('span.label');

			//$el.find('span.label').bind('click', function () {
			//[2018.10.16 최성돈] selectbox 클릭하도록 수정
			$el.find('span.label').bind('click', function () {
				var $target = $(this);
				//비활성 상태인 경우 이벤트를 처리하지 않는다.
				if (!that.isEnabled()) {
					return;
				}
				try{
					UIBridgePlugin.doCustomHideKeypad({'keypadHide':'Y'} );		
				}catch(e){}
				
				that.show();
			});
			
			$li.find('div.wrap').bind('click', function(){
				var $li = $(this).find('[data-option]');
				var $parents =  $(this).parents('li');
				
				//-------------------------------------------
				// [2018.12.04] 선택된 정보 selected 클래스 추가
				//-------------------------------------------
				$modal.find('div.ly_drop').find('li.active').removeClass('active');
				
				$parents.addClass('active');
				$li.addClass('selected');
				
				var text = $li.text();
				var value = $li.data('option');
				
				if (that.options.formatter.toLabel && typeof that.options.formatter.toLabel === 'function') {
					var toLabel = that.options.formatter.toLabel;
					var _html = toLabel(that.getItem(value));
						$label.html(_html).parents('.select_box').addClass('on');
				} else {
					$label.text(text).parents('.select_box').addClass('on');
				}
				$el.find('input.inputH').val(value).trigger('change.valid');;
				$dropUp.removeClass('active').addClass('close');
				that.$el.find('.placeholder').hide();
				that.setSelectedItem(that.getItem(value));
				
				that.$el.parent().find('span.txt_err').remove();
				
				//change 이벤트 처리
				that.handleChangeEvent(value);
				
				that.block.hide();
				that.close();
				
				return false;
			});
			
			$modal.find('.btn_lyclose').bind('click', function () {
				that.block.hide();
			});
		},
		
		/**
		 * 리스트박스 change 이벤트를 처리한다.
		 * @param selectedValue 목록에서 선택한 값
		 */
		handleChangeEvent : function (selectedValue) {
			var that = this;
			var selectedItem = that.getItem(selectedValue);
			//선택한 item이 존재하고 변경된 값이 다른 경우에만 change 이벤트를 처리한다.
			var _changeCallback = that.options.changeEvent;
			if (_changeCallback && typeof _changeCallback === 'function') {
				_changeCallback(that.$el, selectedItem);
			}//end if
		},
		
		show : function () {
			var that = this;
			that.block.open(function () {
				that.getModal().show().addClass('active');
				that.getModal().find('h2.ly_tit').html(that.options.title);
				
			    var screenScroll = $(window).scrollTop();
			    var $id = "#"+that.options.id;
			    
			    that.getModal().attr('data-scroll-fiexed', screenScroll);
			    
			    $('#contents [class^="ctg_"]').addClass('ctg_fixed');
		        $('#contents .ctg_fixed').scrollTop(screenScroll);
		        
			    $('#contents .ctg_fixed').bind('scroll', function(e){
			        e.preventDefault();
			    });
			    $('.header, .footer').addClass('remove');
				setTimeout(function(){
					layerScroll();
				},300);
			});
		},
		
		close : function () {
			var that = this;
			that.getModal().addClass('close');
			that.getModal().removeClass('close').removeAttr('style');
			
			var pageTop = that.getModal().data('scroll-fiexed');
			
			var pageStack = $(document).find('.pageStack:last-child');
			$(pageStack).find('[class^="ctg_"]').removeClass('ctg_fixed').css('padding-bottom','');//19.12.11 임수현 : select modal open시 하단 padding-bottom 추가
			$('.header, .footer').removeClass('remove');
			
			var scrollBody = $(pageStack).parents('.layer_all').length > 0 ? $(this).parents('.lybx') : $(window);
			scrollBody.scrollTop(pageTop);
			
			try{
				UIBridgePlugin.doCustomHideKeypad({'keypadHide':'N'} );		
			}catch(e){}
		},
		
		/**
		 * 선택된 아이템을 리스트박스 객체에 설정한다.
		 */
		setSelectedItem : function (item) {
			this.selectedItem = item;
		},
		
		/**
		 * 리스트박스를 비활성화 시킨다.
		 */
		disabled : function () {
			if (this.$el.hasClass('disabled')) {
				return;
			}
			
			this.$el.addClass('disabled');
			this.$el.find('input.inputH').attr('disabled', true);
			this.enable = false;
		},
		
		/**
		 * 리스트박스를 활성화 시킨다.
		 */
		enabled : function () {
			
			if (!this.$el.hasClass('disabled')) {
				return;
			}
			
			if (this.$el.hasClass('disabled')) {
				this.$el.removeClass('disabled')
			}
			this.$el.find('input.inputH').attr('disabled', false);
			this.enable = true;
		},
		
		/**
		 * 활성화 여부를 가져온다.
		 */
		isEnabled : function () {
			return this.enable;
		},
		
		/**
		 * 리스트박스 값을 설정한다.
		 * @param selectValue
		 */
		setValue : function (val) {
			
		},
		
		/**
		 * 콤보박스 list change 이벤트를 처리한다.
		 */
		change : function (callback) {
			this.options.changeEvent = callback || null;
		}
	};
	
	//**********************************************
	// 공통 UI 리스트박스 클래스 끝
	//**********************************************
	
	
	//**********************************************
	// 공통 UI 툴팁 클래스 시작
	//**********************************************
	ext.ui.tooltip = function (element, options) {
		this.defaultOptions = {
			message : [],
			autoClose : true,
			timer : 5000
		};
		this.init(element, options);
	};
	
	/**
	 * 메소드 정의
	 */
	ext.ui.tooltip.prototype = {
		init: function (el, options) {
			this.$el = $(el);
			this.$tooltip = this.$el.siblings('.tip_pop');
			this.options = $.extend(true, this.defaultOptions, options);
			this.handleEvent();
		},
		
		handleEvent: function () {
			var that = this;
			that.$el.bind('click', function () {
				that.show();
			});
			
			that.$tooltip.find('.btn_close').click(function(){
				that.close();	
			});
		},
		
		show : function () {
			var that = this;
			var winW = $('body').width();
			var $pop = that.$el.siblings('.tip_pop');
			var $popL = that.$el.offset().left - 20;
			var $popR = winW - (that.$el.offset().left + 36);
			
			if(!that.$el.hasClass("on")){
				that.$tooltip.fadeOut().removeAttr('style');
				that.$el.removeClass('on');
				
				setTimeout(function(){
					that.$tooltip.siblings('.btn_tip').addClass('on');
				},100);
				that.$tooltip.fadeIn();
				that.$tooltip.css({'left':-$popL,'right':-$popR});
				
				var screenH = screen.height,
					screenScrollTop = $(document).scrollTop(),
					posY = that.$el.offset().top,
					tipH = $pop.outerHeight(),
					tipPosY = (that.$el.parent(".tip_area").hasClass("type2"))? 0 : parseInt(that.$tooltip.css("top")),
					bottomGap = (30 / 100) * screenH,
					extraInterval1 = posY - screenScrollTop,
					extraInterval2 = screenH - extraInterval1 - tipPosY - bottomGap;
					
				if(extraInterval2 < tipH) {
					that.$el.parents(".tip_area").addClass("type2");	
				}
			}
			
			if (that.options.autoClose == true && that.options.timer) {
				setTimeout(function () {
					that.close();
				}, that.options.timer);
			}
			//[2019.01.18 박형신]
			//ctg_fixed 추가
			var pageStack = $(document).find('.pageStack:last-child');
			$(pageStack).find('[class^="ctg_"]').addClass('ctg_fixed');
			$('.header, .footer').addClass('remove');
		},
		
		close: function () {
			var that = this;
			that.$tooltip.fadeOut(function(){
				that.$tooltip.parents(".tip_area").removeClass("type2");	
			});
			setTimeout(function(){
				that.$tooltip.removeAttr('style');
				that.$tooltip.siblings('.btn_tip').removeClass('on');
				
				var pageStack = $(document).find('.pageStack:last-child');
				$(pageStack).find('[class^="ctg_"]').removeClass('ctg_fixed');
				$('.header, .footer').removeClass('remove');
			},200);	
		}
	};
	//**********************************************
	// 공통 UI 툴팁 클래스 끝
	//**********************************************
	
	
	//**********************************************
    // 공통 UI 콤보박스 클래스 시작 
    //**********************************************
    ext.ui.listcombobox = function (element, options) {
        this.defaultOptions = {
            version : 1,
            id : ext.ui.newGuid(),
            name : '',
            title : '',
            selectedValue : '',
            selectedEvent: false,
            items : null,
            enable : true,
            changeEvent : null,
            
            _scroll : 0,
            listClassName : "drop_list",
            parentSelector: null
        };
        this.$modal = null;
        this.$input = null;
        this.block = null;
        this.selectedItem = null;
        this.init(element, options, options.selectedValue, options.selectedEvent == true);
    };


    ext.ui.listcombobox.prototype = {
        constructor : ext.ui.listcombobox, 
        init : function (element, options, pSelectedValue, isEvent) {
            var that = this;
            that.$el = $(element);
            //ConsoleLog("init.isEvent: " + isEvent + ", pSelectedValue: " + pSelectedValue);
            
            that.options = $.extend(this.defaultOptions, that.options || {}, options);

            that.setModal(this.getModal() || this.createModal());
            that.getModal().html(that.getNewPopupHtml());
            
            var $modal = that.getModal();

            
            
            var pParSelector = that.options.parent;
            if(!pParSelector) {
                var layerAll = $(that.$el).closest('.layer_all');
                if(layerAll.length > 0) {
                    pParSelector = layerAll;
                } else {
                    pParSelector = '.pageStack:last-child';
                }
            }
            //ConsoleLog("pParSelector", pParSelector);
            
            
            that.enable = this.options.enable;
            /*
            that.block = new ext.block({
                blockContainer : that.getModal().attr("id"),
                beforeClose : function () {

                    //that.close();
                    //layClosePop(that.getModal());
                }
            });
            */
            
            var $input = that.$el.find('input.inputH');
            var $dropUp = $modal.find('div.ly_drop');
            var $dropList = $modal.find('ul.drop_list');
            //var selectedValue = pSelectedValue || that.options.selectedValue;     //초기 값

            //타이틀 처리
            $dropUp.find('h2.ly_tit').html(this.options.title);
            $input.attr('readonly', true);
            
            //placeholder 처리
            $dropUp.attr('title', this.options.placeholder);
            //$label.attr('placeholder', this.options.placeholder);
            
            if (this.options.placeholder) {
                that.$el.find('span.placeholder').html(this.options.placeholder);
            }
            
            //data filter 처리
            if (that.options.filter) {
                $input.attr('data-filter', that.options.filter);
                $input.attr('readonly', true);
            }
            
            //options.enable 이 false 인경우 disabled class를 추가한다.
            if (!that.isEnabled()) {
                that.$el.addClass('disabled');
            }
            
            if(that.options.listClass) {
                $dropList.addClass(that.options.listClass);
            }

            that.render(pSelectedValue || "", isEvent, pParSelector);
        },
        
        createModal : function () {
            var $html = $('<div class="layer_up"></div>');
            $html.attr('id', this.options.id);
            this.$el.data('ui.listcombobox.id', this.options.id);
            return $html;
        },
        
        getModal : function () {
            return this.$modal;
        },
        
        setModal : function ($modal) {
            this.$modal = $modal;
        },
        
        getId : function () {
            return this.id;
        },
        getSelectedItem: function() {
            var that = this;
            var lStrSelectedVal = that.$el.find('input.inputH').val() || "";
            if(lStrSelectedVal == "") {
                return null;
            }
            return that.getItem(lStrSelectedVal);
        },
        getItem : function (value) {
            var selected = null;
            $.each(this.options.items, function (idx, obj) {
                if (value == obj.value) {
                    selected = obj;
                    return false;
                }
            });
            return selected;
        },
        
        getNewPopupHtml: function () {
            var that = this;
            var lStrPopupListClassName = that.options.listClassName || "drop_list";
            var html = '';
            html += '<div class="ly_drop">';
            html += '   <h2 class="ly_tit"></h2>';
            html += '   <div class="ly_scroll">';
            html += '       <ul class="listcombobox-list ' + lStrPopupListClassName + '"></ul>';
            html += '   </div>';
            html += '   <button class="btn_lyclose">닫기</button>';
            html += '</div>';
            return html;
        },
        
        render : function (selectedValue, isEvent, pParSelector) {
            var that = this;
            var $modal = that.getModal();
            var $list = $modal.find(".listcombobox-list");
            var $ul = $modal.find('div.ly_drop>div.ly_scroll>ul');
            var $h2 = $modal.find('div.ly_drop>h2');
            var $input = that.$el.find('input.inputH');
            //var selectedValue = that.options.selectedValue;     //초기 값
            var items = that.options.items;
            var tmplHtml = that.options.template;
            var isTmplType = tmplHtml && tmplHtml != "";
            //|| '<li class="fnOption" data-option="<\%=items.value%>"><\%=items.text%></li>';
            var lFncRowMaker = null;
            var formatter = null;
            if(isTmplType) {
                formatter = (that.options.formatter && typeof that.options.formatter === 'object') ? that.options.formatter : {};
                lFncRowMaker = _.template($(tmplHtml).html());
            }

            if(items && items.length > 0) {
                var checked = false;
                $.each(items, function(idx, obj) {
                    var rowObj = null;
                    if(isTmplType) {
                        var lObjFormatterData = $.extend(true, {"items": $.extend(true, {}, obj)}, formatter);
                        rowObj = $(lFncRowMaker(lObjFormatterData));
                    } else {
                        rowObj = $('<li class="fnOption" data-option="' + obj.value + '">' + obj.text + '</li>');
                        //rowObj = $(`<li class="fnOption" data-option="${obj.value}">${obj.text}</li>`);
                    }
                    rowObj.data("row_data", obj);
                    /*
                    if(!checked) {
                        if(selectedValue != null) {
                            if(selectedValue === obj.value) {
                                rowObj.toggleClass("active", true).find(".fnOption").toggleClass("selected", true);
                                if(rowObj.hasClass("fnOption")) {
                                    rowObj.toggleClass("selected", true);
                                }
                                that.setValue(selectedValue);
                                checked = true;
                            }//end if
                        }//end if
                    }
                    */
                    $list.append(rowObj);
                });
            } else {
                $modal.empty();
            }
            var modalId = $modal.attr("id");
            
            //ConsoleLog("has[" + modalId + "] ", pParSelector, $(pParSelector).is(":has(#" + modalId + ")"));
            
            if(!$(pParSelector).is(":has(#" + modalId + ")")) {
                
                $(pParSelector).append(that.getModal());
            }
            
            that.handleEvent();
            that.setValue(selectedValue, isEvent);
            
            if(that.$el.hasClass("disabled")) {
                that.disabled();
            }
        },
        
        handleEvent : function () {
            var that = this;
            var $modal = that.getModal();
            var $input = that.$el.find('input.inputH');
            that.$el.find('span.label').unbind('click.ui.listcombobox').bind('click.ui.listcombobox', function () {
                //비활성 상태인 경우 이벤트를 처리하지 않는다.
                if(!that.isEnabled()) {
                    return false;
                }
                if(that.options.items.length > 0) {
                    that.show();
                    if (that.options.autoFocus == true) {
                        that.setAutoFocus();
                    }
                }
            });
            $modal.find('.btn_lyclose').unbind('click.ui.listcombobox').bind('click.ui.listcombobox', function(){
                //layClosePop($modal);
                //that.block.hide();
                that.close();
            });
            
            var $label = that.$el.find('span.label');
            $modal.find('.listcombobox-list').children().unbind('click.ui.listcombobox').bind('click.ui.listcombobox', function(pEvt) {
                var lObjSelectedRow = $(this);
                var value = "";
                var lObjFnOption = lObjSelectedRow.hasClass("fnOption") ? lObjSelectedRow : lObjSelectedRow.find(".fnOption");
                
                var lStrValue = lObjFnOption.data("option");
                
                that.setValue(lStrValue);
                /*
                var lStrText = lObjFnOption.text();
                
                listcombobox
                
                $modal.find('ul.drop_list').find('li').removeAttr('style');
                $(this).attr('style', 'color:#cb2b11;font-weight:600');
                
                var text = $(this).text();
                var value = $(this).data('option');
                $label.text(text).parents('.select_box').addClass('on');
                that.$el.find('input.inputH').val(value).trigger('change.valid');
                that.setSelectedItem(that.getItem(value));
                that.$el.parent().find('span.txt_err').remove();
                that.$el.find('.placeholder').hide();
                //change 이벤트 처리
                
                that.handleChangeEvent(value);
                */
                //닫기
                
                //layClosePop($modal);
                
                //that.block.hide();
                that.$el.parent().nextAll('.err_area').remove();
                that.close();
                return false;
            });
        },
        
        show: function() {
            var that = this;
            laypopId(that.getModal());
        },
        close : function () {
            var that = this;
            layPopClose(that.getModal());
        },
        
        /**
         * 콤보박스 chage 이벤트를 처리한다.
         * @param selectedValue 목록에서 선택한 값
         */
        handleChangeEvent : function (pNewValue, pOldValue) {
            var that = this;
            
            var oldSelectedObj = pOldValue ? that.getItem(pOldValue) : null;
            var newSelectedObj = that.getItem(pNewValue);
            
            var itemChanged = function () {
                return !that.selectedItem || (that.selectedItem.value != newSelectedObj.value);
            };
            //선택한 item이 존재하고 변경된 값이 다른 경우에만 change 이벤트를 처리한다.
            var callback = that.options.changeEvent;
            if (callback && typeof callback === 'function') {
                var nvlNewData = newSelectedObj || {};
                var nvlOldData = oldSelectedObj || {};
                var isChangedValue = (nvlOldData.value || "") != (nvlNewData.value || "");
                callback(that.$el, nvlNewData, nvlOldData, {"isChanged" : isChangedValue});
            }//end if
        },
        
        setSelectedItem : function (item) {
            this.selectedItem = item;
        },
        
        /**
         * combobox를 비활성화 시킨다.
         */
        disabled : function () {
            var that = this;
//            if (that.$el.hasClass('disabled')) {
//                return;
//            }
            
            that.$el.toggleClass("disabled", true);
            //that.$el.find('input.inputH').attr("disabled", true);
            that.$el.find('input.inputH').prop("disabled", true);
            this.enable = false;
        },
        
        /**
         * combobox를 활성화 시킨다.
         */
        enabled : function () {
            
            if (!this.$el.hasClass('disabled')) {
                return;
            }
            
            if (this.$el.hasClass('disabled')) {
                this.$el.removeClass('disabled')
            }
            this.$el.find('input.inputH').attr('disabled', false);
            this.enable = true;
        },
        
        /**
         * 활성화 여부를 가져온다.
         */
        isEnabled : function () {
            return this.enable;
        },
        
        /**
         * combobox 값을 가져온다
         */
        getValue : function () {
            var that = this;
            var lStrSelectedVal = that.$el.find('input.inputH').val() || "";
            return lStrSelectedVal;
        },
        
        /**
         * combobox 값을 설정한다.
         */
        setValue: function(pValue, isEvent) {
            var that = this;
            var $el          = that.$el;
            var $modal       = that.getModal();
            var $input       = $el.find('input.inputH');
            var $label       = $el.find('span.label');
            var $placeholder = $el.find('span.placeholder');
            var $a           = null;

            var orgItem = that.getItem(pValue);
            var selectedItem = orgItem || {};
            var isSelected = orgItem ? true : false;
            
            var lStrValue = String(selectedItem.value || "");
            var lStrText = selectedItem.text || "";
            
            if(that.options.formatter && that.options.formatter.toLabel && typeof that.options.formatter.toLabel === 'function') {
                var toLabel = that.options.formatter.toLabel;
                $label.html(toLabel(selectedItem));
            } else {
                $label.html(lStrText || "");
            } 

            var rowObj = $modal.find(".listcombobox-list > *");
            var oldValue = rowObj.filter(".selected").data("option") || "";
            if(rowObj.hasClass("fnOption")) {
                var selRowObj = rowObj.filter(function(pRowIndex, pRowItem) {
                    var lCurrOption = String($(pRowItem).data("option") || "");
                    if(lCurrOption != "" && lCurrOption == lStrValue) {
                        return true;
                    }
                    return false;
                });
                selRowObj.toggleClass("selected", true).toggleClass("active", true);
                rowObj.not(selRowObj).toggleClass("selected", false).toggleClass("active", false);
            } else {
                var selRowObj = rowObj.filter(function(pRowIndex, pRowItem) {
                    var lCurrOption = $(pRowItem).find(".fnOption").data("option") || "";
                    if(lCurrOption != "" && lCurrOption == lStrValue) {
                        return true;
                    }
                    return false;
                });
                selRowObj.toggleClass("active", true).find(".fnOption").toggleClass("selected", true);
                rowObj.not(selRowObj).toggleClass("active", false).find(".fnOption").toggleClass("selected", false);
            }
            $input.val(lStrValue).trigger('change.valid');
            //$input.attr("value", lStrValue).trigger('change.valid');
            $el.toggleClass("on", isSelected);
            $placeholder.toggle(!isSelected);
            if(isEvent == null || isEvent == true) {
                that.handleChangeEvent(lStrValue, oldValue);
            }
        },
        
        setAutoFocus : function () {
            var that = this;
            if (that.options.autoFocus == false) {
                return;
            }
            
            var $modal  = that.getModal();
            if ($modal.find('.ly_scroll').length > 0) {
                var $selected = $modal.find('div.ly_scroll > ul > li.selected');
                if ($selected) {
                    var scrollTop = $modal.find('.ly_scroll').scrollTop();
                    var top = 0;
                    if ($selected.position()) {
                        top = $selected.position().top;
                    }
                    var position = (top + scrollTop) - ($selected.outerHeight() * 3);
                    setTimeout(function(){
                        $modal.find('.ly_scroll').animate({
                            scrollTop : position
                        }, 300);
                    }, 300);
                }
            }
        },
        
        /**
         * 콤보박스 list change 이벤트를 처리한다.
         */
        change : function (callback) {
            this.options.changeEvent = callback || null;
        },
        
        /**
         * 
         */
        update : function (element, options, selectedValue, isEvent) {
            var that = this;
            //that.setValue('');
            var $modal = that.getModal()
            that.getModal().find('div.ly_drop').remove();
            that.init(element, options, selectedValue, isEvent);
        },
        /**
         * 아이템 변경
         */
        clearItems : function(pChangeOptions) {
            this.changeItems([], "", pChangeOptions);
        },
        clearItemsEvent : function(pChangeOptions) {
            this.changeItems([], "", pChangeOptions ? $.extend(true, {"event":true}, pChangeOptions) : {"event":true});
        },
        changeItems : function(_items, initValue, pChangeOptions) {
            if(!pChangeOptions && typeof initValue === 'object') {
                pChangeOptions = initValue;
                initValue = "";
            }
            var lStrValue = initValue || "";
            var lObjChgOpts = pChangeOptions || {};
            var lObjItemList = $.extend(true, [], _items);
            var lIntItemSize = lObjItemList.length;
            //ConsoleLog("lObjItemList: ", lObjItemList);
            //ConsoleLog("lObjChgOpts: ", lObjChgOpts);
            
            var isEvent = lObjChgOpts.event == true;
            if(lStrValue == null || lStrValue == "") {
                var lStrInitType = (lObjChgOpts.initType || "").toLowerCase();
                if(lStrInitType == "one") {
                    if(lIntItemSize == 1) {
                        lStrValue = lObjItemList[0].value || "";
                    }
                } else if(lStrInitType == "first") {
                    if(lIntItemSize > 0) {   
                        lStrValue = lObjItemList[0].value || "";
                    }
                }
            }
            this.update(this.$el, $.extend(this.options, {items: lObjItemList}), lStrValue, isEvent);
        }
    };	
	
	
	
	
	//**********************************************
	// JQuery function extend 
	//**********************************************
    jQuery.extend( {
        //JSON_STR TO ARRAY(PlainObject 면 Array로 Wrap) 로 변환
        convJsonStrToArray: function(pJsonStr, pDecodeFlag) {
            if(pJsonStr != null && pJsonStr != "") {
                try {
                    var lObjConvObj = jQuery.convJsonStrToObject(pJsonStr, pDecodeFlag) || [];
                    if(jQuery.isArray(lObjConvObj)) {
                        return lObjConvObj;
                    } else if(jQuery.isPlainObject(lObjConvObj)) {
                        var newArray = [];
                        newArray.push(lObjConvObj);
                        return newArray;
                    }
                } catch(ex) {
                    ConsoleLog(ex);
                }
            }
            return [];
        },
        //JSON_STR TO PlainObject(Array면 Array[0]) 로 변환
        convJsonStrToPlainObject: function(pJsonStr, pDecodeFlag) {
            if(pJsonStr != null && pJsonStr != "") {
                try {
                    var lObjConvObj = jQuery.convJsonStrToObject(pJsonStr, pDecodeFlag) || {};
                    if($.isPlainObject(lObjConvObj)) {
                        return lObjConvObj;
                    } else if(jQuery.isArray(lObjConvObj)) {
                        return lObjConvObj[0];
                    }
                } catch(ex) {
                    ConsoleLog(ex);
                }
            }
            return {};
        },
        convJsonStrToObject: function(pJsonStr, pDecodeFlag) {
            if(pJsonStr != null && pJsonStr != "") {
                try {
                    var inputJsonStr = pDecodeFlag == null || pDecodeFlag == true ? decodeURIComponent(pJsonStr) : pJsonStr;
                    return $.parseJSON(inputJsonStr);
                } catch(ex) {
                    ConsoleLog(ex);
                }
            }
            return null;
        }   
    } );
    
    
	$.extend($.fn, {
		/***********************************************
		 * 콤보박스
		 **********************************************/
		comboBox : function (option) {
			var $this = $(this);
			var data = $this.data('ui.combobox');
			var options = typeof option == 'object' && option;
			
			if (typeof options == 'object') {
				if (!data) {
					data = new ext.ui.comboBox(this, options)
					$this.data('ui.combobox', data);
				} else {
					data.update(this, options);
				}
			}
			if (typeof option == 'string' && data && data[option]) data[option]();
			return data;
		},
		
		/***********************************************
		 * ListBox
		 **********************************************/
		listBox : function (options) {
			return new ext.ui.listBox(this, options);
		},
		
		/***********************************************
		 * 툴팁
		 **********************************************/
		tooltip : function (options) {
			return new ext.ui.tooltip(this, options);
		},
		
        /***********************************************
         * 방카슈랑스 콤보박스
         **********************************************/
        listComboBox: function (options) {
            var comboDivObj = $(this);
            var pOptions = jQuery.isPlainObject(options) ? options : {}; // 옵션값이 오브젝트형이 아닐때는 빈값을 넣어준다. 
            if(pOptions) {
                if(!pOptions.title) {
                    //타이틀이 없으면 input.inputH의 타이틀을 가져온다.
                    var inputTitle = comboDivObj.find("input.inputH").attr("title") || comboDivObj.find(".tit").text() || "";
                    pOptions.title = inputTitle;
                }
                if(!pOptions.items) {
                    var comboJsonObj = comboDivObj.find("input.combo_init_data");
                    if(comboJsonObj.length > 0) {
                        var initItems = jQuery.convJsonStrToArray(comboJsonObj.val(), true);
                        if($.isArray(initItems)) {
                            pOptions.items = initItems;
                        }
                    } else {
                        var initJsonStr = comboDivObj.data("combo_init_data") || "";
                        if(initJsonStr != "") {
                            var initItems = jQuery.convJsonStrToArray(initJsonStr, true);
                            if($.isArray(initItems)) {
                                pOptions.items = initItems;
                            }
                        }
                    }
                }
                if(!pOptions.selectedValue) {
                    var inputVal = comboDivObj.find("input.inputH").val() || "";
                    if(inputVal != "") {
                        pOptions.selectedValue = inputVal;
                    }
                }
            }
            var comboBoxObj = comboDivObj.data('ui.listcombobox');
            if(!comboBoxObj) {
                comboBoxObj = new ext.ui.listcombobox(this, pOptions);
                comboDivObj.data('ui.listcombobox', comboBoxObj);
            } else {
                comboBoxObj.update(this, pOptions, pOptions ? (pOptions.selectedValue || "") : "");
            }
            return comboBoxObj;
        }
	});
})(jQuery);