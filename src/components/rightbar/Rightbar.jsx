import "./rightbar.css";
import { Users, Contests } from "../../dummyData";
import User from "../user/User"
import ListContest from "../listContest/ListContest"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { URL_API } from "../../helper/url"
import { toastError } from "../../redux/actions/toastActions"
import { Link } from 'react-router-dom';


export default function Rightbar() {
  const [userCollections, setUserCollections] = useState([])
  const [profiles, setProfiles] = useState([])
  const dispatch = useDispatch

  useEffect(() => {
    fetchDataAllUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDataAllUser = async () => {
    try {
      const res = await axios.get(`${URL_API}/users?skip=0&take=5`)
      const userAll = res.data.result

      console.log(userAll)
      setUserCollections(userAll)

      const res2 = await axios.get(`${URL_API}/users/profile?skip=0&take=5`)
      const profile = res2.data.result
      console.log('profile', profile)
      setProfiles(profile)
    } catch (error) {
      if (error.response) {
        dispatch(toastError(`${error.response.data.message}`))
        console.log(error.response.data.message)
      } else {
        console.log(`Error`, error.message)
      }
    }
  }

  const HomeRightbar = () => {
    return (
      <>
        <img className="rightbarAd" src="assets/ads/ads1.jpg" alt="" />
        <img className="rightbarAd" src="assets/ads/ads2.jpg" alt="" />
        <img className="rightbarAd" src="assets/ads/ads3.jpg" alt="" />
        <img className="rightbarAd" src="assets/ads/ads4.jpg" alt="" />
        <img className="rightbarAd" src="assets/ads/ads5.jpg" alt="" />
        <h4 className="rightbarTitle">LIST TOP PHOTOGRAPHERS</h4>
        <h2 className="rightbarSeeAll"><Link to="/user/all">See All</Link></h2>
        <hr className="rightbarHr" />
        {/* <ul className="rightbarUserList">
          {userCollections.map((u) => (
            <User key={u.id} user={u} />
          ))}
        </ul> */}

        <ul className="rightbarUserList">
          {profiles.map(profile => (
            <li className="rightbarUser" key={profile.userId}>
              <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" src={profile.profilePhoto} alt="" />
              </div>
              <span className="rightbarUsername">{profile.name}</span>
            </li>
          ))}
        </ul>

        <h4 className="rightbarTitle">LIST CONTEST</h4>
        <h2 className="rightbarSeeAll">See All</h2>
        <hr className="rightbarHr" />
        <ul className="rightbarUserList">
          {Contests.map((u) => (
            <ListContest key={u.id} contest={u} />
          ))}
        </ul>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <HomeRightbar />
      </div>
    </div>
  );
}