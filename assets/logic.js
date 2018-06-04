

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD3Vnqo_aXGaNVJOan0r0i0bQduGrwiC54",
    authDomain: "train-times-hw.firebaseapp.com",
    databaseURL: "https://train-times-hw.firebaseio.com",
    projectId: "train-times-hw",
    storageBucket: "train-times-hw.appspot.com",
    messagingSenderId: "586662559733"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //add trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainStart = moment.utc($("#start-time-input").val().trim(), "HH:mm").format("HH:mm");
    var trainFreq = parseInt($("#frequency-input").val().trim());
    
    var newTrain = {
      name: trainName,
      destination: trainDest,
      start: trainStart,
      frequency: trainFreq
    };

    database.ref().push(newTrain);

    console.log(newTrain.start);

    // alert("New train added!");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-time-input").val("");
    $("#frequency-input").val("");
  });

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
console.log("childSnapshot: " + childSnapshot.val());

var trainName = childSnapshot.val().name;
var trainDest = childSnapshot.val().destination;
var trainStart = childSnapshot.val().start;
var trainFreq = childSnapshot.val().frequency;


console.log("Child variables:" + trainName, trainDest, trainStart, trainFreq);

var sinceLastTrain = (moment().diff(trainStart, 'minutes')) % trainFreq;

var tilNextTrain = trainFreq - sinceLastTrain;

var nextTrain = moment().add(tilNextTrain, 'minutes').format("HH:mm")

$("#trains-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextTrain + "</td><td>" + tilNextTrain + "</td></tr>");

  });