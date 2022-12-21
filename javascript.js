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


class Carousel {

	// constructeur de caroussel
	constructor (element, options = {}) {
		this.element = element
		this.options = options
		let ratio = this.options.slidesTotal / this.options.slidesVisible
		this.carousel = element.children[1]
		this.carousel.style.cssText = 'width:'+(ratio * 100)+'%';
		this.currentItem = 0;
		
		
		let sizeMovie = ((100  / this.options.slidesVisible) / ratio)
		for (let i = 0; i < element.children[1].children.length; i++) {
			element.children[1].children[i].style.cssText = 'width:'+sizeMovie+'%'
		}

		this.navigation()
	}

	// Création des items boutons de navigation avant et après chaque carroussel
	navigation(){
	let nextBtn = document.createElement('div')
	nextBtn.setAttribute('class', 'btn_next')
	this.element.appendChild(nextBtn)
	nextBtn.addEventListener("click", this.next.bind(this));

	let prevBtn = document.createElement('div')
	prevBtn.setAttribute('class', 'btn_prev')
	this.element.appendChild(prevBtn)
	prevBtn.addEventListener("click",this.prev.bind(this));
	}
	
	next(){
		this.goToItem(this.currentItem + this.options.slidesToScroll)

	}
	prev(){
		this.goToItem(this.currentItem - this.options.slidesToScroll)
	}
	goToItem(index){
		if (index < 0){
			index = this.options.slidesTotal - this.options.slidesVisible
		}
		if (index > (this.options.slidesTotal - this.options.slidesVisible)){
			index = 0
		}
		let ratioX = index * -100 / this.options.slidesTotal
		this.carousel.style.transform = 'translate3d(' + ratioX + '%, 0, 0)'
		this.currentItem = index
	}
}


async function fetchMovies(url) {
  
  	try{
  		const response = await fetch(url);
  		const json = await response.json();
  		return json;

  	} catch(err) {
  		console.log(err);
  };
}

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

async function createMovies(section, url){
	
	items = await start(url);
	for(let item of items){
		tabFilmExploit.push(item);
	}

	let sectionCarousel = document.querySelector("#" + section + " div.carousel");
	let container =  document.querySelector("#" + section)

	for(let i = 0; i < items.length; i++){
		let movie = document.createElement("div")
		movie.setAttribute('class', 'movie');
		movie.setAttribute('id', 'modale__' + items[i].id);

		let imgMovie = document.createElement("img")
		imgMovie.src = items[i].image_url
		movie.appendChild(imgMovie);

		sectionCarousel.appendChild(movie);

		movie.setAttribute('onclick', "showModale(" + items[i].id + ")");

		let close = document.getElementById("close")
		close.setAttribute('onclick', "showModale(" + items[i].id + ")");

	}

	if (resWidth <= 360) {
        slidesVisibles = 1
    } else {
        slidesVisibles = 4
    }

	new Carousel(document.querySelector("#"+section), {
		slidesToScroll: 1,
		slidesVisible: slidesVisibles,
		slidesTotal: 7
		})				
}

// function link to modale call
function showModale(films) {

	let imgInfo = document.getElementById("img_infos")
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

	for(i = 0; i < tabFilmExploit.length; i++){

		if(films == tabFilmExploit[i].id){

			imgInfo.src = tabFilmExploit[i].image_url;
			titleInfo.innerHTML = "<span>Titre : </span>" + tabFilmExploit[i].title;
			genderInfo.innerHTML = "<span>Catégorie : </span>" + tabFilmExploit[i].genres.join(' / ');
			yearInfo.innerHTML = "<span>Date de sorie : </span> " + tabFilmExploit[i].year;
			ratedInfo.innerHTML = "<span>Note : </span>" + tabFilmExploit[i].rated;
			imdbInfo.innerHTML = "<span>IMDB : </span>" + tabFilmExploit[i].imdb_score;
			realInfo.innerHTML = "<span>Réalisateur : </span>" + tabFilmExploit[i].directors.join(' / ');
			actorsInfo.innerHTML = "<span>Acteur(s) : </span>" + tabFilmExploit[i].actors.join(' / ');
			durationInfo.innerHTML = "<span>Durée : </span>" + tabFilmExploit[i].duration + "min";
			countryInfo.innerHTML = "<span>Pays : </span>" + tabFilmExploit[i].countries;
			boxofficeInfo.innerHTML = (tabFilmExploit[i].worldwide_gross_income == null) ? "<span>Résultat au box office : </span> Non disponible" : "<span>Résultat au box office : </span> " + tabFilmExploit[i].worldwide_gross_income + " $ ";
			synopsisInfo.innerHTML = "<span>Synopsis : </span>" + tabFilmExploit[i].long_description;
		}
	}
	show()
}

function show(){
	element = document.getElementById("modale");
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

	buttonTop.setAttribute('onclick', "showModale(" + movie[0].id + ")");
}

let resWidth = window.screen.availWidth;
let resHeight = window.screen.availHeight;
// @arg1 = <section> id name
// @arg2 = URL const (top of this file)
createTopMovie('the-movie', urlTheMovie);
createMovies('best-movies', ulrBestMovies);
createMovies('best-adventure', urlAdventure);
createMovies('best-comedy', urlComedy);
createMovies('best-history', urlHistory);
