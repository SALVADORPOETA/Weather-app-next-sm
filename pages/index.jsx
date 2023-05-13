import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Weather from '../components/Weather';
import 'extras.css';
// import Spinner from '../components/Spinner';

export default function Home() {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  // const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
  console.log(city)

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setCity('');
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchWeather = (e) => {
  //   e.preventDefault()
  //   // setLoading(true)
  //   axios.get(url).then((response) => {
  //     setWeather(response.data)
  //     setCity('') 
  //     // setLoading(false)
  //   })
  // };

  // if(loading) {
  //   return <Spinner />
  // } else {
    return (
      <div>
        <Head>
          <title>Weather - Next App</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        {/* Overlay */}
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1] w-full h-full' />
        {/* Background image */}
        <Image 
          src='https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=775&q=80' 
          layout='fill' 
          className='object-cover'
          alt='/'
          />
          {/* Search */}
          <div className='relative flex justify-between items-center max-w-[500px] lg:w-[500px] m-auto pt-4 text-white z-10 max-md:w-[400px]  max-sm:w-[330px]' >
            <form onSubmit={fetchWeather} className='flex justify-between items-center lg:w-[500px] m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl  max-md:w-[450px] max-sm:w-[350px]' >
              <div>
                <input 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className='bg-transparent border-none text-white focus:outline-none text-2xl max-md:w-[350px] max-sm:w-[250px]'
                  type='text' 
                  placeholder='Search city' 
                  />
              </div>
              <button id='search-city' aria-label='search city' onClick={fetchWeather}>
                <BsSearch className="hidden lg:block lg:text-2xl" size={20} />
                <BsSearch className="block lg:hidden text-2xl" size={48} />
              </button>
            </form>
          </div>
  
          {/* Weather */}          
          {weather.main && <Weather data={weather} />}
  
      </div>
    );
  };

// }

