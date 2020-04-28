"use strict";

$(document).ready(function() {
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
    });
});

$(document).ready(function() {
    $('footer').load('/pages/snippets/footer.html');
});