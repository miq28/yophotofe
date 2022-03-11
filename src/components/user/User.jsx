import "./user.css";
import { URL_API } from "../../helper/url";
import axios from "axios";
import { toastError } from "../../redux/actions/toastActions";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function User({user}) {
  const[profileDataCollections, setProfileDataCollections] = useState([])
  const dispatch = useDispatch

  useEffect(() => {
    fetchDataProfile()
  }, [])

  const fetchDataProfile = async () => {
    try{
        const x = user.id
        // console.log("test")
        // console.log(x)

        const profile = await axios.get(`${URL_API}/users/profile/userid/${x}`)
        const profileData = profile.data.result

        console.log(profileData)
        setProfileDataCollections(profileData)

    } catch (error) {
        if (error.response) {
            dispatch(toastError(`${error.response.data.message}`))
            console.log(error.response.data.message)
        } else {
            console.log(`Error`, error.message)
        }
    }
}
  return (
    <li className="rightbarUser">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={profileDataCollections.profilePhoto} alt="" />
      </div>
      <span className="rightbarUsername">{user.userName}</span>
    </li>
  );
}