Laid Back VJ
============
> Watch all your favorite music videos that you didn't know existed

# Idea
* I listen to a lot more music than I watch music videos, but sometimes I want
to watch music videos but it's hard to find my favorite songs music videos
* Using a few different sources (lastfm, spotify) do a look up on Youtube
and queue up a bunch of videos to watch

# Routes
* `/lastfm/:userid/year`: show users videos from the past year
* `/lastfm/:userid/month`: show users videos from the past month
* `/lastfm/:userid/recent`: show users most recent videos
* `/lastfm/:userid/artists/week`: show videos from your favorite artist from the past week
* `/lastfm/:userid/artists/month`: show videos from your favorite artist from the past month
* `/lastfm/:userid/artists/three-month`: show videos from your favorite artist from the past three months
* `/lastfm/:userid/artists/year`: show videos from your favorite artist from the past year
* `/lastfm/:userid/recommended`: show users recommended videos based on their history
* `/lastfm/:userid/friends-videos`: show the user's friends videos
* `/lastfm/:userid`: show the users videos using all of their history

## Internal
* `/api/lastfm/user/:userId/`: JSON response of the users lastfm data
* `/api/lastfm/friends/:userId/`: JSON response of the user's friends


# Roadmap
* Integrate LastFm initially
* Spotify after

# Future Ideas
* Make categories of music videos to choose from based on your library
* Based on popularity, rare videos -- based on scrobbles or youtube watches?
* Genres
* Last month scrobble videos
* Last year scrobbles

# APIS
* [Lastfm](https://www.last.fm/api)
* [Spotify](https://developer.spotify.com/web-api/)

## Spotify API Endpoints
* https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/
* https://developer.spotify.com/web-api/get-users-saved-tracks/
* https://developer.spotify.com/web-api/get-list-new-releases/
* https://developer.spotify.com/web-api/library-endpoints/
* https://developer.spotify.com/web-api/track-endpoints/

# Resources
* [Playlistbuddy](http://www.playlistbuddy.com/) allows you to make youtube playlists
from a Spotify playlist
* Prioritize Vevo videos [SO](https://stackoverflow.com/questions/29369368/youtube-api-search-vevo-video-in-priority)
* Create youtube playlists on the fly [link](https://www.labnol.org/internet/create-youtube-playlists/28827/)
* [Youtube Iframe events](https://developers.google.com/youtube/iframe_api_reference#Events)

# Inspiration
* Shout out to [Shelby.tv](http://shelby.tv/)

# Todos
* ~~Typescript to check all files, fe and be~~
* ~~Webpack to pack frontend files and backend files to behave as normal~~
* ~~Make spotify and lastfm images smaller~~
* On initial page load make experience so user can authenticate via lastfm or
Spotiy or just watch the most recently released music videos
https://github.com/farzaa/Spotify-Login-Button-
