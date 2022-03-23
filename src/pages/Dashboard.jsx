import React, { useEffect, useState } from 'react';
// import {
//   BsImage,
//   BsBoxArrowInDown,
//   BsEyeFill,
//   BsCheck,
//   BsX,
// } from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';
// import { URL_API } from '../helper/url';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import { deletePackage, deleteProject } from '../redux/actions';
import { toastError, toastSuccess, toastWarning } from '../redux/actions/toastActions';
// import { dateFormatter } from '../helper/dateformatter';
// import Header from '../components/Header';
// import axios from 'axios';
// import SimplePopover from '../components/Popover/SimplePopover';
import HeaderLogin from '../components/HeaderLogin';
import jwt_decode from "jwt-decode";
// import ListAlbum from '../components/listAlbum/ListAlbum';
import log from '../utils/logger'


function Dashboard() {
  const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState();
  // const [dataPackages, setDataPackages] = useState([]);
  // const [dataProjects, setDataProjects] = useState([]);
  // const [dataCollections, setDataCollections] = useState([]);
  // const [profileDataCollections, setProfileDataCollections] = useState([])
  // const history = useHistory();
  const dispatch = useDispatch();

  //dummy data variable baru

  useEffect(() => {


    if (auth.isLogin) {

      const jwtToken = localStorage.getItem('token')
      const decoded = jwt_decode(jwtToken)
      log.info('profile decoded', decoded)

      // setBusinessName(auth.businessName);
      // setAddress(auth.address);
      // setEmail(decoded.email);
      // setName(auth.name);
      setPhoto(auth.photo);
      setIsLoading(false);
      fetchDataCollections();
    } else {
      dispatch(toastWarning(`Kamu belum login 😍`));
      setTimeout(() => {
        window.location = '/';
      }, 2000);
      // window.location = '/';
    }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps
  log.info(auth)
  const fetchDataCollections = async () => {
    try {
      const x = auth.id
      // log.info("test")
      // log.info(x)




      log.info(x)
      // setProfileDataCollections(x)

    } catch (error) {
      if (error.response) {
        dispatch(toastError(`${error.response.data.message}`))
        log.info(error.response.data.message)
      } else {
        log.info(`Error`, error.message)
      }
    }
  };


  if (isLoading) {
    return (
      <>
        <HeaderLogin />
        <div className="loader"></div>
      </>
    );
  }

  return (
    <>
      <HeaderLogin />
      <div className="dashboard-wrapper">
        <div className="dashboard-background">
          <div className="dashboard-background-container">
            <div className="dashboard-logo">
              <img src={`${photo}`} alt="logo" />
            </div>
            <div className="dashboard-name">{auth.businessName}</div>
            <div className="dashboard-button">
              <Link to="/profile">
                <button className="dashboard-button-btn">Edit Profile</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="dashboard-main">
          <div className="dashboard-wrapper">
            <div className="dashboard-title">Quick Access</div>
            <div className="recent-collections">
              <div className="recent-collections-title">Recent Collections</div>
              <div className="rcollections-wrapper">
                {/* {profileDataCollections.map((u) => (
                  <ListAlbum key={u.id} entry={u} />
                 ))} */}
              </div>
              <Link to="/collections">
                <div className="recent-collections-seeall">
                  see all collections
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
