import React, { useContext } from 'react';
import { AppContext } from './App';
import Movie from './Movie';

function FavoritesPage() {
  const { favorites } = useContext(AppContext);
  console.log(favorites);

  return (
    <div>
      <h2>Your favorite movies:</h2>
      {favorites.length > 0 ? (
        <Movie data={favorites} />
      ) : (
        <h2>No favorite movies found.</h2>
      )}
    </div>
  );
}

export default FavoritesPage;
