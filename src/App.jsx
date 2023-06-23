import { useState, useEffect, createContext, useRef } from 'react';
import './App.css';
import Header from './Header';
import Movie from './Movie';
import Footer from './Footer';
import Axios from 'axios';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';
import React from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TRAILER = 'https://www.youtube.com/results?search_query=';
const APIURL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI =
  'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
const SHOWSAPI =
  'https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=';

export const AppContext = createContext();

function App() {
  const inputRef = useRef();
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [showShows, setShowShows] = useState(false);
  const [page, setPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    showShows ? fetchData(SHOWSAPI + page) : fetchData(APIURL + page);
  }, [page]);

  function notify(value, movieName) {
    if (value === 'success') {
      toast.success(`${movieName} added to favorites`);
    } else if (value === 'deleted') {
      toast.warn(`${movieName} removed from favorites`);
    }
  }

  function fetchData(url) {
    Axios.get(url)
      .then((res) => {
        const responseData = res.data.results;
        setData(responseData);
      })
      .catch((error) => {
        setError(error);
      });
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <button
        className={`top-btn ${isVisible ? 'visible' : 'hidden'}`}
        onClick={scrollToTop}
      >
        <BsFillArrowUpSquareFill />
      </button>
      <AppContext.Provider
        value={{
          fetchData,
          data,
          TRAILER,
          IMGPATH,
          setPage,
          page,
          inputRef,
          SEARCHAPI,
          setFavorites,
          favorites,
          setShowFavorites,
          showFavorites,
          notify,
          setShowShows,
        }}
      >
        <ToastContainer autoClose={1000} transition={Zoom} />
        <Header />
        {showFavorites ? (
          <Movie dataToUse={favorites} />
        ) : (
          <Movie dataToUse={data} />
        )}
        {!showFavorites && <Footer />}
      </AppContext.Provider>
    </>
  );
}

export default App;
