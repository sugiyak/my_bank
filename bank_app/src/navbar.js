import { Link, NavLink } from "react-router-dom";
import { userContext } from './context';
import { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './style.css';


export default function NavBar(){
    const [currentUser ] = useContext(userContext)

    return(
        <>
        <Navbar collapseOnSelect  expand="lg" className="navbar-dark bg-dark">
            <Link className="text-decoration-none navbar-brand" exact='true' to="/">
                <Navbar.Brand className="text-light text-decoration-underline brand-logo"><span className="text-warning ml-2">My</span>Bank</Navbar.Brand>
            </Link>
        <Navbar.Toggle aria-controls="navbar-nav" type="button" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">

            <Nav.Item className="nav-item">
              <Nav.Link eventKey="1"  exact='true' as={NavLink} to="/">
                Home
              </Nav.Link>
            </Nav.Item>

            { !currentUser && 
            <>
             <Nav.Item className="nav-item">
                <Nav.Link eventKey="2" as={NavLink} to="/create_account/" data-toggle="tooltip" data-placement="bottom" title="Home screen">
                Create Account
                </Nav.Link>
                </Nav.Item>

                <Nav.Item className="nav-item">
                <Nav.Link eventKey="3" as={NavLink} to="/login/" data-toggle="tooltip" data-placement="bottom" title="Already have an account?">
                Login
                </Nav.Link>
                </Nav.Item>
            </>
            }

            { currentUser && 
            <>
                <Nav.Item className="nav-item">
                <Nav.Link eventKey="4" as={NavLink} to="/deposit/" data-toggle="tooltip" data-placement="bottom" title="Deposit your money here">
                Deposit
                </Nav.Link>
                </Nav.Item>

                <Nav.Item className="nav-item">
                <Nav.Link eventKey="5" as={NavLink} to="/withdraw/" data-toggle="tooltip" data-placement="bottom" title="Withdraw your money here">
                Withdraw
                </Nav.Link>
                </Nav.Item>

                <Nav.Item className="nav-item">
                <Nav.Link eventKey="6" as={NavLink}  to="/account_info/" data-toggle="tooltip" data-placement="bottom" title="Your account data">
                Account
                </Nav.Link>
                </Nav.Item>

                <Nav.Item className="nav-item">
                <Nav.Link eventKey="7" as={NavLink} to="/logout/" data-toggle="tooltip" data-placement="bottom" title="Logout">
                Logout
                </Nav.Link>
                </Nav.Item>
            </>
            }
            {currentUser && currentUser.role === "staff"  &&
            <>
                <Nav.Item className="nav-item">
                <Nav.Link eventKey="8" as={NavLink}  to="/all_data/" data-toggle="tooltip" data-placement="bottom" title="See all data">
                All data
                </Nav.Link>
                </Nav.Item>
            </>
            }
          </Nav>
        </Navbar.Collapse>
        {currentUser !== null &&
            <Nav.Link className="navbar-brand navbar-username" to="/logout/">Hello, {currentUser.name}</Nav.Link>
            }
      </Navbar>
        </>
    );
}