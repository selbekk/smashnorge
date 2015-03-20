(function() {

    var $trigger = $('.nav-trigger');
    var $menu = $('#main-nav');

    $(document).ready(function() {
        $trigger.on('click', function() {
            $menu.slideToggle(200);
            $trigger.find('span').toggleClass('glyphicon-menu-up');
            $trigger.find('span').toggleClass('glyphicon-menu-hamburger');
        });
    });
})();