import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import UserList from './components/UserList';
import Navbar from './components/Navbar';
import './App.css';
import EditUser from './components/EditUser';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const initializeData = async () => {
      try {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);


        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser?.loggedIn) {
          setCurrentUser(storedUser);
          navigate('/dashboard');
          setShowUserList(true);
          setShowLogin(false);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        localStorage.removeItem('users');
        localStorage.removeItem('currentUser');
        setUsers([]);
        setCurrentUser(null);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('currentUser');
      }
    }
  }, [currentUser, isInitialized]);

  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const loggedInUser = {
        ...user,
        loggedIn: true
      };
      setCurrentUser(loggedInUser);
      setShowLogin(false);
      setShowUserList(true);
      return true;
    }
    return false;
  };

    const handleLogout = () => {
    setCurrentUser(null);
    setShowLogin(true);
    setShowUserList(false);
  };

  const handleRegister = (newUser) => {
    const emailExists = users.some(u => u.email === newUser.email);
    if (emailExists) return false;
    
    const userWithId = {
      ...newUser,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
    };
    
    setUsers([...users, userWithId]);
    return true;
  };

  const handleEdit = (updatedUser) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setEditingUser(null);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    if (currentUser?.id === userId) {
      handleLogout();
    }
  };


   return (
    <div className="app">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      
      <Routes>   
        <Route
        path="/"
        element={
          currentUser ? (
            <Navigate to="/dashboard" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
        <Route path="/login" element={
          currentUser ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login onLogin={handleLogin} />
          )
        } />
        

        <Route path="/register" element={
  currentUser ? (
    <Navigate to="/dashboard" />
  ) : (
    <Register onRegister={handleRegister} />
  )
} />
        
        <Route path="/dashboard" element={
          currentUser ? (
            <UserList 
              users={users}
              onLogout={handleLogout} 
              onEdit={(user) => navigate(`/edit/${user.id}`)} 
              onDelete={handleDelete} 
            />
          ) : (
            <Navigate to="/login" />
          )
        } />
        
        <Route path="/edit/:userId" element={
          currentUser ? (
            <EditUser 
              users={users}
              onSave={(updatedUser) => {
                handleEdit(updatedUser);
                navigate('/dashboard');
              }}
              onCancel={() => navigate('/dashboard')}
            />
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </div>
  );
}

export default App;

