import "./listAlbum.css";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { URL_API } from "../../helper/url"
import { toastError } from "../../redux/actions/toastActions"
import Collections from "@mui/icons-material/Collections";

export default function ListAlbum({ entry }) {
    const [collections, setCollections] = useState([])
    const [userCoverAlbum, setUserCoverAlbum] = useState([])
    const dispatch = useDispatch

    useEffect(() => {
        fetchPhotos()
    }, [])

    const fetchPhotos = async () => {
        try {
            const user = await axios.get(`${URL_API}/users/id/${entry}`)
            const coverPhoto = user.profile.coverPhoto
            console.log(coverPhoto)
            // console.log(profileData)
            setCollections(coverPhoto)


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
        <li className="albums">
            <div className="albumsImgContainer">
                <img className="albumsImg" src={collections} alt="" />
            </div>
        </li>
    );
}