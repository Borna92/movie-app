import Search from './Search';
import { AiFillHome, AiFillHeart } from 'react-icons/ai';
import { AppContext } from './App';
import { useContext } from 'react';

function Header() {
  const { setShowFavorites } = useContext(AppContext);
  const year = new Date().getFullYear();

  function resetPage() {
    setShowFavorites(false);
  }

  return (
    <div className="header">
      <div className="btn-container">
        <button className="btn" onClick={() => window.location.reload()}>
          <AiFillHome />
        </button>
        <button className="btn" onClick={() => setShowFavorites(true)}>
          <AiFillHeart />
        </button>
      </div>
      Movies {year}
      <Search />
    </div>
  );
}
export default Header;
