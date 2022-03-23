import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { useDispatch } from 'react-redux';
import { toastError, toastSuccess } from '../redux/actions/toastActions';
import { FaRegShareSquare } from 'react-icons/fa';
import { BsBoxArrowInDown, BsArrowUp } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router';
import { dateFormatter } from '../helper/dateformatter';

function TempDarkmode() {
  // const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const myRefOpen = useRef(null);
  const myRefBack = useRef(null);
  const [user, setUser] = useState({});
  const [collection, setCollection] = useState({});
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataImage();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDataImage = async () => {
    setIsLoading(true);
    try {
      var res = await axios.get(
        // `${URL_API}/collection/one?id_collection=${id}`
        // `${URL_API}/photos/${id}`
        `${URL_API}/photos?limit=10`
      );
      console.log('res', res)

      // let colImages = res.data.result.collectionImages.filter((item, index) => {
      //   return index % 2 !== 0;
      // });

      let colImages = [res.data.result]
      // colImages.push(res.data.result)

      // setUser(res.data.result.user);
      // setDate(res.data.result.date);
      setCollection(res.data.result);
      setImages(colImages);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const collectionAllImage = () => {
    return images.map((val, index) => {
      console.log('val', val)
      return <img src={val.path} alt="" />;
    });
  };

  const scrollOpen = () => {
    myRefOpen.current.scrollIntoView({ top: 0, left: 0, behavior: 'smooth' });
  };

  const scrollBack = () => {
    myRefBack.current.scrollIntoView({ top: 0, left: 0, behavior: 'smooth' });
  };

  const onClickDownload = () => {
    if (collection.downloadOption) {
      if (collection.password) {
        navigate.push(`/privacy/${id}`);
      } else {
        navigate.push(`/download/${id}`);
      }
    } else {
      dispatch(
        toastError('Sorry, you are not allowed to download this collections!')
      );
    }
  };

  const onClickShare = () => {
    navigator.clipboard.writeText(window.location.href);
    dispatch(
      toastSuccess('Link has been copied! Share it with your friend now!')
    );
  };

  if (isLoading) {
    return (
      <>
        <div className="loader"></div>
      </>
    );
  }

  return (
    <div className="darkmode-wrapper">
      <div ref={myRefBack} className="darkmode-header">
        <div className="dmh-background-blur">
          {/* <img src={collection.cover} alt="" /> */}
          <img src={`https://picsum.photos/seed/474/800/600`} alt="" />
        </div>
        <div className="dmh-info">
          <div className="dmh-logo-studioname">
            <div className="dmh-logo">
              {/* <img src={`${URL_API}${user.photo}`} alt="" /> */}
              <img src={`https://picsum.photos/seed/474/800/600`} alt="" />
            </div>
            {/* <div className="dmh-studioname">{user.businessName}</div> */}
          </div>
          <div onClick={scrollOpen} className="dmh-background">
            {/* <img src={collection.cover} alt="" /> */}
            <img src={`https://picsum.photos/seed/474/800/600`} alt="" />
          </div>
          <div className="dmh-titledate-desc">
            <div className="dmh-title-date">
              <div className="dmh-title">{collection.title}</div>
              <div className="dmh-date">{date && dateFormatter(date)}</div>
            </div>
            <div className="dmm-desc">{collection.description}</div>
          </div>
        </div>
      </div>
      <div className="darkmode-main">
        <div>
          <div ref={myRefOpen} className="dmm-title-studioname-info">
            <div className="dmm-info">
              <div className="cursor-pointer">
                <FaRegShareSquare style={{ marginBottom: '3px' }} />{' '}
                <span className="share" onClick={onClickShare}>
                  Share
                </span>
              </div>
              <div className="cursor-pointer">
                <BsBoxArrowInDown style={{ marginBottom: '3px' }} />{' '}
                <span onClick={onClickDownload}>Download</span>
              </div>
            </div>
          </div>
          <div className="dmm-cards-wrapper">{collectionAllImage()}</div>
        </div>
        <div>
          <div className="arrow-back">
            <button onClick={scrollBack}>
              <div>Back to top</div>
              <BsArrowUp size={30} />
            </button>
          </div>
        </div>
        <div className="darkmode-footer">
          <div className="footer-text-top">
            {/* Copyright &#xA9; 2022 <span>{user.businessName}</span> */}
          </div>
          <div className="footer-text-bottom">
            powered by <span>Yo!Photo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TempDarkmode;
