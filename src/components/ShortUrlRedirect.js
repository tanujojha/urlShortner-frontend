import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/context'

function ShortUrlRedirect() {

    const {shorturl} = useParams()
    const shortUrlString = shorturl
    // console.log(shortUrlString);

    const context = useContext(AppContext);
    const {shortUrlRedirect} = context

    useEffect(()=>{
      shortUrlRedirect(shortUrlString);      

    },[shortUrlRedirect])

  return (
    <div>
        this is short url redirect
    </div>
  )
}

export default ShortUrlRedirect