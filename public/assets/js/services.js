"use strict";

const eventsPerPage = 3;

$(document).ready(function() {
    let searchParams = new URLSearchParams(window.location.search);
    let page;
    if (searchParams.has("page")) {
        page = parseInt(searchParams.get("page"));
    } else {
        page = 1;
    }
    let offset = eventsPerPage * (page - 1);
    fetch('/api/v1/services').then(response => {
        return response.json();
    }).then(json => {
        let numberOfEvents = json.length;
        fetch(`/api/v1/services?limit=${eventsPerPage}&offset=${offset}`).then(response => {
            return response.json()
        }).then(json => {
            for (let s of json) {
                let card = generate_card(s.id, s.name, s.description, s.pictures[0], CardType.service);
                $('#service-cards').append(card);
            }
        });
        let maxPages = Math.ceil(numberOfEvents / eventsPerPage);
        $('.page-indicator').text(`${page} of ${maxPages}`);
        let prevBnt = $('#services-prev-btn');
        let nextBtn = $('#services-next-btn');
        if (page === 1) {
            prevBnt.addClass('d-none');
        } else {
            prevBnt.removeClass('d-none');
            prevBnt.attr('href', `/pages/services.html?page=${page-1}`);
        }
        if (page === maxPages) {
            nextBtn.addClass('d-none');
        } else {
            nextBtn.removeClass('d-none');
            nextBtn.attr('href', `/pages/services.html?page=${page+1}`);
        }
    });
})