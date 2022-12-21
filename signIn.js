function onSignIn(googleUser) {
  try {
    document.getElementById('g-signin2').addEventListener('click', function() {
    window.location.href = 'https://pingu-893.github.io/web-dev/';});
    let profile = googleUser.getBasicProfile();
    $("#name").text(profile.getName());
    $("#email").text(profile.getEmail());
    $("#image").attr('src', profile.getImageUrl());
    $("#.data").css("display","block");
    $(".g-signin2").css("display","none");
  } catch (error) {
    console.error(error); // display the error message in the console
  }
}

function signOut() {
  try {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      alert("You have been signed out successfully");
      $(".g-signin2").css("display","block");
      $("#.data").css("display","none");
    });
  } catch (error) {
    console.error(error); // display the error message in the console
  }
}


