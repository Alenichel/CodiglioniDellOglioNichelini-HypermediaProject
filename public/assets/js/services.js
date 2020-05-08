"use strict";

function append_service_card(card) {
    $('#service-cards').append(card);
}

$(document).ready(function() {
    fetch('/api/v1/services').then(response => {
        response.json().then( json => {
            for (let s of json) {
                let card = generate_card(s.name, s.description, s.pictures[0]);
                append_service_card(card);
            }
        });
    });
})