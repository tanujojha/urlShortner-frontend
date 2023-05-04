import React, { useContext, useState } from 'react';
import "./forgotpass.css"
import { AppContext } from '../../context/context';


function ForgotPass() {

  const context = useContext(AppContext);
  const {sendFopaLink} = context;

  const [email, setEmail] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault()
    sendFopaLink(email)
  }

 

  return (
    <div className='fopa'>
        <h1>Forgot Password Page</h1>
        <form method='post' onSubmit={handleSubmit}>
            <div className="fpainpdiv mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input onChange={(e)=> setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required autoComplete='off'/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default ForgotPass