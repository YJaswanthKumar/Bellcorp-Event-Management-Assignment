import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextObject';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Bellcorp Studio - Event Management Application</h1>
        <span>Developed by Jaswanth</span>
      </div>

      <div className="nav-links">
        <Link to="/events" className="nav-link">Events</Link>

        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <span className="nav-link">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="btn btn-danger"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
