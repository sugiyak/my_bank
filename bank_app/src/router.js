//importing components
import CreateAccount from './create_account';
import NavBar from './navbar';
import Home from './home';
import AllData from './all_data';
import Deposit from './deposit';
import Withdraw from './withdaw';
import AccountInfo from './account_info';
import Login from './login';
import Logout from './logout';

//importing functional modules
import { Routes, Route, HashRouter } from "react-router-dom";
import { useState, useEffect } from 'react';
import { accessTokenContext, userContext, findUser } from './context';
import { auth } from './firebaseConfig';


function Router() {
  //setting global variable for all route
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(()=>{
    //login after refresh
    auth.onAuthStateChanged(user=>{
      if(user && (currentUser === null)){
        user.getIdToken()
        .then(token =>findUser(token, user.email))
        .then(user =>setCurrentUser(user))
      }});

      //login after refresh
    auth.onAuthStateChanged(user=>{if(user){user.getIdToken()
        .then(token =>setAccessToken(token))}});
  }, [currentUser])
  

  return (
    <accessTokenContext.Provider value={[accessToken, setAccessToken]}>
    <userContext.Provider value={[currentUser, setCurrentUser]}>
      <HashRouter>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/create_account/' element={<CreateAccount/>}/>
          <Route path='/login/'  element={<Login/>}/>
          <Route path='/logout/' element={<Logout/>}/>
          <Route path='/deposit/' element={<Deposit/>}/>
          <Route path='/withdraw/' element={<Withdraw/>}/>
          <Route path='/all_data/' element={<AllData/>}/>
          <Route path='/account_info/' element={<AccountInfo/>}/>
        </Routes>
      </HashRouter>
    </userContext.Provider>
    </accessTokenContext.Provider>
  );
}

export default Router;
