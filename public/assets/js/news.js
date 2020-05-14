"use strict";

$(document).ready(function() {
    let searchParams = new URLSearchParams(window.location.search);
    let id;
    if (searchParams.has("id")) {
        id = parseInt(searchParams.get("id"));
    }
    fetch(`/api/v1/news/${id}`).then(response => {
        return response.json();
    }).then(news => {
        $('#news-title').text(news.title);
        $('#news-body').append(
            $(`<img src="${news.media}" alt="" class="text-wrap" width="400">`),
            $(`<p class="text-justify">`).text(news.body)
        );
        if (news.personId != null || news.serviceId != null || news.eventId != null) {
            let related = $('#news-related');
            related.append(
                $('<h3 class="mt-5">').text("Related"),
            )
            if (news.personId != null) {
                console.log("PERSON");
            }
            if (news.serviceId != null) {
                console.log("SERVICE");
            }
            if (news.eventId != null) {
                console.log("EVENT");
            }
        }
        console.log(news);
    });
})