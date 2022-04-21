'use strict';
var dim = '<div class="dim" aria-hidden="true"></div>';

$(function(){
  console.log('load');
});

// function openLayerPop($target) {
//   var _this = $('body').find('.openPop');
//   var _this_id = '#' + $target;

//   $(_this_id).toggleClass('show');

//   if ( $(_this_id).hasClass('show') ) {
//     $(_this_id).append('<div class="dim"></div>');
//   };

//   $('body, html').toggleClass('open_pop');
//   if ($(_this_id).find('h2').hasClass('tit_layer')) {
//     $(_this_id).find('h2').attr('tabindex','0').focus();
//   } else {
//     $(_this_id).find('.inner_layer').children(':first').attr('tabindex','0').focus();
//   }

// }

// function closeLayerPop($target, $opener) {
//   $target.removeClass('show');
//   $('dim').remove();
//   $('body, html').removeClass('open_pop');
//   $opener.focus();
// }