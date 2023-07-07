'use strict';
var ua = navigator.userAgent.toLocaleLowerCase();
var isAOS = ua.indexOf('android') !== -1;
var isiOS = ua.indexOf('iphone') !== -1;
var safeArea = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  header: 50,
  filter: 38
}
function androidV(ua) {
  ua = (ua || navigator.userAgent).toLowerCase(); 
  var match = ua.match(/android\s([0-9\.]*)/i);
  return match ? match[1] : undefined;
};
function iosV(ua) {
  ua = (ua || navigator.userAgent).toLowerCase();
  var match = ua.match(/os (\d+)_(\d+)_?(\d+)?/);
  return match ? match[1] : undefined;
}  


window.addEventListener('DOMContentLoaded', function(){
  var html = document.getElementsByTagName('html')[0];
  html.setAttribute('class', 'asisRenewal');

	safeArea.top = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safeTop'));
  safeArea.right = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safeRight'));
  safeArea.bottom = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safeBottom'));
  safeArea.left = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safeLeft'));
  safeArea.header = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--headerH'));
  safeArea.filter = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--filterH'));

  if (isAOS) {
    html.classList.add('AOS');
    if ( parseInt(androidV(ua)) < 8) {
      html.classList.add('AOS_old');
    }
  } else {
    html.classList.add('iOS');
  }

  addNotchMeta();
  registUI();
});

var registUI = function(){
  if ( document.getElementsByClassName('popup_viewEvent').length ) { _headerPopControl(); } // 스크롤에 따른 Header
};

/**
  * @name _headerPopControl()
  * @description F-POP 콘텐츠 스크롤에 따른 Header
  */
var _headerPopControl = function(el){
  var defaultHeight = safeArea.header;
  
  document.querySelectorAll('.popup_viewEvent').forEach(function(el){
    if(el.querySelector('.page_footer_fix')) {
      el.classList.add('hasFixedBtn');
    }
  });

  window.addEventListener('scroll', function(e){
    var header = this.document.querySelector('.head_popup');
    var content = this.document.querySelector('.content_popup');

    if (this.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
  * @name addNotchMeta();
  * @description notch 대응 metatag 추가
  */
var addNotchMeta = function() {
  var $viewport = document.querySelector('meta[name="viewport"]');

  function _createMeta(name, content, relative) {
    var meta = document.createElement('meta');
    meta.name = name;
    meta.content = content;
    relative.after(meta);
  }
  
  if (isiOS) {
    $viewport.content = "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, shrink-to-fit=no, viewport-fit=cover";
    _createMeta('apple-mobile-web-app-capable', 'yes', $viewport);
    _createMeta('apple-mobile-web-app-status-bar-style', 'black-translucent', $viewport);
  }
}