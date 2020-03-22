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
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fst3.depositphotos.com%2F1518767%2F14365%2Fi%2F950%2Fdepositphotos_143650817-stock-photo-portrait-of-smiling-factory-worker.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F5FY21GJzoXQ%2Fmaxresdefault.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hantover.com%2Fdatasurge%2Fimg%2Fimages%2F102001_Primary_Image_1.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fsafetysunglasses.com%2Fwp-content%2Fuploads%2F2011%2F07%2Fconstruction-worker-with-safety-glasses.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.prlog.org%2F10179643-excimer-argon-co2-laser-safety-glasses-and-goggles-fit-over-universal-fit.jpg&f=1&nofb=1",
    "",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.webstaurantstore.com%2Fimages%2Fproducts%2Fextra_large%2F28719%2F1103375.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic8.depositphotos.com%2F1465849%2F950%2Fi%2F950%2Fdepositphotos_9501390-stock-photo-construction-worker.jpg&f=1&nofb=1",
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

      var glasses = false;
      var hardhat = false;

      if (response.photos[0].tags[0].attributes.hat.value == "true") {
        let html = `<div>HARD HAT DETECTED!!</div>`;
        hardhat = true;
        $(photoID).append(html);
      } else {
        let html = `<div>HARDHAT NOT DETECTED!!</div>`;
        $(photoID).append(html);
      }

      if (response.photos[0].tags[0].attributes.glasses.value == "true") {
        let html = `<div>GLASSES DETECTED!!</div>`;
        glasses = true;
        $(photoID).append(html);
      } else {
        let html = `<div>GLASSES NOT DETECTED!!</div>`;
        $(photoID).append(html);
      }

      if (glasses === true && hardhat === true) {
        giphyCall("success");
      } else {
        giphyCall("fail");
      }
    });
  });
});

//Giphy API
function giphyCall(pass) {
  // console.log("thing: " + thing);
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    pass +
    "&api_key=C01R2xURFqCz6oEkz89pIqaDGFPgxD4N&limit=1";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.data[0].images.fixed_height.url);
    var gif = response.data[0].images.fixed_height.url;
    // var gifimg = $("<img src=" + gif + ">");
    var html = `<img src="${gif}"></img>`;
    console.log(html);
    $("#imageDiv").append(html);
  });
}

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
