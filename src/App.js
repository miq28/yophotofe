import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useEffect } from 'react';
import 'react-awesome-lightbox/build/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/style.scss';
import { URL_API } from './helper/url';
import Contest from "./pages/contest/Contest";
// import Download from './pages/Download';
// import CollectionNew from './pages/CollectionNew';
// import Testing from './pages/Testing';
// import CollectionEdit from './pages/CollectionEdit';
import Dashboard from './pages/Dashboard';
// import ProjectNew from './pages/ProjectNew';
// import ProjectEdit from './pages/ProjectEdit';
// import Collections from './pages/Collections';
// import Projects from './pages/Projects';
import GalleryAll from './pages/GalleryAll';
import GalleryPhoto from './pages/GalleryPhoto';
import Homepage from './pages/homepage/HomePage';
import Login from './pages/Login';
// import Packages from './pages/Packages';
// import PackagesNew from './pages/PackagesNew';
// import PackagesEdit from './pages/PackagesEdit';
// import ProjectDetails from './pages/ProjectDetails';
// import InvoiceNew from './pages/invoices/InvoiceNew';
// import InvoiceEdit from './pages/invoices/InvoiceEdit';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import Profile from './pages/Profile';
import Register from './pages/Register';
import TempClassic from './pages/TempClassic';
import TempDarkmode from './pages/TempDarkmode';
import TempMinimalism from './pages/TempMinimalism';
import Miq from './pages/test';
import Upload from './pages/upload/Upload';
import UserAll from './pages/userAll/UserAll';
import { toastSuccess, toastWarning } from './redux/actions/toastActions';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    process()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function process() {
    if (auth.token) {
      auth.isLogin ?
        dispatch(toastSuccess('You are logged in!')) :
        dispatch(toastWarning('Token has expired!'));
    }

    try {
      const jwtToken = localStorage.getItem('token')
      if (false) {
        const decoded = jwt_decode(jwtToken)
        console.log(decoded)
        // var config = {
        //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        // };

        const res = await axios.get(`${URL_API}/users/profile/userid/${decoded.id}`)
        // .get(`${URL_API}/users/profile/userid/${decoded.id}`, config)
        console.log(res.data)
        dispatch({
          type: 'LOGIN',
          payload: {
            id: res.data.result.userId,
            token: localStorage.getItem('token'),
            name: res.data.result.name,
            businessName: res.data.result.name,
            photo: res.data.result.profilePhoto,
            address: res.data.result.address,
            email: res.data.result.userId,
          },
        });
      }
    } catch (err) {
      console.log(err);
      // localStorage.removeItem('token');
      setTimeout(() => {
        window.location = '/';
      }, 2000);

      // if (err.response) {
      //   // dispatch(toastError(`${err.response.data.message}`));
      //   console.log(err.response.data.message)
      // } else {
      //   console.log('Error', err.message);
      // }
      // // setIsLoading(false);
    }
  }

  // if (!localStorage.getItem('token')) {
  //   return (
  //     <>
  //       <ToastContainer
  //         position="bottom-right"
  //         autoClose={5000}
  //         hideProgressBar={false}
  //         newestOnTop={false}
  //         closeOnClick
  //         rtl={false}
  //         pauseOnFocusLoss
  //         draggable
  //         pauseOnHover
  //       />
  //       <Switch>
  //         <Route exact path="/" component={Home} />
  //         <Route exact path="/register" component={Register} />
  //         <Route exact path="/login" component={Login} />
  //         <Route exact path="/gallery/all" component={GalleryAll} />
  //         <Route
  //           exact
  //           path="/gallery/photographer/:id"
  //           component={GalleryPhoto}
  //         />
  //         <Route exact path="/temp/classic/:id" component={TempClassic} />
  //         <Route exact path="/temp/minimalism/:id" component={TempMinimalism} />
  //         <Route exact path="/temp/darkmode/:id" component={TempDarkmode} />
  //         <Route exact path="/privacy/:id" component={Privacy} />
  //         {/* <Route exact path="/download/:id" component={Download} />
  //         <Route exact path="/collections" component={Collections} /> */}
  //         <Route exact path="/collections/new" component={NotLogin} />
  //         <Route exact path="/collections/edit/:id" component={NotLogin} />
  //         <Route exact path="/testing" component={NotLogin} />
  //         <Route exact path="/dashboard" component={NotLogin} />
  //         <Route exact path="/profile" component={NotLogin} />
  //         {/* <Route exact path="/projects/new" component={NotLogin} /> */}
  //         {/* <Route exact path="/projects/edit/:id" component={NotLogin} /> */}
  //         {/* <Route exact path="/projects/details/:id" component={NotLogin} /> */}
  //         {/* <Route exact path="/projects" component={NotLogin} /> */}
  //         {/* <Route exact path="/packages" component={NotLogin} /> */}
  //         {/* <Route exact path="/packages/new" component={NotLogin} /> */}
  //         {/* <Route exact path="/packages/edit/:id" component={NotLogin} /> */}
  //         {/* <Route exact path="/invoice/new/:id" component={NotLogin} /> */}
  //         {/* <Route exact path="/invoice/edit/:id" component={NotLogin} /> */}
  //         {/* <Route exact path="/invoice/preview/:id" component={NotLogin} /> */}
  //         {/* <Route exact path="/invoice/paid/:id" component={NotLogin} /> */}
  //         <Route exact path="/homepage" component={Homepage} />
  //         <Route exact path="/contest" component={Contest} />
  //         <Route exact path="/user/all" component={UserAll} />
  //         <Route exact path="/upload" component={Upload} />
  //         <Route path="*" component={NotFound} />
  //       </Switch>
  //     </>
  //   );
  // }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {/* <Route exact path="/" component={Home} /> */}
        <Route path="/" element={<Miq />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy/:id" element={<Privacy />} />
        {/* <Route exact path="/download/:id" component={Download} />
        <Route exact path="/collections" component={Collections} />
        <Route exact path="/collections/new" component={CollectionNew} />
        <Route exact path="/collections/edit/:id" component={CollectionEdit} />
        <Route exact path="/testing" component={Testing} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route exact path="/projects/new" component={ProjectNew} />
        <Route exact path="/projects/edit/:id" component={ProjectEdit} /> */}
        {/* <Route exact path="/projects/details/:id" component={ProjectDetails} /> */}
        {/* <Route exact path="/projects" component={Projects} /> */}
        <Route path="/gallery/all" element={<GalleryAll />} />
        <Route path="/gallery/photographer/:id" element={<GalleryPhoto />} />
        {/* <Route exact path="/packages" component={Packages} />
        <Route exact path="/packages/new" component={PackagesNew} />
        <Route exact path="/packages/edit/:id" component={PackagesEdit} /> */}
        {/* <Route exact path="/invoice/new/:id" component={InvoiceNew} /> */}
        {/* <Route exact path="/invoice/edit/:id" component={InvoiceEdit} /> */}
        {/* <Route exact path="/invoice/preview/:id" component={InvoicePreview} /> */}
        {/* <Route exact path="/invoice/paid/:id" component={InvoicePaid} /> */}
        <Route path="/temp/classic/:id" element={<TempClassic />} />
        <Route path="/temp/minimalism/:id" element={<TempMinimalism />} />
        <Route path="/temp/darkmode/:id" element={<TempDarkmode />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/contest" element={<Contest />} />
        <Route path="/user/all" element={<UserAll />} />
        <Route path="/upload" element={<Upload />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
