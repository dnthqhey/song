// //-------search bar show/hide 스크립트-------//
// $(document).ready(function(){
//     $(".search_btn").click(function(){
//         $(".searchWrap").fadeIn(200, function(){
//             $(".searchWrap").attr("style", "visibility:visible")
//         });
//     });//allmenu click func close;
//     $(".close button").click(function(){
//         $(".searchWrap").fadeOut(500);
//     });//fullMenu_close click func close;
// });//ready func close;

//-----------토글클래스 수업 show/hide 스크립트-----모바일에서 제자리에 닫기/오픈 버튼 생성-----//
// $(document).ready(function(){
//     $(".allmenu").click(function(){
//         $(".fullup_menu").slideDown(500, function(){
//             $(".fullup_menu").attr("style", "display:block")
//         });
//     });//allmenu click func close;

//     $(".fullMenu_close").click(function(){
//         $(".fullup_menu").slideUp(500);
//     });//fullMenu_close click func close;
// // });//ready func close;

//     $(".allmenu").click(function(){
//         $(".fullup_menu").toggleClass("on bg-block");
//         $(".close").show();
//         if($(window).width() > 900){
//             $(".allmenu").toggleClass("close");
//             $(".fullup_menu .close").hide();
//         };
//     });
//     $(".fullup_menu .close").click(function(){
//         $(".fullup_menu").toggleClass("on bg-block");
//     });


//------모바일 메뉴 탭스크립트-------//
// $(document).ready(function(){
//     var $menu1 = $(".depth1_item");
//     var $menu2 = $(".depth2_item");

//     $menu1.click(function(){
//         $menu1.removeClass('on');
//         $(this).toggleClass('on');
//         return false;
//     });//depth2_item click func close;

//     $menu2.click(function(){
//         $menu2.removeClass('on');
//         $(this).toggleClass('on');
//         return false;
//     });//depth2_item click func close;
// });//ready func close;

// //------모바일 메뉴 탭스크립트-------//
$(document).ready(function(){
    var $fullMenuOpenBt = $(".allmenu"),
        $fullMenuCloseBt = $(".fullMenu_close"),
        $fullMenuBody = $(".fullup_menu"),
        $fullMenuLink = $(".fullup_menu ul li"),
        $fmDepth1 = $(".fullup_menu .depth1_item > h3"),
        $fmDepth1Blank = $(".fullup_menu .depth1_item.newWin"),
        $fmDepth1BnkItem = $(".fullup_menu .depth1_item.newWin .depth2_list"),
        $fmDepth2 = $(".fullup_menu .depth2_item"),
        $fmDepth2List = $(".fullup_menu .depth2_list"),
        $fmDepth2Has = $(".fullup_menu .depth2_item.has > a"),
        $fmDepth3List = $(".fullup_menu .depth3_list")

    $fullMenuOpenBt.click(function(){
        $fullMenuBody.slideDown(500, function(){
            $fullMenuBody.toggleClass('open');
        });
    });//allmenu click func close;

    $fullMenuCloseBt.click(function(){
        $fullMenuLink.removeClass('on');
        $fullMenuBody.slideUp(500);
    });//fullMenu_close click func close;

    if($(window).width() < 1180){
        $fmDepth2List.hide();
        $fmDepth3List.hide();

        $fmDepth1.click(function(){
            $(this).next().slideToggle(300, function(){
                $(this).parent().toggleClass('on');
            });
            $fmDepth1.not(this).next().slideUp(300, function(){
                $(this).parent().removeClass('on');
            });
            return false;
        });

        $fmDepth2.click(function(){
            $(this).addClass('on');
            $fmDepth2.not(this).removeClass('on');
        });

        $fmDepth2Has.click(function(){
            $(this).next().slideToggle(300, function(){
                $(this).parent().toggleClass('on');
            });
            $fmDepth2Has.not(this).next().slideUp(300, function(){
                $(this).parent().removeClass('on');
            });
            return false;
        });
    };
});//ready func close;

//------메인 list탭 스크립트--siblings 라는 형제요소 선택자를 통해 두줄로 요약(탭스트립트)-----------
$(document).ready(function(){
   $(".tab ul.list_tabs li").click(function(){
     $(this).addClass('on').siblings().removeClass('on'); //선택한 것에 addclass on, 그 외 on제거
     $("#"+$(this).data('id')).addClass('on').siblings().removeClass('on');
   }); //선택한 것의 속성 id를 추출해서 클래스를 on, 그외엔 on 제거
   return false
});//ready func close;


//-------주요사업 탭스크립트-------//
var fn_toggleTabMode = function() {

    $(".leftTabs ul li").unbind();
    //windos.width가 640보다 작거나 같으면
    if($(window).width() <= 640){
        $(".tabContentBox .bisBox").each(function(){
            $(this).appendTo(".leftTabs ul li[data-id="+this.id+"]");
        });
        $(".leftTabs ul li").click(function(){
            $(this).toggleClass('on');
            $("#"+$(this).data('id')).slideToggle(500);
            $(".leftTabs ul li").not(this).removeClass(function(){
                $(this).removeClass('on');
                $("#"+$(this).data('id')).slideUp(300);
            });
            return false;
        });
    //windos.width가 641보다 크면
    } else if($(window).width() >= 641){
        $(".bisBox").each(function(){
            $(this).appendTo(".tabContentBox");
        });
        $(".leftTabs ul li").click(function(){
            $(".leftTabs ul li").not(this).removeClass('on');
            $(".tabContentBox .bisBox").removeClass('on');
            $(this).addClass('on');
            $("#"+$(this).data('id')).addClass('on').siblings().removeClass('on');
            return false;
        });
    }
}

$(document).ready(function(){
    fn_toggleTabMode();
    $(window).resize(function(){
        fn_toggleTabMode();
    });
});//ready func close;


//------nav 메뉴 탭스크립트-------//
$(document).ready(function(){
    var $lnbDepth1 = $(".lnb .depth1_item")
    
    $lnbDepth1.not(".menu05").click(function(){
        $(this).addClass('on');
        $lnbDepth1.not(this).removeClass('on');
    
        // return false;
    });
});//ready func close;

$(document).ready(function(){
   $(".pageUpBtn").click(function(){
    $("html, body").animate({
        scrollTop : 0
    }, 1000);
    });//ready func close;
});//ready func close;

// //------서브화면 side 메뉴 탭스크립트-------//
$(document).ready(function(){
    var $Depth2 = $("#side .depth2_item"),
        $Depth2List = $("#side .depth2_list"),
        $Depth2Has = $("#side .depth2_item.has > a"),
        $Depth3List = $("#side .depth3_list")
    
    $Depth3List.hide();
    $Depth2.click(function(){
        $(this).addClass('on');
        $Depth2.not(this).removeClass('on');
    });

    $Depth2Has.click(function(){
        $(this).next().slideToggle(300, function(){
            $(this).parent().toggleClass('on');
        });
        $Depth2Has.not(this).next().slideUp(300, function(){
            $(this).parent().removeClass('on');
        });
        return false;
    });
});//ready func close;

//-----서브화면 텍스트 사이즈 스크립트------

$(document).ready(function(){
    var resizeFont = function(d) {
        var el = $(".content_inner > *");
            el2 = $(".inner_section > ul");
            el3 = $(".rightGroup");
            // el4 = $("ul.list");
            el4 = $("a.call");
        $(el).css('font-size', parseInt($(el).css('font-size')) + d);
        $(el2).css('font-size', parseInt($(el2).css('font-size')) + d);
        $(el3).css('font-size', parseInt($(el3).css('font-size')) + d);
        $(el4).css('font-size', parseInt($(el4).css('font-size')) + d);
        // $(el5).css('font-size', parseInt($(el5).css('font-size')) + d);
    }
    // 글자크기 키우고 줄이고
    $('#btnFontSizeIn').click(function() {
      resizeFont(2);
    });
    
    $('#btnFontSizeOut').click(function() {
      resizeFont(-2);
    });

    $('#printContent').on('click', function() {  
        window.print();  
        return false; // why false?
    }); 
});//ready func close;

//--- 테이블 tr 총 건수 구하기
$(document).ready(function(){
    var totalList = $(".bbsList > tbody tr").length;
    $(".totalNum").text(totalList);
    return false; // why false?
});//ready func close;