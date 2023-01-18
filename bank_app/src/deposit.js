import { useState, useContext } from 'react';
import { Card, userContext, accessTokenContext, updateUser, addComma } from './context';


export default function Deposit(){
    //import global context
    const [accessToken] = useContext(accessTokenContext);
    const [currentUser, setCurrentUser] = useContext(userContext);

    const [empty, setEmpty] = useState(true);

    //set total accouding to the user input
    const handleSubmit = (e)=>{
        e.preventDefault();
        
        //add input value to the current balance
        let status = Number(e.target.num.value);

        //update the database
        updateUser(currentUser.email, status, accessToken, setCurrentUser);

        alert(`You deposited: $ ${status}`);
        };

    return (
        <>
        { currentUser 
            ?
            (<div className="container-fluid main-container">
                <Card
                txtcolor="dark"
                header="Deposit"
                text={`${currentUser.name}'s account balance $${addComma(currentUser.balance)}`}
                body={(
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <span>$ </span>
                        <input type="number" name="num" min="0" onChange={e=>{e.target.value === 0 ? setEmpty(true) : setEmpty(false)}}></input>
                        <br/>
                        <button type="submit" className="btn btn-success mt-2" disabled={empty}>Deposit</button>
                    </form>
                </div>)}
                />
            </div>)
        : <h5>Loading...</h5>}
        </>

    );
}