'use strict';

const updateID = false;

function updatePosition() {
//checks if the browser supports the geolocation API then tracks the device
  if (navigator.geolocation){
    updateID = navigator.geolocation.watchPosition(locate);
  }
  else {
    document.getElementById("location").innerHTML = "browser does not support geolocation API";
  }
}

function stopUpdate() {
//stops tracking the device
  navigator.geolocation.clearWatch(updateID);
}
      
function locate(position) {
//displays the latitude and longitude after fetching the position 
  document.getElementById("location").innerHTML = `Latitude: ${position.coords.latitude} <br /> Longitude: ${position.coords.longitude}`;
}

