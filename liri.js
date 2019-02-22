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
var name=process.argv.slice(3).join(" ");
console.log(command);
console.log(name);

//Use switch to assign commands and functions
switch(command){
  case "spotify-this-song":
          spotifySong(name);
  break;
  case "movie-this":
          omdbData(name);
    break;
    case "do-what-it-says":
          doThing(name);
  break;
  case "concert-this":
          concertThis(name);
  default:
    console.log("{Please enter a command: spotify-this-song, movie-this, do-what-it-says}");
  break;
}

//Run a request using spotify search api to get an artist name and song
function spotifySong(name){
  spotify.search({ type: 'track', query: name }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("Artist: " + data.tracks.items[0].album.artists[0].name)
    console.log("Song Name: " + data.tracks.items[0].name)
  });
}

//Run a request with axios to the Bands In Town api to get the venue name, location, and date of an artist's upcoming concerts
function concertThis(name){
  if (name===""){
    name="John Mayer";
  }
  axios.get("https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp").then(
  function(response){
    console.log("Venue: " + response.data[0].venue.name);
    console.log("Location: " + response.data[0].venue.city + ", " 
      + response.data[0].venue.region + ", " + response.data[0].venue.country);
    console.log("Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
  });
}

// Run a request with axios to the OMDB API with the movie specified at http://www.omdbapi.com/?i=tt3896198 to get the 
  //movie title, year, imdb rating, rotten tomatoes rating, country, language, plot, and actors

function omdbData(movie){
  if (movie===""){
    movie="Mr Nobody" + "If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/" + 
    "It's on Netflix!";
  }
  axios.get("http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy").then(
  function(response){
    console.log(response.data);
    console.log("Title: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    
  });
}

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
          }
      }
  });
}