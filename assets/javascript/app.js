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

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://faceplusplus-faceplusplus.p.rapidapi.com/facepp/v3/detect?return_attributes=hat%252C%20glasses&image_url=https%253A%252F%252Fcnet3.cbsistatic.com%252Fimg%252Fgk7d6AQXuqmtPNmnZI2gMaNySyA%253D%252F970x0%252F2018%252F09%252F05%252F7274da05-85a9-4646-b41f-a4b22c597507%252Fcaptain-marvel-brie-larson-1.jpg",
    "method": "POST",
    "headers": {
        "x-rapidapi-host": "faceplusplus-faceplusplus.p.rapidapi.com",
        "x-rapidapi-key": "d91fdc82admsh973e6e584b03779p178c1ajsn4063b76d234e",
        "content-type": "application/x-www-form-urlencoded"
    },
    "data": {}
}
$.ajax(settings).done(function(response) {
    console.log(response);
});