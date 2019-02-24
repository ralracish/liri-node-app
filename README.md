# LIRI Bot

## Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

### What Liri Does

LIRI searches Spotify for songs, Bands in Town for concerts, and OMDB for movies.

### How to Use Liri
LIRI is powered using the following:

1. `Axios` NPM package
     Used to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
2. `Node-Spotify-API` NPM package
3. `Moment` NPM package
4.  `DotEnv` NPM package (to hold Spotify keys)

#### Liri Commands
To run a command in Liri, you must open terminal and type "node liri.js *command* *search term*".

Following are possible commands:

1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then the program will default to "The Sign" by Ace of Base.

   * To run Liri Bot, you will need to create your own file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:

    ```js
    # Spotify API keys

    SPOTIFY_ID=your-spotify-id
    SPOTIFY_SECRET=your-spotify-secret

    ```

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the you don't type a movie in, the program will output data for the movie 'Mr. Nobody.'

     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

     * It's on Netflix!

4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It currently runs `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.  `Random.txt` can be modified to run the other commands as you wish.

### Logging to File

* In addition to logging the data to my terminal/bash window, I have output the data to a .txt file called `log.txt`.