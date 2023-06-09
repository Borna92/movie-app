import { useState } from 'react';

function Footer() {
  const [page, setPage] = useState(1);

  function handlePage(input) {
    input === 'increase'
      ? setPage(page + 1)
      : page > 1
      ? setPage(page - 1)
      : null;
  }

  return (
    <div className="footer">
      <button
        onClick={() => {
          handlePage('decrease');
        }}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
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
