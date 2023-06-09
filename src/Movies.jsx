import { useEffect, useState } from 'react';
import Axios from 'axios';
import getData from './Api';
import Movie from './Movie';

const TRAILER = 'https://www.youtube.com/results?search_query=';
const APIURL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

function Movies() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData(APIURL)
      .then((movieData) => {
        setData(movieData);
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
      });
  }, []);

  return (
    <>
      <Movie data={data} TRAILER={TRAILER} IMGPATH={IMGPATH} />
    </>
  );
}
export default Movies;
