import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';


// Outlet is used to render its children


function PrivateRoute() {

    const token = localStorage.getItem("x-auth-token") === null ? false : true;


  return (
    <>
        {token ? <Outlet /> : <Navigate to = "/login"/>}
    </>
  )
}

export default PrivateRoute