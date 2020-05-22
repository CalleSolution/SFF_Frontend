//Hämta alla filmer vid uppstart av sidan
fetchMovies();


//Skapa en lista av movies
var moviesList = document.getElementById("flex-container");
var trivias = document.getElementById("trivia-container");
var moviebuttons = document.getElementById("movie-button");

//Logga in på sitt konto
var loginButton = document.getElementById("login");

function Login()
{
    fetchMoviesWhileLoggedIn();
    loginButton.innerHTML="Logga in";
    loginButton.insertAdjacentHTML("beforeend", 
    "<br>Användarnamn: <input type='text' id='userName'></input>Lösenord: <input type='text' id='userPass'></input><button id='sendpost'>Logga in</button><p> </p>")
    sendpost.addEventListener("click", function(){
        var userLogin = document.getElementById("userName").value;
        var userPassword = document.getElementById("userPass").value;
        
        fetchStudios(userLogin,userPassword);
    });
}
//Registrera studio
var registerButton = document.getElementById("login");
function RegStudio() 
{
    fetchMovies();
        registerButton.innerHTML = "Registrera ny studio";
        registerButton.insertAdjacentHTML("beforeend",  
        "<br>Användarnamn: <input type='text' id='userName'></input>Lösenord: <input type='text' id='userPass'></input><button id='regButton'>Registrera</button><p> </p>")
        regButton.addEventListener("click", function()
        {
        var studio = document.getElementById("userName").value;
        var password = document.getElementById("userPass").value;
        addStudio(studio,password,true);
        login.innerHTML="";
        login.insertAdjacentHTML("beforeend",  
        "<br><div>Du har registrerat en ny filmstudio! <button id='loginButton' onclick='Login()'>Logga in</button> <button onclick='RegStudio()'>Registrera Studio</button></div>");
        fetchMovies();
        });

}
//Funktion för att hämta alla filmer
function fetchMovies(){
    fetch("https://localhost:44361/api/film")
    .then(function(response){
                return response.json();
    })
    .then(function(movie){

;
        moviesList.innerHTML = "";
        moviebuttons.innerHTML="";

        for(i=0; i< movie.length; i++) {
            moviesList.insertAdjacentHTML ("beforeend","<div class='movie-container' id='movieid' onclick='fetchMovieIdOffline("+movie[i].id+")'>" + movie[i].name + movie[i].id +"</div>")
        }
        
    })
}

//Hämta alla filmer för inloggad
function fetchMoviesWhileLoggedIn()
{
    fetch("https://localhost:44361/api/film")
    .then(function(response){
                return response.json();
    })
    .then(function(movie){


        moviesList.innerHTML = "";
        moviebuttons.innerHTML = "";

        for(i=0; i< movie.length; i++) {
            moviesList.insertAdjacentHTML ("beforeend","<div class='movie-container' id='movieid' onclick='getmovieid("+movie[i].id+")'>" + movie[i].name + movie[i].id +"</div>")
        }
           
    })
}
function fetchMovieIdOffline()
{
    fetch("https://localhost:44361/api/film")
    .then(function(response){
                return response.json();
    })
    .then(function(movie){


        moviesList.innerHTML = "";
        moviebuttons.innerHTML = "";

        for(i=0; i< movie.length; i++) {
            moviesList.insertAdjacentHTML ("beforeend","<div class='movie-container' id='movieid' onclick='getMovieIdOffline("+movie[i].id+")'>" + movie[i].name + movie[i].id +"</div>")
        }
           
    })
}
//Visa en specifik film offline
function getMovieIdOffline(id)
{
    fetch("https://localhost:44361/api/film")
    .then(function(response){
                return response.json();
    })
    .then(function(movie){

        
        moviesList.innerHTML = "";
        moviebuttons.innerHTML="";
        
        var getMovie = movie.find(a => a.id == id)
        moviesList.insertAdjacentHTML ("beforeend","<div class='movie-container'>" + getMovie.id + " " + getMovie.name +"</div>")
        moviebuttons.insertAdjacentHTML ("beforeend", "<div id='movie-button'><button id='back' onclick='fetchMovies()'>Gå tillbaka</button><button onclick='fetchTriviaWhileOffline("+id+")'>Trivia</button></div>")     

        
    })
}
// Hämta en specifik film
function getmovieid(id)
{
    fetch("https://localhost:44361/api/film")
    .then(function(response){
                return response.json();
    })
    .then(function(movie){

        moviesList.innerHTML = "";
        moviebuttons.innerHTML="";
        
        var getMovie = movie.find(a => a.id == id)
        moviesList.insertAdjacentHTML ("beforeend","<div class='movie-container'>" + getMovie.id + " " + getMovie.name +"</div>")
        moviebuttons.insertAdjacentHTML ("beforeend", "<div id='movie-button'><button onclick='rentMovie("+getMovie.id+")'>Låna Film</button><button id='back' onclick='fetchMoviesWhileLoggedIn()'>Gå tillbaka</button><button onclick='fetchTrivia("+id+")'>Trivia</button><button onclick='movieToReturn("+getMovie.id+")'>Lämna tillbaka film</button></div>")     

        
    })
}

//Lämna tillbaka film
function movieToReturn(movieId)
{
    fetch("https://localhost:44361/api/RentedFilm")
    .then(function(response){
                return response.json();
    })
    .then(function(rentedMovie){


        moviesList.innerHTML = "";
        moviebuttons.innerHTML = "";
        
        var getMovie = rentedMovie.filter(a => a.filmId == movieId && a.studioId == localStorage.getItem("userId"))
        for(i=0; i<getMovie.length;i++)
        {
        moviesList.insertAdjacentHTML ("beforeend","<div class='movie-container'>" + getMovie[i].id + "Lämna tillbaka film " + getMovie[i].studioId +"</div>")
        moviebuttons.insertAdjacentHTML ("beforeend", "<div id='movie-button'><button onclick='returnMovie("+getMovie[i].id+","+getMovie[i].filmId+")'>Lämna tillbaka film</button></div>")    
        }
        moviebuttons.insertAdjacentHTML ("beforeend", "<div id='movie-button'><button id='back' onclick='fetchMoviesWhileLoggedIn()'>Gå tillbaka</button></div>")

    })
}

//Lämna tillbaka en film
function returnMovie(id,movieId)
{
    var returnedMovie = {id:Number(id), filmId : Number(movieId), studioId:Number(localStorage.getItem("userId")), returned:true}
    console.log(returnedMovie);
    fetch ('https://localhost:44361/api/RentedFilm/'+Number(id)  , {
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(returnedMovie),
    })
    .then(response => response.json())
    .then(returnedMovie => {
        console.log('Success:', returnedMovie);
        
    })
    .catch((err) => {
        console.log(err.message);
    });     
}

//Låna en film
function rentMovie(id)
{

    
    var rentedMovie = {filmId : Number(id), studioId:Number(localStorage.getItem("userId")), returned:false};

    fetch ('https://localhost:44361/api/RentedFilm', {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(rentedMovie),
    })
    .then(response => response.json())
    .then (rentedMovie => {
        console.log('Success:', rentedMovie);
        
    })
    .catch((err) => {
        console.error('Error:',err);
    }); 
}   

//Funktion för att hämta alla trivia
function fetchTrivia(id){
    fetch("https://localhost:44361/api/filmtrivia")
    .then(function(response){
                return response.json();
    })
    .then(function(trivia){

        
        moviesList.innerHTML ="";
        moviebuttons.innerHTML = "";
        var findTrivia = trivia.filter(a => a.filmId == id)
        
        for(i=0; i < findTrivia.length; i++)
        {
                 
        moviebuttons.insertAdjacentHTML("beforeend","<div class='movie-container'>"+'Trivia' + '<br>' + findTrivia[i].trivia + "</div>")
        }
        moviebuttons.insertAdjacentHTML ("afterbegin", "<div id='movie-button'><button onclick='RentReturnMovie()'>Låna Film</button><button id='back' onclick='fetchMoviesWhileLoggedIn()'>Gå tillbaka</button><button onclick='fetchTrivia("+id+")'>Trivia</button><button onclick='newTrivia("+id+")'>Lägg till trivia</button></div>")
        
    })
}
//Funktion för att hämta alla trivia offline
function fetchTriviaWhileOffline(id){
    fetch("https://localhost:44361/api/filmtrivia")
    .then(function(response){
                return response.json();
    })
    .then(function(trivia){

        
        moviesList.innerHTML ="";
        moviebuttons.innerHTML = "";
        var findTrivia = trivia.filter(a => a.filmId == id)
        
        for(i=0; i < findTrivia.length; i++)
        {
                 
        moviebuttons.insertAdjacentHTML("beforeend","<div class='movie-container'>"+'Trivia' + '<br>' + findTrivia[i].trivia + "</div>")
        }
        moviebuttons.insertAdjacentHTML ("afterbegin", "<div id='movie-button'><button id='back' onclick='fetchMovies()'>Gå tillbaka</button></div>")
        
    })
}
function newTrivia(id)
{

    moviesList.innerHTML= "<div class='movie-container'><input type='text' id='newTrivia'></input><button id='addNewTrivia'>Lägg till</button></div>";
    addNewTrivia.addEventListener("click", function()
        {
        var trivia = document.getElementById("newTrivia").value;
        addTrivia(id,trivia);
        });
}

//lägg till ny trivia
function addTrivia(id,trivia){
    
    
    var newTrivia = {filmId : Number(id), trivia : trivia};

    fetch ('https://localhost:44361/api/filmTrivia', {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(newTrivia),
    })
    .then(response => response.json())
    .then (newTrivia => {
        console.log('Success:', newTrivia);
        
    })
    .catch((err) => {
        console.error('Error:',err);
    }); 
}   
//Funktion för att lägga till nya Studios
function addStudio(name, password, verified){

    var newStudio = {name: name, password:password, verified:verified};

    fetch ('https://localhost:44361/api/filmstudio', {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(newStudio),
    })
    .then(response => response.json())
    .then (newStudio => {
        console.log('Success:', newStudio);
        fetchMovies();
    })
    .catch((err) => {
        console.error('Error:',err);
    }); 
}   

//Funktion för att hämta alla Studios --- Skriver ut allting just nu
var logutButton = document.getElementById("logout");
function fetchStudios(userName,userPass)
{
    fetch("https://localhost:44361/api/filmstudio")
    .then(function(response){
                return response.json();
    })
    .then(function(json){

        
        var matchUserPassword = json.find(a => a.name  === userName && a.password === userPass);
        
  
        if (userName == matchUserPassword.name && userPass == matchUserPassword.password)
        {    
           
            var studioId = matchUserPassword.id;
            localStorage.setItem("userId",studioId);
              
                login.innerHTML="";
                
                login.insertAdjacentHTML("beforeend", 
                "<br><div>Du är inloggad som " + matchUserPassword.name + "<button id='logout'>Logga ut</button></div>")

                fetchMoviesWhileLoggedIn();
                
                logout.addEventListener("click", function()
                        {
                            login.innerHTML="";
                            login.insertAdjacentHTML("beforeend",  
                            "<br><div>Du är utloggad! <button id='loginButton' onclick='Login()'>Logga in</button> <button onclick='RegStudio()'>Registrera Studio</button></div>");
                            fetchMovies();
                        });        
        }
        else
        {
            console.log("felaktig inmatning!")
        }

    });

    
}