import axios from 'axios';
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import HeaderProps from '../../components/HeaderProps';
import { URL_API } from '../../helper/url';
import { toastError, toastSuccess, toastWarning } from '../../redux/actions/toastActions';

function Upload() {
  const auth = useSelector((state) => state.auth);
  const [businessName, setBusinessName] = useState();
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState();
  const [picture, setPicture] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [tag, setTag] = useState();
  const dispatch = useDispatch();


  useEffect(() => {
    if (auth.isLogin) {
      // if (true) {

      const jwtToken = localStorage.getItem('token')
      const decoded = jwt_decode(jwtToken)
      console.log('profile decoded', decoded)

      setBusinessName(auth.businessName);
      setAddress(auth.address);
      setEmail(decoded.email);
      setName(auth.name);
      setPhoto(auth.photo);
      setIsLoading(false);
      // fetchUser();
    } else {
      setTimeout(() => {
        dispatch(toastWarning(`Kamu belum login 😍`));
        window.location = '/';
      }, 2000);

    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const fetchUser = async () => {
  //   setIsLoading(true);
  //   try {
  //     var res = await axios.get(`${URL_API}/photos/upload`);
  //     let respon;
  //     if (res.status === 200) {
  //       const respon = res.data.result
  //       console.log(respon)
  //       setBusinessName(respon.name);
  //       setAddress(respon.address);
  //       // setEmail(respon.email);
  //       setName(respon.name);
  //       setPhoto(respon.profilePhoto);
  //       setIsLoading(false);
  //     }
  //     else {
  //       console.log(respon.message)
  //       dispatch(toastError(`${respon.message}`));
  //     }
  //   } catch (err) {
  //     setIsLoading(false);
  //     if (true) {
  //       if (err.response) {
  //         if (err.response.data.message) {
  //           dispatch(toastError(err.response.data.message));
  //         }
  //       } else if (err.request) {
  //         console.log(err.request);
  //       } else {
  //         console.log('Error', err.message);
  //       }
  //     }
  //   }
  // };

  const onPhotoChange = (e) => {
    const photoUrl = URL.createObjectURL(e.target.files[0])
    console.log(photoUrl)
    setPicture(photoUrl);
    setPhoto(e.target.files[0]);
  };

  const onSave = (e) => {
    e.preventDefault();
    var bodyFormData = new FormData();
    if (picture) {
      bodyFormData.append('photo', photo);
    }
    bodyFormData.append('title', title);
    bodyFormData.append('description', description);
    bodyFormData.append('tag', tag);
    axios({
      method: 'POST',
      url: `${URL_API}/photos/upload`,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log(res.data)
        if (res.status === 200) {
          dispatch(toastSuccess('Photo has been uploaded successfully.'));
          setTimeout(() => {
            window.location = '/homepage';
          }, 2000);
        } else {
          if (res.data.message) {
            if (Array.isArray(res.data.message)) {
              console.log(res.data.message)
              res.data.message.forEach(element => console.log(element));
            }
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (true) {
          if (err.response) {
            if (err.response.data.message) {
              dispatch(toastError(err.response.data.message));
            }
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log('Error', err.message);
          }
        }

      });
  };

  if (isLoading) {
    return (
      <>
        <HeaderProps title="Upload Photo" link="/upload" />
        <div className="loader"></div>
      </>
    );
  }

  return (
    <>
      <HeaderProps title="Upload Photo" link="/upload" />
      <div className="profile-container">
        <Form onSubmit={onSave} className="profile-inner-container">
        <div className="profile-photo">
            <div className="profile-photo-text">Images</div>
            <div className="profile-photo-upload">
              <input id="previewImage" type="file" onChange={onPhotoChange} />
            </div>
            <div className="photo-preview">
              <img style={{ color: "red", maxheight: "500px", height: "70%", width: "auto" }} src={picture} alt="" />
            </div>
          </div>
          <Form.Group>
            <Form.Label className="profile-bn">Title</Form.Label>
            <Form.Control
              autoFocus
              className="custom-form-port"
              type="text"
              // placeholder={title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="profile-ad">Description</Form.Label>
            <Form.Control
              className="custom-form-port"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="profile-ad">Tag (Comma separated)</Form.Label>
            <Form.Control
              className="custom-form-port"
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </Form.Group>
          <div className="profile-button-container">
            <Button
              className="profile-button"
              variant="primary"
              onClick={onSave}
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Upload;
