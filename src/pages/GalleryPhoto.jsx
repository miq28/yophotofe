import { Pagination } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import HeaderHome from '../components/HeaderHome';
import { URL_API } from '../helper/url';
import log from '../utils/logger';
import HeaderLogin from './../components/HeaderLogin';





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
  const [titleGambar, setTitleGambar] = useState('');
  const [captionGambar, setCaptionGambar] = useState('');
  const [isOpen, setOpen] = useState({});
  const auth = useSelector((state) => state.auth);

  // let pageNumber
  const numPhotoPerPage = 15

  useEffect(() => {
    fetchDataGalleryPhoto();
    // pageChange()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  async function fetchDataGalleryPhoto() {
    setOpen(false)
    setIsLoading(true);
    log.info(id)

    const fetchUser = async (idUser) => {
      return await axios.get(`${URL_API}/users/profile/userid/${idUser}`).then((res) => {
        return res.data.result;
      });
    };


    let getUser = await fetchUser(id);
    setStudioImage(getUser.profilePhoto);
    setStudioName(getUser.name);


    async function fetchUserPhotosByUserId(x) {
      const res = await axios.get(`${URL_API}/photos/user/${x}?skip=0&take=${15}`);
      log.info('photos', res.data.result)
      return res.data
    }

    const data = await fetchUserPhotosByUserId(id)
    log.info('DATA', data)


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
    const photos = data.result
    log.info('photos', photos)

    const maxData = data.max
    log.info('maxData', maxData)
    const numPage = Math.ceil(maxData / numPhotoPerPage)
    setPageNumber(numPage);

    setImageBackup(photos);
    const sliced = await photos.slice(undefined, numPhotoPerPage)
    setImage(sliced);
    log.info(photos.length, numPhotoPerPage)

    log.info('pageNumber', pageNumber)
    setIsLoading(false);
  };

  // const numPhotoPerPage = 6

  const pageChange = async (event, pageNum) => {
    if (page === pageNum) return;
    setPage(pageNum);
    // const numTotal = imageBackup.length
    // let slicedPhotos = []
    const start = numPhotoPerPage * (pageNum - 1)
    const end = numPhotoPerPage * pageNum
    log.info('pageNum=', pageNum, 'start=', start, 'end=', end)
    const res = await axios.get(`${URL_API}/photos/user/${id}?skip=${start}&take=${numPhotoPerPage}`);    
    const photos = res.data.result
    log.info('more photos', photos)
    setImageBackup(photos);
    const sliced = await photos.slice(undefined, numPhotoPerPage)
    setImage(sliced);
    // setImage(res.data.results);
    // if (numTotal > numPhotoPerPage) {
    //   slicedPhotos = imageBackup.slice(start, end)
    //   setImage(slicedPhotos);
    // }
  };


  // const onImageClick = (id, theme) => {
  //   theme = 'darkmode'
  //   let themeLower = theme.toLowerCase();
  //   window.location = `/temp/${themeLower}/${id}`;
  // };

  const onImageClick = (bool, url, title, desc) => {
    // theme = 'darkmode'
    const regex = /800\/600/i;
    if (url.match(regex)) {
      url = url.replace(regex, '1600/900')
    }
    setGambar(url)
    setTitleGambar(title)
    setCaptionGambar(desc)
    setOpen(bool);
  };

  if (isLoading) {
    return (
      <>
        <HeaderHome />
        <div className="loader"></div>
      </>
    );
  }

  // let isOpen = false

  // const { photoIndex, isOpen } = this.state;


  return (
    <>


      <div>
        {/* <button type="button" onClick={() => this.setState({ isOpen: true })}>
          Open Lightbox
        </button> */}

        {isOpen && (
          <Lightbox
            mainSrc={gambar}
            imageTitle={titleGambar}
            imageCaption={captionGambar}
            // nextSrc={images[(0 + 1) % images.length]}
            // prevSrc={images[(0 + images.length - 1) % images.length]}
            onCloseRequest={() => setOpen(false)}

          // onMovePrevRequest={() =>
          //   setOpen({
          //     photoIndex: (photoIndex + images.length - 1) % images.length,
          //   })
          // }
          // onMoveNextRequest={() =>
          //   setOpen({
          //     photoIndex: (0 + 1) % images.length,
          //   })
          // }
          />
        )}
      </div>







      <div className="background-wrapper">
        {
          auth.isLogin ? <HeaderLogin /> : (<HeaderHome headerHeight={165} />)
        }

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
          </div>
          <div className="gallery-wrapper">
            {image.map(val => (
              <div className="gallery-cards" key={val.id}>
                <img
                  className="cards-img"
                  src={val.path}
                  alt="noImageFound"
                  // onClick={() => onImageClick(val.id, val.theme)}
                  onClick={() => onImageClick(true, val.path, val.title, val.description)}
                // onClick={() => setOpen(true)}
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
              variant="outlined" color="secondary"
              onChange={pageChange}
              // shape="rounded"
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