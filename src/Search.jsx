import { useEffect, useState } from 'react';
import Movie from './Movies';
import getData from './Api';

const SEARCHAPI =
  'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieData, setMovieData] = useState([]);

  function handleForm(e) {
    e.preventDefault();
    getData(SEARCHAPI + searchTerm)
      .then((movieData) => {
        setMovieData(movieData);
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
      });
    console.log(movieData);
  }

  return (
    <>
      <form onSubmit={(e) => handleForm(e)}>
        <input
          type="text"
          className="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Movies"
          autoComplete="off"
        />
      </form>
    </>
  );
}
export default Search;
