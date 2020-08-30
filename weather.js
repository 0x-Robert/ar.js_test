const COORDS = "coords";
const API_KEY = "9665673794cb466566ca6b04989ef744";

const weather = document.querySelector(".js-weather");

function getWeather( latitude, longitude){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`).then(
        function(response){
           return response.json();

    }).then(function(json){
       const temperature = json.main.temp;
       const place = json.name;
       weather.innerText = `${temperature} @ ${place}`;

    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    // console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude,longitude);
    console.log(coordsObj);


}

function handleGeoError(){
    console.log("Cant access geo loacation");
}


function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}


function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
if (loadedCoords === null){
    askForCoords();
}
else{
    //getWeather
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
    console.log(parsedCoords);
}



}

function init(){
loadCoords();
console.log("weather test");
}


init();