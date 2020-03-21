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
  var imageUrl = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9ZZODgBDQ6v5ZONYYah7R4Ci02hMl-bd9wTky5V9ypka-MCPI",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F5FY21GJzoXQ%2Fmaxresdefault.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fsafetyandhealthmagazine.com%2Fext%2Fresources%2Fimages%2Fnews%2Fconstruction%2Ffemale-construction-worker.jpg%3Fheight%3D635%26t%3D1515620680%26width%3D1200&f=1&nofb=1"
  ];

  for (var i = 0; i < imageUrl.length; i++) {
    var tag = `<div id=img${i} > <img id=img${i} class='checkImg' src=${imageUrl[i]}></img></div>`;

    $("#imageDiv").append(tag);
  }

  $(".checkImg").on("click", function() {
    imageUrl = $(this).attr("src");
    let photoID = `#${$(this).attr("id")}`;
    console.log(photoID);
    let joeURL =
      "http://api.skybiometry.com/fc/faces/detect.json?api_key=61m75vnv9srntq7ui9b9u1gt83&api_secret=ngnjmpho52tfdgnr5u891hs60u&urls=" +
      imageUrl +
      "&attributes=all";

    let settings = {
      url: joeURL,
      method: "GET"
    };
    $.ajax(settings).done(function(response) {
      console.log(response);

      if (response.photos[0].tags[0].attributes.hat.value == "true") {
        let html = `<div>HARD HAT DETECTED!!</div>`;
        $(photoID).append(html);
      } else {
        let html = `<div>HARDHAT NOT DETECTED!!</div>`;
        $(photoID).append(html);
      }

      if (response.photos[0].tags[0].attributes.glasses.value == "true") {
        let html = `<div>GLASSES DETECTED!!</div>`;
        $(photoID).append(html);
      } else {
        let html = `<div>GLASSES NOT DETECTED!!</div>`;
        $(photoID).append(html);
      }
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
