import { useContext } from 'react';
import { Card, userContext } from './context';
import { auth } from './firebaseConfig';
import Home from './home';

export default function Logout(){
    //import global context
    const [currentUser, setCurrentUser] = useContext(userContext)

    const handleLogout = async ()=>{
        await auth.signOut();
        console.log("Logged out");
        setCurrentUser(null);
    }

    return (
            currentUser ?
            <Card
                txtcolor="dark"
                header="Logout"
                body={(
                        <>
                            <h1>Logout?</h1>             
                            <button type="submit" className="btn btn-warning" onClick={handleLogout}>Logout</button>
                        </>)
            }/>
            :
            <Home/>
            
            );
}