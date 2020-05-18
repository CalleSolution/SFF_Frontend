fetchMovies();

var moviesList = document.getElementById("moviesList")


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