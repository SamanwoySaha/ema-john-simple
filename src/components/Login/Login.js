import React, { useState, useContext } from 'react';
import './Login.css';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework } from './loginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false,
  })

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const isPasswordHasNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordHasNumber && isPasswordValid;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      
    }

    if (!newUser && user.email && user.password) {
      
    }
    e.preventDefault();
  }  

  return (
    <div style={{textAlign: 'center'}}>
      <header className="App-header">
        {
          user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button>
            : <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        }
        <br />
        <button onClick={handleFbLogin}>Sign in with Facebook</button>
        {
          user.isSignedIn &&
          <div>
            <h1>{user.name}</h1>
            <h4>{user.email}</h4>
            <img src={user.photo} style={{ width: '50%' }} alt="" />
          </div>
        }
        <h1>Our Own Authentication</h1>
        <div>
          <h1>{user.name}</h1>
          <h1>{user.email}</h1>
          <h4>{user.password}</h4>
        </div>
        <label htmlFor="newUser">
          <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" />
          New User Sign Up
        </label>
        <form onSubmit={handleSubmit}>
          {
            newUser && <input onBlur={handleBlur} type="text" placeholder="Enter your name" name="name" required />
          }
          <br />
          <input onBlur={handleBlur} type="text" placeholder="Enter your email address" name="email" id="" required />
          <br />
          <input onBlur={handleBlur} type="password" placeholder="Enter your password" name="password" id="" required />
          <br />
          <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
        </form>
        {
          user.success
            ? <p style={{ color: 'green' }}>User account {newUser ? 'created' : 'logged in'} successfully</p>
            : <p style={{ color: 'red' }}>{user.error}</p>
        }
      </header>
    </div>
  );
}

export default Login;
