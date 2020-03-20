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
$(document).ready(function() {
  let url =
    "https://api.skybiometry.com/fc/account/namespaces.json?api_key=61m75vnv9srntq7ui9b9u1gt83&api_secret=ngnjmpho52tfdgnr5u891hs60u&urls=http://tiny.com/673cks$attributes=all";

  var settings = {
    async: true,
    crossDomain: true,
    url: url,
    method: "GET",
    headers: {
      "x-rapidapi-host": "face.p.rapidapi.com",
      "x-rapidapi-key": "3e9420af83msh9f3c3a2f99bf11bp154afejsn314b780e0306",
      "content-type": "application/x-www-form-urlencoded"
    },
    data: {}
  };

  $("#btn").on("click", function() {
    console.log("Call Made");
    $.ajax(settings).done(function(response) {
      console.log(response);
      console.log(response.status);
      console.log(response.glasses);
    });
  });
});

//Giphy API
var thing = $(this).attr("data");
console.log("thing: " + thing);
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
