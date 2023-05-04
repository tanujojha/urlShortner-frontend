import React from 'react';
import "./navbar.css";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import UrlshortModal from '../modal/modal';
import { Button } from '@mui/material';

function Navbar() {

  const navigate = useNavigate()

  const handleLogut = ()=>{
    localStorage.clear();
    navigate("/login")
  }


  return (
    <>
    <div className='navbar'>
        <div className='navbarinner'>
            <ul>
                <Link className='navlink' to="/home"><li>Dashboard</li></Link>
                <Link className='navlink' to="/allurls"><li>Data</li></Link>
                {/* <button type="button" className='btn btn-sm btn-primary'>Create</button> */}
                <UrlshortModal/>
                <button onClick={handleLogut} className='btn btn-sm btn-secondary' type="button">logout</button>
            </ul>
        </div>
    </div>
    <Outlet/>
    </>
  )
}

export default Navbar