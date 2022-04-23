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
  if ( $('.wrap_link_list').length ) { _tabHightlight(); } // 링크 탭 하이라이트 
  if ( isiOS && $('.inp').length && $('.section_bottom_fixed').length ) { _iOSInpFixdPos(); } // iOS 키패드 하단고정영역
  if ( $('.wrap_layer').length ) { _layerPop(); } // 레이어팝업
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
  // function blurHandler() {
  //   button.style.bottom = "10px";
  // }
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

  console.log($el);
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