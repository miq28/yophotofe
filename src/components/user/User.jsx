import "./user.css";
import { URL_API } from "../../helper/url";
import axios from "axios";
import { toastError } from "../../redux/actions/toastActions";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function User({ user }) {
  const [profileDataCollections, setProfileDataCollections] = useState([])
  const dispatch = useDispatch

  useEffect(() => {
    fetchDataProfile()
  }, [])

  const fetchDataProfile = async () => {
    try {
      const x = user.id
      // console.log("test")
      // console.log(x)

      const profile = await axios.get(`${URL_API}/users/profile`)
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
    <div>
      {profileDataCollections.map(person => (
        <p key={person.name}>{person.profilePhoto}</p>
      ))}
    </div>
  );
}

function App() {
  const people = [
    { id: 1, name: 'chris' },
    { id: 2, name: 'nick' }
  ];

  return (
    <div>
      {people.map(person => (
        <p key={person.id}>{person.name}</p>
      ))}
    </div>
  );
}