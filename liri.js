//require necessary modules
require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var moment = require("moment");

//Create commands and parameters
var command=process.argv[2];
  console.log(command);

var name="";

for (i = 3; i < process.argv.length; i++) {
  if (i > 3) {
      name = name + "+" + process.argv[i];
  } else {
      name = process.argv[i];
  }
}

//Use switch to assign commands and functions
switch(command){
  case  "concert-this":
  concertThis(name);
  break;
  case "spotify-this-song":
        spotifySong(name);
  break;
  case  "movie-this":
        omdbData(name);
  break;
  case  "do-what-it-says":
        doThing(name);
  break;
  default:
    console.log("{Please enter a command: spotify-this-song, movie-this, concert-this, or do-what-it-says}");
  break;
}

// divider will be used as a spacer between the data we print in log.txt
  var divider = "\n------------------------------------------------------------\n\n";

//Run a request with axios to the Bands In Town api to get the venue name, location, and date of an artist's upcoming concerts
function concertThis(name){
  if (name===""){
    name="John Mayer";
  }
  axios.get("https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp").then(
  function(response){

//Assign a variable to the response data

    var jsonData = response.data[0];

//Assign the jsonData variable to an array of the data
    var showData = [
      "Artist Name: " + jsonData.lineup[0],
      "Venue: " + jsonData.venue.name,
      "Location: " + jsonData.venue.city + ", " + jsonData.venue.region + ", " + jsonData.venue.country,
      "Date: " + moment(jsonData.datetime).format("MM/DD/YYYY")
    ].join("\n\n");

//Use fs npm to append data to "log.txt"
    fs.appendFile("log.txt", showData + divider, (err) => {
      if (err) throw err;
      console.log(showData);
    });
    }
  )}


//Run a request using spotify search api to get an artist name and song from the Spotify NPM
function spotifySong(name){
  if (name===""){
    name="The Sign Ace of Base";
  }
  spotify.search({ type: 'track', query: name }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
//Assign a variable to the response data
    var jsonData2 = data.tracks.items[0];

//Assign the jsonData2 variable to an array of the data
    var tracksData = [
      "Artist: " + jsonData2.album.artists[0].name,
      "Song Name: " + jsonData2.name,
      "Song Preview: " + jsonData2.preview_url,
      "Album: " + jsonData2.album.name,
    ].join("\n\n");

//Use fs npm to append data to "log.txt"
    fs.appendFile("log.txt", tracksData + divider, (err) => {
      if (err) throw err;
      console.log(tracksData);
    });
  } 
)}


// Run a request with axios to the OMDB API with the movie specified at http://www.omdbapi.com/?i=tt3896198 to get the 
  //movie title, year, imdb rating, rotten tomatoes rating, country, language, plot, and actors

  function omdbData(movie){
    if (movie===""){
      movie="Mr Nobody";
      console.log("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/ It's on Netflix!");
    } else {
      movie=movie;
    }
      
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
      console.log(queryUrl);
    axios.get(queryUrl).then(
    function(response){

//Assign a variable to the response data
      var jsonData3 = response.data;

//Assign the jsonData3 variable to an array of the data
      var movieData = [
        "Title: " + jsonData3.Title,
        "Year: " + jsonData3.Year,
        "Rating: " + jsonData3.imdbRating,
        "Rotten Tomatoes Rating: " + jsonData3.Ratings[1].Value,
        "Country: " + jsonData3.Country,
        "Language: " + jsonData3.Language,
        "Plot: " + jsonData3.Plot,
        "Actors: " + jsonData3.Actors,
      ].join("\n\n");

//Use fs npm to append data to "log.txt"
      fs.appendFile("log.txt", movieData + divider, (err) => {
        if (err) throw err;
        console.log(movieData);
      });
  }
)}


//  Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//  It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

function doThing() {
  fs.readFile('random.txt', 'utf8', function(error, data) {
      if (error) {
          console.log(error);
      } else {
          var dataArr = data.split(',');
          if (dataArr[0] === 'spotify-this-song') {
              spotifySong(dataArr[1]);
//Use fs npm to append data to "log.txt"
          fs.appendFile("log.txt", dataArr + divider, (err) => {
            if (err) throw err;
            console.log(dataArr);
          });
         }
      }
  });
};