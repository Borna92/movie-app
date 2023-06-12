import Search from './Search';
import { AiFillHome } from 'react-icons/ai';

function Header() {
  const year = new Date().getFullYear();

  return (
    <div className="header">
      <button className="btn" onClick={() => window.location.reload()}>
        <AiFillHome />
      </button>
      Movies {year}
      <Search />
    </div>
  );
}
export default Header;
