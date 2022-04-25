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
  if ( $('.wrap_inp.type_cur').length ) { _inpCurrency(); } // 통화 입력창 인터렉션
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

  window.addEventListener('scroll', inputBlur);
  window.visualViewport.addEventListener('resize', resizeHandler);

  function inputBlur() {
    inp.blur();
  }

  function resizeHandler() {
    fixedEl.each(function(idx, el) {
      var $el = $(el);
      var current = $el.css('bottom').replace(/[^0-9]/g, "");
      var pos = -(height - viewport.height) + 'px';
      
      $el.css('transform', 'translateY(' +  pos + ')');
    });
  }

  inp.on('blur', function() {
    fixedEl.each(function() {
      $(this).removeAttr('style');
    });
  });
};

/**
  * @name _inpCurrency()
  * @description // 통화 입력창 인터렉션
  */
var _inpCurrency = function() {
  $('.wrap_inp.type_cur .inp').each(function(idx, el){
    $(el).on('change, input', function(){
      var val = $(this).val();

      if (val.length > 0) {
        $(this).closest('.box_inp').addClass('hasVal');
      }else {
        $(this).closest('.box_inp').removeClass('hasVal');
      }
    }); 

  });
};

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
    
    if ($('.wrap_layer.show').length) {
      var current = $('.wrap_layer.show').css('z-index');
      var zIndex = parseInt(current) + 1;
      $tooltip.css('z-index', zIndex);
    }

    $tooltip.css('top', posY);
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
  }

  $el.removeClass('show');
  setTimeout(function(){
    $el.find('.dim').remove();
    $el.removeAttr('style');
    $('body').removeClass('open_pop');
    $focusEl.focus();
  },300);
};