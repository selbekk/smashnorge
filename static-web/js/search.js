(function () {
    var $trigger = $('.search-trigger');
    var template = '<div class="overlay search-overlay">' +
                        '<div class="search-wrap">' +
                            '<div class="search-field">' +
                                '<form id="search-form">' +
                                    '<input type="search" name="query" placeholder="hva leter du etter?" autofocus />' +
                                '</form>' +
                            '</div>' +
                        '</div>' +
                    '<div class="xs-trigger search-close-trigger"><span class="glyphicon glyphicon-remove"</div>' +
                '</div>';

    function show() {
        $('body').append(template);

        var $search = $('.search-overlay');

        $search.fadeIn(200);
        $(document).on('keyup', hideOnEscape);
        $search.find('.search-close-trigger').on('click', hide);
        $search.find('#search-form').on('submit', search);
    }

    function hide() {
        var $search = $('.search-overlay');

        $(document).off('keyup', hideOnEscape);
        $search.find('#search-form').off('submit', search);

        $search.fadeOut(200, function () {
            $search.remove();
        });
    }

    function search(e) {
        e.preventDefault();
        console.log('search!');
    }

    function hideOnEscape(e) {
        if (e.which === 27) {
            hide();
        }
    }

    $(function () {
        $trigger.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            show();
        });
    });
})();