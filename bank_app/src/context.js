import { Link } from "react-router-dom";
import { createContext } from 'react';

//global state for current user status
export const userContext = createContext();
export const accessTokenContext = createContext();

//add comma to the account balance
 export const addComma = (total)=>{
    return total.toLocaleString()
}

//send request to api server and fetch acount info
export async function findUser(token, email){
  try {
    const url = `https://bank-app-api.herokuapp.com/account/search/${email}`;
    let res = await fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token
      }});
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(`error message from context.js/findUser: ${error.message}`)
  }
}


//find user using the user input and set it active user
export async function updateUser(email, amount, accessToken, func){
  const url = `https://bank-app-api.herokuapp.com/account/update/${email}/${amount}`;
  try{
      let res = await fetch(url, {
          method: 'POST',
          headers: {
              'Authorization': 'Bearer ' + accessToken
          }});

      //feedback from api
      let data = await res.json();

      //update currentUser data
      func(data);

  } catch (error){
      console.log(error.message)
  }
};

export function HomeCard(props){
    return (
        <div className="card m-3 border-dark border-3 rounded-3 btn btn-light" style={{maxWidth: "15rem"}}>
            <Link to={props.link} style={{ textDecoration: 'none' }} className="card-body text-dark">
                {props.title && (<h5 className="card-title">{props.title}</h5>)}
                {props.text && (<p className="card-text">{props.text}</p>)}
                {props.image && (<img src={props.image} className="img-fluid" style={{background:"none"}} alt="Responsive"/>)}
                {props.status && (<div id="createStatus">{props.status}</div>)}
            </Link>
        </div>
    );
    
}

export function Card(props){
    function classes(){
        const bg  = props.bgcolor ? ' bg-' + props.bgcolor : '';
        const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
        return 'card border-dark border-3 rounded-3 mx-auto mt-5' + bg + txt;
      }

    return (
        <div className={classes()} style={{maxWidth: "40rem"}}>
        <div className="card-header bg-dark text-white">{props.header}</div>
        <div className="card-body">
          {props.title && (<h5 className="card-title">{props.title}</h5>)}
          {props.text && (<p className="card-text">{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
        </div>
      </div>      
    );
    
}