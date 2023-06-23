import { useContext, useState } from 'react';
import { AppContext } from './App';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

function Movie({ dataToUse }) {
  const { data, TRAILER, IMGPATH, setFavorites, favorites, notify } =
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
    notify('success', title);
    const newMovie = { id, title, poster_path, vote_average, overview };
    setFavorites((prevFavorites) => [...prevFavorites, newMovie]);
    localStorage.setItem('favorites', JSON.stringify([...favorites, newMovie]));
  }

  function removeFromFavorites(id, title) {
    notify('deleted', title);
    const newList = favorites.filter((movie) => movie.id !== id);
    setFavorites(newList);
    localStorage.setItem('favorites', JSON.stringify(newList));
  }

  return (
    <div className="movies-container">
      {dataToUse.map(({ id, title, poster_path, vote_average, overview }) => {
        const isSelected = id === selectedMovieId;
        const isFavorite = favorites.some((movie) => movie.id === id);

        return (
          <div className="movie" key={id}>
            <a href={TRAILER + title + ' trailer'} target="_blank">
              <img src={IMGPATH + poster_path} alt={title} />
            </a>
            <div className="title">
              {!isSelected ? (
                <>
                  <div className="title-button">
                    <h4>{title}</h4>
                    <button
                      className="info-btn"
                      onClick={() => handleClick(id)}
                    >
                      More Info
                    </button>
                  </div>
                  <span style={{ color: getColor(vote_average) }}>
                    {vote_average.toFixed(1)}{' '}
                    <i className="fa-solid fa-star"></i>
                  </span>
                </>
              ) : (
                <div className="no-select">
                  Movie Overview: <p>{overview}</p>
                  <button className="info-btn" onClick={() => handleClick(id)}>
                    Less Info
                  </button>
                </div>
              )}
            </div>
            {isFavorite ? (
              <button
                className="btn"
                onClick={() => removeFromFavorites(id, title)}
              >
                <AiFillHeart />
              </button>
            ) : (
              <button
                className="btn"
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
