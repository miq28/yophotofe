import "./listPhoto.css";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { URL_API } from "../../helper/url"
import { toastError } from "../../redux/actions/toastActions"
import Collections from "@mui/icons-material/Collections";

export default function ListPhoto({entry}) {
  const[collections, setCollections] = useState([])
  const dispatch = useDispatch

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try{
        const userPhotos = entry.path
        console.log(userPhotos)
        // console.log(profileData)
        setCollections(userPhotos)
        // console.log(collections.path)

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
    <li className="photos">
      <div className="photosImgContainer">
        <img className="photosImg" src={collections} alt="" />
      </div>
    </li>
  );
}