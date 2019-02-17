require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const dotenv = require("dotenv");
const moment = require("moment");
const spotify = require("node-spotify-api");
const inquirer = require('inquirer');
const fs = require("fs");


spotify = new Spotify(keys.spotify);



