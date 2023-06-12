import { useState, useEffect, createContext } from 'react';
import './App.css';
import Header from './Header';
import Movie from './Movie';
import Footer from './footer';
import Axios from 'axios';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';

const TRAILER = 'https://www.youtube.com/results?search_query=';
const APIURL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI =
  'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

export const AppContext = createContext();

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const url = searchTerm ? SEARCHAPI + searchTerm : APIURL + page;

  useEffect(() => {
    fetchData();
  }, [url]);

  function fetchData() {
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
          setSearchTerm,
          searchTerm,
          fetchData,
          data,
          TRAILER,
          IMGPATH,
          setPage,
          page,
        }}
      >
        <Header />
        <Movie />
        <Footer />
      </AppContext.Provider>
    </>
  );
}

export default App;
