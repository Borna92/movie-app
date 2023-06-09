import Search from './Search';

function Header() {
  const year = new Date().getFullYear();

  return (
    <div className="header">
      Movies {year}
      <Search />
    </div>
  );
}
export default Header;
