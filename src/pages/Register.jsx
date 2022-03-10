import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { URL_API } from '../helper/url';
import { toastError, toastSuccess } from '../redux/actions';
import Logo from '../assets/img/logo.png';

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  // const [bsName, setBsName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (auth.isLogin === true) {
    history.push('/');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    var data = {
      email: email,
      password: password,
      userName: name,
    };
    // const response = await axios.post(`${URL_API}/users/signup`, data);
    // console.log(response);
    axios
      .post(`${URL_API}/users/signup`, data)
      .then((res) => {
        console.log(res)
        const respond = res.data.result
        dispatch(
          toastSuccess('Success! You are now logged in with your new account!')
        );

        if (respond && respond.token) {
          localStorage.setItem('token', respond.token);
        } else {
          throw new Error('No token received from backend')
        }

        setTimeout(() => {
          window.location = '/HomePage';
        }, 3000);
      })
      .catch((err) => {
        console.log(err)
        console.log(err.response.data)
        dispatch(toastError(`${err.response.data.message}`));
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return (
      <>
        <div className="loader"></div>
      </>
    );
  }

  return (
    <>
      <div className="port-background">
        <div className="port-main">
          <div className="port-main-header">
            <div className="port-main-header-logo">
              <img src={Logo} alt="portlogo" />
            </div>
            <div className="port-main-header-link">
              Already have account? <Link to="/login">Login</Link>
            </div>
          </div>
          <div className="port-text">Create an account</div>
          <div className="user-form">
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="name">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  autoFocus
                  required
                  type="text"
                  value={name}
                  placeholder="Diora"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  value={email}
                  placeholder="e.g. Diora@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={password}
                  placeholder=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button block size="lg" type="submit">
                Signup
              </Button>
            </Form>
          </div>
          <div className="port-main-footer">
            <Link to="/">Cancel and back to website</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
