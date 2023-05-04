import { useNavigate } from "react-router-dom";
import { AppContext } from "./context";
import axios from "axios";
import { useState } from "react";
import { serverUrl } from "../components/general";

const AppProvider = ({children})=>{

    const navigate = useNavigate();

    const [user, setUser] = useState(null)

    // const serverUrl = `http://localhost:5000`;

    // REGISTER
    const register = async (cred)=>{
        // console.log(cred);
        try {
            
            const res = await axios.post(`${serverUrl}/auth/register`,cred);
            console.log(res);
            if(res.status === 200){
                alert("Registered Succesfully, Go to the link in your email to activate your account")
                // navigate("/login")
            }         

        } catch (err) {
            console.log(err);
            alert("Email already Registered")
        }

    }


    // ACCOUNT ACTIVATION VERIFICATION
    // SEND TOKEN TO SERVER TO VERIFY AND ACTIVATE ACCOUNT  
    const sendAccActivationToken = async (linkToken)=>{
        // console.log(linkToken);
        try {

            const res = await axios.post(`${serverUrl}/auth/activateaccount`, {linkToken: linkToken},{
                headers: {"content-type":"application/json"}
            })
            // console.log(res);
            if(res.status === 200){
                // localStorage.setItem("user", res.data.userID)
                navigate("/login")
            }else{
                alert("You are not Authorized")
                navigate("/register")
            }
            
        } catch (error) {
            console.log(error);
        }
    }


    // LOGIN
    const login = async (cred)=>{
        // console.log(data);
        try {
            
            const res = await axios.post(`${serverUrl || process.env.REACT_APP_SERVER_URL}/auth/login`, cred);
            // console.log(res.data);
            const {token, user} = res.data
            if(res.status === 200){
                setUser(user)
                localStorage.setItem("x-auth-token", token)
                navigate("/home")
            }

        } catch (err) {
            console.log(err);
            alert("Check your Credentials and try again")
        }

    }


    // FORGOT PASS
    // SEND EMAIL TO SERVER TO SEND PASSWORD RESET LINK
    const sendFopaLink = async (email)=>{
        // console.log(email);
        const cred = {email}
    
        try {

            const res = await axios.post(`${serverUrl || process.env.REACT_APP_SERVER_URL}/auth/fopa`, cred, {
                headers: {'content-type': 'application/json'}
            })
            
            if(res.status === 200){
                alert(res.data + " if not Check your Spam");
                
            }
        
        } catch (error) {
            console.log(error);
        }
    }


    //FORGET PASSWORD VERIFICATION
    //SEND VERIFICATION TOKEN TO SERVER 
    const sendVerificationLink = async (linkToken)=>{
        // console.log(linkToken);
        try {

            const res = await axios.post(`${serverUrl}/auth/verifylink`, {linkToken: linkToken},{
                headers: {"content-type":"application/json"}
            })
            // console.log(res);
            if(res.status === 200){
                localStorage.setItem("user", res.data.userID)
                navigate("/changepassword")
            }else{
                alert("You are not Authorized")
                navigate("/forgotpassword")
            }
            
        } catch (error) {
            console.log(error);
        }
    }


    // CHANGE/UPDATE PASSWORD
    const changePassword = async (cred)=>{
        console.log(cred);
        try {

            const res = await axios.put(`${serverUrl}/auth/changepassword`, cred, {
                headers: {
                    "content-type": "application/json",
                    "user": localStorage.getItem("user")
                }
            });
            
            if(res.status === 200){
                localStorage.clear();
                alert(res.data)
                navigate("/login")
            }
            
        } catch (error) {
            console.log(error);
        }
    }


    //  ############# URL SHORTNER FUNCTIONS ##################

    const [urlData, setUrlData] = useState({}); // holds posted url data 
    const [allUrls, setallUrls] = useState([]); // holds all url data for table
    const [urlsDataByDate, seturlsDataByDate] = useState([]);   // holds all urls date and count data
    const [urlsDataByMonth, seturlsDataByMonth] = useState([]); // holds all urls month and count data

    // POST LONG URL   
    const sendLongUrl = async (longurl)=>{
        const token = localStorage.getItem("x-auth-token")

        try {

            const res = await axios.post(`${serverUrl}/urlshort/gotiny`, {longurl: longurl}, {
                headers: {
                    "content-type":"application/json",
                    "x-auth-token": token
                }
            });
            // console.log(res);
            if(res.status === 200){
                setUrlData(res.data.urlData)
                alert("A short URL has been created")
            }
            
        } catch (error) {
            console.log(error);
        }
    }


    // SHORT URL REDIRECT 
    const shortUrlRedirect = async (shortUrlString)=>{
        // console.log(shortUrlString);
        const token = localStorage.getItem("x-auth-token");
        
        try {

            const res = await axios.post(`${serverUrl}/urlshort/redirect`, {shortUrlString: shortUrlString}, {
                headers: {
                    "content-type":"application/json",
                    "x-auth-token": token
                }
            });
            // console.log(res.data.urlData);
            if(res.status === 200){
                window.open(`https://${res.data.urlData.longurl}`, "_self")
                
            }else{
                navigate("/allurls")
            }
            
        } catch (error) {
            console.log(error);
            // navigate("/allurls")
        }
    }

    // GET ALL URLS
    const getAllUrls = async ()=>{

        const token = localStorage.getItem("x-auth-token")

        try {
            
            const res = await axios.get(`${serverUrl}/urlshort/getall`, {
                headers: {
                    "x-auth-token": token
                }
            });

            // console.log(res.data);

            if(res.status === 200){
                setallUrls(res.data)
            }

        } catch (error) {
            console.log(error);
        }
    }

    // COUNT URLS CREATED PER DAY
    const getUrlsCountByDate = async ()=>{

        const token = localStorage.getItem("x-auth-token")

        try {
            
            const res = await axios.get(`${serverUrl}/urlshort/getcountbydate`, {
                headers: {
                    "x-auth-token": token
                }
            });

            // console.log(res.data);

            if(res.status === 200){
                seturlsDataByDate(res.data)
            }

        } catch (error) {
            console.log(error);
        }
    }


    // COUNT URLS CREATED PER MONTH
    const getUrlsCountByMonth = async ()=>{

        const token = localStorage.getItem("x-auth-token")

        try {
            
            const res = await axios.get(`${serverUrl}/urlshort/getcountbymonth`, {
                headers: {
                    "x-auth-token": token
                }
            });

            // console.log(res.data);

            if(res.status === 200){
                seturlsDataByMonth(res.data)
            }

        } catch (error) {
            console.log(error);
        }
    }
    

    return(
        <AppContext.Provider value={
            {
                register, 
                login, 
                user, 
                sendFopaLink, 
                sendVerificationLink, 
                changePassword, 
                sendAccActivationToken, 
                sendLongUrl,
                urlData,
                shortUrlRedirect,
                getAllUrls,
                allUrls,
                getUrlsCountByDate,
                urlsDataByDate,
                getUrlsCountByMonth,
                urlsDataByMonth,
            }
        }>
            {children}
        </AppContext.Provider>
    )
}


export default AppProvider;