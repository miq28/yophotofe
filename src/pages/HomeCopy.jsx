// import React, { useEffect, useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import { URL_API } from '../../helper/url';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import Header from '../../components/Header';
// import Feed from '../../components/Feed/Feed';
// import "../components/homePage.css"
// import axios from 'axios';
// import { toastError } from '../../redux/actions/toastActions';


// function HomePage() {
//   const [collections, setCollections] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [pageNumber, setPageNumber] = useState(0);
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [albumsAll, storeAlbumsAll] = useState([]);

//   useEffect(() => {
//     fetchDataGalleryAll();
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   const fetchDataGalleryAll = async () => {
//     setIsLoading(true);
//     try {
      
//       let res = await axios.get(`${URL_API}/photos?limit=500`);
//       const albumsAll = res.data.result
//       console.log(albumsAll)
//       storeAlbumsAll(albumsAll)
//       let numTotal = albumsAll.length
//       setPageNumber(Math.ceil(numTotal / 15));
//       let slicedAlbum = []
//       slicedAlbum = albumsAll.slice(0, 15)

//       setCollections(slicedAlbum);

//       setIsLoading(false);
//     } catch (error) {
//       if (error.response) {
//         dispatch(toastError(`${error.response.data.message}`));
//         console.log(error.response.data.message)
//       } else {
//         console.log('Error', error.message);
//       }

//       setIsLoading(false);
//     }

//   };

//   const pageChange = async (event, value) => {
//     setPage(value);
//     try {
//       const numTotal = albumsAll.length
//       let slicedAlbum = []
//       if (numTotal > 15) slicedAlbum = albumsAll.slice(15 * (value - 1), 15 * value)
//       setCollections(slicedAlbum);
//     } catch (error) {
//       dispatch(toastError(`${error.response.data.message}`));
//     }
//   };

//   const galleryAllImage = () => {
//     return collections.map((val, index) => {
//       var dt = new Date(val.updatedAt);
//       const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//       const dtStr = dt.toLocaleDateString(undefined, options);
//       val.theme = 'classic'
//       return (
//         <div className="feed-cards" key={index}>
//           <img
//             src={val.path}
//             alt="NoImageFound"
//             onClick={() => onImageClick(val.albumId, val.theme)}
//           />
//           <div
//             className="cards-text"
//             onClick={() => onStudioClick(val.albumId)}
//           >
//             <div className="cards-text1">{val.title}</div>
//             <div className="cards-text2">{val.name}</div>
//             <div className="cards-text2">{dtStr}</div>
//           </div>
//         </div>
//       );
//     });
//   };

//   const onImageClick = (id, theme) => {
//     let themeLower = theme.toLowerCase();
//     window.location = `/temp/${themeLower}/${id}`;
//   };

//   const onStudioClick = (idStudio) => {
//     history.push(`/gallery/photographer/${idStudio}`);
//   };


//   return (
//     <>
//       <Header />
//       <div className='w-screen p-3 mt-20 text-center'>
//         <button className='mb-4 bg-gradient-to-r from-yellow-500 to-black text-white text-2xl px-4 py-2 '>Upload foto </button>
//         <p> Photos uploaded by photographers you follow are added to your feed.</p>
//         <p>Remember your photos will appear in your followers’ feeds too. A great way to get your work out there.</p>
//       </div>
//       <div className="galleryall-wrapper">
//       <div className="galleryall-cards-container">{galleryAllImage()}</div>

//       </div>
//     </>
//   );
// }

// export default HomePage;
