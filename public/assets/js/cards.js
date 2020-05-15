"use strict";

const CardType = {
    service: 1,
    event: 2,
    news: 3,
    person: 4,
}

function generate_card(id, title, body, img, cardType, date = null) {
    let link;
    if (cardType === CardType.service) {
        link = `/pages/service.html?id=${id}`;
    } else if (cardType === CardType.event) {
        link = `/pages/event.html?id=${id}`;
    } else if (cardType === CardType.news) {
        link = `/pages/news.html?id=${id}`;
    } else if (cardType === CardType.person) {
        link = `/pages/person.html?id=${id}`;
    } else {
        link = "#";
    }
    return $('<div class="col-12 col-md-6 mb-4">').append(
        $('<div class="card">').append(
            $('<div class="card-body row">').append(
                $('<div class="col-sm-6">').append(
                    $(`<img class="card-img" src="${img}" alt="">`)
                ),
                $('<div class="col-sm-6">').append(
                    $('<h4 class="card-title mt-2 mt-md-0">').text(title),
                    date ? $('<small class="text-muted">').text(date) : null,
                    $('<p class="card-text">').text(body),
                )
            ),
            $(`<a class="stretched-link" href="${link}"></a>`)
        )
    );
}