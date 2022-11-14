const tmdbKey = '9f1f4d2bd4aa534e825c916941c58334';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list'
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`
  try{
    const response = await fetch(urlToFetch, {cache: 'no-cache'})
    if(response.ok){
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      const genres = jsonResponse.genres
      console.log(genres)
      return genres
    }
    throw new Error('Request Failed!')

  } catch(error){
    console.log(error)
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie'
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`

  try{
    const response = await fetch(urlToFetch, {cache:
    'no-cache'})
    if(response.ok){
      const jsonResponse = await response.json()
      const movies = await jsonResponse.results
      console.log(jsonResponse)
      console.log(movies)
      return movies
    }
    throw new Error('Response failed!')
  } catch(error){
    console.log(error)
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id
  const movieEndpoint = `/movie/${movieId}`
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`

  try{
    const response = await fetch(urlToFetch, {cache: 'no-cache'})
    if(response.ok){
      const movieInfo = await response.json()
      return movieInfo
    }
    throw new Error('Request failed!')
   } catch(error){
    console.log(error)
  }

};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

  const movies = await getMovies()
  const randomMovie = getRandomMovie(movies)
  const info = await getMovieInfo(randomMovie)
  
  displayMovie(info)
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;