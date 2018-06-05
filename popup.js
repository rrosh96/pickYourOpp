//Module 
var angularApp = angular.module('angularApp', []);

//Controllers
angularApp.controller('mainController', ['$scope' ,'$http', function($scope, $http){

    var APIURL = "https://us-central1-quoteme-8c1dd.cloudfunctions.net/giveMeQuote"
    // var APIURL = 'http://localhost:8080'

    $scope.txt = 'Marvel Cinematic Universe-Loading';
    $scope.author = ''

    // $http.get(APIURL, function(response){
    //     console.log(response);
    //     // $scope.txt = response.toString();
    // }, function(err){
    //     console.info(err);
    // })
    $http.get(APIURL)
    .then(function(response){
        console.log(response);
        $scope.txt = response.data.quote;
        $scope.author = response.data.author;
    })
    .catch(function(err){
        console.log(err);
    })

    
    // var firebase = require('firebase');
    // // Set the configuration for your app
    // // TODO: Replace with your project's config object
    // var config = {
    //     apiKey: "AIzaSyC3o9Q8HOCisn6meSDbmyJPp2CYgkiAYKE",
    //     authDomain: "quoteme-8c1dd.firebaseapp.com",
    //     databaseURL: "https://quoteme-8c1dd.firebaseio.com",
    // };

    // firebase.initializeApp(config);

    // // Get a reference to the database service
    // var database = firebase.database();
    // // console.log(database);

    // database.ref('/0/').once('value').then(function(snapshot){
    //     if(snapshot){
    //         console.log("snapshot:", snapshot.val());
    //         $scope.txt = snapshot.val().quote,
    //         $scope.txt = snapshot.val().author;      
    //     } else {
    //         console.log("Error retrieving data");
    //     }
    // }).catch(function(err){
    //     console.log(err);

    // })

}]);


