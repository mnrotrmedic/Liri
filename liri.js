require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const dotenv = require("dotenv");
const moment = require("moment");
var Spotify = require("node-spotify-api");
const inquirer = require('inquirer');
const fs = require("fs");



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
      if (choice === "Concerts") {
        bandsInTown();
      }
      else if (choice === "Spotify") {
        spotifySearch();
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
    ]).then(function (doneResponse) {
      if (doneResponse.confirm) {
        // console.log("true")
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
  ]).then(function (movieResponse) {
    axios.get("http://www.omdbapi.com/?t=" + movieResponse.movieInput + "&y=&plot=short&apikey=trilogy")
      .then(function (response) {
        console.log(">>>>-----------------------------------------------------------------------------------------------------------------");
        console.log("Here's info on " + response.data.Title)
        console.log("Released: " + response.data.Released);
        console.log("IMDB gave it a score of: " + response.data.imdbRating);
        console.log("Rotten Tomatoes gave it a score of: " + response.data.Ratings[1].Value);
        console.log("Produced in:  " + response.data.Country);
        console.log("Language:  " + response.data.Language);
        console.log("Actors:  " + response.data.Actors);
        console.log("Plot > > > > > > > > > > > > > > > > > > > > >");
        console.log(response.data.Plot);
        console.log(">>>>-----------------------------------------------------------------------------------------------------------------");

        setTimeout(function () {
          doneFunction();
        }, 1000);
      });
  });
}

function bandsInTown() {
  inquirer.prompt([
    {
      type: "input",
      message: "What band or artist would you like to see?",
      name: "artist",
    }
  ]).then(function (bandResponse) {
    axios.get("https://rest.bandsintown.com/artists/" + bandResponse.artist + "/events?app_id=codingbootcamp")
      .then(function (bandResponse) {
        console.log(">>>>-----------------------------------------------------------------------------------------------------------------");
        console.log(bandResponse.data[1].lineup[0] + "'s next concert is at: " + bandResponse.data[1].venue.name);
        console.log("in: " + bandResponse.data[1].venue.city + ", " + bandResponse.data[1].venue.region);
        console.log("on: " + moment(bandResponse.data[1].datetime).format('dddd, MMMM Do YYYY')
          + " at " + moment(bandResponse.data[1].datetime).format('h:mm a'));
        console.log("You should go!")
        console.log(">>>>-----------------------------------------------------------------------------------------------------------------");
        setTimeout(function () {
          doneFunction();
        }, 1000);
      });
  });
};

function spotifySearch() {
  inquirer.prompt([
    {
      type: "input",
      message: "What song would you like to check on Spotify?",
      name: "spotSong",
    }
  ]).then(function (spotifyResponse) {
    var spotify = new Spotify(keys.spotify);
    spotify
      .search({ type: 'track', query: spotifyResponse.spotSong, limit: 10 })
      .then(function (response) {
        console.log(">>>>-----------------------------------------------------------------------------------------------------------------")
        for (i = 0; i < response.tracks.items.length; i++) {
          console.log('"' + response.tracks.items[i].name + '" by: ' + response.tracks.items[i].artists[0].name);
          console.log("It was released on the album " + '"' + response.tracks.items[i].album.name + '"');
          console.log("Check it out here: " + response.tracks.items[i].external_urls.spotify);
          console.log(">>>>-----------------------------------------------------------------------------------------------------------------")
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  })
}