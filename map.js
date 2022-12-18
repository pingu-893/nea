let updateID, geocoder, startLat, startLong;
let start = true;

window.onload = function() {
  if (navigator.geolocation) {
    updateID = navigator.geolocation.watchPosition(success, failure);
  }
}

function success(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  if (start) {
    startLat = latitude;
    startLong = longitude;
    start = false;
  }

  let geocoder = new google.maps.Geocoder();
  let latlong = new google.maps.LatLng(latitude, longitude);

  geocoder.geocode({'latLng': latlong}, function(results, stat){
    if (stat == google.maps.GeocoderStatus.OK) {
      if (results) {
        document.getElementById("text").innerHTML = `You are near ${results[0].formatted_address}`;
      }
    }
    else {
      alert("could not retrieve location")
    }
  });

  var mapOptions = {
    center: new google.maps.LatLng(startLat, startLong),
    zoom: 10,
  };

  var map = new google.maps.Map(document.getElementById("area"), mapOptions);

  var marker = new google.maps.Marker({
    position: latlong,
    map: map
  });
}

function failure(error) {
  switch (error.code) {
    case PERMISSION_DENIED:
      alert("user has denied permission");
      break;
    case POSITION_UNAVAILABLE:
      alert("cannot retrieve position coordinates");
    default:
      alert("error unknown")
      break;
  }
}
