require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const dotenv = require("dotenv");
const moment = require("moment");
const spotify = require("node-spotify-api");
const inquirer = require('inquirer');
const fs = require("fs");


// spotify = new Spotify(keys.spotify);

function mainFunction() {
  inquirer
    .prompt([
      //Pick Liri call
      {
        type: "list",
        message: "Which Liri feature would you like to use?",
        choices: ["Concerts", "Spotify", "Movies", "Random Awesomeness"],
        name: "liriChoice"
      },
    ])
    .then(function (featureResponse) {
      let choice = featureResponse.liriChoice;
      console.log(choice)
      if (console.log(choice === "Concerts")) {
        console.log("Choice is Concerts")
        doneFunction();
      }
      else if (choice === "Spotify") {
        console.log("Choice is Spotify")
        doneFunction();
      }
      else if (choice === "Movies") {
        movieRequest();
      }
      else if (choice === "Random Awesomeness") {
        console.log("You've chosen `Random Awesomeness`")
        doneFunction();
      }
    });
};

mainFunction(); //Main program, runs function above. 

function doneFunction() {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Is there anything else you'd like me to check?:",
        name: "confirm",
        default: true
      }
    ])
    .then(function (doneResponse) {
      if (doneResponse.confirm) {
        console.log("true")
        mainFunction(); //Calls initial Inquirer questions again
      }
      else {
        console.log("Have a great day!")
      }
    });
};

function movieRequest() {
  inquirer.prompt([
    {
      type: "input",
      message: "What movie would you like to search?",
      name: "movieInput",
    }
  ])
    .then(function (movieResponse) {
      axios.get("http://www.omdbapi.com/?t=" + movieResponse.movieInput + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
          // console.log("The movie's rating is: " + response.data.imdbRating);
          console.log("Here's info on " + response.data.Title + " ------------------>>>")
          // console.log('/n' + response.data.title);
          console.log("Released: " + response.data.Released);
          console.log("It's rated: " + response.data.imdbRating);
          console.log("Rotten Tomatoes gave it a score of: " + response.data.Ratings.Source[1]);
          // console.log(response.data);
        }
      );
    });
}