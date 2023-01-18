//import components from context.js
import { HomeCard, userContext } from './context';
import { useContext } from 'react';


// import images
import create_account from './images/create_account.png';
import login from './images/login.png';
import deposit from './images/deposit.png';
import withdraw from './images/withdraw.png';
import bank from './images/bank.png';
import logout from './images/logout.png';
import account_info from './images/account_info.png';
import './style.css';

export default function Home(){
    //import global context
    const [currentUser] = useContext(userContext)

    return (
        <>
            <div className="jumbotron p-3 p-md-5 text-white bg-dark">
                <div className="col-md-6 px-0">
                    <h1 className="display-4">Welcome to <span className="brand-logo"><span className="text-warning">My</span>Bank</span></h1>
                    <p className="lead my-3">Deposit and save money. Login and logout without hassle.</p>
                </div>
            </div>
            <div className="row m-3">
            { !currentUser && 
                <>
                <HomeCard
                    link="/create_account/"
                    title="Create account"
                    text="Join us today!"
                    image={create_account}
                />
                    
                <HomeCard
                    link="/login/"
                    title="Login"
                    text="Login here"
                    image={login}
                />
                </>
            }
            { currentUser &&
                <>
                <HomeCard
                    link="/deposit/"
                    title="Deposit"
                    text="Deposit your money"
                    image={deposit}
                />
                <HomeCard
                    link="/withdraw/"
                    title="Withdraw"
                    text="Withdraw your money"
                    image={withdraw}
                />
                <HomeCard
                    link="/account_info/"
                    title="account"
                    text="Check out your account info"
                    image={account_info}
                />
                <HomeCard
                    link="/logout/"
                    title="logout"
                    text="See you soon"
                    image={logout}
                />
                </>
            }
            {currentUser && currentUser.role === "staff" &&
                <HomeCard
                    link="/all_data/"
                    title="All data"
                    text="Account information"
                    image={bank}
                />
            }
            </div>
        </>
    )
}