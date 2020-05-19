//Hämta alla filmer vid uppstart av sidan
fetchMovies();
//Skapa en lista av movies
var moviesList = document.getElementById("flex-container");

//Logga in på sitt konto
var loginButton = document.getElementById("login");

function Login()
{
    console.log("Inloggningsläget");
    loginButton.innerHTML="Logga in";
    loginButton.insertAdjacentHTML("beforeend", 
    "<br>Användarnamn: <input type='text' id='userName'></input>Lösenord: <input type='text' id='userPass'></input><button id='loginButton'>Logga in</button><p> </p>")
    loginButton.addEventListener("click", function(){
        var userLogin = document.getElementById("userName").value;
        var userPassword = document.getElementById("userPass").value;
        
        fetchStudios(userLogin,userPassword)
    });
}
//Registrera studio
var registerButton = document.getElementById("login");
function RegStudio() 
{
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
        });
}
//Funktion för att hämta alla filmer
function fetchMovies(){
    fetch("https://localhost:44361/api/film")
    .then(function(response){
                return response.json();
    })
    .then(function(json){

        console.log("fetchMovies",json);
        moviesList.innerHTML = "";
        for(i=0; i< json.length; i++) {
            console.log(json[i].name)
            moviesList.insertAdjacentHTML("beforeend","<div class=movie-container>" + json[i].name + "</div>")
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
function fetchStudios(userName,userPass)
{
    fetch("https://localhost:44361/api/filmstudio")
    .then(function(response){
                return response.json();
    })
    .then(function(json){

        console.log("fetchStudios",json);
        moviesList.innerHTML = "";
        for(i=0; i< json.length; i++) 
        {
            if(userName == json[i].name && userPass == json[i].password)
            {
                console.log("Du loggade in!")
            }
            else
            {
                console.log("någonting gick fel!");
            }
           
        }
    });
}