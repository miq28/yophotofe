import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { URL_API } from '../helper/url';
import { toastError } from '../redux/actions/toastActions';
import HeaderHome from '../components/HeaderHome';
import { useDispatch } from 'react-redux';
import { HiOutlineMail } from 'react-icons/hi';
import Pagination from '@material-ui/lab/Pagination';

function GalleryPhoto() {
  const { id } = useParams();
  const [image, setImage] = useState([]);
  const [imageBackup, setImageBackup] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const [studioName, setStudioName] = useState('');
  const [studioImage, setStudioImage] = useState(false);
  const [studioEmail, setStudioEmail] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataGalleryPhoto();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const fetchDataGalleryPhoto = async () => {
    setIsLoading(true);
    try {
      console.log(id)
      // ambil photo
      var res = await axios.get(
        `${URL_API}/albums/id/${id}`
      );

      const response = res.data.result
      console.log(response)
      // ambil user
      let getUser = await fetchUser(response.profile.userId);
      setStudioImage(getUser.profilePhoto);
      setStudioName(getUser.name);
      
      setImageBackup(response.photos);
      // setStudioEmail(res.data.email);
      setImage(response.photos);





      setPageNumber(Math.ceil(res.data.result.length / 15));
      setIsLoading(false);
    } catch (error) {
      // dispatch(toastError(`${error.response.message}`));
      setIsLoading(false);
    }
  };

  const fetchUser = (idUser) => {
    return axios.get(`${URL_API}/users/profile/userid/${idUser}`).then((res) => {
      return res.data.result;
    });
  };

  const pageChange = async (event, value) => {
    setPage(value);
    try {
      var res = await axios.get(
        `${URL_API}/collection/oneUser?limit=15&page=${value - 1}&id_user=${id}`
      );
      console.log(res)
      setImage(res.data.result);
    } catch (error) {
      console.log(error)
      // dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const galleryPhotoImage = () => {
    return image.map((val, index) => {
      return (
        <div className="gallery-cards">
          <img
            className="cards-img"
            src={val.path}
            alt="noImageFound"
            onClick={() => onImageClick(val.id, val.theme)}
          />
          <div className="cards-text">
            <div className="cards-text1">{val.title}</div>

          </div>
        </div>
      );
    });
  };
  const onImageClick = (id, theme) => {
    let themeLower = theme.toLowerCase();
    window.location = `/temp/${themeLower}/${id}`;
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
    <>
     <div className="background-wrapper">
     <HeaderHome headerHeight={350} />
      <div className="galleryphoto-wrapper">
        <div className="gallery-head">
          <Link className="gallery-link" to="/gallery/all">
            <img
              className="gallery-logo"
              src={`${studioImage}`}
              alt=""
            />
            <div className="logo-name">{studioName}</div>
          </Link>
          <div className="gallery-search">
            <div className="search-input">
              <input
                type="search"
                placeholder="Search gallery"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="search-icon">
              <FiSearch size={16} />
            </div>
          </div>
        </div>
        <div className="gallery-wrapper">{galleryPhotoImage()}</div>
        <div className="gallery-pagination">
          <Pagination
            count={pageNumber}
            page={page}
            onChange={pageChange}
            shape="rounded"
          />
        </div>
        <div className="gallery-footer">
          <div className="gallery-footer-contact">Contact {studioName}</div>
          <div className="gallery-footer-email">
            <HiOutlineMail style={{ marginTop: '-1px' }} /> {studioEmail}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default GalleryPhoto;