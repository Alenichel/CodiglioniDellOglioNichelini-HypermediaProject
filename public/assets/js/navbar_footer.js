"use strict";

function load_navbar(callback = null) {
    $('header').load('/pages/snippets/navbar.html', function() {
        let dropdown = $('.dropdown');
        dropdown.on('show.bs.dropdown', function() {
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
        });
        dropdown.on('hide.bs.dropdown', function() {
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
        });
        let navHeight = $('nav').height();
        $('main').css('padding-top', navHeight + 20);
        if (callback) {
            callback();
        }
    });
}

function load_footer(callback = null) {
    $('footer').load('/pages/snippets/footer.html', function() {
        let footerHeight = $('footer').height();
        $('main').css('padding-bottom', footerHeight + 20);
        if (callback) {
            callback();
        }
    });
}
