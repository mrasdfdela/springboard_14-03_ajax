// giphy API: https://developers.giphy.com/docs/api/endpoint#search

searchBtn = document.querySelector('#search-btn')
searchBtn.addEventListener('click', function(e){
  e.preventDefault();
  let input = document.querySelector('input').value
  searchGiphy(input)

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
        string: string
      }
    };
    const res = await axios.get(`http://api.giphy.com/v1/gifs/random`, req);
  } catch(e) {
    console.log('error =(')
  }
}

