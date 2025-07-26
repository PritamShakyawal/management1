import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Register = ({ onRegister}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

  
    if (!Object.values(formData).every(field => field.trim())) {
      setError('All fields are required');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError('Phone number must be exactly 10 digits');
      return;
    }

    if (!formData.email.toLowerCase().endsWith('@gmail.com')) {
      setError('Email must be a @gmail.com address');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const newUser = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      password: formData.password
    };

    const success = onRegister(newUser);
    if (success) {
      navigate('/login');
    } else {
      setError('Email already registered');
    }
  };

  return (
    <div className="auth-container">
      <h1>Signup</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          type="tel"
          pattern="\d{10}"
          maxLength={10}
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        {/* <Link to="/login" className="auth-button">Sign Up</Link> */}
      </form>
      {/* <p>
        Already have an account?{' '}
        <button onClick={showLogin} className="link-button">
          Login
        </button>
      </p> */}
      <p>
        Already have an account? <Link to="/login" className='link-button'>Login</Link>
      </p>
    </div>
  );
};

export default Register;