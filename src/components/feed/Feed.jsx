// import Post from "../Post/Post"
// import "./feed.css";
// import { Posts } from "../../dummyData";
// import { URL_API } from "../../helper/url";
// import React, { useState, useEffect, useReducer } from 'react';
// import axios from 'axios';

// import { useDispatch } from 'react-redux';
// import { useHistory, useParams } from 'react-router-dom';



// export default async function  Feed() {
//   const [collections, setCollections] = useState([]);

//   let res = await axios.get(`${URL_API}/albums/galleryall?skip=0&take=1000`);
//       const albumsAll = res.data.result
//       console.log(albumsAll)
//       setCollections(albumsAll);

//       const galleryAllImage = () => {
//         return collections.map((val, index) => {
//           var dt = new Date(val.updatedAt);
//           const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//           const dtStr = dt.toLocaleDateString(undefined, options);
//           val.theme = 'classic'
//           return (
//             <div className="galleryall-cards" key={index}>
//               <img
//                 src={val.path}
//                 alt="NoImageFound"
//               />
//               <div
//                 className="cards-text"
//               >
//                 <div className="cards-text1">{val.title}</div>
//                 <div className="cards-text2">{val.name}</div>
//                 <div className="cards-text2">{dtStr}</div>
//               </div>
//             </div>
//           );
//         });
//       };
    
//   return (
//     <div className="feed">
//       <div className="feedWrapper">
//       {galleryAllImage()}
//         {/* {Posts.map((p) => (
//           <Post key={p.id} post={p} />
//         ))} */}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { URL_API } from '../../helper/url';
import { toastError } from '../../redux/actions/toastActions';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import HeaderHome from '../../components/HeaderHome';
import Pagination from '@material-ui/lab/Pagination';
import { Posts } from "../../dummyData";
import Post from "../Post/Post"



function Feed() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const [albumsAll, storeAlbumsAll] = useState([]);

  useEffect(() => {
    fetchDataGalleryAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDataGalleryAll = async () => {
    setIsLoading(true);
    try {
      //ini yang server 1
      // let res = await axios.get(`${URL_API}/albums?skip=0&take=5`);
      // setCollections(res.data.data);

      //ini yang server 2
      let res = await axios.get(`${URL_API}/photos?limit=10`);
      const albumsAll = res.data.result
      console.log(albumsAll)
      storeAlbumsAll(albumsAll)
      let numTotal = albumsAll.length
      setPageNumber(Math.ceil(numTotal / 15));
      let slicedAlbum = []
      slicedAlbum = albumsAll.slice(0, 15)

      setCollections(slicedAlbum);
      // let page = await fetchDataPage();

      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        dispatch(toastError(`${error.response.data.message}`));
        console.log(error.response.data.message)
      } else {
        console.log('Error', error.message);
      }

      setIsLoading(false);
    }

    // setCollections(defaultBack);
  };

  // const fetchDataPage = () => {
  //   return axios
  //     .get(`${URL_API}/albums/galleryall`)
  //     .then((res) => {
  //       return res.data.result;
  //     })
  //     .catch((err) => {
  //       dispatch(toastError(`${err.response.data.message}`));
  //     });
  // };

  const pageChange = async (event, value) => {
    setPage(value);
    try {
      const numTotal = albumsAll.length
      let slicedAlbum = []
      if (numTotal > 15) slicedAlbum = albumsAll.slice(15 * (value - 1), 15 * value)
      setCollections(slicedAlbum);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
    }
  };

  const galleryAllImage = () => {
    return collections.map((val, index) => {
      var dt = new Date(val.updatedAt);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dtStr = dt.toLocaleDateString(undefined, options);
      val.theme = 'classic'
      return (
        <div className="galleryall-cards" key={index}>
          <img
            src={val.path}
            alt="NoImageFound"
            onClick={() => onImageClick(val.albumId, val.theme)}
          />
          <div
            className="cards-text"
            onClick={() => onStudioClick(val.albumId)}
          >
            <div className="cards-text1">{val.title}</div>
            <div className="cards-text2">{val.name}</div>
            <div className="cards-text2">{dtStr}</div>
          </div>
        </div>
      );
    });
  };

  const onImageClick = (id, theme) => {
    let themeLower = theme.toLowerCase();
    window.location = `/temp/${themeLower}/${id}`;
  };

  const onStudioClick = (idStudio) => {
    history.push(`/gallery/photographer/${idStudio}`);
  };

  if (isLoading) {
    return (
      <>
        <HeaderHome />
        {/* <div className="loader"></div> */}
      </>
    );
  }
  // const yangkitapunya = [
  //   {
  //     id: ok
  //     description: ok 
  //     path: ok
  //     createdA: ok
  //     userId: ok
  //     like: 
  //     comment: 
  //   }
  // ]
  // const targetKita = [
  //   {
  //     id: 
  //     desc: 
  //     photo: 
  //     date: "
  //     userId: 
  //     like: 
  //     comment: 
  //   }
  // ]
  // const testArray = [
  //   {
  //     id: 1,
  //     desc: "Love For All, Hatred For None.",
  //     photo: "https://picsum.photos/seed/253/800/600",
  //     date: "5 mins ago",
  //     userId: 1,
  //     like: 32,
  //     comment: 9,
  //   },
  //   {
  //     id: 2,
  //     photo: "https://picsum.photos/seed/253/800/600",
  //     date: "15 mins ago",
  //     userId: 2,
  //     like: 2,
  //     comment: 1,
  //   }
  // ]
  return (

    <div className="feed">
     <div className="feedWrapper">
      {/* {galleryAllImage()} */}
        {collections.map((p) => (
          <Post key={p.id} post={p} />
         ))}
       </div>
     </div>
  );
}

export default Feed;
