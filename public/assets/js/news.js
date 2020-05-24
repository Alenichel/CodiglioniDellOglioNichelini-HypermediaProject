"use strict";

$(document).ready(function() {
    load_navbar(() => {
        $('#orientation-info').append(
            $('<span>').text('> '),
            $('<a href="/pages/news_all.html" class="text-white">').text('News')
        );
    });
    load_footer();
    let searchParams = new URLSearchParams(window.location.search);
    let id;
    if (searchParams.has("id")) {
        id = parseInt(searchParams.get("id"));
    }
    fetch(`/api/v1/news/${id}`).then(response => {
        return response.json();
    }).then(news => {
        $('title').text(`QualityTimeBank | ${news.title}`);
        $('#news-title').text(news.title);
        $('#news-body').append(
            $(`<img src="${news.media}" alt="" class="text-wrap mr-4" width="300">`),
            $(`<p class="text-justify">`).text(news.body)
        );
        if (news.personId != null || news.serviceId != null || news.eventId != null) {
            let related = $('#news-related');
            related.append(
                $('<h3 class="mt-5">').text("Related"),
            )
            let relatedRow = $('<div class="row">')
            related.append(relatedRow);
            if (news.personId != null) {
                addRelatedPerson(news.personId, relatedRow);
            }
            if (news.serviceId != null) {
                addRelatedService(news.serviceId, relatedRow);
            }
            if (news.eventId != null) {
                addRelatedEvent(news.eventId, relatedRow);
            }
        }
    });
});

function addRelatedPerson(id, div) {
    fetch(`/api/v1/people/${id}`).then(response => {
        return response.json();
    }).then(person => {
        let card = generateCard(person.id, person.name, null, person.picture, CardType.person);
        div.append(card);
    });
}

function addRelatedService(id, div) {
    fetch(`/api/v1/services/${id}`).then(response => {
        return response.json();
    }).then(service => {
        let card = generateCard(service.id, service.name, null, service.pictures[0], CardType.service);
        div.append(card);
    })
}

function addRelatedEvent(id, div) {
    fetch(`/api/v1/events/${id}`).then(response => {
        return response.json();
    }).then(event => {
        let card = generateCard(event.id, event.name, null, event.picture, CardType.event);
        div.append(card);
    })
}
