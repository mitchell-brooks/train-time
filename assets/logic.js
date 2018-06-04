

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
    var trainFreq = $("#frequency-input").val().trim();
    
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

var trainName = childSnapshot.val().name;
var trainDest = childSnapshot.val().destination;
var trainStart = childSnapshot.val().start;
var trainFreq = childSnapshot.val().frequency;

var sinceStart = (moment().diff(moment(trainStart, "HH:mm"), 'minutes'))
console.log("trainstart: " + trainStart)
console.log("sincestart: " + sinceStart)

var sinceLastTrain = sinceStart % trainFreq;
console.log("since: " + sinceLastTrain)

var tilNextTrain = trainFreq - sinceLastTrain;
console.log("til: " + tilNextTrain)

var nextTrain = moment().add(tilNextTrain, "minutes").format("HH:mm A");
console.log("next: " + nextTrain)

$("#trains-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextTrain + "</td><td>" + tilNextTrain + "</td></tr>");

  });