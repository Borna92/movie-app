import { useContext, useState } from 'react';
import { AppContext } from './App';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

function Movie() {
  const { data, TRAILER, IMGPATH, setFavorites, favorites } =
    useContext(AppContext);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  function getColor(average) {
    if (average > 7) {
      return 'green';
    } else if (average < 5) {
      return 'red';
    } else {
      return 'yellow';
    }
  }

  function handleClick(movieId) {
    if (selectedMovieId === movieId) {
      setSelectedMovieId(null);
    } else {
      setSelectedMovieId(movieId);
    }
  }

  function addToFavorites(id, title, poster_path, vote_average, overview) {
    const newMovie = { id, title, poster_path, vote_average, overview };
    setFavorites((prevFavorites) => [...prevFavorites, newMovie]);
    localStorage.setItem('favorites', JSON.stringify([...favorites, newMovie]));
  }

  function removeFromFavorites(id) {
    const newList = favorites.filter((movie) => movie.id !== id);
    setFavorites(newList);
    localStorage.setItem('favorites', JSON.stringify(newList));
  }

  return (
    <div className="movies-container">
      {data.map(({ id, title, poster_path, vote_average, overview }) => {
        const isSelected = id === selectedMovieId;
        const isFavorite = favorites.some((movie) => movie.id === id);

        return (
          <div className="movie" key={id}>
            <a href={TRAILER + title + ' trailer'} target="_blank">
              <img src={IMGPATH + poster_path} alt={title} />
            </a>
            <div className="title" onClick={() => handleClick(id)}>
              {!isSelected ? (
                <>
                  <h4>{title}</h4>
                  <span style={{ color: getColor(vote_average) }}>
                    {vote_average.toFixed(1)}{' '}
                    <i className="fa-solid fa-star"></i>
                  </span>
                </>
              ) : (
                <div className="no-select">
                  Movie Overview: <p>{overview}</p>
                </div>
              )}
            </div>
            {isFavorite ? (
              <button onClick={() => removeFromFavorites(id)}>
                <AiFillHeart />
              </button>
            ) : (
              <button
                onClick={() =>
                  addToFavorites(id, title, poster_path, vote_average, overview)
                }
              >
                <AiOutlineHeart />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
export default Movie;
