var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");
console.log(id);
// id = filmul meu


let containerMovie = document.getElementById("containerMovies");
let genresContainer = document.getElementById('genresWrapper');

// example de request:
function requestFromApi(){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        	console.dir(JSON.parse(this.responseText));
            let data = JSON.parse(this.responseText);
            let titlu = data.title; 
            let elementTitlu = document.getElementById('titlu');

            let releaseDate = document.getElementById('releaseDate');

            let imagine = document.getElementById('imagine');

            let descriere = document.getElementById('descriere');

            let bugetFilm = document.getElementById('buget');

            let orginal = document.getElementById('limba');

            let venit = document.getElementById('venit');

            let timp = document.getElementById('durata');

            let tagline = document.getElementById('tagline');

            tagline.innerHTML = " ' " ;
            tagline.innerHTML += data.tagline;
            tagline.innerHTML += " ' " ; 

            timp.innerHTML = '<h3 style="display:inline">Durata: </h3>'
            timp.innerHTML += data.runtime;
            timp.innerHTML += ' minute';

            venit.innerHTML = '<h3 style="display:inline">Venit: </h3>'
            venit.innerHTML+= data.revenue;
            venit.innerHTML += '$';

            orginal.innerHTML = '<h3 style="display:inline">Limba orginala: </h3>'
            orginal.innerHTML += data.original_language; 
            descriere.innerHTML = data.overview;

            bugetFilm.innerHTML = '<h3 style="display:inline">Buget: </h3>'
            bugetFilm.innerHTML+=data.budget; 
            bugetFilm.innerHTML += '$';

            elementTitlu.innerHTML = titlu;
            releaseDate.innerHTML = '<h3 style="display:inline">Data lansarii: </h3>'
            releaseDate.innerHTML += data.release_date;
            imagine.setAttribute("src", `https://image.tmdb.org/t/p/w500/${data.poster_path}`);
            for(genre of data.genres){
                let elementDePus = document.createElement('span');
                elementDePus.innerHTML = genre.name + ', ';
                genresContainer.appendChild(elementDePus);
            }

            getVideoFromMovieId(data.id);

        }

    }
    xhttp.open("GET", `https://api.themoviedb.org/3/movie/${id}?api_key=cbfe14dca962f80954527bbd2c5dc302`, true);
    xhttp.send();
    
} 


requestFromApi();

async function placeActors(){

    let containerActors = document.getElementById('containerActors');
    let promisiune = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=cbfe14dca962f80954527bbd2c5dc302`);   
    let data = await promisiune.json();                                                                                        
    console.log(data);  
    for(actor of data.cast){
        console.log(actor);
        let actorBox = document.createElement('div');
        actorBox.classList.add('actorBox');
        let nume = actor.name;
        let h3Element = document.createElement('h4');
        h3Element.innerHTML = nume;
        actorBox.appendChild(h3Element);


        let character = actor.character;
        let h5Element = document.createElement('h5');
        h5Element.innerHTML = character;
        actorBox.appendChild(h5Element);



            let imagine = actor.profile_path;
            let imagineElement = document.createElement('img');
            imagineElement.setAttribute("src", `https://image.tmdb.org/t/p/w500/${imagine}`);


            actorBox.appendChild(imagineElement);
        



        containerActors.appendChild(actorBox);


    }
    


}

async function getVideoFromMovieId(movieId){

    let data = await fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=cbfe14dca962f80954527bbd2c5dc302`)
    let movieData = await data.json();
    let videoclipElement = document.getElementById('videoclip');
    videoclipElement.setAttribute('src', `https://www.youtube.com/embed/${movieData.results[0].key}`)

}

placeActors();