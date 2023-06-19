import { useContext } from 'react';
import { AppContext } from './App';

function Footer() {
  const { page, setPage } = useContext(AppContext);

  function handlePage(input) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    input === 'increase'
      ? setPage(page + 1)
      : page > 1
      ? setPage(page - 1)
      : null;
  }

  return (
    <div className="footer">
      {page > 1 && (
        <button
          onClick={() => {
            handlePage('decrease');
          }}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      )}
      Page {page}
      <button
        onClick={() => {
          handlePage('increase');
        }}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
}
export default Footer;
