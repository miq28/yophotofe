import Post from "../Post/Post"
import "./feed.css";
import { Posts } from "../../dummyData";
import { URL_API } from "../../helper/url";
import axios from "axios";
import { toastError } from "../../redux/actions/toastActions";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Feed() {
  const [collections, setCollections] = useState([])
  const dispatch = useDispatch

  useEffect(() => {
    fetchDataAllPhotos();
  }, []);

  const fetchDataAllPhotos = async () => {
    try{
      const res = await axios.get(`${URL_API}/photos?limit=5`)
      const photosAll = res.data.result

      setCollections(photosAll)
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
    <div className="feed">
      <div className="feedWrapper">
        <div className="feedUpload">
          <button className="upload">Upload Photo</button>
          <p className="desc">
          Photos uploaded by photographers you follow are added to your feed. 
          Remember your photos will appear in your followers’ feeds too. A great way to get your work out there
          </p>
        </div>
        {collections.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}