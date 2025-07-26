import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = ({ onLogin, showRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    const success = onLogin(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="first">
    <div className="auth-container">
      <h1>Login Page</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {/* <p>
        Not a User?{' '}
        <button onClick={showRegister} className="link-button">
          Signup Now
        </button>
      </p> */}
      <p>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
    </div>
  );
};

export default Login;