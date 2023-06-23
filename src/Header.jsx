import Search from './Search';
import Navbar from './Navbar';

function Header() {
  const year = new Date().getFullYear();

  return (
    <div className="header">
      Movies {year}
      <Navbar />
      <Search />
    </div>
  );
}
export default Header;
