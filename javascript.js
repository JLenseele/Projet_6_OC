//url du film le mieux noté
const urlTheMovie = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
// url des 7 films des quatres autres catégories
const ulrBestMovies = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7";
const urlAdventure = "http://localhost:8000/api/v1/titles/?genre=Adventure&sort_by=-imdb_score&page_size=7"
const urlComedy = "http://localhost:8000/api/v1/titles/?genre=Comedy&sort_by=-imdb_score&page_size=7"
const urlHistory = "http://localhost:8000/api/v1/titles/?genre=History&sort_by=-imdb_score&page_size=7"

const titleTopMovie = document.querySelector('#the-movie div h1');
const imageTopMovie = document.getElementById('img-top-movie');

let tabFilmExploit = [];

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
	
	items = await start(url);
	for(let item of items){
		tabFilmExploit.push(item);
	}

	let sectionCarousel = document.querySelector("#" + section + " div.carousel");

	for(let i = 0; i < items.length; i++){
		let movie = document.createElement("div")
		movie.setAttribute('class', 'movie');
		movie.setAttribute('id', 'modale__' + items[i].id);

		let imgMovie = document.createElement("img")
		imgMovie.src = items[i].image_url
		movie.appendChild(imgMovie);

		sectionCarousel.appendChild(movie);

		movie.setAttribute('onclick', "showModale(" + items[i].id + ")");
	}				
}

// function link to modale call
function showModale(films) {

	element = document.getElementById("modale");
	console.log(films);
	
	let titleInfo = document.getElementById("title_infos")
	let genderInfo = document.getElementById("gender_infos")
	let yearInfo = document.getElementById("year_infos")
	let ratedInfo = document.getElementById("rated_infos")
	let imdbInfo = document.getElementById("imdb_infos")
	let realInfo = document.getElementById("real_infos")
	let actorsInfo = document.getElementById("actors_infos")
	let durationInfo = document.getElementById("duration_infos")
	let countryInfo = document.getElementById("country_infos")
	let boxofficeInfo = document.getElementById("boxoffice_infos")
	let synopsisInfo = document.getElementById("synopsis_infos")

	console.log(tabFilmExploit);
	for(i = 0; i < tabFilmExploit.length; i++){

		if(films == tabFilmExploit[i].id){

			titleInfo.innerText = "Titre : " + tabFilmExploit[i].title;
			genderInfo.innerText = "Catégorie : " + tabFilmExploit[i].genres.join('/');
			yearInfo.innerText = "Date de sorie : " + tabFilmExploit[i].year;
			ratedInfo.innerText = "Note : " + tabFilmExploit[i].rated;
			imdbInfo.innerText = "IMDB : " + tabFilmExploit[i].imdb_score;
			realInfo.innerText = "Réalisateur : " + tabFilmExploit[i].directors.join('/');
			actorsInfo.innerText = "Acteur(s) : " + tabFilmExploit[i].actors.join('/');
			durationInfo.innerText = "Durée : " + tabFilmExploit[i].duration;
			countryInfo.innerText = "Pays : " + tabFilmExploit[i].countries;
			boxofficeInfo.innerText = "Résultat au box office : " + tabFilmExploit[i].worldwide_gross_income + " $ ";
			synopsisInfo.innerText = "Synopsis : " + tabFilmExploit[i].long_description;
		}
	}
	element.style.visibility = (element.style.visibility == "visible") ? "hidden" : "visible";
}

async function createTopMovie(section, url) {

	movie = await start(url);
	element = document.querySelector("#" + section + " div");
	
	// creation Titre top menu
	titleTop = document.createElement("h1")
	titleTop.innerText = movie[0].title;

	// creation img top menu
	imgTop = document.createElement("img")
	imgTop.src = movie[0].image_url;

	// creation description en paragraphe
	descTop = document.createElement("p")
	descTop.innerText = movie[0].long_description;

	// creation boutton d'information du top movie
	buttonTop = document.createElement("button")
	buttonTop.innerText = 'En savoir plus';
	

	element.appendChild(titleTop)
	element.appendChild(imgTop)
	element.appendChild(descTop)
	element.appendChild(buttonTop)
}


// @arg1 = <section> id name
// @arg2 = URL const (top of this file)
createTopMovie('the-movie', urlTheMovie);
createCarousel('best-movies', ulrBestMovies);
createCarousel('best-adventure', urlAdventure);
createCarousel('best-comedy', urlComedy);
createCarousel('best-history', urlHistory);
