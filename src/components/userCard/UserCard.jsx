import "./userCard.css"
import { MoreVert } from "@mui/icons-material"
import { Users, Posts } from "../../dummyData"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { URL_API } from "../../helper/url"
import { toastError } from "../../redux/actions/toastActions"
import ListPhoto from "../listPhoto/ListPhoto"

export default function UserCard ({post}) {
    const[collections, setCollections] = useState([])
    const[userPhotos, storeUserPhotos] = useState([])
    const dispatch = useDispatch

    useEffect(() => {
        fetchDataAllUser()
    }, [])
    
    
    const fetchDataAllUser = async () => {
        try{
            const profilePhoto = post.profile.profilePhoto
            const storePhotos = post.photos

            let slicedPhotos = []
            slicedPhotos = storePhotos.slice(0,4)
            
            setCollections(profilePhoto)
            storeUserPhotos(slicedPhotos)

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
    <div className="userCard" >
        
        <div className="cardWrapper">
            <div className="cardTop">
                <img 
                className="UserImg" 
                src={collections} 
                alt="" />
            </div>
            <div className="postCenter1">
                <h4 className="postText">{post.userName}</h4>
            </div>
            <div className="postCenter2">
                {userPhotos.map((u) => (
                 <ListPhoto key={u.id} entry={u} />
                ))}
            </div>
            <div className="postBottom">
                <h4 className="textDetails">Show more details</h4>
            </div>
        </div>
    </div>
  )
}
