'use strict';
var dim = '<div class="dim" aria-hidden="true"></div>';

$(function(){
  registUI();
});

var registUI = function(){
  if ( $('.wrap_link_list').length ) { fnTabHightlight(); } // 링크 탭 하이라이트 
  if ( $('.wrap_layer').length ) { fnLayerPop(); } // 레이어팝업
};

var fnLayerPop = function() {
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
  * @name fnTabHightlight()
  * @description 링크 탭 하이라이트 컬러
  */
var fnTabHightlight = function() {
  $(document).on('touchstart', '.wrap_link_list a', function(e){
    if (!$(this).hasClass('wrap_box')) {
      $(this).addClass('active');
    }
  });
  $(document).on('touchend', '.wrap_link_list a', function(e){
    $(this).removeClass('active');
  });
}
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
}