import { Link } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <header className="topbar">
        <Link to="/" className="brand">
          Events
        </Link>
        <nav className="topbar__actions">
          <Link to="/" className="button button--ghost">
            Liste
          </Link>
          <Link to="/events/new" className="button">
            Nouvel événement
          </Link>
        </nav>
      </header>
      <main className="container">{children}</main>
    </div>
  );
};

export default Layout;

