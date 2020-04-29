"use strict";

function append_event_card(card) {
    $('#event-cards').append(card);
}

$(document).ready(function() {
    $('.slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        cssEase: 'ease-in-out',
        prevArrow: $('#slider-prev'),
        nextArrow: $('#slider-next'),
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: true
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false
                }
            }
        ]
    });
    append_event_card(generate_card('Christmas party', 'Come celebrate Christmas with us!', '/assets/img/christmas-party.jpg', 'Dec 22nd, 2020'));
    append_event_card(generate_card('Tech together', 'Presentation of the Tech Support service', '/assets/img/elderly-computer.jpg', 'Dec 7th, 2020'));
    append_event_card(generate_card('Talking together', 'We are proud to announce the launch of our new service, which will help...', '/assets/img/talking-together.jpg', 'Jan 14th, 2020'));
    append_event_card(generate_card('Caring together', 'Presentation of the Carers Training service', '/assets/img/laughing-grandma.jpg', 'Jan 23rd, 2020'));
})