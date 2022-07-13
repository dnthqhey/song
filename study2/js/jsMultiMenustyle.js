$(function () {

    // 메뉴클릭시 하위메뉴 슬라이드 다운
    // 하위메뉴가 열린상태에서 다른메뉴 클릭시 변경, 자기메뉴 클릭시 슬라이드 업
    $(".header2link").click(function () {
        $('.content').children().addClass('on');
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $("nav").removeClass('on').children().removeClass('on');
        } else {
            $("nav").addClass('on');
            $(this).addClass('on').siblings().removeClass('on');
            $("#" + $(this).data('id')).addClass('on').siblings().removeClass('on');
        }
    });
    // 하위메뉴의 서브를 클릭할때마다 바뀌게 하기
    $('.list li').each(function (i) {
        $(this).click(function () {
            $(this).addClass('on').siblings().removeClass('on');
            $(this).parent().next().eq(i).addClass('on');
            $(".list li").not(this).siblings().removeClass('on');
        });
    });
    $(".tabV ul li").click(function () {
        $(this).addClass('on')
            .siblings().removeClass('on');
        $("#" + $(this).data('id')).addClass('on')
            .siblings().removeClass('on');
    });

    //------메인 list탭 스크립트--siblings 라는 형제요소 선택자를 통해 두줄로 요약(탭스트립트)-----------
    $(".tab ul.list_tabs li").click(function () {
        $(this).addClass('on').siblings().removeClass('on'); //선택한 것에 addclass on, 그 외 on제거
        $("#" + $(this).data('id')).addClass('on').siblings().removeClass('on');
    }); //선택한 것의 속성 id를 추출해서 클래스를 on, 그외엔 on 제거
    return false

});



var swiper = new Swiper('.swiper01', {
    effect: 'fade',
    fadeEffect: {
        delay: 600,
        crossFade: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    // on: {
    //     slideChange:(function() {          
    //     if (this.realIndex == now) {
    //         $(".swiper-slide").addClass('on')
    //     }   
    //   }
    //     )},
    autoplay: true
});

var swiper = new Swiper('.swiper02', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: true,
    navigation: {
        nextEl: '.swiper-button-next2',
        stopEl: '.swiper-button-stop2',
        prevEl: '.swiper-button-prev2',
    },
});
new Swiper('.swiper03', {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loopFillGroupWithBlank: true,
    navigation: {
        nextEl: '.swiper07 .swiper-button-next',
        prevEl: '.swiper07 .swiper-button-prev',
    },
    loop: true,
    observer: true,
    observeParents: true,
    //탭안의 스와이퍼 갱신
});

var swiper = new Swiper(".swiper04", {
    slidesPerView: 1,
    spaceBetween: 5,
    slidesPerGroup: 1,
    navigation: {
        nextEl: ".z.swiper-button-next",
        prevEl: ".z.swiper-button-prev",
    },
   
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 10,
            slidesPerGroup: 2,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 3,
        },
    },
    
});


var swiper = new Swiper(".mySwiper4", {    
    pagination: {
        el: ".a.swiper-pagination",
        clickable: true,
        // renderBullet: function (index, className) {
        //   return '<span class="' + className + '">' + (index + 1) + "</span>";
        // },
      },    
    });

    var theToggle = document.getElementById('toggle');

    // based on Todd Motto functions
    // https://toddmotto.com/labs/reusable-js/

    // hasClass
    function hasClass(elem, className) {
        return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
    }
    // addClass
    function addClass(elem, className) {
        if (!hasClass(elem, className)) {
            elem.className += ' ' + className;
        }
    }
    // removeClass
    function removeClass(elem, className) {
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
        if (hasClass(elem, className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0) {
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    }
    // toggleClass
    function toggleClass(elem, className) {
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, " ") + ' ';
        if (hasClass(elem, className)) {
            while (newClass.indexOf(" " + className + " ") >= 0) {
                newClass = newClass.replace(" " + className + " ", " ");
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        } else {
            elem.className += ' ' + className;
        }
    }

    // theToggle.onclick = function () {
    //     toggleClass(this, 'on');
    //     return false;
    // }