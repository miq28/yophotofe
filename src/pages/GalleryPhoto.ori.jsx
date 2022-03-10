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
  const [pageNumber, setPageNumber] = useState(1);
  const [studioName, setStudioName] = useState('');
  const [studioImage, setStudioImage] = useState(false);
  const [studioEmail, setStudioEmail] = useState('');
  const dispatch = useDispatch();
  // const [numPhotoPerPage, setNumPhotoPerPage] = useState(0);
  const [gambar, setGambar] = useState('');

  // let pageNumber
  const numPhotoPerPage = 15

  useEffect(() => {
    fetchDataGalleryPhoto();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  async function fetchDataGalleryPhoto() {
    setIsLoading(true);
    console.log(id)

    const fetchUser = async (idUser) => {
      return await axios.get(`${URL_API}/users/profile/userid/${idUser}`).then((res) => {
        return res.data.result;
      });
    };


    let getUser = await fetchUser(id);
    setStudioImage(getUser.profilePhoto);
    setStudioName(getUser.name);


    async function fetchUserPhotosByUserId(x) {
      const res = await axios.get(`${URL_API}/photos/user/${x}?skip=0&take=100`);
      console.log('photos', res.data.result)
      return res.data.result
    }

    const photos = await fetchUserPhotosByUserId(id)

    // const imas = photos.map(x => (
    //   {
    //     url: x.path,
    //     title: 'title'
    //   }
    // ));
    // setImage(imas)

    // reformattedArray is now [{1: 10}, {2: 20}, {3: 30}],

    // image.map(val => )

    // THIS SET THE TARGET NUMBER OF PHOTOS PER PAGE
    // setNumPhotoPerPage(9)

    const numPage = Math.ceil(photos.length / numPhotoPerPage)
    setPageNumber(numPage);

    setImageBackup(photos);
    const sliced = await photos.slice(undefined, numPhotoPerPage)
    setImage(sliced);
    console.log(photos.length, numPhotoPerPage)

    console.log('pageNumber', pageNumber)
    setIsLoading(false);
  };

  // const numPhotoPerPage = 6

  const pageChange = async (event, value) => {
    setPage(value);
    const numTotal = imageBackup.length
    let slicedPhotos = []
    const start = numPhotoPerPage * (value - 1)
    const end = numPhotoPerPage * value
    console.log('value=', value, 'start=', start, 'end=', end)
    if (numTotal > numPhotoPerPage) {
      slicedPhotos = imageBackup.slice(start, end)
      setImage(slicedPhotos);
    }
  };


  const onImageClick = (id, theme) => {
    theme = 'darkmode'
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
          <div className="gallery-wrapper">
            {image.map(val => (
              <div className="gallery-cards" key={val.id}>
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
            ))};
          </div>
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