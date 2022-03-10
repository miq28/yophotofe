import "./post.css"
import { MoreVert } from "@mui/icons-material"
import { Users } from "../../dummyData"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { URL_API } from "../../helper/url"
import { toastError } from "../../redux/actions/toastActions"

export default function Post({post}) {
    const[like,setlike] = useState(post.photoDetail.likes)
    const[isLiked,setIsLiked] = useState(false)
    const[collections, setCollections] = useState([])
    const[profileDataCollections, setProfileDataCollections] = useState([])
    const[dateCollections,setDataCollections] = useState([])
    const dispatch = useDispatch

    useEffect(() => {
        fetchDataAllUser()
    }, [])
    
    const likeHandler =()=>{
        setlike(isLiked ? like -1 : like+1)
        setIsLiked(!isLiked)
    }

    const fetchDataAllUser = async () => {
        try{
            const x = post.userId
            const user = await axios.get(`${URL_API}/users/id/${x}`)
            const userData = user.data.result

            setCollections(userData)

            const profile = await axios.get(`${URL_API}/users/profile/userid/${x}`)
            const profileData = profile.data.result

            setProfileDataCollections(profileData)

            var dt = new Date(post.updatedAt);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const dtStr = dt.toLocaleDateString(undefined, options);

            function timeSince(dtStr) {
                const intervals = [
                  { label: 'year', seconds: 31536000 },
                  { label: 'month', seconds: 2592000 },
                  { label: 'day', seconds: 86400 },
                  { label: 'hour', seconds: 3600 },
                  { label: 'minute', seconds: 60 },
                  { label: 'second', seconds: 1 }
                ];
                
                const date = new Date(dtStr)
                const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
                const interval = intervals.find(i => i.seconds < seconds);
                const count = Math.floor(seconds / interval.seconds);
                return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
              }
         
              const timeSinceStr = timeSince(post.updatedAt)
            //   console.log('timeSinceStr', timeSinceStr)

            setDataCollections(timeSinceStr)

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
    <div className="post" >
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img 
                    className="postProfileImg" 
                    src={profileDataCollections.profilePhoto}
 
                    alt="" />
                    <span className="postUsername">
                        {collections.userName}
                        </span>
                    <span className="postDate">{dateCollections}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>

            </div>
            <div className="postCenter">
                <span className="postText">{post?.description}</span>
                <img className="postImg" src={post.path} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like} people liked it</span>
                </div>
                <div className="postBottomRight">
                    {/* <span className="postCommentText">{post.comment} comments</span> */}
                </div>
            </div>
        </div>
    </div>
  )
}
