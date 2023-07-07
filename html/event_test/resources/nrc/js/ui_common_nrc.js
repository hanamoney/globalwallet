$(function(){

  //if ( $('.type_won .inp').length ) { _inpWon(); }   // ui_common.js 업데이트 후 삭제할 것 

  // offset scroll 상단고정 
  if($(".fnOffsetSticky").length>0) {
    var $stickyEl = $('.fnOffsetSticky');
    var $header = $stickyEl.closest('.wrap_contents').siblings('#header').find('.inner_fixed');
    var headerHeight = $(window).width() > 320 ? $('#header').outerHeight(true) : $('#header').outerHeight(true) * 10 / 9;
    var setHeight = `${(headerHeight + parseInt($stickyEl.attr('data-height')) * 0.1)}rem`;
    var offsetTop = $(".fnOffsetSticky").offset().top - headerHeight;
    var toggleClass = $stickyEl.attr('data-toggle-class');
    if(!$stickyEl.attr('data-height')) setHeight = headerHeight + $stickyEl.outerHeight(true);
  
    $(window).on("scroll", function() {
      if($(window).scrollTop() >= offsetTop) {
        $(".fnOffsetSticky").addClass("scrolled").css("top",`${headerHeight * 0.1}rem`);
        if(toggleClass && toggleClass != undefined) $stickyEl.find("ul").removeClass(toggleClass);
        $header.addClass("border_none");
         _setFixedTop($stickyEl, $header, setHeight);
      } else {
        $(".fnOffsetSticky").removeClass("scrolled").removeAttr("style");
        if(toggleClass && toggleClass != undefined) $stickyEl.find("ul").addClass(toggleClass);
        $header.removeClass("border_none");
        _clearFixedTop($stickyEl, $header);
      } 
    });
  }
  
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

  // footer 존재 여부에 따라 btn_evt 위치 조정 06.20 추가
  if($('#mainFooter').length && $('.section_bottom_fixed').length) {
    $('.btn_evt').parent('.section_bottom_fixed').addClass('type_footer');
  };

});

$(window).on("load",function() {
  // mobius ani  
  if($(".mobius").length > 0) {
    CSS.registerProperty({
      name: '--off',
      syntax: '<number>',
      initialValue: 0,
      inherits: true
    });
  }
});

 // ui_common.js 업데이트 후 삭제할 것 
var _inpWon = function() {
  $('.type_won .inp').each(function() {
    var inp = $(this);
    var unit = inp.siblings('.unit');
    unit.prepend('<span class="value"></span>');

    if (inp.val() !== '') {
      unit.find('.value').text(inp.val());
    }

    inp.on('input', function(){
      unit.find('.value').text($(this).val());
    })
  });
}

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
      slideChangeTransitionEnd: function() {
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


/** 
  * @name _faqAcco()
  * @description // faq 아코디언 ui_common.js override (합해주세요)
  */
var _faqAcco = function() {
  var accoBtn = $('.section_faq').find('.btn_acco');
  accoBtn.on('click',function(){
    var $itemparent = $(this).closest("ul"); //2023 하나머니앱 리뉴얼 추가
    var $item = $(this).closest('li');
    var $accoCont = $item.find('.wrap_acco');

    if ($item.hasClass('on')) {
      $item.removeClass('on');
      $accoCont.slideUp(300);
      $(this).attr('title', 'faq 상세 열기');
    } else {
      /* 2023 하나머니앱 리뉴얼 조건 추가 */
      if($itemparent.hasClass("type_toggle")) {
        $itemparent.find("li").removeClass('on');
        $itemparent.find(".wrap_acco").slideUp(300);
      }
      $item.addClass('on');
      $accoCont.slideDown(300);
      $(this).attr('title', 'faq 상세 닫기');
    }
  });
}

// tab메뉴 다음에 오는 메뉴들 fixed

const scrollFixed = function(){
  /* 기본 target 정의 */
  const targetFixed = document.querySelector('.fnSticky');
  const clickTargets = document.querySelectorAll('.section_tab.type_round .btn_tab_box');
  const heightTarget = document.querySelector('.inner_fixed');
  const panels = document.querySelectorAll('.section_cont');
  
  window.addEventListener('scroll', () => {
    tabfixed(targetFixed)
    targetScroll(clickTargets)
  })

function targetScroll(clickTargets) {
  let scrollY = Math.round(window.pageYOffset);
  clickTargets.forEach(target => {
    target.addEventListener('click',function(e) {
      e.preventDefault();
      // e.currentTarget.parentNode.classList.add('on')
      const linkTarget = document.querySelector(target.hash),
            offsetTop = Math.round((scrollY + linkTarget.getBoundingClientRect().top) - 192);
            window.scrollTo({
              top:offsetTop,
              behavior:'smooth'
      })
    })
  });
}

function tabfixed(targetFixed) {
  if(window.pageYOffset > 135) {
    targetFixed.classList.add('active');
    targetFixed.style.top = `${(heightTarget.clientHeight) * 0.1}rem`;
    } else {
      targetFixed.classList.remove('active');
      targetFixed.style.top = '';
    }
  }
}

  


