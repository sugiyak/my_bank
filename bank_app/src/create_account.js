import { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Card, userContext } from './context';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebaseConfig';

export default function CreateAccount(){
    const [status, setStatus] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');

    //import global context
    const [currentUser, setCurrentUser] = useContext(userContext)
    

    //check if user actually input credentials.
    function validate(field, label){
        if (!field) {
          setStatus('Error: ' + label);
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        return true;
    }
    //create an user objecxt and add it to context.users and context
    function handleCreate(){
      if (!validate(name,     'name'))     return;
      if (!validate(email,    'email'))    return;
      if (!validate(password, 'password')) return;
      if (password.length<8){alert('Please use more than 7 characters for password');
      return;};

      const url = `${process.env.REACT_APP_custom_api_url}/account/create/${name}/${email}/${password}/${role}`;
      (async ()=>{
        try {
            //sign up on database
            let res = await fetch(url, {method: 'POST'});
            console.log(`return from post: ${res}`);
            // sign up on firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            //capturing user credential returned from firebase
            const user = userCredential.user;
            setCurrentUser({name: name, email: email, balance: 0, role: role})


            console.log(`return from post: ${JSON.stringify(user.email)}`);
            console.log("signed up on firebase!");

        } catch (error){
            console.log(error.message)
            return
        }
        
      })();
    }

    return (

        <div className="container-fluid" style={{height:"80vh"}}>
            <Card
                txtcolor="dark"
                header="Create account"
                status={status}
                body={!currentUser ? (
                    <>
                        Name<br/>
                        <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                        Email address<br/>
                        <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                        Password<br/>
                        <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                        Select your role:&nbsp; 
                        <select type="input" id="role" onChange={(e) =>{setRole(e.currentTarget.value)}}>
                            <option value="customer">Customer</option>
                            <option value="staff">Staff</option>
                        </select><br/><br/>
                        <button type="submit" className="btn btn-warning" onClick={handleCreate} disabled={!name||!email||!password}>Create Account</button>
                    </>
                ):(
                    <>
                        <h5>You are logged in.</h5>
                        <h5>It is time to deposit your money!</h5>
                        <Link to="/deposit/"><button className="btn btn-warning">Go!</button></Link>

                    </>               
                )}
            />
        </div>
    );
}