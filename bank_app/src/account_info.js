import { useContext } from 'react';
import { Card, userContext, addComma } from './context';

export default function AccountInfo(){
    //import global context
    const [ currentUser ] = useContext(userContext);

    return (
    <>
        { currentUser === null 
            ?
            <h5>Loading...</h5>
            :
            (
                <Card
                txtcolor="dark"
                 header="Your Account"
                 body={(
                     <table className="table">
                         <thead>
                             <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col">Balance</th>
                             </tr>
                         </thead>
                         <tbody>
                            <tr>
                                <td>{currentUser.name}</td>
                                <td>{currentUser.email}</td>
                                <td type="password">{currentUser.password}</td>
                                <td>{addComma(currentUser.balance)}</td>
                            </tr>
                         </tbody>
                     </table>
                 )}
                />
            )
        }
    </>
    )
};