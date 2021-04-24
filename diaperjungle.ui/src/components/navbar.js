import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
} from 'reactstrap';
// import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import SearchInput from './searchInput';

// pass user as parameter when user auth is setup
const MyNavbar = () => {
  // const logMeOut = (e) => {
  //   e.preventDefault();
  //   firebase.auth().signOut();
  // };

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" expand="lg">
        <NavbarBrand className='gradient-text' href="/">Diaper Jungle</NavbarBrand>
        <NavbarToggler onClick={toggle} className='custom-toggler'/>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="link-container mr-auto" navbar>
            <NavItem>
              <Link to='/products' className="nav-link m-2" href="#">Diapers</Link>
            </NavItem>
            <NavItem>
              <Link to='/orders' className="nav-link m-2" href="#">Orders</Link>
            </NavItem>
            <NavItem>
              <Link to='/users' className="nav-link m-2" href="#">Users</Link>
            </NavItem>
            <NavItem>
              <Link to='/producttypes' className="nav-link m-2" href="#">Product Types</Link>
            </NavItem>
            <NavItem>
              <Link to='/cart' className="nav-link m-2" href="#">Cart</Link>
            </NavItem>
          </Nav>
          <p className='mr-2 mt-3 text-light'>Search:</p>
            <SearchInput />
          <NavbarText>
            {/* <div className="form-inline my-2 my-lg-0">
                  <button className="nav-link btn btn-outline-primary" onClick={logMeOut}>Logout</button>
            </div> */}
            {/* for when the user auth is setup use commented code below */}
            {/* <div className="form-inline my-2 my-lg-0">
                {user && (
                  <button className="nav-link btn btn-outline-primary" onClick={logMeOut}>Logout</button>
                )}
            </div> */}
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
