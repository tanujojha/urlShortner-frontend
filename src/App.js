import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/main/main';
import Login from "./components/login/login";
import Register from './components/register/register';
import ForgotPass from './components/forgotpass/forgotpass';
import LinkVerification from './components/linkVerification/fopaVerification';
import ChangePassword from './components/changePassword/changePassword';
import AccVerification from './components/linkVerification/accVerification';
import Home from './components/home/home';
import PrivateRoute from './components/privateRoute';
import ShortUrlRedirect from './components/ShortUrlRedirect';
import Navbar from './components/navbar/navbar';
import TableData from './components/tableData/tableData';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/accverify/:id' element={<AccVerification/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forgotpassword' element={<ForgotPass/>} />
        <Route path='/fopaverify/:id' element={<LinkVerification/>}/>
        <Route path='/changepassword' element={<ChangePassword/>}/>
        <Route element={<PrivateRoute/>}>
          <Route element={<Navbar/>}>
            <Route path='/home' element={<Home/>}/>
            <Route path='/allurls' element={<TableData/>}/>
          </Route>
        </Route>
        <Route path='/urlshortner/:shorturl' element={<ShortUrlRedirect/>}/>
      </Routes>
    </div>
  );
}

export default App;
