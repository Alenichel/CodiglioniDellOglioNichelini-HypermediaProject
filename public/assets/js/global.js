"use strict";

const smBreakpoint = 576;
const mdBreakpoint = 768;
const lgBreakpoint = 992;
const xlBreakpoint = 1200;

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

function getDateTimeFormatter() {
    let formatterOptions = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: false,
    };
    return new Intl.DateTimeFormat('default', formatterOptions);
}


function getDateFormatter() {
    let formatterOptions = {
        year: 'numeric', month: 'short', day: 'numeric',
    };
    return new Intl.DateTimeFormat('default', formatterOptions);
}


function stringCutOff(str, maxChars) {
    if (str.length > maxChars) {
        return str.substring(0, maxChars) + "...";
    } else {
        return str;
    }
}
