import React from 'react';
import firebase from 'firebase/app';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Auth from './Auth';
import SearchInput from './searchInput';

// pass user as parameter when user auth is setup
class MyNavbar extends React.Component {
  state = {
    isOpen: false,
  }

logoutClickEvent = (e) => {
  e.preventDefault();
  firebase.auth().signOut();
}

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { user, dbUser } = this.props;
    return (
    <div>
      <Navbar color="dark" expand="lg">
        <NavbarBrand className='gradient-text' href="/">Diaper Jungle</NavbarBrand>
        <NavbarToggler onClick={this.toggle} className='custom-toggler'/>
        <Collapse isOpen={this.isOpen} navbar>
          <Nav className="link-container mr-auto" navbar>
            <NavItem>
              <Link to='/products' className="nav-link m-2" href="#">Diapers</Link>
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
            <NavItem>
                <Auth />
            </NavItem>
            <NavItem>
              {dbUser.is_admin && user && (
                <Link to='/admin' className="nav-link m-2" href="#">Admin</Link>
              )}
            </NavItem>
          </Nav>
          <p className='mr-2 mt-3 text-light'>Search:</p>
            <SearchInput />
          <NavbarText>
            <div className="form-inline my-2 my-lg-0">
                {user && (
                  <button className="nav-link btn btn-outline-primary" onClick={this.logoutClickEvent}>Logout</button>
                )}
            </div>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
    );
  }
}

export default MyNavbar;
