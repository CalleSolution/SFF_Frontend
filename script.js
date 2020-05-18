fetchMovies();

var moviesList = document.getElementById("flex-container")

var newFilmstudio = document.getElementById("")

function fetchMovies(){
    fetch("https://localhost:44361/api/film")
    .then(function(response){
                return response.json();
    })
    .then(function(json){

        console.log("fetchMovies",json);

        for(i=0; i< json.length; i++) {
            console.log(json[i].name)
            moviesList.insertAdjacentHTML("beforeend","<div class=movie-container>" + json[i].name + "</div>")
        }
    })
}

function addStudio(name, password,verified){
    console.log("Lägg till filmstudio");

    var newStudio = {name: name, password:password, verified:verified};

    fetch ("https://localhost:44361/api/filmstudio", {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(newStudio),
    })
    .then(response => response.json())
    .then (data => {
        console.log('Success:', data);
        fetchMovies();
    })
    .catch((err) => {
        console.error('Error:',err);
    }); 
}   