import { useState, useContext, useEffect } from 'react';
import { Card, accessTokenContext, addComma } from './context';

export default function AllData(){
    const [allData, setAllData] = useState(null);
    const [accessToken] = useContext(accessTokenContext);

    useEffect(()=>{
        //fetch all data
        (async function(){
        try{
            let res = await fetch(`${process.env.REACT_APP_custom_api_url}/account/all`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }});
            let data = await res.json();

            setAllData(data);
        } catch (error){
            console.log(error.message)
        }})();
    },[]);
    return (
    <>
        { allData === null 
            ?
            <h5>Loading...</h5>
            :
            (
                <Card
                txtcolor="dark"
                 header="All data in store"
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
                         {allData.map((user, i)=>{    
                            return (
                            <tr key={i}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>{addComma(user.balance)}</td>
                            </tr>
                            )})}
                         </tbody>
                     </table>
                 )}
                />
            )
        }
    </>
    )
};