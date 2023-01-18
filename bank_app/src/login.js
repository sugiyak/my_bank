import { useState, useContext } from 'react';
import { Card, userContext } from './context';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebaseConfig';
import Home from './home';

export default function Login(){
    //import global context
    const [currentUser] = useContext(userContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    //change activeUser in context according to the user input.
    async function handleLogin(){
            // sign up on firebase
            try {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("signed-in on firebase!");

                //currentUser will be set through findUser function in router.js via authChange

            } catch (error){
                alert(error.message);
                return
            }};

    return (
        !currentUser ?
        <Card
        txtcolor="dark"
        header="Login"
        body={<>
                Email address<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                Password<br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                <button type="submit" className="btn btn-warning" onClick={handleLogin}>Login</button>
            </>}/>
        :
        <Home/>

        )
}