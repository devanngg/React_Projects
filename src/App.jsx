// import { useState } from 'react'
// import './App.css'

// const api ={
//   key:import.meta.env.VITE_WEATHER_API_KEY,
//   base:"https://api.openweathermap.org/data/2.5/"
// }
// const cities  = [
//   "Delhi",
//   "Banglore",
//   "Bangkok",
//   "Mumbai",
//   "Muscat",
//   "Chennai",
//   "Chicago",
//   "Pune",
//   "Paris",
//   "Kenya",
//   "Kolkata",
// ]

// function App() {
//   const [search,setSearch]= useState("")
//   const [weather,setWeather] = useState({})
//   const [fahrenheit,setFahrenheit] = useState(null)
//   const convert  = () =>{
// console.log(weather.main.temp)
// // F = ((°C * 9/5) + 32);
// const CelciusTemp =weather.main.temp
// const FarenHeitTemp =((weather.main.temp*9/5) +32)
// console.log(FarenHeitTemp)
// setFahrenheit(FarenHeitTemp)
// };
//   const SearchPressed = () =>{
//     fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
//       .then(res=>res.json())
//       .then((result)=>{
//         console.log(result)
//         setWeather(result)
//       })
//   }
// const filteredCities  = cities.filter(city=>
// city.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
// );
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>THIS IS WEATHER APP</h1>

//         <input
//           type="text"
//           placeholder="enter the city name to search..."
//           onChange={(e) => setSearch(e.target.value)}
//         />
//           {
//             search && filteredCities.length >0 &&(
//               <ul className = "suggestion">
//                 {filteredCities.map(city=>(
//                   <li
//                   key={city}
//                   onClick = {()=>setSearch(city)
//                   }
//                   >
//                     {city}
//                   </li>
//                 ))}
//               </ul>
//             )
//           }
//         <button onClick={SearchPressed}>Search</button>
//         <button onClick={convert}>Unit toggle(°C/°F)</button>
//         {typeof weather.main && weather.weather ?(
//         <div>
//         <p>
//           Location
//           {weather.name}
//         </p>

//         <p>
//           Temperature is 
//           {weather.main.temp}  
//         </p>
//         <div>
//           The update tempreture is 
//         {fahrenheit !== null && (
//       <p> Fahrenheit: {fahrenheit.toFixed(2)} °F</p>
//        )}
          
//           <br>
//           </br>
//         </div>

//         <p>
//           {weather.weather[0].main}
//           </p> 
//           <p>
//          {weather.weather[0].description}  
//         </p>

//         <p>
//           The country is 
//           <br></br>
//           {weather.sys.country}
//         </p>
// </div>
// ):(
//   ""
// )} 
//       </header>
//     </div>
//   )
// }

// export default App

// // 7. Weather App (Extend what you already built)
// // Make it better, not new
// // Add:
// // Loading spinner
// // Error handling
// // Unit toggle (°C / °F)
// // City suggestions






// import { useState } from "react";
// import {useCallback } from "react"

// // Create a counter component with increment and decrement functions. Pass these functions to a child component which has buttons to perform the increment and decrement actions. Use useCallback to ensure that these functions are not recreated on every render.

// export function Assignment1() {
//     const [count, setCount] = useState(0);

//     // Your code starts here

// const Increment =  useCallback(()=>{
// setCount(prev => prev+1)

// },[])

// const Decrement = useCallback (()=>{
// setCount(prev =>prev-1)
    
// },[])
    
//     // Your code ends here

// return (
//         <div>
//             <p>Count: {count}</p>
//             <CounterButtons onIncrement={Increment} onDecrement={Decrement} />
//         </div>
//     );
// };

// const CounterButtons = ({ onIncrement, onDecrement }) => (
//     <div>
//         <button onClick={onIncrement}>Increment</button>
//         <button onClick={onDecrement}>Decrement</button>
//     </div>
// );

// export default Assignment1




import React, { useState, useCallback } from 'react';


// Create a component with a text input field and a button. The goal is to display an alert with the text entered when the button is clicked. Use useCallback to memoize the event handler function that triggers the alert, ensuring it's not recreated on every render.
// Currently we only have inputText as a state variable and hence you might not see the benefits of 
// useCallback. We're also not passing it down to another component as a prop which is another reason for you to not see it's benefits immedietely.

export function Assignment2() {
    const [inputText, setInputText] = useState('');

    // Your code starts here
    const showAlert = useCallback(()=>{
    window.alert(inputText)
    },[inputText])
  
    // Your code ends here

    return (
        <div>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter some text"
            />
            <Alert showAlert={showAlert} />
        </div>
    );
};

function Alert({showAlert}) {
    return <button onClick={showAlert}>Show Alert</button>
}

export default Assignment2