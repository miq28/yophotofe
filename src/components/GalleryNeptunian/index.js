import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Dashboard from '../Dashboard/Dashboard';
// import Login from '../Login/Login';
// import Preferences from '../Preferences/Preferences';
// import useToken from './useToken';
import Gallery from './Gallery'
import { generateSlug } from "random-word-slugs";



function App() {

    // const { token, setToken } = useToken();

    // if (!token) {
    //   return <Login setToken={setToken} />
    // }const photos = [

    let photos = []

    for (let i = 0; i < 50; i++) {
        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
        }
        const w = getRandomIntInclusive(3,8);
        const h = getRandomIntInclusive(3,8);
        const slug = generateSlug(1, { categories:  {
            adjective: ["color", "appearance", 'condition', 'personality', 'quantity'],
            // noun: ["people", "animals"]
          } });
        const obj = {
            src: `https://picsum.photos/seed/${slug}/${w*100}/${h*100}`,
            width: w,
            height: h
        }
        photos.push(obj)
    }
    // const photos = [
    //     {
    //         src: 'https://picsum.photos/seed/arman/800/600',
    //         width: 8,
    //         height: 6
    //     },
    //     {
    //         src: 'https://picsum.photos/seed/master/800/600',
    //         width: 8,
    //         height: 6
    //     }
    // ];


    return (
        <div className="wrapper">
            <Gallery photos={photos} direction={"column"} columns={4} />
        </div>
    );
}

export default App;
