$(function(){
  
  if($(".confirmBtn").length>0) {
    $(".box_inp .inp").not(".blank").on("input", function () {
      if(_checkRequired($(".box_inp .inp").not(".blank"))) $(".confirmBtn").removeClass("disabled").removeAttr("disabled");
      else $(".confirmBtn").addClass("disabled").attr("disabled",true);
    });
    $(".box_inp .btn_ico_clear").on("click", function () {
      $(".confirmBtn").addClass("disabled").attr("disabled",true);
    });
  } 

  if($(".chk_hasbtn").length>0) {
    $(".chk_hasbtn").each(function() {
      _isChecked($(this));
    })
  }

  // input new type
  if($(".type_placeholder").length>0) {   
    $(".type_placeholder .box_inp").each(function(idx) {
      var obj = $(this);
      var ele = obj.find(".inp");
      var labelobj = obj.find("label");

      if(!$(ele).hasClass("sel")) {
        $(ele).on("focus",function() {
          obj.addClass("focused"); 
          if(labelobj.attr('data-label')) labelobj.text(labelobj.attr('data-label'))
        })
        $(ele).on("blur",function() {
          obj.removeClass("focused");
          if(labelobj.attr('data-label') && !obj.hasClass("hasVal")) labelobj.text(ele.attr('placeholder'))
        })
      } 
    });
  }  

  // tab click show/hide
  if($("[data-role=tabtoggle]").length > 0) {
    var tabobj = $("[data-role=tabtoggle]");
    console.log(1)
    var target = tabobj.attr('data-target');
    $(target).hide();
    tabobj.find(".btn_tab_box").on("click",function() {
      $($(this).attr("href")).show().siblings(target).hide();
      return false;
    });
    tabobj.find(".on").find(".btn_tab_box").trigger("click");
  }

  //fixed class scrolled_전체메뉴/검색
  if($("[data-scroll-fix=true]").length > 0) {
    $("[data-scroll-fix=true]").each(function() {
      var fixobj = $(this);
      var scrollcontent = $(this).closest($(this).attr('data-scroll-area'));
      $(scrollcontent).on("scroll",function() {
        if($(scrollcontent).scrollTop() > 0) {
          fixobj.addClass("scrolled");
        } else {
          fixobj.removeClass("scrolled");
        }
      })
    });
  }

  // footer 존재 여부에 따라 btn_evt 위치 조정 
  if($('#mainFooter').length && $('.section_bottom_fixed').length) {
    $('.btn_evt').parent('.section_bottom_fixed').addClass('type_footer');
  };

  // scroll round tab_스크롤 이동
  if($('.section_tab.type_round').length) {
    $('.section_tab.type_round li').on('click', function(){
      var left = $('.section_tab.type_round li.on').offset().left;
      var curLeft = $('.section_tab.type_round ul').scrollLeft() - 24;
      $('.section_tab.type_round ul').animate({scrollLeft : curLeft+left}, 200);
    });
  }

});


var _checkRequired = function(obj) {
  var result = false;
  obj.each(function() {
    if($(this).val().length>0) {
      result = true;
    } else {
      result = false;
      return false;
    }
  });
  
  return result;
}

var _isChecked = function(obj) {
  var chkobj = obj.find("input[type=checkbox]");
  chkobj.on("change",function() {
    var ischecked = $(this).prop("checked");
    ischecked ? chkobj.closest(".chk").addClass("checked") : chkobj.closest(".chk").removeClass("checked");
  });  
}


function zerofill(val,fillcount) {
  var result = val;
  if(typeof val === "number") result = val.toString();
  var filltext = Array(fillcount+1 - result.length).join('0');
  return result.toString().length < fillcount ? filltext + result : result;
}

/**
  * @name cardSwiper()
  * @description 송금 카드 선택 swiper
  * @param {element} cardWrap swiper container
  * @page HAN_208 / CRC_208
  */
var cardSwiper = function(cardWrap) {
  let initComplete = false; //init status flag
  let currentNo = 0;
  let tween;
  let swiperslide;
  let wrapperSpacing; // center 정렬을 위한 간격 계산 
  let bgObj = $(cardWrap).closest("[class*=transfer-card_type]"); // gradient BG
  let slideArea = $(cardWrap).closest(".transfer-card_choice"); // 메시지 카드 swipe 영역
  let cardTransObj = bgObj.find(".transfer-card_ani"); // 메시지 카드
  let slideLength = $(cardWrap).find(".swiper-slide").length; // 총 카드 수
  let startIndex = $(cardWrap).attr("data-default"); // default 카드 Index
  let loadingStart = parseInt(slideLength/2) > startIndex ? slideLength : 0; // 초기 스크롤 시작 카드 설정

  let swiper = new Swiper(cardWrap, {
    observer: true,
    observeParents: true,
    resistance: true,
    initialSlide: loadingStart,
    slidesPerView: 'auto',
    spaceBetween: 4,
    centeredSlides: true,
    centeredSlidesBounds: true,
    touchRatio: 0.2,
    focusableElements: "input",
    on: {
      beforeInit: function() {
        // 인트로 설정
        slideArea.addClass('intro');
        _createBtns(slideArea);
      },
      init: function() {
        if ( loadingStart == 0 ) {
          wrapperSpacing = this.translate - this.params.spaceBetween;
        } else {
          wrapperSpacing = this.width - (this.wrapperEl.scrollWidth - Math.abs(this.translate)) - this.params.spaceBetween;
        }
        $(".swiper-category").css({"padding-left": wrapperSpacing+"px"});
        $(".swiper-category li:last-child .card_btn").css({"margin-right": wrapperSpacing+"px"});

        swiperslide = this.$el.find(".swiper-slide"); 
        cardTransObj.removeClass("active");

        // default 카드 노출
        setTimeout(function(){
          this.slideTo(startIndex, 600);
        }.bind(this), 100);
        setTimeout(function(){
          $(".transfer-card_btns").find("li").eq(startIndex)[0].scrollIntoView({
            behavior: 'instant',
            block: 'center',
            inline: 'center'
          });
        }.bind(this), 280);
        setTimeout(function() {
          slideArea.addClass("loading").removeClass('intro');
          let classname = swiperslide.eq(parseInt(startIndex,10)).attr("data-type");
          $("."+classname).addClass("active");
          _setAnimation(classname);
          initComplete = true;
          currentNo = parseInt(startIndex,10);
        }.bind(this), 960);
      },
      slideChangeTransitionStart: function() {
        let realIdx = this.activeIndex;
        setTimeout(function(){
          _activeCardBtn($(".transfer-card_btns").find("li").eq(realIdx));
        }.bind(this), 100);

        bgObj.removeClass("transition").removeAttr("style");
        if ( !(androidV(ua) < 8) ) {
          let prevBg = bgObj.css("background-image");
          bgObj.css("background", prevBg);
        }
      },
      transitionEnd: function() {
        if ( initComplete ) {
          let realIdx = this.activeIndex;
          if ( realIdx != currentNo ) {
            let classname = swiperslide.eq(parseInt(realIdx,10)).attr("data-type");
            let classname_wrap = "transfer-" + classname;

            if(tween) tween.kill();
            bgObj.removeClass().addClass("section-notch__top "+classname_wrap+" transition");
            cardTransObj.find(">*").removeClass("animate").removeAttr("style");
            $("."+classname).addClass("active").siblings(".transfer-card_ani").removeClass("active");
            _setAnimation(classname);
            currentNo = realIdx;
          }
        }
      }
    }
  });

  // 메시지 카드 애니메이션 설정
  function _setAnimation(classname) {
    let obj = $("."+classname);
    let textobj = obj.find(".card-text");
    let illustobj = obj.find("[class^=card-illust]");

    if(textobj.hasClass('type_input')) {
      setTimeout(function() {
        directInput(textobj, $(".transfer-card_input"));
      },500);
    } else {
      $(".transfer-card_input button,.transfer-card_input label").removeAttr("style");
    }

    if ( !(androidV(ua) < 8) ) {
      tween = TweenMax.to(textobj, .6, {
        opacity:1,
        ease:Power2.easeInOut,
      }, .2);
      TweenMax.staggerFromTo(illustobj, .6,
        {y:50, opacity:0},
        {y:0, opacity:1, ease:Back.easeOut,
          onComplete:function() {
            illustobj.addClass("animate");
          }
        }, .1);
    }
  }

  // 상단 카드메시지 카테고리 선택 버튼 생성 및 어포던스를 위한 위치 설정
  function _createBtns(target) {
    target.append(
      $("<div>").prop({
        className: 'transfer-card_btns',
        innerHTML: '<div class="swiper-category"><ul></ul></div>'
      })
    );
    target.find(".swiper-slide").each(function(idx, el){
      target.find(".transfer-card_btns ul").append(
        $("<li>").prop({
          innerHTML: '<button type="button" class="card_btn">'+ $(el).find("span").text() +'</button>'
        })
      );
      $(".transfer-card_btns li").eq(startIndex).addClass('on');
    });

  }

  // 상단 카드메시지 카테고리 선택 버튼 활성화 및 스크롤
  function _activeCardBtn(el) {
    $(el).addClass("on").siblings().removeClass("on");
    el[0].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }
  
  document.querySelectorAll(".card_btn").forEach(function(el){
    el.addEventListener("click", function(e){
      e.stopPropagation();
      let clickIdx = $(this).parent("li").index();
      $(this).parent("li").addClass("on").siblings().removeClass("on");
      swiper.slideTo(clickIdx);
    });
  });
}


function directInput(textobj,inputwrap) {
  if(!inputwrap.hasClass("hasVal")) {
    inputwrap.find("label").css("display","block");
  } else {
    inputwrap.find("button").fadeIn();
  }

  inputwrap.find("label").on("click",function() {
    $(this).hide();
    $(this).prev().show();
    textobj.find("p").text('');
  });
  inputwrap.find("button").on("click",function() {
    if($(this).val().length==0) {
      inputwrap.removeClass("hasVal");
      inputwrap.find("label").hide();
    } 
    $(this).prev().prev().show().focus();
    textobj.find("p").text('');
  });
  inputwrap.find("input").on("focusout",function() {
    if($(this).val().length>0) {
      inputwrap.addClass("hasVal");
      $(this).hide();
      textobj.find("p").text($(this).val()).addClass("hasVal");
      inputwrap.find("button").fadeIn();
    } else {
      inputwrap.removeClass("hasVal");
      $(this).hide();
      textobj.find("p").text("직접 입력해 보세요").removeClass("hasVal");
      inputwrap.find("label").css("display","block");
      inputwrap.find("button").fadeOut();
    }    
  });
}


var actParticle = function(particleobj, dtime=0) {
  TweenMax.fromTo(particleobj, .5, {opacity:0,scaleX:0, scaleY:0}, {opacity:1,scaleX:1, scaleY:1, ease:Power4.easeIn, delay:dtime,
    onComplete:function() {
      TweenMax.to(particleobj, 1, {opacity:0,scaleX:1.5, scaleY:1.5, y:10});
    }
  });
}


var numberWithCommas = function (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

var withoutCommas = function (x) {
	return x.toString().replace(",", '');
}


function transferAnimation(idx) {
  let obj = $(".card_type"+idx);
  let textobj = obj.find(".card-text");
  let illustobj = obj.find("[class^=card-illust]");

  TweenMax.to(textobj, 1, {opacity:1, ease:Power2.easeInOut, delay:.25,
    onComplete:function() {
      TweenMax.staggerFromTo(illustobj, 1, {y:40,opacity:0}, {y:0,opacity:1, ease:Power3.InOut,
        onComplete:function() {
          $("."+this.target.className).addClass("animate");
        }
      }, .2);
    }
  });
}

function _getCurrentScrollPos() {
  return window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
}

function _getBottomPosY(id) {
  var element = document.getElementById(id);
  var posY = element.offsetTop;
  if (element.offsetParent) {
    posY += element.offsetParent.offsetTop;
  }
  posY += element.offsetHeight;
  return posY;
}

/**
  * @name scrollFixed()
  * @description 보험머니쌓기 tab메뉴 다음에 오는 메뉴들 fixed
  * @page ACC_502
  */
const scrollFixed = function(){
  let currentTab = 'ins1';
  const $clickTarget = $('.section_tab.type_round .btn_tab_box');
  const $wrapTab = parseInt($('.section_tab.type_round .wrap_tab_btn').outerHeight(false));
  const gap = parseInt($('.section_tab.type_round .wrap_tab_btn').css('margin-top'));
  let $headerH = 0;
  let fixedTop = $headerH + gap;

  // 탭 버튼 클릭시 콘텐츠 이동
  $clickTarget.parent('li').off('click');
  $clickTarget.off('click').on('click',function(e) {
    e.preventDefault();
    if ($headerH === 0) {
      $headerH = parseInt($('#header').outerHeight(true));
      fixedTop = $headerH + gap;
    }
    const idx = $clickTarget.index(this);
    let href= $(this).attr("href");
    const target = $(href == "#" || href == "" ? 'html' : href);
    let pos = target.offset().top - ($headerH + $wrapTab) + 2;
    setTimeout(function() {
      if (idx === 0) {pos = 0};
      $('html,body').stop(true).animate({scrollTop:pos}, 300, 'swing');
    });
  });

  window.addEventListener('scroll', tabFixed, {passive: true});
  function tabFixed() {
    if ($('.section_tab.fnFixedTop li.on').index() == 0 ) { return false; }
    var scrollTop = _getCurrentScrollPos();
    if ($headerH === 0) {
      $headerH = parseInt($('#header').outerHeight(true));
      fixedTop = $headerH + gap + 2;
    }

    // 탭 상단고정
    if ( scrollTop > fixedTop ) {
      $('.fnSticky').addClass('active');
    } else {
      $('.fnSticky').removeClass('active');
    }

    // 스크롤 위치에 따른 탭 활성화
    if ( (window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight ) {
      var lastTab = $('.section_tab.type_round .wrap_tab_btn li:last-child').find('.btn_tab_box').attr('href');
      var activeLast = lastTab.replace('#','');
      _activeTab(activeLast);
      return;
    }

    if (scrollTop <= _getBottomPosY('ins1') - $headerH - $wrapTab) {
      _activeTab('ins1');
    } else if (scrollTop <= _getBottomPosY('ins2') - $headerH - $wrapTab) {
      _activeTab('ins2');
    } else if (scrollTop <= _getBottomPosY('ins3') - $headerH - $wrapTab) {
      _activeTab('ins3');
    } else if (scrollTop <= _getBottomPosY('ins4') - $headerH - $wrapTab) {
      _activeTab('ins4');
    } else if (scrollTop <= _getBottomPosY('ins5') - $headerH - $wrapTab) {
      _activeTab('ins5');
    } else if (scrollTop <= _getBottomPosY('ins6') - $headerH - $wrapTab) {
      _activeTab('ins6');
    }  else if (scrollTop <= _getBottomPosY('ins7') - $headerH - $wrapTab) {
      _activeTab('ins7');
    }
  }

  function _activeTab(sectionId) {
    if (currentTab == sectionId) return;
    currentTab = sectionId;
    var currentBtn = $('.btn_tab_box[href="#'+sectionId+'"]').parent('li');
    $('.section_tab.type_round .wrap_tab_btn li').removeClass('on');
    currentBtn.addClass('on');

    var left = currentBtn.offset().left;
    var curLeft = $('.section_tab.type_round ul').scrollLeft() - 24;
    $('.section_tab.type_round ul').stop(true).animate({scrollLeft : curLeft+left}, 200);
  }
}

/**
  * @name scrollRecom()
  * @description 머니로그# 스크롤 기능
  * @page BAK_001
  */
var scrollRecom = (function() {
  var recomWaypoint;
  let headerH = 0;

  function _setDefaultV() {
    headerH = parseInt($('#header').outerHeight(true));
  }

  function set() {
    // 추천버튼 노출
    window.addEventListener('scroll', function(){
      if (headerH === 0) { _setDefaultV(); }
    }, {passive: true});

    recomWaypoint = new Waypoint({
      element: document.getElementById('recom'),
      handler: function() {
        $('.wrap_toast_recommend').toggleClass('on');
      },
      offset: '80%'
    });

    // 추천 영역 스크롤 이동
    $('.wrap_toast_recommend > a').off('click').on('click',function(e) {
      e.preventDefault();
      if (headerH === 0) { _setDefaultV(); }
      const sectionTabH = parseInt(androidV(ua)) < 8
        ? 0
        : parseInt($('.section_tab.type_round').outerHeight());

      $('html, body').animate({
        scrollTop:($(this.hash).offset().top) - (headerH + sectionTabH - 2)
      },300);
    });

     // 카테고리 탭 스크롤 이동
    $('.section_tab.type_round .btn_tab_box').on('click', function(e){
      if (headerH === 0) { _setDefaultV(); }
      const categoryTabPos = $('.wrap_section').offset().top;
      const sectionGap = parseInt($(this).parent().css('padding-top')) + 3;

      $('html, body').stop(true).animate({
        scrollTop: categoryTabPos - headerH + sectionGap
      },300);
    });
  }

  function resetPos() {
    setTimeout(function(){
      Waypoint.refreshAll();
    },200);
  }

  return {
    recomWaypoint: recomWaypoint,
    set: set,
    resetPos: resetPos
  }
})();

/**
  * @name fnHanamoneyGuideControl()
  * @description 하나머니 안내 트랜지션 컨트롤
  * @url IFO_008
 */

var fnHanamoneyGuideControl = function() {
  // 무료적립 swiper
  var accumSwiper = new Swiper('.utl_accum_swiper', {
    freeMode: true,
    loop: true,
    slidesPerView: 'auto',
    observeParents: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    on: {
      init: function(swiper) {
        this.slideTo(1);
      }
    }
  });

  var cardLottie, animation, animation2;
  if ( androidV(ua) < 8 ) {
    var cardImg = new Image();
    cardImg.src = '../../../../../../resources/nrc/images/IFO/img_travlog_guide01.png';
    var animationImg = new Image();
    animationImg.src = '../../../../../../resources/nrc/images/IFO/img_travlog_guide02.png';
    var animation2Img = new Image();
    animation2Img.src = '../../../../../../resources/nrc/images/IFO/img_travlog_guide03.png';
    document.querySelector('.card_lottie').appendChild(cardImg);
    document.querySelector('.travlog_guide_js01').appendChild(animationImg);
    document.querySelector('.travlog_guide_js02').appendChild(animation2Img);
  } else {
    // 트래블로그 서비스
    cardLottie = lottie.loadAnimation({
      container: document.querySelector('.card_lottie'), 
      renderer: 'svg',
      loop: true, 
      autoplay: false,
      animationData: animData
    });

    // 여행로그
    animation = lottie.loadAnimation({
      container: document.querySelector('.travlog_guide_js01'),
      renderer: 'svg',
      loop: true,
      autoplay: false,
      animationData: travLog
    });

    // N정산
    if ( typeof travLog2 !== 'undefined' ) {
      animation2 = lottie.loadAnimation({
        container: document.querySelector('.travlog_guide_js02'),
        renderer: 'svg',
        loop: true,
        autoplay: false,
        animationData: travLog2
      });
    }
  }


  // 스크롤에 따른 animation 시작
  $(window).on('scroll', function(){
    $('.section_cont').each(function(idx, el){
      if ( fnCheckInView($(el))) {
        if ($(el).hasClass('hanamoney_guide_1')) { accumSwiper.autoplay.start(); }
        else if ( !(androidV(ua) < 8) && $(el).hasClass('hanamoney_guide_2')) { cardLottie.play(); }
        else if ( !(androidV(ua) < 8) && $(el).hasClass('hanamoney_guide_3')) { animation.play(); }
        else if ( !(androidV(ua) < 8) && typeof travLog2 !== 'undefined' && $(el).hasClass('hanamoney_guide_4')) { animation2.play(); }
        else { $(el).addClass('transform'); }
      } else {
        if ($(el).hasClass('hanamoney_guide_1')) { accumSwiper.autoplay.stop(); }
        else if ( !(androidV(ua) < 8) && $(el).hasClass('hanamoney_guide_2')) { cardLottie.stop(); }
        else if ( !(androidV(ua) < 8) && $(el).hasClass('hanamoney_guide_3')) { animation.stop(); }
        else if ( !(androidV(ua) < 8) && typeof travLog2 !== 'undefined' && $(el).hasClass('hanamoney_guide_4')) { animation2.stop(); }
        else { $(el).removeClass('transform'); }
      }
    });
  });
}
