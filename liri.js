// require("dotenv").confnig();
var axios = require("axios");
var keys = require("./keys.js");
var spotify = require("spotify");
var request = require("request")
var fs = require("fs")
// 9. Make it so liri.js can take in one of the following commands:

//    * `concert-this`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`

// ### What Each Command Should Do

// 1. `node liri.js concert-this <artist/band name here>`

var nodeArgv=process.argv;
var command=process.argv[2];

var a = "";

for(var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    a = a + "+" + nodeArgv[i];
  } else{
      a = a + nodeArgv[i];
  }
}


switch(command){
  case "spotify-this-song":
    if(a){
      spotifySong(a);
    } else {
      spotifySong("The Sign");
    }
  break;

  case "movie-this":
    if(a){
      omdbData(a)
    } else{
      omdbData("Mr. Nobody")
    }
    break;
    case "do-what-it-says":
    doThing();
  break;

  default:
    console.log("{Please enter a command: spotify-this-song, movie-this, do-what-it-says}");
  break;
}

//    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

//      * Name of the venue

//      * Venue location

//      * Date of the Event (use moment to format this as "MM/DD/YYYY")

//      What was the trick we went over in class to get arrays/objects to display cleanly 
//         (or as clean as possible) in terminal?
//      JSON.stringify(obj, null, 2);

// 2. `node liri.js spotify-this-song '<song name here>'`
// http://open.spotify.com/track/6rqhFgbbKwnb9MLmUQDhG6

//    * This will show the following information about the song in your terminal/bash window

//      * Artist(s)

//      * The song's name

// Then run a request with axios to the OMDB API with the movie specifiedttp://www.omdbapi.com/?i=tt3896198
function omdbData(movie){
  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';

  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode == 200) {
      var body = JSON.parse(body);
      // var queryUrl = "http://www.omdbapi.com/i=tt3896198" + movieName + "&apikey=ea24388d";

    console.log("Title: " + body.Title)
    console.log("Year: " + body.Year);
    console.log("Rating: " + body.Rating);
    console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
    console.log("Country: " + body.Country);
    console.log("Language: " + body.Language);
    console.log("Plot: " + body.Plot);
    console.log("Actors: " + body.Actors);
    } else{
    console.log('Error occurred.')
    }
    if(movie === "Mr. Nobody"){
      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");
    }
  })
};

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

//      * It's on Netflix!

//    * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.