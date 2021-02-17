let moviesData;
let listaMeaVector = new Array(); //vector
let i = 1;
function requestFromApi(page){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           console.dir(JSON.parse(this.responseText));
           let containerMovies = document.getElementById('container-movies');
           let obiect = JSON.parse(this.responseText);
           moviesData = obiect.results;
           let movies = obiect.results; 
           for(movie of movies){

                console.log(movie.title);

                let titluDeAdaugat = document.createElement("h2");
                titluDeAdaugat.innerHTML = i + ")" + " "; 
                titluDeAdaugat.innerHTML += movie.title;
                titluDeAdaugat.setAttribute("onclick", `mergiLaPagina(${movie.id})`);


                let imagineDeAdaugat = document.createElement("img");

                let releaseDate = document.createElement("h5");
                releaseDate.innerHTML = "Data lansarii: ";
                releaseDate.innerHTML += movie.release_date;

                let vot = document.createElement("h4");
                vot.innerHTML = "IMDB : " ;
                vot.innerHTML += movie.vote_average;

                let descriere = document.createElement("p");
                descriere.innerHTML = movie.overview;



                if(movie.poster_path)imagineDeAdaugat.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                // containerMovies.appendChild(titluDeAdaugat);
                // containerMovies.appendChild(imagineDeAdaugat);
                let boxContainer = document.createElement("div");
                boxContainer.classList.add('box-movie');
                boxContainer.appendChild(titluDeAdaugat);
                boxContainer.appendChild(descriere);
                if(movie.poster_path)  boxContainer.appendChild(imagineDeAdaugat);
                boxContainer.appendChild(releaseDate);
                boxContainer.appendChild(vot);
                let butonElement = document.createElement('button');
                butonElement.setAttribute('onclick', `adaugaLaLista(${movie.id})`);
                butonElement.innerHTML = 'ADAUGA LA LISTA MEA';
                boxContainer.appendChild(butonElement);
                boxContainer.appendChild(document.createElement("hr"));
                containerMovies.appendChild(boxContainer);

                

               i++;


           }
        }

    };
    xhttp.open("GET", `https://api.themoviedb.org/3/movie/top_rated?api_key=cbfe14dca962f80954527bbd2c5dc302&page=${page}`, true);
    xhttp.send();
    
} 

for(i = 1;i<=5;++i)requestFromApi(i);

function adaugaLaLista(id){

  
  if(!listaMeaVector.find(film => film.id == id)){
    let obiect = moviesData.find(film => film.id == id);

    console.log('Adaug movie Object.. ', obiect);
    listaMeaVector.push(obiect);
    refreshContainerListaMea();
}


}

function refreshContainerListaMea(){



  let containerListaMea = document.getElementById('containerListaMea');
  containerListaMea.innerHTML = '';
  for(movie of listaMeaVector){

    let titleElement = document.createElement('h3');
    titleElement.innerHTML = movie.title;
    let button = document.createElement('button');
    button.setAttribute('onclick', `scoateDinLista(${movie.id})`);
    button.innerHTML = 'Scoate din lista mea';

    containerListaMea.appendChild(titleElement);
    containerListaMea.appendChild(button);
    containerListaMea.innerHTML+='</br>';

  }

}

function scoateDinLista(id){
  let arrayId = listaMeaVector.findIndex(film => film.id == id);
  if(arrayId != -1){
    listaMeaVector.splice(arrayId, 1);  
  }
  refreshContainerListaMea();
}

function buttonFunction(btn) {
    btn.style.backgroundColor = "blue";
}

function mergiLaPagina(id){

  //alert(`Urmeaza sa merg la ... ${id}`);
  window.location.href = `./pagina_film_singur.html?id=${id}`;

}