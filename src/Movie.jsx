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

  if (data.length === 0) {
    return <h1>No movies or shows found</h1>;
  }

  return (
    <div className="movies-container">
      {dataToUse.map(
        ({ id, title, name, poster_path, vote_average, overview }) => {
          const isSelected = id === selectedMovieId;
          const isFavorite = favorites.some((movie) => movie.id === id);
          const movieTitle = title || name;

          return (
            <div className="movie" key={id}>
              <a href={TRAILER + movieTitle + ' trailer'} target="_blank">
                <img
                  src={
                    poster_path
                      ? IMGPATH + poster_path
                      : 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg'
                  }
                  alt={movieTitle}
                />
              </a>
              <div className="title">
                {!isSelected ? (
                  <>
                    <div className="title-button">
                      <h4>{movieTitle}</h4>
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
                    Overview: <p>{overview}</p>
                    <button
                      className="info-btn"
                      onClick={() => handleClick(id)}
                    >
                      Less Info
                    </button>
                  </div>
                )}
              </div>
              {isFavorite ? (
                <button
                  className="btn"
                  onClick={() => removeFromFavorites(id, movieTitle)}
                >
                  <AiFillHeart />
                </button>
              ) : (
                <button
                  className="btn"
                  onClick={() =>
                    addToFavorites(
                      id,
                      movieTitle,
                      poster_path,
                      vote_average,
                      overview
                    )
                  }
                >
                  <AiOutlineHeart />
                </button>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}
export default Movie;
