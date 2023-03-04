import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getWeather } from './api_endpoints/get_requests/Endpoints';

import storm from './images/storm.png'
import sun from './images/sun.png'
import sunny from './images/sunny.png'
import cloudy from './images/cloudy.svg'
import snowy from './images/snowy-6.svg'
import hot from './images/cloudy-day-3.svg'

function App() {
  const [city,setCity] = useState("");
  const { data , status, isLoading, refetch, isError} = useQuery({
    queryKey: ["weather",city],
    enabled: false,
    queryFn: getWeather,
    cacheTime: 0  
  })  
  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
      }}>
        <div className = 'searchBar'>
          <input 
            type = 'text' 
            name = 'searchbar' 
            placeholder = "City Name..."
            onChange={(e) => {
              setCity(e.currentTarget.value)
            }}
          />
          <button onClick = {() => {
              if(city == "") return;
              refetch()
          }}><i className ="fa fa-hand-pointer fa-2x"></i></button>
        </div>
        {isError && <div>unable to retrieve data</div>}

        <div className = 'image'>
          { data && Math.floor((data?.main?.temp - 273.15)) < 40 && Math.floor((data?.main?.temp - 273.15)) > 20? <img    src = {cloudy} /> : null }  
          { data && Math.floor((data?.main?.temp - 273.15)) < 20 ? <img src = {snowy} /> : null }  
          { data && Math.floor((data?.main?.temp - 273.15)) > 50 ? <img src = {hot} /> : null }  
        </div>


        { data && Math.floor((data?.main?.temp - 273.15)) <= 0 ? <h3>It's beyond Freezing </h3> : null }  
        { data && Math.floor((data?.main?.temp - 273.15)) <= 10 && Math.floor((data?.main?.temp - 273.15)) > 0 ? <h3>It's Freezing </h3> : null }  
        { data && Math.floor((data?.main?.temp - 273.15)) <= 30 && Math.floor((data?.main?.temp - 273.15)) > 10 ? <h3>It's Cold </h3> : null }  
        { data && Math.floor((data?.main?.temp - 273.15)) <= 40 && Math.floor((data?.main?.temp - 273.15)) > 30 ? <h3>It's Cool </h3> : null }  
        { data && Math.floor((data?.main?.temp - 273.15)) >= 50 && Math.floor((data?.main?.temp - 273.15)) <= 70 ? <h3>It's Hot </h3> : null }  
        { data && Math.floor((data?.main?.temp - 273.15)) > 70 ? <h3>It's Really Hot </h3> : null }  

        <div className='degree'>
          {data?.message == "city not found" && <p style = {{
            textAlign: "left"
          }}>No results found</p>}
          <h1>
          {(data && data?.cod !== "404") && <p>{Math.floor((data?.main?.temp - 273.15))}&#8451;</p>} 
          </h1>
        </div>
        {data && (
          <>
            <p className = "country">Country: {data?.sys?.country}</p>
          </>
        )}
        <div className = "extraData">
          <li>
            <i className="fas fa-wind fa fa-3x" style = {{
              padding: "20px 0 0px",
              color: "#9D00FF"
            }}></i>
            <p className = 'info'>{data?.wind?.speed} km/h</p>
            <p>WindSpeed</p>
          </li>

          <li>
            <i className="fa fa-droplet fa-3x" style = {{
              padding: "20px 0 0px",
              color: "limegreen",
            }}></i>
            <p className = 'info'>{data?.main?.humidity}%</p>
            <p>Humidity</p>
          </li>

          {/* <li>
            <i className="fas fa-sun fa fa-3x" style = {{
              color: "white"
            }}></i>
            <p className = 'info'>23 km/h</p>
            <p>Chance of rain</p>
          </li> */}
        </div>
      </form>
    </>
  );
}

export default App;
