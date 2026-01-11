import { useState } from 'react'
import './App.css'

const api ={
  key:import.meta.env.VITE_WEATHER_API_KEY,
  base:"https://api.openweathermap.org/data/2.5/"
}
const cities  = [
  "Delhi",
  "Banglore",
  "Bangkok",
  "Mumbai",
  "Muscat",
  "Chennai",
  "Chicago",
  "Pune",
  "Paris",
  "Kenya",
  "Kolkata",
]

function App() {
  const [search,setSearch]= useState("")
  const [weather,setWeather] = useState({})
  const [fahrenheit,setFahrenheit] = useState(null)
  const convert  = () =>{
console.log(weather.main.temp)
// F = ((°C * 9/5) + 32);
const CelciusTemp =weather.main.temp
const FarenHeitTemp =((weather.main.temp*9/5) +32)
console.log(FarenHeitTemp)
setFahrenheit(FarenHeitTemp)
};
  const SearchPressed = () =>{
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then((result)=>{
        console.log(result)
        setWeather(result)
      })
  }
const filteredCities  = cities.filter(city=>
city.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
);
  return (
    <div className="App">
      <header className="App-header">
        <h1>THIS IS WEATHER APP</h1>

        <input
          type="text"
          placeholder="enter the city name to search..."
          onChange={(e) => setSearch(e.target.value)}
        />
          {
            search && filteredCities.length >0 &&(
              <ul className = "suggestion">
                {filteredCities.map(city=>(
                  <li
                  key={city}
                  onClick = {()=>setSearch(city)
                  }
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )
          }
        <button onClick={SearchPressed}>Search</button>
        <button onClick={convert}>Unit toggle(°C/°F)</button>
        {typeof weather.main && weather.weather ?(
        <div>
        <p>
          Location
          {weather.name}
        </p>

        <p>
          Temperature is 
          {weather.main.temp}  
        </p>
        <div>
          The update tempreture is 
        {fahrenheit !== null && (
      <p> Fahrenheit: {fahrenheit.toFixed(2)} °F</p>
       )}
          
          <br>
          </br>
        </div>

        <p>
          {weather.weather[0].main}
          </p> 
          <p>
         {weather.weather[0].description}  
        </p>

        <p>
          The country is 
          <br></br>
          {weather.sys.country}
        </p>
</div>
):(
  ""
)} 
      </header>
    </div>
  )
}

export default App

// 7. Weather App (Extend what you already built)
// Make it better, not new
// Add:
// Loading spinner
// Error handling
// Unit toggle (°C / °F)
// City suggestions