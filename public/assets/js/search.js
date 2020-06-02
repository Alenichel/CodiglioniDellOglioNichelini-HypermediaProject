"use strict";

$(document).ready(() => {
  load_navbar();
  load_footer();
  let searchParams = new URLSearchParams(window.location.search);
  let query = "";
  if (searchParams.has('query')) {
    query = searchParams.get('query');
  }
  fetch(`/api/v1/search?query=${encodeURI(query)}`).then(response => {
    return response.json();
  }).then(results => {
    for (let r of results) {
      let card = generateSearchResultCard(r);
      $('#search-cards').append(card);
    }
    resizeCards();
  });
  $('#search-query').text(`You searched for "${query}"`)
});


function resizeCards() {
  const windowWidth = $(window).width();
  if (windowWidth >= mdBreakpoint && windowWidth < lgBreakpoint) {
    $('.search-card').height(450);
  } else {
    $('.search-card').height('auto');
  }
}

window.onresize = resizeCards;
