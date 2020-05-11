"use strict";

function generate_card(title, body, img, date = null) {
    return $('<div class="col-12 col-md-6 mb-4">').append(
        $('<div class="card">').append(
            $('<div class="card-body row">').append(
                $('<div class="col-sm-6">').append(
                    $('<img class="card-img" src="' + img + '" alt="">')
                ),
                $('<div class="col-sm-6">').append(
                    $('<h4 class="card-title mt-2 mt-md-0">').text(title),
                    date ? $('<small class="text-muted">').text(date) : null,
                    $('<p class="card-text">').text(body),
                )
            ),
            $('<a class="stretched-link" href="/pages/event.html"></a>')
        )
    );
}