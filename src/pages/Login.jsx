import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { URL_API } from '../helper/url';
import { useDispatch, useSelector } from 'react-redux';
import {
  toastError,
  toastInfo,
  toastSuccess,
} from '../redux/actions/toastActions';
import Logo from '../assets/img/logo.png';

// helper function to delay the execution
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory()


  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    var data = {
      userName: email,
      password: password,
    };
    dispatch(toastInfo('Contacting backend server...'));
    await sleep(4000);
    try {
      const res = await axios.post(`${URL_API}/users/login`, data)

      // resData is response object from backend
      let resData = res.data.result

      if (res.status === 200) {
        // login succesfull
        // jwt cookies from backend should have been received at this stage!!

        dispatch(toastSuccess('Masuk brooo!'));
        await sleep(2000);

        localStorage.setItem('token', resData.token);

        const dispatchObj = {
          type: 'LOGIN',
          payload: {
            id: resData.id,
            token: resData.token,
            name: resData.profile.name,
            businessName: resData.profile.name,
            photo: resData.profile.profilePhoto,
            address: resData.profile.address,
            email: resData.email,
          },
        }
        dispatch(dispatchObj);
        window.location = '/homepage';
      }
      else {
        dispatch(toastError(resData.message));
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      if (true) {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (err.response.data.message) {
            dispatch(toastError(err.response.data.message));
          }
          // console.log(err.response.data);
          // console.log(err.response.status);
          // console.log(err.response.headers);
        } else if (err.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', err.message);
        }
      }
    }
  }

  if (isLoading) {
    return (
      <>
        <div className="loader"></div>
      </>
    );
  }

  if (auth.isLogin) {
    window.location = '/homepage';
  }

  return (
    <>
      <div className="port-background">
        <div className="port-main">
          <div className="port-main-header">
            <div className="port-main-header-logo" w-24 h-8>
              <img src={Logo} alt="portlogo" />
            </div>
            <div className="port-main-header-link">
              Don't have account? <Link to="/register">Signup</Link>
            </div>
          </div>
          <div className="port-text">Login</div>
          <div className="user-form">
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  autoFocus
                  className="custom-form-port"
                  type="text"
                  value={email}
                  placeholder="e.g. Diora"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="custom-form-port"
                  type="password"
                  value={password}
                  placeholder=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button block size="lg" type="submit"
              disabled={!(email && password)}
              >
                Login
              </Button>
            </Form>
          </div>
          <div className="port-main-footer-login">
            <Link to="/">Cancel and back to website</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;