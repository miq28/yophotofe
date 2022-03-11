import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { toastError } from '../redux/actions/toastActions';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import HeaderHome from '../components/HeaderHome';
import Footer from '../components/Footer';
import Pagination from '@mui/lab/Pagination';
import HeaderLogin from '../components/HeaderLogin';
import { useSelector } from 'react-redux';

function GalleryAll() {
  const auth = useSelector((state) => state.auth); //update header login
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
      let res = await axios.get(`${URL_API}/albums/galleryall?skip=0&take=1000`);
      // let res = await axios.get(`${URL_API}/photos?limit=100`);
      const albumsAll = res.data.result
      console.log(albumsAll)
      storeAlbumsAll(albumsAll)
      let numTotal = albumsAll.length
      setPageNumber(Math.ceil(numTotal / 15));
      console.log('pageNumber', pageNumber)
      let slicedAlbum = []
      slicedAlbum = albumsAll.slice(undefined, 15)

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


  const pageChange = async (event, value) => {
    setPage(value);
    const numTotal = albumsAll.length
    const start = 15 * (value - 1)
    const end = 15 * value
    console.log('value=', value, 'start=', start, 'end=', end)
    let slicedAlbum = []
    if (numTotal > 15) {
      slicedAlbum = albumsAll.slice(start, end)
      setCollections(slicedAlbum);
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
            onClick={() => onStudioClick(val.userId)}
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
         {
        auth.isLogin ? <HeaderLogin /> : (<HeaderHome headerHeight={165} />)
      }
        <div className="loader"></div>
      </>
    );
  }

  return (

    <div className="background-wrapper">

      {
        auth.isLogin ? <HeaderLogin /> : (<HeaderHome headerHeight={165} />)
      }

      <div className="galleryall-wrapper">
        <div className="gallery-title">Explore Photographer Gallery</div>
        <div className="galleryall-cards-container">{galleryAllImage()}</div>
        <div className="galleryall-pagination">
          <Pagination
            count={pageNumber}
            page={page}
            onChange={pageChange}
            shape="rounded"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GalleryAll;