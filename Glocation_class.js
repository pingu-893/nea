class Geolocation {
  //this class tracks the users location on a visual map
  
  constructor() {
    this.start = true;
    this.updateID = null;
    this.geocoder = null;
    this.initialLatitude = null;
    this.initialLongitude = null;
  }

  init() {
    /*sets up the geolocation api by calling the watchPosition 
     method if the browser supports the geolocation api*/
    
    if (navigator.geolocation) {
      this.updateID = navigator.geolocation.watchPosition(this.success.bind(this), this.failure.bind(this));
    }
  }

  success(position) {
    /*this method runs when there is a navigator.geolocation object in 
      the browser and it will obtain the users location coordinates*/ 
    
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    if (this.start) {
      this.initialLatitude = latitude;
      this.initialLongitude = longitude;
      this.start = false;
    }
    
    /*creates a new geocoder instance to obtain an 
      formatted address of the user location*/
    this.geocoder = new google.maps.Geocoder();
    let coordinates = new google.maps.LatLng(latitude, longitude);

    this.geocoder.geocode({'latLng': coordinates}, (results, stat) => {
      if (stat === google.maps.GeocoderStatus.OK) {
        if (results) {
          document.getElementById("text").innerHTML = `You are near ${results[0].formatted_address}`;
        }
      } else {
        alert("could not retrieve location");
      }
    });
    
    /*creates a new google map instance using the google maps api a finds the user 
      location by using the latitude and longitude coordinates found previously*/
    const mapOptions = {
      center: new google.maps.LatLng(this.initialLatitude, this.initialLongitude),
      zoom: 17,
    };

    const map = new google.maps.Map(document.getElementById("area"), mapOptions);
    
    /*creates a new marker instance which will point 
      to where the user is currently is on the map*/
    const marker = new google.maps.Marker({
      position: coordinates,
      map: map,
    });
  }

  failure(error) {
    /*this method will run if a problem has occurred and 
      geolocation api could not fetch the users coordinates*/
    switch (error.code) {
      case PERMISSION_DENIED:
        alert("user has denied permission");
        break;
      case POSITION_UNAVAILABLE:
        alert("position is currently unavailable");
        break;
      case TIMEOUT:
        alert("request has timed out");
        break;
      default:
        alert("an unknown error has occurred");
        break;
    }
  }
}

const geolocation = new Geolocation();
geolocation.init();

