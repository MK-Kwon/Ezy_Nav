//Function will run when DOM is fully ready
$(document).ready(function () {
    var config = {
      apiKey: "AIzaSyBhM4tKECBXqDvezLnj3yDIYDJDxQlDqR4",
      authDomain: "ezynav-database.firebaseapp.com",
      databaseURL: "https://ezynav.firebaseio.com",
      projectId: "ezynav",
      storageBucket: "ezynav.appspot.com",
      messagingSenderId: "284500898475"
    };
    // Initialise Firebase
    firebase.initializeApp(config);
    
    var database = firebase.database();
  
    var mode = "";
  
    $(document).on("click", "#car", function () {
      mode = "car";
    });
  
    $(document).on("click", "#bus", function () {
      mode = "bus";
    });
    
    $(document).on("click", "#submit-button", function () {
      var fromStreet = $("#a-street").val();
      var fromCity = $("#a-city").val();
      var fromState = $("#a-state").val();
      var fromZipCode = $("#a-zip").val();
      var toStreet = $("#b-street").val();
      var toCity = $("#b-city").val();
      var toState = $("#b-state").val();
      var toZipCode = $("#b-zip").val();
      var fromAddressString = fromStreet + " " + fromCity + " " + fromState + " " + fromZipCode;
      var toAddressString = toStreet + " " + toCity + " " + toState + " " + toZipCode;
  
      if (fromCity == "" || toCity == "" || fromCity == "Specify City" || toCity == "Specify City") {
        $("#aa-city").text("Specify City!");
        $("#bb-city").text("Specify City!");
      } else {
        getWeather(fromCity, toCity);
        runFirebase(database);
        getLatAndLongForToAndFrom(fromAddressString, toAddressString, mode);
      };
  
    });
  });