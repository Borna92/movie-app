import { useState, useContext } from 'react';
import { AppContext } from './App';

function Search() {
  const [term, setTerm] = useState('');
  const { setSearchTerm } = useContext(AppContext);

  function handleForm(e) {
    e.preventDefault();
    setSearchTerm(term);
  }

  return (
    <>
      <form onSubmit={(e) => handleForm(e)}>
        <input
          type="text"
          className="search"
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Movies"
          autoComplete="off"
        />
      </form>
    </>
  );
}
export default Search;
