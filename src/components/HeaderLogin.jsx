import React, { useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toastWarning } from '../redux/actions';
import Logo from '../assets/img/portraiture.png';
import LogologOut from '../assets/img/header/logo_logOut.png';
import LogoUser from '../assets/img/header/logo_user.png';
import { toastSuccess } from './../redux/actions/toastActions';

function HeaderLogin() {
  const [page, setPage] = useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onNotifClick = () => {
    dispatch(toastWarning('Feature in development! Please try again later'));
  };

  const handleLogout = () => {
    dispatch(toastSuccess('You are now logged out!'));
    setTimeout(() => {
      localStorage.removeItem('token');
      dispatch({
        type: 'LOGOUT',
      }); window.location = '/';
    }, 2000);
  };

  return (
    <div className="port-header">
      <Navbar expand="lg">
        <div className="port-header-logo">
          <Link to="/homepage">
            <img src={Logo} alt="logohome" />
          </Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="port-header-nav">
            <div className={`port-header-products pr-3 ${page === 'projects' ? 'header-link-active' : null}`}>
              <Link to="/projects">Contest</Link>
            </div>
            <div className={`port-header-package pr-5 ${page === 'packages' ? 'header-link-active' : null}`}
            >
              <Link to="/gallery/all">Gallery</Link>
            </div>
            <div className="port-header-user pr-5">
              <Link to="/dashboard">
                <img src={LogoUser} alt="imageLogo" />
              </Link>
            </div>
            <div className="port-header-bell-notif pr-4">
              <span onClick={onNotifClick} className="cursor-pointer">
                Notifications
              </span>
            </div>
            <div className="port-header-user-profile pr-5">
              <Link to="/dashboard">Profile</Link>
            </div>
            <div className="port-header-user pr-5, cursor-pointer" onClick={handleLogout}>
              <img src={LogologOut} alt="imageLogo" />
            </div>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default HeaderLogin;
