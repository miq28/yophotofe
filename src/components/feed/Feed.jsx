import Post from "../Post/Post"
import "./feed.css";
import { Posts } from "../../dummyData";
import { URL_API } from "../../helper/url";
import axios from "axios";
import { toastError } from "../../redux/actions/toastActions";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MoreVert } from "@mui/icons-material"

export default function Feed() {
  const [collections, setCollections] = useState([])
  // const [profiles, setProfiles] = useState([])
  const [profilePhotos, setProfilePhotos] = useState([])
  // const[like,setlike] = useState(post.photoDetail.likes)
  const [like, setlike] = useState()
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch

  useEffect(() => {
    fetchProfiles();
    // fetchPhotos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProfiles = async () => {
    setIsLoading(false);
    try {
      const res = await axios.get(`${URL_API}/photos?limit=100`)
      const photosAll = res.data.result
      console.log('photosAll', photosAll)

      const res2 = await axios.get(`${URL_API}/users/profile?skip=0&take=100`)
      const profileAll = res2.data.result
      console.log('profileAll', profileAll)

      const profilePhotoArray = photosAll.map(i => {
        const el = profileAll.find(profile => profile.userId === i.userId);
        return el.profilePhoto
      })

      setProfilePhotos(profilePhotoArray)
      setCollections(photosAll)

      setIsLoading(false);

    } catch (error) {
      if (error.response) {
        dispatch(toastError(`${error.response.data.message}`))
        console.log(error.response.data.message)
      } else {
        console.log(`Error`, error.message)
      }
    }
  }

  const handleClick = (event) => {
    window.location = '/upload';
  };

  const likeHandler = () => {
    setlike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }

  if (isLoading) {
    return (
      <>
        <div className="loader"></div>
      </>
    );
  }

  return (
    <div className="feed">
      <div className="feedWrapper">
        <div className="feedUpload">
          <button className="uploadHome" onClick={handleClick}>Upload Photo</button>
          <p className="desc">
            Photos uploaded by photographers you follow are added to your feed.
            Remember your photos will appear in your followers’ feeds too. A great way to get your work out there
          </p>
        </div>

        {/* {collections.map((p) => (
          <Post key={p.id} post={p} />
        ))} */}



        {collections.map((photo, index) => (
          <div className="post" key={photo.id}>
            <div className="postWrapper">
              <div className="postTop">
                <div className="postTopLeft">
                  <img
                    className="postProfileImg"
                    src={profilePhotos[index]}

                    alt="" />
                  <span className="postUsername">
                    {collections.userName}
                  </span>
                  <span className="postDate">{photo.updatedAt}</span>
                </div>
                <div className="postTopRight">
                  <MoreVert />
                </div>

              </div>
              <div className="postCenter">
                <span className="postText">{photo.title}</span>
                <img className="postImg" src={photo.path} alt="" />
              </div>
              <div className="postBottom">
                <div className="postBottomLeft">
                  <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="" />
                  <span className="postLikeCounter">{photo.photoDetail.likes} people liked it</span>
                </div>
                <div className="postBottomRight">
                  {/* <span className="postCommentText">{post.comment} comments</span> */}
                </div>
              </div>
            </div>
          </div>
        ))}






      </div>
    </div>
  );
}