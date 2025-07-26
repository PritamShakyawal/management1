import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = ({ users, onSave }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  

  const userToEdit = users.find(user => user.id === parseInt(userId));
  
  const [formData, setFormData] = useState(userToEdit || {});
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userToEdit) {
      navigate('/dashboard');
    }
    setFormData(userToEdit || {});
  }, [userToEdit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const stringFields = ['firstName', 'lastName', 'email', 'phone', 'password'];
    const isValid = stringFields.every(field => {
      const value = formData[field];
      return typeof value === 'string' && value.trim() !== '';
    });

    if (!isValid) {
      setError('All fields are required');
      return;
    }
    
    const updatedUser = {
      ...formData,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password.trim()
    };
    
    onSave(updatedUser);
    navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (!userToEdit) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Edit User</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName || ''}
            onChange={handleChange}
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName || ''}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            readOnly
            type="email"
            placeholder="Email"
            value={formData.email || ''}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            value={formData.phone || ''}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            placeholder="password"
            value={formData.password || ''}
            onChange={handleChange}
            required
          />
          <div className="modal-actions">
            <button type="submit">Update</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;