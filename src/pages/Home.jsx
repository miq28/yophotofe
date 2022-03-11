import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeaderHome from '../components/HeaderHome';
import IconAward from '../assets/img/icon-award.png';
import IconCommunity from '../assets/img/icon-community.png';
import IconReview from '../assets/img/icon-review.png';
import animal from '../assets/img/home/animal.png';
import architecture from '../assets/img/home/architecture.png';
import bw from '../assets/img/home/bw.png';
import nature from '../assets/img/home/nature.png';
import sport from '../assets/img/home/sport.png';
import bridge from '../assets/img/home/bridge.png';
import still from '../assets/img/home/still.png';
import automotive from '../assets/img/home/automotive.png';
import sport1 from '../assets/img/home/sport1.png';
import people from '../assets/img/home/people.png';
import cars1 from '../assets/img/home/cars1.png';
import city from '../assets/img/home/city.png';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import HeaderLogin from './../components/HeaderLogin';


function Home() {
  // const [image, setImage] = useState('');
  const [toastPop, setToastPop] = useState(false);
  const auth = useSelector((state) => state.auth); //update header login

  if (!toastPop && !localStorage.getItem('token')) {
    toast.dark(
      '👋🏻 Welcome to Photo Contest! Please login or signup to access the photographer area, enjoy!',
      {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
    setToastPop(true);
  }

  //update header login
  return (
    <>
      {
        auth.isLogin ? <HeaderLogin /> : (<HeaderHome headerHeight={165} />)
      }

      <div className="port-home">
        <div className='justify-center 
        h-full 
        bg-right-top 
        bg-cover 
        h-nav'>
          <div className='flex items-center justify-center w-full pt-10 text-lg text-center md:items-start md:text-xl md:pt-20 md:text-gray-700 text-nav-1 h-1/2'>
            <p className='w-fit backdrop-blur-sm md:backdrop-blur-none backdrop-opacity-95'>
              One Place for all world of <br />
              <span className='font-bold'>Great photo contest and awards</span>
            </p>
          </div>
          <div className='flex flex-col justify-center gap-2 p-2 mt-10 md:mt-40 md:gap-14 md:flex-row'>
            <div className='w-full mb-2 rounded-md md:w-auto md:flex-col bg-opacity-30 bg-gray-50'>
              <div className='flex justify-center p-2'>
                <img src={IconAward} alt="Icon Award" className='self-center w-16 h-16' />
              </div>
              <div className='my-2 md:w-72 text-nav-1'>
                <p className='text-center text-white'>Enter contests to get your work seen around the world, and win prizes</p>
              </div>
            </div>
            <div className='w-full mb-2 rounded-md md:w-auto md:flex-col bg-opacity-30 bg-gray-50'>
              <div className='flex justify-center p-2'>
                <img src={IconCommunity} alt="Icon Award" className='self-center w-16 h-16' />
              </div>
              <div className='my-2 md:w-72 text-nav-1'>
                <p className='text-center text-white'>Take part with a global community of photographers of all levels</p>
              </div>
            </div>
            <div className='w-full mb-2 rounded-md md:w-auto md:flex-col bg-opacity-30 bg-gray-50'>
              <div className='flex justify-center p-2'>
                <img src={IconReview} alt="Icon Award" className='self-center w-16 h-16' />
              </div>
              <div className='my-2 md:w-72 text-nav-1'>
                <p className='text-center text-white'>Get feedback from the world’s leading photographers and the crowd</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center h-32 text-lg font-bold text-yellow-600 md:text-4xl md:h-72'>
          ENTER A CONTEST FOR FREE NOW
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 p-3 h-full bg-gradient-to-tl from-black via-indigo-200 to-sky-800 gap-5'>
          <div className="relative flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Animal</p>
            <img
              src={animal}
              alt="Animal"
              className='absolute w-full h-52 object-cover' />
          </div>
          <div className="relative flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Architecture</p>
            <img
              src={architecture}
              alt="Architecture"
              className='absolute w-full h-52 object-cover' />
          </div>
          <div className="relative flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Bw</p>
            <img
              src={bw}
              alt="BW"
              className='absolute w-full h-52 object-cover' />
          </div>
          <div className="relative flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Nature</p>
            <img
              src={nature}
              alt="Nature"
              className='absolute w-full h-52 object-cover' />
          </div>
          <div className="relative flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Sport</p>
            <img
              src={sport}
              alt="Sport"
              className='absolute w-full h-52 object-cover' />
          </div>
          <div className="relative flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Bridge</p>
            <img
              src={bridge}
              alt="Bridge" className='absolute w-full h-52 object-cover' />
          </div>
          <div className="relative flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Still-life</p>
            <img
              src={still}
              alt="still"
              className='absolute w-full h-52 object-cover' />
          </div>
          <div className="relative flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Automotive</p>
            <img
              src={automotive}
              alt="Automotive"
              className='absolute w-full h-52 object-cover' />
          </div>
        </div>
        <div className='flex items-center justify-center py-4'>
        {/* background: linear-gradient(260.06deg, #0e203d 10.76%, #eab197 94.23%); */}
          <button className='bg-gradient-to-r from-yellow-500 to-black text-white text-4xl px-3 py-2 '>
            See more open contest
          </button>
        </div>
        <div className='flex items-center justify-center py-4 mb-8'>
          <p className='text-lg font-bold text-yellow-600 md:text-4xl'>
            CHECK OUT SOME OUR COMMUNITY PHOTOS
          </p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 p-3 h-52 bg-gradient-to-tl from-black via-indigo-200 to-sky-800 gap-5'>
          <div className="relative -top-8 flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Sport</p>
            <img
              src={sport1}
              alt="Sports1"
              className='absolute w-full h-52 object-cover' />
            <img
              src={IconAward}
              alt="Icon Award"
              className=' z-10 absolute bottom-0 right-auto w-16 h-16' />
          </div>
          <div className="relative -top-8 flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>People</p>
            <img
              src={people}
              alt="People"
              className='absolute w-full h-52 object-cover' />
            <img
              src={IconAward}
              alt="Icon Award"
              className=' z-10 absolute bottom-0 right-auto w-16 h-16' />
          </div>
          <div className="relative -top-8 flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>City night</p>
            <img
              src={city}
              alt="City"
              className='absolute w-full h-52 object-cover' />
            <img
              src={IconAward}
              alt="Icon Award"
              className=' z-10 absolute bottom-0 right-auto w-16 h-16' />
          </div>
          <div className="relative -top-8 flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Nature</p>
            <img
              src={cars1}
              alt="Cars1"
              className='absolute w-full h-52 object-cover' />
            <img
              src={IconAward}
              alt="Icon Award"
              className=' z-10 absolute bottom-0 right-auto w-16 h-16' />
          </div>
        </div>
        <div className='flex items-center justify-center py-4 m-3'>
          <button className='bg-gradient-to-r from-yellow-500 to-black text-white text-3xl px-5 py-1 '>
            <Link to="/gallery/all">
              Gallery
            </Link>
          </button>
        </div>
        <div className='justify-center bg-right-top bg-cover h-nav3 mb-20'>
          <div className='flex flex-col items-center justify-center w-full pt-10 text-lg text-center md:items-start md:text-xl md:pt-20 md:text-gray-700 text-nav-1 h-1/2'>
            <p className='text-4xl my-8 w-screen text-center'>Potraiture</p>
            <p className='font-bold w-screen text-center'>Ready to join the Portraiture community?</p>
            <p className='w-screen text-center'>Sign up to a world of great photo contest and awards, in one place. </p>
            <p className='w-screen text-center'>one place. </p>
          </div>
          <div className='flex items-center justify-center'>
            <button className='bg-gradient-to-r from-yellow-500 to-black text-white text-3xl px-5 py-1 '>
              <Link to="/register">
                Sign up now
              </Link>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
