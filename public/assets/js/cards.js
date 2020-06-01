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
                $('<div class="col-lg-6 col-12 position-static">').append(
                    $(`<img class="card-img" src="${img}" alt="">`)
                ),
                $('<div class="col-lg-6 col-12 position-static">').append(
                    $('<h4 class="card-title page-subtitle mt-2 mt-lg-0">').append(
                        $(`<a class="blue-link stretched-link" href="${link}">`).text(title)
                    ),
                    date,
                    $('<p class="card-text page-content mt-1">').text(body != null ? stringCutOff(body, 100) : null),
                )
            ),
        )
    );
}


function generateSearchResultCard(item) {
    return $('<div class="col-12 col-md-6 mb-4">').append(
        $('<div class="card search-card">').append(
            $('<div class="card-body row position-relative">').append(
                $('<div class="col-lg-6 col-12 position-static">').append(
                    $(`<img class="card-img" src="${item.media}" alt="">`)
                ),
                $('<div class="col-lg-6 col-12 position-static">').append(
                    $('<h4 class="card-title page-subtitle mt-2 mt-lg-0">').append(
                        $(`<a class="blue-link stretched-link" href="/pages/${item.type}.html?id=${item.id}">`).text(item.name)
                    ),
                    $('<p class="text-muted" style="font-variant: small-caps">').text(item.type)
                )
            ),
        )
    )
}