const urlTheMovie = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
const ulrBestMovies = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7";
const urlAdventure = "http://localhost:8000/api/v1/titles/?genre=Adventure&sort_by=-imdb_score&page_size=7"
const urlComedy = "http://localhost:8000/api/v1/titles/?genre=Comedy&sort_by=-imdb_score&page_size=7"
const urlHistory = "http://localhost:8000/api/v1/titles/?genre=History&sort_by=-imdb_score&page_size=7"


const titleTopMovie = document.querySelector('#the-movie div h1');
const imageTopMovie = document.getElementById('img-top-movie');

async function fetchMovies(url) {
  
  	try{
  		const response = await fetch(url);
  		const json = await response.json();
  		return json;

  	} catch(err) {
  		console.log(err);
  };
}


const sectionBestMovie = document.getElementById('bestmovies');

async function start(url){

	const moviesList = []
    let movies = []

	movies = await fetchMovies(url);

	const results = movies.results;
	for (let result of results) {
		const movie = await fetchMovies("http://localhost:8000/api/v1/titles/" + result.id);
        moviesList.push(movie);
        }
    return moviesList;
}

async function createCarousel(section, url){
	let tabFilmExploit = await start(url);

	let sectionCarousel = document.getElementById(section);

	for(let i = 0; i < tabFilmExploit.length; i++){
		let carousel = document.createElement("div")
		carousel.setAttribute('class', 'carousel');

		let imgMovie = document.createElement("img")
		imgMovie.src = tabFilmExploit[i].image_url
		carousel.appendChild(imgMovie);
		
		sectionCarousel.appendChild(carousel);
	}

							
}

createCarousel('best-movies', ulrBestMovies);
createCarousel('best-adventure', urlAdventure);
createCarousel('best-comedy', urlComedy);
createCarousel('best-history', urlHistory);
