//Hämta alla filmer vid uppstart av sidan
fetchMovies();
fetchTrivia();

//Skapa en lista av movies
var moviesList = document.getElementById("flex-container");
var trivias = document.getElementById("trivia-container");

//Logga in på sitt konto
var loginButton = document.getElementById("login");

function Login()
{
    fetchMovies();
    console.log("Inloggningsläget");
    loginButton.innerHTML="Logga in";
    loginButton.insertAdjacentHTML("beforeend", 
    "<br>Användarnamn: <input type='text' id='userName'></input>Lösenord: <input type='text' id='userPass'></input><button id='loginButton'>Logga in</button><p> </p>")
    loginButton.addEventListener("click", function(){
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
        console.log("Registreringsläget");
        registerButton.innerHTML = "Registrera ny studio";
        registerButton.insertAdjacentHTML("beforeend",  
        "<br>Användarnamn: <input type='text' id='userName'></input>Lösenord: <input type='text' id='userPass'></input><button id='regButton'>Registrera</button><p> </p>")
        regButton.addEventListener("click", function()
        {
        var studio = document.getElementById("userName").value;
        var password = document.getElementById("userPass").value;
        addStudio(studio,password,true);
        console.log(studio,password,true);
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

        console.log("fetchMovies",movie);
        moviesList.innerHTML = "";

        for(i=0; i< movie.length; i++) {
            console.log(movie[i].name)
            var movieId = movie[i].id;
            moviesList.insertAdjacentHTML ("beforeend","<div class='movie-container' id='movieid' onclick='getmovieid("+movie[i].id+")'>" + movie[i].name + movie[i].id +"</div>")
        }
        
    })
}
function getmovieid(id)
{
    fetch("https://localhost:44361/api/film")
    .then(function(response){
                return response.json();
    })
    .then(function(movie){

        //console.log("fetchMovies",movie);
        moviesList.innerHTML = "";
        var getMovie = movie.find(a => a.id == id)
        console.log(getMovie)
    })
}
//Funktion för att hämta alla trivia
function fetchTrivia(){
    fetch("https://localhost:44361/api/filmtrivia")
    .then(function(response){
                return response.json();
    })
    .then(function(trivia){

        console.log("fetchTrivia",trivia);
        
        for(i=0; i< trivia.length; i++) {
            console.log(trivia[i].id)
        }
    })
}


//Funktion för att lägga till nya Studios
function addStudio(name, password, verified){
    console.log("Lägg till filmstudio");

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

        //console.log("fetchStudios",json);
        
        var matchUserPassword = json.find(a => a.name  === userName && a.password === userPass);
        console.log("det här händer " + matchUserPassword);
        
        if (userName == matchUserPassword.name && userPass == matchUserPassword.password)
        {    
                login.innerHTML="";
                console.log("Du loggade in!")
                localStorage.setItem("userId",userName);
                login.insertAdjacentHTML("beforeend", 
                "<br><div>Du är inloggad som " + matchUserPassword.name + "<button id='logout'>Logga ut</button></div>")
                console.log(localStorage.getItem("userId"));
                fetchMovies();
                
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
        // for(i=0; i< json.length; i++) 
        // {
        //     console.log(result);
        //     if(userName == json[i].name && userPass == json[i].password)
        //     {
        //         login.innerHTML="";
        //         console.log("Du loggade in!")
        //         localStorage.setItem("userId",userName);
        //         login.insertAdjacentHTML("beforeend", 
        //         "<br><div>Du är inloggad som " + json[i].name + "<button id='logout'>Logga ut</button></div>")
        //         console.log(localStorage.getItem("userId"));
        //         fetchMovies();
                
        //         logout.addEventListener("click", function()
        //                 {
        //                     login.innerHTML="";
        //                     login.insertAdjacentHTML("beforeend",  
        //                     "<br><div>Du är utloggad! <button id='loginButton' onclick='Login()'>Logga in</button> <button onclick='RegStudio()'>Registrera Studio</button></div>");
        //                     fetchMovies();
        //                 });
        //     }  
        // }
    });

    
}