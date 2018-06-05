//Module 
var angularApp = angular.module('angularApp', []);

//Controllers
angularApp.controller('mainController', ['$scope' ,'$http', '$timeout','$window', function($scope, $http, $timeout,$window){

    var APIURL = "https://us-central1-quoteme-8c1dd.cloudfunctions.net/giveMeQuote"
    // var APIURL = 'http://localhost:8080'

    $scope.txt = 'Marvel Cinematic Universe-Loading';
    $scope.author = '';

    // var endTime = 1528237800000;
    var endTime = 0;
    $scope.hours = '00';
    $scope.mins = '00';
    $scope.secs = '00';
    $scope.timerOn = true;

    $scope.teamSelected = function(teamIndex) {
        // var team = $scope.teams[teamIndex];
    };

    $scope.isKnobMove = false;      

    $(window).on('mouseup',function(){  
        console.log('Mouse Up');
        $scope.isKnobMove = false;      
        $scope.knobHold = false;
        $scope.knobAngle = -45;
        $('#handle').css('transform',"translateX(-50%) rotate(" + $scope.knobAngle + "deg)");
    });

    $(window).on('mousemove',function(event){        
        if($scope.knobHold && $scope.knobAngle <=45){
            $scope.isKnobMove = true;
    //    var target = $scope('#handle');
            $scope.knobAngle += 5;
            $('#handle').css('transform',"translateX(-50%) rotate(" + $scope.knobAngle + "deg)");
            // if($scope.mouseY <= event.pageY && (event.pageY - $scope.mouseY) >){
            //     console.log('kela erankuthu');
            // }
        }
       
    });

    $scope.knobAngle = -45;

    $scope.knobHold = false;

    $scope.mouseY = -1;

    $scope.knobClick = function(event,hold){
        console.log(event);
        $scope.knobHold = hold;
        if(hold){
            $scope.mouseY = event.pageY;
        }        
        if(!hold){
            var target = event.target;
            $scope.knobAngle = -45;
            target.parentElement.style.transform = "translateX(-50%) rotate(" + $scope.knobAngle + "deg)";
        }
    }

    $scope.knobMove = function(event){
        if($scope.knobHold){
            // console.log(event);
            var target = event.target;
            $scope.knobAngle += 5;
            target.parentElement.style.transform = "translateX(-50%) rotate(" + $scope.knobAngle + "deg)";
        }
    }

    $scope.countdown = function() {
        var time = (new Date()).getTime();
        if(time < endTime) {
            var milliseconds = endTime - time;
            var timeout = milliseconds % 1000;
            var seconds = parseInt(milliseconds / 1000);
            $scope.secs = (seconds % 60).toString();
            $scope.secs = ($scope.secs.length === 1 ?  '0' : '') + $scope.secs;
            var mins = parseInt(seconds / 60);
            $scope.mins = (mins % 60).toString();
            $scope.mins = ($scope.mins.length === 1 ?  '0' : '') + $scope.mins;
            $scope.hours = (parseInt(mins / 60)).toString();
            $scope.hours = ($scope.hours.length === 1 ?  '0' : '') + $scope.hours;
            console.log(1528237800000, time, milliseconds, timeout, seconds, $scope.secs, mins, $scope.mins, $scope.hours);
            $timeout($scope.countdown, timeout);
        } else {
            $scope.timerOn = false;
        }
    };

    $scope.countdown();

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


