$(document).ready(function() {
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

  var imageUrl = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9ZZODgBDQ6v5ZONYYah7R4Ci02hMl-bd9wTky5V9ypka-MCPI",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fst3.depositphotos.com%2F1518767%2F14365%2Fi%2F950%2Fdepositphotos_143650817-stock-photo-portrait-of-smiling-factory-worker.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F5FY21GJzoXQ%2Fmaxresdefault.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hantover.com%2Fdatasurge%2Fimg%2Fimages%2F102001_Primary_Image_1.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fsafetysunglasses.com%2Fwp-content%2Fuploads%2F2011%2F07%2Fconstruction-worker-with-safety-glasses.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.prlog.org%2F10179643-excimer-argon-co2-laser-safety-glasses-and-goggles-fit-over-universal-fit.jpg&f=1&nofb=1",
    "https://www.irishtimes.com/polopoly_fs/1.3828854!/image/image.jpg_gen/derivatives/landscape_620/image.jpg",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.webstaurantstore.com%2Fimages%2Fproducts%2Fextra_large%2F28719%2F1103375.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic8.depositphotos.com%2F1465849%2F950%2Fi%2F950%2Fdepositphotos_9501390-stock-photo-construction-worker.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fsafetyandhealthmagazine.com%2Fext%2Fresources%2Fimages%2Fnews%2Fconstruction%2Ffemale-construction-worker.jpg%3Fheight%3D635%26t%3D1515620680%26width%3D1200&f=1&nofb=1"
  ];

  function drawScreen() {
    let row1 = $("<div class='row valign-wrapper center-align'>");
    let row2 = $("<div class='row valign-wrapper center-align'>");

    for (var i = 0; i < 8; i++) {
      let tag = $(`
  <div class="col s3 imgDiv">
      <div class='imgDiv${i}'>
      <img src=${imageUrl[i]} class="responsive-img img">
      </div>
    <button class="btn-large btn-thing waves-effect waves-light" src=${imageUrl[i]} index='${i}'>Ready For Work?</button>
  </div>
  `);
      // $("#imageDiv").append(tag);

      if (i < 4) {
        row1.append(tag);
      } else {
        row2.append(tag);
      }
      console.log(row1);

      $(".divContainer").append(row1, row2);
    }
  }

  drawScreen();

  $(document).on("click", ".btn-thing", function() {
    let index = $(this).attr("index");
    // $(".imgDiv" + index).toggle();

    imageUrl = $(this).attr("src");
    // let photoID = `#${$(this).attr("id")}`;
    // console.log(photoID);
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

      $(".imgDiv" + index).empty();
      if (response.photos[0].tags[0].attributes.hat.value == "true") {
        let html = `<div><span id='go' >HARD HAT DETECTED!!</span></div>`;
        hardhat = true;
        $(".imgDiv" + index).append(html);
      } else {
        let html = `<div><span id='ready'>HARD HAT NOT DETECTED!!</span></div>`;
        $(".imgDiv" + index).append(html);
      }

      if (response.photos[0].tags[0].attributes.glasses.value == "true") {
        let html = `<div><span id='go' >GLASSES DETECTED!!</span></div>`;
        glasses = true;
        $(".imgDiv" + index).append(html);
      } else {
        let html = `<div><span id='ready'>GLASSES NOT DETECTED!!</span></div>`;
        $(".imgDiv" + index).append(html);
      }

      if (glasses === true && hardhat === true) {
        giphyCall("hell ya", index);
      } else {
        giphyCall("nope", index);
      }
    });
  });

  $(document).on("click", "#resetBtn", function() {
    $(".divContainer").empty();
    imageUrl = [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9ZZODgBDQ6v5ZONYYah7R4Ci02hMl-bd9wTky5V9ypka-MCPI",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fst3.depositphotos.com%2F1518767%2F14365%2Fi%2F950%2Fdepositphotos_143650817-stock-photo-portrait-of-smiling-factory-worker.jpg&f=1&nofb=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F5FY21GJzoXQ%2Fmaxresdefault.jpg&f=1&nofb=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hantover.com%2Fdatasurge%2Fimg%2Fimages%2F102001_Primary_Image_1.jpg&f=1&nofb=1",
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fsafetysunglasses.com%2Fwp-content%2Fuploads%2F2011%2F07%2Fconstruction-worker-with-safety-glasses.jpg&f=1&nofb=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.prlog.org%2F10179643-excimer-argon-co2-laser-safety-glasses-and-goggles-fit-over-universal-fit.jpg&f=1&nofb=1",
      "https://www.irishtimes.com/polopoly_fs/1.3828854!/image/image.jpg_gen/derivatives/landscape_620/image.jpg",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.webstaurantstore.com%2Fimages%2Fproducts%2Fextra_large%2F28719%2F1103375.jpg&f=1&nofb=1",
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic8.depositphotos.com%2F1465849%2F950%2Fi%2F950%2Fdepositphotos_9501390-stock-photo-construction-worker.jpg&f=1&nofb=1",
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fsafetyandhealthmagazine.com%2Fext%2Fresources%2Fimages%2Fnews%2Fconstruction%2Ffemale-construction-worker.jpg%3Fheight%3D635%26t%3D1515620680%26width%3D1200&f=1&nofb=1"
    ];
    console.log(imageUrl);
    drawScreen();
  });

  //Giphy API
  function giphyCall(pass, index) {
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      pass +
      "&api_key=C01R2xURFqCz6oEkz89pIqaDGFPgxD4N&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var random = Math.floor(Math.random() * 10);
      console.log(response.data[0].images.fixed_height.url);
      var gif = response.data[random].images.fixed_height.url;
      let html = `<img class="responsive-img" id="text" src="${gif}"></img>`;
      console.log(html);
      // $(pass).append(html);
      $(".imgDiv" + index).append(html);
    });
  }
});
