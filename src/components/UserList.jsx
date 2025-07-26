const UserList = ({ users, onLogout, onEdit, onDelete }) => {
  return (
    <div className="sdf">
      <div className="user-list-container">
        <div className="header-section">
          <h1>Welcome to Dashboard</h1>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
        <h2>Users List</h2>
        
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.password}</td>
                <td className="action-buttons">
                  <button onClick={() => onEdit(user)} className="edit-btn">
                    Edit
                  </button>
                  <button 
                    onClick={() => window.confirm('Delete user?') && onDelete(user.id)} 
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;