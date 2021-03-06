/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const req = {
    params: {
      q: query
    }
  }
  const res = await axios.get("http://api.tvmaze.com/search/shows", req);
  
  return res.data.map( (obj)=>{
    s = obj.show
    return {
      id: s.id,
      name: s.name,
      summary: s.summary,
      image: s.image.medium
    }
  })
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
        <div class="card" data-show-id="${show.id}">
          <img class="card-img-top" src="${show.image}" alt="https://tinyurl.com/tv-missing">
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">${show.summary}</p>
          </div>
          <button>Episodes</button>
        </div>
       </div>
      `
    );

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);


});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  let eps = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  return eps.data.map( (ep) => {
    return {
      id: ep.id,
      name: ep.name,
      season: ep.season,
      number: ep.number
    }
  });
  // TODO: return array-of-episode-info, as described in docstring above
}

function populateEpisodes(episodes) {
  let $episodesList = $('#episodes-list');

  for (let ep of episodes) {
    let $episodeLi = $('<li>')
    $episodeLi.text(`${ep.name} (s${ep.season}, n${ep.number})`)
    $episodesList.append($episodeLi)
  }
}

$('#shows-list').on('click', 'button', async function(e) {
  let show = $(this).parent();
  let showEpisodes = await getEpisodes(show.attr("data-show-id"));
  $('#episodes-area').css('display','');
  populateEpisodes(showEpisodes);
})