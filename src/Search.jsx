import { useContext } from 'react';
import { AppContext } from './App';

function Search() {
  const { inputRef, fetchData, SEARCHAPI } = useContext(AppContext);

  function handleForm(e) {
    e.preventDefault();
    const url = inputRef.current && SEARCHAPI + inputRef.current.value;
    fetchData(url);
  }

  return (
    <>
      <form onSubmit={(e) => handleForm(e)}>
        <input
          type="text"
          className="search"
          ref={inputRef}
          placeholder="Search Movies"
          autoComplete="off"
        />
      </form>
    </>
  );
}
export default Search;
