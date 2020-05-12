"use strict";

$(document).ready(function() {
    fetch('/api/v1/news').then(response => {
        return response.json();
    }).then(json => {
        for (let n of json) {
            n.body = n.body.substring(0, 100) + "...";
            let card = generate_card(n.id, n.title, n.body, n.media, CardType.news);
            $('#news-cards').append(card);
        }
    });
})