import { FaBars } from 'react-icons/fa';
import { useState, useContext } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { RiMovie2Fill } from 'react-icons/ri';
import { MdLocalMovies } from 'react-icons/md';
import { AppContext } from './App';

const SHOWSAPI =
  'https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=';
const APIURL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=';

function Navbar() {
  const [show, setShow] = useState(false);
  const { setShowFavorites, fetchData, page, setShowShows, setPage } =
    useContext(AppContext);

  function renderShows() {
    fetchData(SHOWSAPI + page);
    setShow(false);
    setShowShows(true);
    setShowFavorites(false);
    setPage(1);
  }

  function renderMovies() {
    fetchData(APIURL + page);
    setShow(false);
    setShowShows(false);
    setShowFavorites(false);
    setPage(1);
  }

  return (
    <nav>
      <div className="menu-container">
        <div className="nav-header">
          <button className="nav-toggle" onClick={() => setShow(!show)}>
            <FaBars />
          </button>
        </div>
        <div
          className={`${
            show ? 'links-container show-container' : 'links-container'
          }`}
        >
          <ul className="links">
            <li>
              <button className="btn" onClick={() => renderMovies()}>
                <i>
                  <MdLocalMovies />
                </i>
                <span>Movies</span>
              </button>
            </li>
            <li>
              <button
                className="btn"
                onClick={() => {
                  renderShows();
                }}
              >
                <i>
                  <RiMovie2Fill />
                </i>
                <span>Shows</span>
              </button>
            </li>
            <li>
              <button
                className="btn"
                onClick={() => {
                  setShowFavorites(true);
                  setShow(false);
                  setShowShows(false);
                  setPage(1);
                }}
              >
                <i>
                  <AiFillHeart />
                </i>
                <span>Favorites</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
