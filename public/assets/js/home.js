"use strict";

function build_person_row(name, img, join_date, i){
    let person_row = $('<div class="row">')
    person_row.append(
        $('<div class="col col-md-auto align-self-center">').append(
            i % 2 === 0 ?
                $(`<img class="img-profile rounded-circle person-img" alt="Missing img" src="${img}">`) :
                $(`<p class="text-right">${name}<br>Joined ${getDateFormatter().format(new Date(join_date))}</p>`)
        ),
        $('<div class="col col-md-auto align-self-center">').append(
            i % 2 === 0 ?
                $(`<p>${name}<br>Joined ${getDateFormatter().format(new Date(join_date))}</p>`) :
                $(`<img class="img-profile rounded-circle person-img" alt="Missing img" src="${img}">`)
        )
    )
    return person_row;
}


function build_news_carousel(news) {
    let carousel = $('<div id="news-carousel" class="carousel slide col-12 col-lg-8 m-auto" data-ride="carousel">');
    let carouselInner = $('<div class="carousel-inner">');
    for (let i = 0; i < news.length; i++) {
        let n = news[i];
        carouselInner.append(
            $(`<div class="carousel-item${i === 0 ? ' active' : ''}">`).append(
                $(`<img class="d-block w-100" src="${n.media}" alt="">`),
                $('<div class="carousel-caption">').append(
                    $('<h5>').text(n.title)
                )
            )
        );
    }
    carousel.append(carouselInner);
    if (news.length > 1) {
        carousel.append(
            $('<a class="carousel-control-prev" href="#news-carousel" role="button" data-slide="prev">').append(
                $('<span class="carousel-control-prev-icon" aria-hidden="true">'),
                $('<span class="sr-only">').text('Previous')
            ),
            $('<a class="carousel-control-next" href="#news-carousel" role="button" data-slide="next">').append(
                $('<span class="carousel-control-next-icon" aria-hidden="true">'),
                $('<span class="sr-only">').text('Next')
            )
        );
    }
    return carousel;
}


$(document).ready(function() {
    load_navbar();
    load_footer();
    fetch('/api/v1/people').then(response => {
        response.json().then( json => {
            let i = 0;
            for (let s of json){
                let fs = s.firstName
                let img = s.picture
                let join_date = s.joinDate;
                if (i===3) {
                    return;
                }
                $('#last_joined').append(
                    build_person_row(fs, img, join_date, i)
                );
                i++;
            }
        })
    });
    fetch('/api/v1/news').then(response => {
        return response.json();
    }).then(news => {
        $('#news-carousel-div').append(build_news_carousel(news));
    })
})