import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <>
      <Header />
      <main style={{background: "#f7f7f7"}}><Outlet /></main>

      <footer>Footer</footer>
    </>
  );
}

export default Layout;
