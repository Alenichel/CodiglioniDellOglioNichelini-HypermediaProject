"use strict";

const CardType = {
    service: 1,
    event: 2,
    news: 3,
    person: 4,
}

function generateCard(id, title, body, img, cardType, date = null) {
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
    if (date != null) {
      date = $('<small class="text-muted">').append(
        $('<i class="far fa-calendar-alt mr-2">'),
        $('<span>').text(getDateTimeFormatter().format(new Date(date)))
      );
    }
    return $('<div class="col-12 col-md-6 mb-4">').append(
        $('<div class="card">').append(
            $('<div class="card-body row position-relative">').append(
                $('<div class="col-sm-6 position-static">').append(
                    $(`<img class="card-img" src="${img}" alt="">`)
                ),
                $('<div class="col-sm-6 position-static">').append(
                    $('<h4 class="card-title mt-2 mt-md-0">').append(
                        $(`<a class="blue-link stretched-link" href="${link}">`).text(title)
                    ),
                    date,
                    $('<p class="card-text mt-1">').text(body),
                )
            ),
        )
    );
}


function generateSearchResultCard(item) {
    return $('<div class="col-12 col-md-6 mb-4">').append(
        $('<div class="card">').append(
            $('<div class="card-body row">').append(
                $('<div class="col-sm-6">').append(
                    $(`<img class="card-img" src="${item.media}" alt="">`)
                ),
                $('<div class="col-sm-6">').append(
                    $('<h4 class="card-title mt-2 mt-md-0">').append(
                        $(`<a class="blue-link stretched-link" href="/pages/${item.type}.html?id=${item.id}">`).text(item.name)
                    ),
                    $('<p class="text-muted" style="font-variant: small-caps">').text(item.type)
                )
            ),
        )
    )
}