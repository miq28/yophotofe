import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { toastError } from '../redux/actions/toastActions';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import HeaderHome from '../components/HeaderHome';
import Footer from '../components/Footer';
import Pagination from '@material-ui/lab/Pagination';

function GalleryAll() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const [totalData, setTotalData] = useState(2);

  useEffect(() => {
    fetchDataGalleryAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDataGalleryAll = async () => {
    setIsLoading(true);
    try {
      // let res = await axios.get(`${URL_API}/albums?skip=0&take=15`);
      let res = await axios.get(`${URL_API}/albums?skip=0&take=15`);
      console.log(res.data.result)
      setCollections(res.data.result);
      let page = await fetchDataPage();
      setTotalData(page)
      // console.log('page',page)
      setPageNumber(Math.ceil(page / 15));
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.result.message}`));
      setIsLoading(false);
    }
  };

  const fetchDataPage = () => {
    return axios
      .get(`${URL_API}/albums/testing/test`)
      .then((res) => {
        // return res.data.totalData;
        return res.data.result.length;
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  const pageChange = async (event, value) => {
    setPage(value);
    try {
      // const skip = (value - 1) * 15
      // let take = 15;
      // if (skip > totalData) take = totalData - skip
      var res = await axios.get(
        `${URL_API}/albums/testing/test`
      );
      setCollections(res.data.result);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
    }
  };

  // document.getElementById('imgShow').src = 'https://picsum.photos/'+(200+rand())+'/' + (300 + rand()) +'?random=1';}

  function rand() { return Math.floor(Math.random() * 90) };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const galleryAllImage = () => {
    return collections.map((val, index) => {

      const imageUrl  ='https://picsum.photos/'+(400+rand())+'/' + (300 + rand()) +'?random=1'
      const dateTimeKu = formatDate(val.updatedAt)

      return (
        <div className="galleryall-cards" key={index}>
          <img
            // src={val.coverPhotoPath}
            src={imageUrl}

            alt="NoImageFound"
            onClick={() => onImageClick(val.id, val.theme)}
          />
          <div
            className="cards-text"
            onClick={() => onStudioClick(val.id)}
          >
            <div className="cards-text1">{val.title}</div>
            <div className="cards-text2">{dateTimeKu}</div>
            <div className="cards-text3">{val.name}</div>
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
        <div className="loader"></div>
      </>
    );
  }

  return (

    <div className="background-wrapper">
      <HeaderHome headerHeight={350} />
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