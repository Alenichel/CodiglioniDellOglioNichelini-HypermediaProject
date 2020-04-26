"use strict";

$(document).ready(function() {
    $('header').load('pages/navbar.html', function() {
        $('main').css('padding-top', 25);
    });
})

$(document).ready(function() {
    $('footer').load('pages/footer.html', function() {
        let dropdown = $('.dropdown');
        dropdown.on('show.bs.dropdown', function() {
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
        });
        dropdown.on('hide.bs.dropdown', function() {
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
        });
    });
})