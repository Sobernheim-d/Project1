// Your web app's Firebase configuration

var firebaseConfig = {
  apiKey: "AIzaSyC7BfOPJId6bXHFz1Q1Y-p8POWRrIguRrk",
  authDomain: "safety-check-first.firebaseapp.com",
  databaseURL: "https://safety-check-first.firebaseio.com",
  projectId: "safety-check-first",
  storageBucket: "safety-check-first.appspot.com",
  messagingSenderId: "810661652634",
  appId: "1:810661652634:web:1af75d7de6b2e238dd1723"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Skybio API
var settings = {
  async: true,
  crossDomain: true,
  url: "https://face.p.rapidapi.com/account/limits",
  method: "POST",
  headers: {
    "x-rapidapi-host": "face.p.rapidapi.com",
    "x-rapidapi-key": "3e9420af83msh9f3c3a2f99bf11bp154afejsn314b780e0306",
    "content-type": "application/x-www-form-urlencoded"
  },
  data: {}
};

$.ajax(settings).done(function(response) {
  console.log(response);
});

//Giphy API
var thing = $(this).attr("data");
// console.log("thing: " + thing);
var queryURL =
  "https://api.giphy.com/v1/gifs/search?q=green+light&api_key=C01R2xURFqCz6oEkz89pIqaDGFPgxD4N&limit=1";

$.ajax({
  url: queryURL,
  method: "GET"
});

$(document).on("click", ".giphy-img", function() {
  console.log("on click");
  var state = $(this).attr("state");
  if (state == "still") {
    var animatedUrl = $(this).attr("data-animate");
    $(this).attr("src", animatedUrl);
    $(this).attr("state", "animated");
  }
  var stillUrl = $(this).attr("data-still");
  $(this).attr("src", stillUrl);
  $(this).attr("state", "still");
});
