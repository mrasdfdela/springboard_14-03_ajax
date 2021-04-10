// giphy API: https://developers.giphy.com/docs/api/endpoint#search

btnSearch = document.querySelector('#btn-search')
btnSearch.addEventListener('click', async function(e){
  e.preventDefault();
  const input = document.querySelector('input').value;
  const res = await searchGiphy(input);
  
  let importedGifs = document.querySelector('#importedGifs');
  let newGif = document.createElement('img');
  newGif.setAttribute('src',res.data.data[0].images.original.url);
  importedGifs.appendChild(newGif);
});

/* Request:
https://api.giphy.com/v1/gifs/search?string=jerry&api_key=osGOINpiQCdsokKlTE6T99xS2ktOwnH3
Response:
{"data":[],"pagination":{"total_count":0,"count":0,"offset":0},"meta":{"status":200,"msg":"OK","response_id":"0qz07vp05ltjb49suz4g1g2de8k4g7fmynhyeoh7"}}
*/
async function searchGiphy(string) {
  try {
    const key = "osGOINpiQCdsokKlTE6T99xS2ktOwnH3";
    const req = {
      params: {
        api_key: key,
        q: string
      }
    };
    const res = await axios.get(`http://api.giphy.com/v1/gifs/search`, req);
    return res;
  } catch(e) {
    console.log(`error =( ${e}`)
  }
}

btnRemove = document.querySelector('#btn-remove')
btnRemove.addEventListener( "click", (e) => {
  e.preventDefault();
  const allGifs = document.querySelectorAll("#importedGifs img");
  for (gif of allGifs) {
    gif.remove();
  }
});