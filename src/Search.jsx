import { useContext } from 'react';
import { AppContext } from './App';

function Search() {
  const {
    inputRef,
    fetchData,
    SEARCHAPI,
    setShowFavorites,
    showShows,
    showFavorites,
  } = useContext(AppContext);

  function handleForm(e) {
    e.preventDefault();
    setShowFavorites(false);
    if (!showShows) {
      const url = inputRef.current && SEARCHAPI + inputRef.current.value;
      fetchData(url);
    } else if (showShows) {
      const url =
        inputRef.current &&
        `https://api.themoviedb.org/3/search/tv?&api_key=04c35731a5ee918f014970082a0088b1&query=` +
          inputRef.current.value;
      fetchData(url);
    }
    inputRef.current.value = '';
  }

  return (
    <>
      {!showFavorites && (
        <form onSubmit={(e) => handleForm(e)}>
          <input
            type="text"
            className="search"
            ref={inputRef}
            placeholder={showShows ? 'Search Shows' : 'Search Movies'}
            autoComplete="off"
          />
        </form>
      )}
    </>
  );
}
export default Search;
