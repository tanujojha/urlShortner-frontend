import React from 'react';
import "./main.css";
import { Link } from 'react-router-dom';

function Main() {
  return (
    <div className='main'>
        <h1>Welcome to URL Shortner App</h1>
        <div className='mainbtndiv'>
            <Link to="/register"><button className='btn btn-md btn-primary' type="button">Register</button></Link>
            <Link to="/login"><button className='btn btn-md btn-primary' type="button">Login</button></Link>
        </div>
    </div>
  )
}

export default Main