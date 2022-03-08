import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeaderHome from '../components/HeaderHome';
// import HomeMini from '../assets/img/home/minimalist1.png';
// import HomeClass from '../assets/img/home/home-classic.png';
// import HomeDark from '../assets/img/home/home-dark.png';
// import HomeLaptop from '../assets/img/home/home-laptop.png';
// import Home9 from '../assets/img/home/home-image9.png';
// import Collection from '../assets/img/home/collection.png';
// import Projects from '../assets/img/home/projects.png';
// import Package from '../assets/img/home/package.png';

import IconAward from '../assets/img/icon-award.png';
import IconCommunity from '../assets/img/icon-community.png';
import IconReview from '../assets/img/icon-review.png';

import Footer from '../components/Footer';

function Home() {
  const [image, setImage] = useState('');
  const [toastPop, setToastPop] = useState(false);

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

  return (
    <>
      <HeaderHome headerHeight={165} />
      <div className="port-home">
        <div className='justify-center h-full bg-right-top bg-cover h-nav'>
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
            <img src="https://s3-alpha-sig.figma.com/img/1e85/7db1/1a58878727322e1b5de2a8c58d2cb6e5?Expires=1646006400&Signature=T6LpdxvV9mRYlotAQpLYlKXARipzv1Ak-8O13dZh6Ght4l4ZjQDl6l7JbYUdOzyyDksaMbgOsW8sxwYyMfwdzBm~3PVlNt1OaRUfbI7tkbjzdxdSip7gr9~QdVnMJrSYwkTUM2ZJZ~m6HXPX6sa78rpu~iHiPj5yAVq5AMlZBPBVm7xNt2KffOXPsioYnDsncOH8dF14eGzsvtWZ1idM1Wo9~xVCXOYsdKqUmiHeJIlSDsS9aOYbcxrg8XKMICQcPpxwfQbcax0-On77H8ZHRy4dsFRy2nxoTvuazbuyzJK5GOAmYJ2E1tJvdhVTjyBJaJsp2uNGzEhw0op~c-sTRg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="Animal" className='absolute w-full h-52 object-cover' />
          </div>
          <div className="relative flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Architecture</p>
            <img src="https://s3-alpha-sig.figma.com/img/29f5/7e87/4b150274b282a71b5d6aebb2593aaf8c?Expires=1646006400&Signature=PTsl55BTrhN9OLFZnW4lW7vkxMSsg1zXYTZVrzk87tIJ~fjRK-ok273WjB0CiFv7rmHZzc4486QSSUbt5S4~uGRoib70XEZqJDIupbfpzpYf9l9gydNdp9OZc8nJiDfc0JXF7coN2Fap0NlqSgzixW0P2D58i6hQ13lriXo~n-l~co45LPabVdlq2OSci5ybDA1If1fNqn2piAY94yer2KWzK8hFRcWHegn~x3xRu8kOmLoHGIir75zGTshMAApX3hF6w6gbh323kzilhVLMU7gQSOJk6gvmi9p25qKvHAv240MtwlWblKvGiz1LHBfXfCOnVHObhEK7YIUv2cOxxg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="Architecture" className='absolute w-full h-52 object-cover' />
          </div>
          <div className="relative flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Black & White</p>
            <img src="https://s3-alpha-sig.figma.com/img/b404/5d10/fe91f0cd0b9d8ccd4b17a6ca70c85869?Expires=1646006400&Signature=G5B3hiOXmKNAG3VooivAgWcGuLOXl~eTXGqIy-psLu9h5JlSmeWnDtiq-pdjc8kxL~4x9lD97mdPeFKcBKWjK5CiyEZ4EH3Mr7Z0bfiSgRWp7YnmZekuL7qNkXVVSwLPUZwSTI7Ekj0gXjMcskoAqWHtvAEICk7XgEgP5q7hd9ih9bWjjJREHL3r7Kk4KoYt~G2O8u0ZNrtyI9mYxfiRnVw5o3rMNTNQW~p35O4kYq~PPBaEIlaUUpDaEYGQ4Kr-OGdrvwE3tRGNFw~eVXgCSLWpXOfbXS~EaAqzSN2iG3wn8pbhlNUERZ6ExC030DViqUu-xLzeci5sNVo0M8NTvg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="Black & White" className='absolute w-full h-52 object-cover' />
          </div>
          <div className="relative flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Nature</p>
            <img src="https://s3-alpha-sig.figma.com/img/6af0/4c90/02afdeb6d680d7c611d93e66dddb9c09?Expires=1646006400&Signature=HEL-1M1-HRAgvDGaL7BV5Mv0aS8jd0PblfQWRPRQX6bhXOJDmIHNFGu~COD~B9hTFCEvbBc~IwwSgUlKrQMEGHIGNd6uH4~Q8QwDBY2drxvp7bt1SjpoXI0FQ5~WHlW-D3z7KEn5zZ1NFqoSVevIo6WGIOoe7~aMrQhG5RwwIQ9J6SYY2JGuaFs3Hlf5cnUgPZHQfhmQwt9x0fZQJd9cwa38~FyGCnaR7~gyU46nj02ShtijDcWMM8wlf~lbRd8TMT61XFsAqd5qYO1~FU9ZDyp3vUAnNNcaAfAFwlhKQ558E0vb3n1x2UGNR7HV3qk54VtWkdHi2KqOZvkoSAJUnQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="Nature" className='absolute w-full h-52 object-cover' />
          </div>
          <div className="relative flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Sport</p>
            <img src="https://s3-alpha-sig.figma.com/img/78a7/fffa/5e052759ead17dd01c5afa55cfcd4d3a?Expires=1646006400&Signature=gU0t~0Z6zXyFyjDyqo27hQAlVKvmhs0jm2G7G8GGVU-3tUjJg6~VazA~OtlU86yQtpMcaMWIl8rF5MuKiG8zby1GzYlQBdJSS7kpeuvYe~tiJpe7AIU8xwimFOZWgg96KOTOBEpjQPYAq~eb2lCDFK-zBMnRKo9FW1u1DqVwbn3AvxBQ75pfNYWczKcaGuQi9Vi6JTPUda-LH1ZGdwPihehyccy5Sqde6fBNpI7c2~UV4GzEjmUk10VRg0eUKk~OXdgz6wptY3r-jA-Uk2xnQQ~Qo5VHRDhDhu9M3yWajkGmGd7vVWlkLULYmpjBYo9Z6BBXD-hAdR57p4EilOeN~g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="Sport" className='absolute w-full h-52 object-cover' />
          </div>
          <div className="relative flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Bridge</p>
            <img src="https://s3-alpha-sig.figma.com/img/0112/3e7a/18112a84bfe0eb02cf4135e2e5632ae7?Expires=1646006400&Signature=agT5nO6HAAkgkLTLp-caJRUjnQdSXKzbxICu3msIT5k8QyqhIQpeHA6a-KatwpfYp029awNxr-4CX35At~YBqJ1Q7RcM8UyO1spUDdCuAS~Pqi~bJLoNhpdg9Z-lUhmjgpRhxbyhU0mqTiO1r5eyenussrEfeg0OLTk82AQAATpGRUfQNpjXUzblErhX9bIfHlc2sjsWR7YmLgeUVSMsF5M4OLIIp4cDSHfNRpdlcrkf62V~aNNfj9s2s4N4AiptJ1gPixdbXvePvjC2y31XDs4j0J4UrqBlt5YsfVdFK2oGYZmIj5clL3BWsAxnl0QZoA262ScI1zed3ay5x-ecow__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="Bridge" className='absolute w-full h-52 object-cover' />
          </div>
          <div className="relative flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Still-life</p>
            <img src="https://s3-alpha-sig.figma.com/img/ff95/1fd9/c8ed395ef09f7b35b75b62b0716413a9?Expires=1646006400&Signature=RY8xsbJgRXQzUOCbFnwvynfJktt3eGNbhanPzCj4vrCBdRJbpu7Yf79948QtujYikubbvuiJGKaIpfAT8a5HT1E2GTJpmilXzmLhws-f58gPJTqQZ5gN8yulexEtdO1nP1G2pjK-FB7a4VuoAliYQgqx~fKf0TW6itsVZsqiKrigKSX~f0YD9IunXR1pQRD~ZYLwjsOXe9PfpNRyafTu-76uXi~HKHdnwAlasSuX6uBFZU5fb0ospRkSqk8PhJRr6hp55y0mPv35LBqw3-DEAcy4loEmzXX1vgxkNAFF7snhGyTGE6H7pudDKg9VXk8PypBLnTgotZx5Cv2EZnYl0Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="Still-life" className='absolute w-full h-52 object-cover' />
          </div>
          <div className="relative flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Automotive</p>
            <img src="https://s3-alpha-sig.figma.com/img/1768/1232/368837433dc8a0e624859565355f001f?Expires=1646006400&Signature=btAGnrZN-e9BifCyuaIqJA8rehkr8aq7-16cIFLSq79pdq2fim0sEOUbU7qNgXrwrGT5YLYla-qjraVPYOdxExO8OkNGatRn2M1NXRr7qIsHYZz0-evq-BisLxG3xum2ohd9tFxCamZXYuUBputUJnWyhKEU4oIkSLyhpiCoq0HvMmn1gjd9F~9w9tC4A-vlCpdsDQs3LXdWyqzr9NnTU3M8u3hYXuc-IoHO5DFOiaAZho--Y~leOb4oZ3KCfCi3ZSrB2mjipuvhK54kyFtPxqZu5YAn3StmmqrkALphmA0hBYpGzYOi-MRywBDe~e-Qbg8VgIYYrboLMBZvFRm0IA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="Automotive" className='absolute w-full h-52 object-cover' />
          </div>
        </div>
        <div className='flex items-center justify-center py-4'>
          <button className='bg-gradient-to-r from-yellow-500 to-black text-white text-4xl px-3 py-2 '>See more open contest</button>
        </div>
        <div className='flex items-center justify-center py-4 mb-8'>
          <p className='text-lg font-bold text-yellow-600 md:text-4xl'>CHECK OUT SOME OUR COMMUNITY PHOTOS</p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 p-3 h-52 bg-gradient-to-tl from-black via-indigo-200 to-sky-800 gap-5'>
          <div className="relative -top-8 flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Sport</p>
            <img src="https://s3-alpha-sig.figma.com/img/805b/9b02/d91056da8ccd5814780943654ff5c041?Expires=1646611200&Signature=UTY3j6JSz93n4Lrxl5f3DR6EJoELezit~o8GPA7yLf2iQ8A7GcEeXIZZaUebtxoRqlh0R16bGHkBmdLDA20S7vUzAoAt~xp~L8~rLXfWwil2-NDUqu4dtU5QSxi47bWoPWsbILdo5X8HKbVxGvl~K9S-3PUOJR6KboUyTpvpPltlT~FwYBO0a9p~1qa1TABHw5j97K1gqN4Sq3mamw~VrN5a1cRCTooLDb3zDB~Zo1Zejo0JeKsHL8QNyLzgdNabTWy-rBLXLT-K7g5Yoqlbz-Itd0uY~X35PJJFVsZgdDqOB9tqsfAKbf4Q-rpB5BeIgCuzgmzL3TLKeQ-VPviUpw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="Sports" className='absolute w-full h-52 object-cover' />
                <img src={IconAward} alt="Icon Award" className=' z-10 absolute bottom-0 right-auto w-16 h-16' />
          </div>
          <div className="relative -top-8 flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>People</p>
            <img src="https://s3-alpha-sig.figma.com/img/808b/c8b0/13558926baaea7dd41f814b63d8d0e93?Expires=1646611200&Signature=GE7w9Fn1rM8ssWuH751y1y91W5arlpng1T7cIosCapMbBltHspyFmSfABQhLErCKd57n1Iq9mmPAykrh7SNFtT1QTspxPvgZu2zPBB8NVcdmv1Gv6skSjF3ZtFdzVq3neu8s4ZZZF6HMgWcL3I075FpeNWq8kpLf0z9Te-xzr5KrIT9B78~Q716~ICGGvLeQoQCBheLtEHjOvN~x0n-KVGmShFf7XhVBudK2Vf8bXn6egHEjY6z0Nu6sB7tkHgr2FD9ZD~vlFRt7OI~uWc-lYVcYbY9vpZ1-4-5CVwMnO0ant5ivvG-SlmxuL6R~jitqYGJzSGmCsHKGHayGZGsAtQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="People" className='absolute w-full h-52 object-cover' />
            <img src={IconAward} alt="Icon Award" className=' z-10 absolute bottom-0 right-auto w-16 h-16' />
          </div>
          <div className="relative -top-8 flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>City night</p>
            <img src="https://s3-alpha-sig.figma.com/img/b679/5ede/9592ac61256add1dde4319638ba16331?Expires=1646611200&Signature=NKtQTzW1xuI3z5eVB7CbuQjD1iTpVih7Q8bx2f3muuDnHeQ6GduzZRhEH9H3~yyNAvo0sDuKpxFBAWctMR~YsC5Y8T3yXOD81INZAQnBRgWz~oeuryE42MeLlIOjUQBCOnBT-NiVWzD77Gsd2qCkfoOijWRiYDcY45IQvQc37YOtXyJwixayU0MD7Djr1AZhS0bqX-jj~J0WTRoRqUDcOw4k6MHGcnQd42PbD1kgkUQiYXu6qENbqztsJMmdX~2coVR84HKgNWOUeQVM7Px-98LyN9b7tycYXaCTYTPfJBKUieyro9VniLopzuxV9xepSi4Lp3LaY2UaznjY9TBRvQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="City night" className='absolute w-full h-52 object-cover' />
            <img src={IconAward} alt="Icon Award" className=' z-10 absolute bottom-0 right-auto w-16 h-16' />
          </div>
          <div className="relative -top-8 flex items-center justify-center h-52 bg-white text-nav-1">
            <p className='z-10 text-center text-white font-bold'>Nature</p>
            <img src="https://s3-alpha-sig.figma.com/img/58d0/ea4e/ca88a66120b506f1c086b8752e644582?Expires=1646611200&Signature=HR-IGgWUTsY8vKxY70SdNSH5AcqmAb3cbeEYkEK10iUrKB7I7dxxWSl1o4enYho11~KXcEA3tXgnDcNFp6Wx9TZJVC6PgM6LvJkRexudHCi-9YQ~j5COEOTtrcH30JU7vw7Vlt7JpuVXsxzbAyEq-psfahek~J1HmQw5sga7UY0BxvWRDXKLnQvOYT5HqkSzg4gibQdblRmQiRsOolMmHEs~5FRA1lFH5phOexOssaagaNKQKRrJ1Z8k3Z5rl0QtFyBsSxRyEp0E96esWw36G55NJc9if2S5XiPZN3Pamo6WTfezQPFfSUMwlA9O6Dmp88XOsaMouuWGiuKYn~MjOA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="Car" className='absolute w-full h-52 object-cover' />
            <img src={IconAward} alt="Icon Award" className=' z-10 absolute bottom-0 right-auto w-16 h-16' />
          </div>
        </div>
        <div className='flex items-center justify-center py-4 m-3'>
          <button className='bg-gradient-to-r from-yellow-500 to-black text-white text-3xl px-5 py-1 '><Link to="/gallery/all">Gallery</Link></button>
        </div>
        <div className='justify-center bg-right-top bg-cover h-nav3 mb-20'>
          <div className='flex flex-col items-center justify-center w-full pt-10 text-lg text-center md:items-start md:text-xl md:pt-20 md:text-gray-700 text-nav-1 h-1/2'>
            <p className='text-4xl my-8 w-screen text-center'>Potraiture</p>
            <p className='font-bold w-screen text-center'>Ready to join the Portraiture community?</p>
            <p className='w-screen text-center'>Sign up to a world of great photo contest and awards, in one place. </p>
            <p className='w-screen text-center'>one place. </p>
          </div>
          <div className='flex items-center justify-center'>
            <button className='bg-gradient-to-r from-yellow-500 to-black text-white text-2xl px-4 py-2 '>Sign up now </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
