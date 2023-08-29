(function ($) {
    'use strict';

    $(function () {

        var $diseaseTab = $('.disease_tab'),
            $tabItem = $diseaseTab.find('.tab_item');

        $tabItem.click(function () {
            var $thisIndex = $(this).index();
            $tabItem.removeClass('active').removeAttr('title');
            $(this).addClass('active').attr('title', '활성화');
            $('.disease_panel .panel_content').removeClass('active').removeAttr('title').eq($thisIndex).addClass('active').attr('title', '활성회');
        });


        var $diseasePanel = $('.disease_panel'),
            $diseaseList = $diseasePanel.find('.item_list'),
            $diseaseItem = $diseaseList.find('.item'),
            $diseaseButton = $diseaseItem.find('.list_line'),
            $diseaseContent = $diseaseItem.find('.list_content');

        $diseaseButton.click(function () {
            var $itemContent = $(this).siblings('.list_content');
            var $item = $(this).closest('.item');

            if ($item.hasClass('active')){
                $itemContent.slideUp();
                $item.removeClass('active');
                $item.removeAttr('title','열림');
            }else{
                $diseaseItem.removeClass('active');
                $diseaseItem.removeAttr('title');
                $diseaseContent.slideUp();
                $itemContent.slideDown();
                $item.addClass('active');
                $item.attr('title','열림');

            }
        });
        $('.disease_panel .panel_content .item_list .item:first-child .list_line').trigger('click');

        /* 반응형 테이블 */
        $('table.table.responsive').not($('.prettyprint').children()).each(function() {
            var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
                TheadExist = $(this).find('thead').length;
            if((RowSpanExist==false) && (TheadExist!=0)){//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
                $(this).children('tbody').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
                $(this).children('tfoot').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
            };
        });

        $('.panel_content table').each(function(){
            $(this).wrap('<div class="table_scroll"></div>');
        });

        /*       $(function(){
                    var cnt= $(".occurrence_item.n2 .left_index").text(),
                        cnt2= $(".occurrence_item.n2 .right_index.n1 em").text(),
                        cnt3= $(".occurrence_item.n2 .right_index.n2 em").text(),
                        cnt4= $(".occurrence_item.n2 .right_index.n3 em").text();
                    $(".occurrence_item.n2 .left_index").text(numberFomatter(cnt));
                    $(".occurrence_item.n2 .right_index.n1 em").text(numberFomatter(cnt2));
                    $(".occurrence_item.n2 .right_index.n1 em").text(numberFomatter(cnt3));
                    $(".occurrence_item.n2 .right_index.n1 em").text(numberFomatter(cnt4));
                });
                function numberFomatter(data_value) {
                    var txtNumber = '' + data_value;
                    if (isNaN(txtNumber) || txtNumber == "") {
                        return;
                    } else {
                        var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
                        var arrNumber = txtNumber.split('.');
                        arrNumber[0] += '.';
                        do {
                            arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
                        } while (rxSplit.test(arrNumber[0]));

                        if (arrNumber.length > 1) {
                            return arrNumber.join('');
                        } else {
                            return arrNumber[0].split('.')[0];
                        }
                    }
                }*/
        $('.seoul_btn').click(function () {
            if ($(this).siblings('.seoul_cont').hasClass('show')) {
                $(this).siblings('.seoul_cont').removeClass('show').slideUp();
                $(this).attr('title','열기');
            }else {
                $(this).siblings('.seoul_cont').addClass('show').slideDown();
                $(this).attr('title','닫기');
            }
        });

        $('.moving_place button').click(function () {
            if ($(this).closest('.place_tab').siblings('.place_cont').hasClass('show')) {
                $(this).closest('.place_tab').siblings('.place_cont').removeClass('show').slideUp();
                $(this).attr('title','열기');
            }else {
                $(this).closest('.place_tab').siblings('.place_cont').addClass('show').slideDown();
                $(this).attr('title','닫기');
            }
        });

        //테이블 thead tr 두 개 이상 스타일
        $('.table thead tr').each(function(){
            var trIndex = $(this).index() + 1;

            if (trIndex > 1) {
                $(this).closest('.table').addClass('tr_over');
            }
        });

        /*반응형 테이블
        $('table.table.responsive').not($('.prettyprint').children()).each(function() {
            var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
                TheadExist = $(this).find('thead').length;
            if((RowSpanExist==false) && (TheadExist!=0)){//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
                $(this).children('tbody').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
                $(this).children('tfoot').children('tr').find('th, td').each(function() {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
            };
        });*/


    });
})(window.jQuery);