(function() {
    var $trigger = $('.nav-trigger');
    var $menu = $('#main-menu');

    $(function() {
        $trigger.on('click', function() {
            $trigger.slideUp($menu.slideDown);
        });
    })
})();