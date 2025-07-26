import { Link } from 'react-router-dom';

const Navbar = ({ currentUser, onLogout }) => {
  return (
    <nav className="navbar">
      {/* <h1>User Management System</h1> */}
      <div className="nav-links">
        {currentUser ? (
          <>
            {/* <button onClick={onLogout} className="logout-btn">Logout</button> */}
          </>
        ) : (
          <>
            {/* <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link> */}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;