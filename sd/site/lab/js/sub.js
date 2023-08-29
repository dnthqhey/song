(function($) {
    'use strict';

    $(function() {

        var $container = $('#container');

        //제안하기
        var $proposition = $container.find('.proposition'),
            $propositionList = $proposition.find('.proposition_list'),
            $propositionItem = $propositionList.find('.proposition_item');

        $propositionItem.attr('tabindex','-1');

        $propositionItem.on('focusin mouseenter', function () {
            $propositionItem.removeClass('focus');
            $(this).addClass('focus');
        });

    });
})(window.jQuery);


