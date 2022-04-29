'use strict';
var dim = '<div class="dim" aria-hidden="true"></div>';
var ua = navigator.userAgent.toLocaleLowerCase();
var isAOS = ua.indexOf('android') !== -1;
var isiOS = ua.indexOf('iphone') !== -1;

function androidV(ua) {
  ua = (ua || navigator.userAgent).toLowerCase(); 
  var match = ua.match(/android\s([0-9\.]*)/i);
  return match ? match[1] : undefined;
};

$(function(){
  if (isAOS) {
    $('html').addClass('AOS');
  } else {
    $('html').addClass('iOS');
  }

  registUI();
});

var registUI = function(){
  if ( $('#header').length ) { _headerControl(); } // 스크롤에 따른 Header
  if ( $('.wrap_link_list').length ) { _tabHightlight(); } // 링크 탭 하이라이트 
  if ( isiOS && $('.inp').length && $('.section_bottom_fixed').length ) { _iOSInpFixdPos(); } // iOS 키패드 하단고정영역
  if ( $('.wrap_inp').length ) { _inpControl(); } // 인풋 인터렉션
  if ( $('.wrap_item_benefit .list_benefit').length ) { _showBenefitList(); } // 혜택리스트
  if ( $('.wrap_tooltip').length ) { _tooltip(); } // 툴팁
  if ( $('.wrap_layer').length ) { _layerPop(); } // 레이어팝업
};

/**
  * @name _headerControl()
  * @description 스크롤에 따른 Header
  */
var _headerControl = function(){
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 0) {
      $('#header').addClass('scrolled');
    }else {
      $('#header').removeClass('scrolled');
    }
  });
};

/**
  * @name _tabHightlight()
  * @description 링크 탭 하이라이트 컬러
  */
var _tabHightlight = function() {
  $(document).on('touchstart', '.wrap_link_list a', function(e){
    if (!$(this).hasClass('wrap_box')) {
      $(this).addClass('active');
    }
  });
  $(document).on('touchend', '.wrap_link_list a', function(e){
    $(this).removeClass('active');
  });
};

/**
  * @name _iOSInpFixdPos()
  * @description // iOS 키패드 오픈시 하단고정 영역 키패드 위로
  */
var _iOSInpFixdPos = function() {
  var fixedEl = $('.section_bottom_fixed > div');
  var inp = $('.inp');
  var height = window.visualViewport.height;
  var viewport = window.visualViewport;

  window.visualViewport.addEventListener('resize', resizeHandler);
  $(window).on('touchstart', function(e) {
    var el = e.target.classList;
    if (inp.is(':focus') && !el.contains('inp') && !el.contains('btn_ico_clear') ) {
      inp.blur();
      console.log(el);
    }
  })

  function resizeHandler() {
    fixedEl.each(function(idx, el) {
      var $el = $(el);
      var current = $el.css('bottom').replace(/[^0-9]/g, '');
      var pos = -(height - viewport.height) + 'px';
      
      $el.css('transform', 'translateY(' +  pos + ')');
    });
  }
};

/**
  * @name _inpControl()
  * @description // 인풋 입력창 인터렉션
  */
var _inpControl = function() {
  var inp = $('.wrap_inp .inp');
  _inpChkVal(inp);

  // 입력 삭제 버튼 추가
  inp.each(function(idx, el) {
    if ( $(el).siblings('.btn_ico_clear').length <= 0 ) {
      $(el).closest('.box_inp').append('<button type="button" class="btn_ico_clear"><span class="blind">입력삭제</span></button>');
    }
  });

  inp.on('focus blur', function(e){
    _inpChkVal($(this));

    $(this).closest('.box_inp').find('.btn_ico_clear').bind('click', function() {
      $(this).siblings('.inp').val('').focus().click();
      $(this).closest('.box_inp').removeClass('show_btn');
    });
    $(this).focusout(function(){
      var $this = $(this);
      setTimeout(function(){
          $this.closest('.box_inp').removeClass('show_btn');
      },100)
    });
    if( $(this).val() !== '' && $(this).is(':focus') ){
      $(this).closest('.box_inp').addClass('show_btn');
    }
  });

  inp.bind('keyup change',function(){
    $(this).closest('.box_inp').addClass('show_btn');
    _inpChkVal($(this));
  });
};

/**
  * @name _inpChkVal()
  * @description // 인풋 value에 따른 클래스
  * @param {string | Element} el 인풋 
  */
var _inpChkVal = function(el) {
  $(el).each(function(){
    if ($(this).val() !== '') {
      $(this).closest('.box_inp').addClass('hasVal');
      $(this).closest('.box_inp').addClass('show_btn');
    } else {
      $(this).closest('.box_inp').removeClass('hasVal');
      $(this).closest('.box_inp').removeClass('show_btn');
    }
  });
};

/**
  * @name _showBenefitList()
  * @description // 혜택리스트
  */
var _showBenefitList = function() {
  var $el = $('.wrap_item_benefit');
  var tit = $el.find('.tit_wrap');
  var list = $el.find('.list_benefit li');

  tit.waypoint({
    handler: function() {
      $el.find('.tit_wrap').addClass('transform');
    },
    offset: '100%'
  });
  list.each(function(){
    var $this = $(this);
    $this.waypoint({
      element: this,
      handler: function() {
        $this.addClass('transform active');
        $('.list_benefit li.active').each(function(idx){
          var delay = 0.1 * idx + 's';
          $(this).css({
            'transition-delay': delay
          });
        });
        setTimeout(function(){
          list.removeClass('active');
        },100);
        
      },
      offset: '100%'
    });
  });
}

/**
  * @name _tooltip()
  * @description // 툴팁
  */
var _tooltip = function() {
  var $focusEl;

  $('.fnOpenTooltip').on('click', function(){
    $focusEl = $(this);
    var $tooltip = $('#' + $(this).attr('data-name'));
    var posY = $focusEl.offset().top + $focusEl.outerHeight(true) + 5;
    var posX = $focusEl.offset().left;
    var winW = $(window).width();
    var width = $tooltip.outerWidth(true);

    console.log(posX);
    
    if ($('.wrap_layer.show').length) {
      var current = $('.wrap_layer.show').css('z-index');
      var zIndex = parseInt(current) + 1;
      $tooltip.css({'z-index' : zIndex,});
    }

    $tooltip.css({
      'top': posY,
      'left': '4.4rem',
    });
    $tooltip.addClass('show');
    $tooltip.find('.inner_tooltip').children(':first').attr('tabindex','0').focus();
  });

  $('.fnCloseTooltip').on('click', function(){
    var $tooltip = $(this).closest('.wrap_tooltip');

    $tooltip.removeClass('show');
    $focusEl.focus();
  });
};

/**
  * @name _layerPop()
  * @description // 레이어팝업
  */
var _layerPop = function() {
  $('.fnOpenPop').on('click', function(){
    var popId = $(this).attr('data-name');
    fnOpenLayerPop(popId);
  });

  $('.fnClosePop').on('click', function(){
    var popId = $(this).closest('.wrap_layer').attr('id');
    console.log(popId);
    fnCloseLayerPop(popId);
  });
};

/**
  * @name fnOpenLayerPop()
  * @description 레이어팝업 열기
  * @param {string} popID 팝업ID 
  */
var fnOpenLayerPop = function(popID) {
  var $el = $('#' + popID);

  if ($('.wrap_layer.show').length) {
    var current = $('.wrap_layer.show').css('z-index');
    var zIndex = parseInt(current) + 1;
    $el.css('z-index', zIndex);
  }

  if ($('.section_bottom_fixed').length) {
    $el.addClass('hasFixedBtn');
  }

  $('body').addClass('open_pop');
  $el.addClass('show');
  $el.append(dim);

  if ($el.find('tit_layer').length) {
    $el.find('.tit_layer').attr('tabindex','0').focus();
  } else {
    $el.find('.inner_layer').children(':first').attr('tabindex','0').focus();
  }
}

/**
  * @name fnOpenLayerPop()
  * @description 레이어팝업 닫기
  * @param {string} popID 팝업ID
  * @param {string | Element} focusEl focus보낼 element
  */
var fnCloseLayerPop = function(popID, focusEl){
  var $el = $('#' + popID);
  var $focusEl;

  if (!focusEl) {
    $focusEl = $('[data-name="' + popID + '"]');
  } else {
    $focusEl = $(focusEl);
  }

  $el.removeClass('show');
  setTimeout(function(){
    $el.find('.dim').remove();
    $el.removeAttr('style');
    $('body').removeClass('open_pop');
    $focusEl.focus();
  },300);
};

/**
  * @name fnToastPop()
  * @description 토스트팝업 열기
  * @param {string} popID 팝업ID 
  */
var fnToastPop = function(popID) {
  var $el = $('#' + popID);

  $el.addClass('show');
  setTimeout(function(){
    $el.removeClass('show');
  }, 3000);
};