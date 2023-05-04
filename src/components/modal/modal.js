import React, {useContext, useState} from "react";
import Modal from "react-modal";
import "./modal.css";
import { Button} from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { AppContext } from "../../context/context";
import { clientURL } from "../general";



Modal.setAppElement("#root");



const UrlshortModal = ()=> {

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [longurl, setLongurl] = useState("");
  const context = useContext(AppContext)
  const {sendLongUrl, urlData} = context

  const handleChange = (e)=>{
    let value = e.target.value;
    setLongurl(value)
  }

  const handleSubmit =  (e)=>{
    e.preventDefault();
    
    // condition to check if the long url has https:// in it
    if(longurl.includes("https://")){
      const newlongurl = longurl.slice(8)
      // console.log(newlongurl);
      sendLongUrl(newlongurl)
    }else{
      sendLongUrl(longurl)
    }
    
  }

  const handleUrlRedirect = ()=>{
    window.open(`${clientURL}/urlshortner/${urlData.shorturl}`, "_blank")
  }
  

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const newStyle = {
    overlay: {
      position: 'fixed',
      top: "15%",
      left: "55%",
      right: "5px",
      bottom: "240px",
      backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
      position: 'absolute',
      top: '5px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'hidden',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '20px',
      outline: 'none',
      padding: '10px'
    }
  }

  return (
    <div className="composemain">
        <button onClick={openModal} type="button" className='btn btn-sm btn-primary'>Create</button> 
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={newStyle}
        // contentLabel="Example Modal"
      >
        <div className="topdivmsgbox">
            <p className="newmsg">Short Your URL</p>
            <CloseOutlinedIcon className="closemsgbox" onClick={closeModal}/>
            
        </div>
        <form onSubmit={handleSubmit}>
            <div className="input-group input-group-sm mb-3 todiv mt-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Long URL</span>
                <input onChange={handleChange} name="longurl" type="text" className="form-control toinp" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            </div>

            <div className="shorturldiv">
               <p onClick={handleUrlRedirect} className="shorturlp">{clientURL}/urlshortner/{urlData.shorturl}</p>
            </div>
                        
            <div className="botmmsgndiv mt-5">
                <Button type="submit" id="sendmsgbtn" size="small" variant="contained">Send</Button>
            </div>    
          
        </form>
      </Modal>
    </div>
  );
}

export default UrlshortModal;