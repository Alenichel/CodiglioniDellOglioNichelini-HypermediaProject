"use strict";

function append_event_card(card) {
    $('#event-cards').append(card);
}

function getEvents(month) {
    fetch(`/api/v1/events?month=${month}`).then(response => {
        response.json().then(json => {
            $('#event-cards').empty();
            for (let e of json) {
                let card = generate_card(e.name, e.description, e.picture, e.datetime);
                append_event_card(card);
            }
        })
    })
}

const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
]

$(document).ready(function() {
    let month = new Date().getMonth();
    let slider = $('.slider');
    for (let i = 0; i < 12; i++) {
        let m = (i + month) % 12;
        let e = $('<button class="btn btn-link text-center" onclick="getEvents(' + m + ')">' + months[m] + '</button>')
        slider.append(e);
    }
    slider.slick({
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
    getEvents(month);
})