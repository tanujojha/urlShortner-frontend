import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import { AppContext } from '../../context/context';



function LinkVerification() {

    const context = useContext(AppContext);
    const {sendVerificationLink} = context

    const {id} = useParams()
    const linkToken = id;

    
    useEffect(()=>{
        sendVerificationLink(linkToken);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

  return (
    <div className='mt-5'>
        <CircularProgress/>
    </div>
  )
}

export default LinkVerification