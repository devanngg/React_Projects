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


// import {useRef} from "react"
// import {useState} from "react"

// function App (){
//   const countRef = useRef(0);
//   const [count,setCount] = useState(0)
//   function Increment(){
//     countRef.current++;
//     setCount(prev=>prev+1)
//     console.log("Count ref:",countRef)
//     console.log("SetCount val ",count)

//   }
//   return (
//     <div>
//       <p>
//         CountRef is : {countRef.current}
//       </p>
//       <p>
//         State count is :{count}
//       </p>
//       <button onClick = {Increment}> Increament button </button>
//     </div>
//   )
// }

// export default App 


// import {useState} from "react"
// import {useRef} from "react"
// import {useEffect} from "react"
// // Create a component with a text input field and a button. When the component mounts or the button is clicked, automatically focus the text input field using useRef.

// export function Assignment1() {
//   const inputRef = useRef();
//     useEffect(() => {
// inputRef.current.focus()
//     }, [inputRef]);

//     const handleButtonClick = () => {
//       inputRef.current.focus()

//     };

//     return (
//         <div>
//             <input ref={inputRef} type="text" placeholder="Enter text here" />
//             <button onClick={handleButtonClick}>Focus Input</button>
//         </div>
//     );
// };

// export default Assignment1


// import React, { useState, useCallback } from 'react';
// import {useRef} from "react"
// // Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

// export function Assignment2() {
//     const [count,setCount] = useState(0);
//     const mathRef =  useRef(0);


  
//     const handleReRender = () => {
//         // Update state to force re-render
//         setCount(prev=>prev+1)
//     };
//     mathRef.current = mathRef.current+1;

//     return (
//         <div>
//             <p>This component has rendered {mathRef.current} times.</p>
//             <button onClick={handleReRender}>Force Re-render</button>
//         </div>
//     );
// };

// export default Assignment2 

import {useState} from "react"
import {useRef} from "react"
import {useEffect} from "react"
import {useMemo} from "react"

function App(){
    const [products,setProducts] =  useState([])
const [search,setSearch] = useState("")
const [category,setCategory] = useState("all")
const [sortOrder,setsortOrder] = useState("none")
const searchInputRef = useRef(null)
const redcerCountRef =useRef(0)
redcerCountRef.current+=1

useEffect(()=>{

    fetch("https://fakestoreapi.com/products")
    .then((res)=>res.json())
    .then ((json)=>{
        setProducts(json)
    })
searchInputRef.current.focus()
},[])

const filteredProducts =  useMemo(()=>{
    let result = products.filter((product)=>{
    const macthesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    
const matchesCategory = category ==="all" || product.category ===category;
return macthesSearch && matchesCategory;
})


if(sortOrder === "low_to_high"){
    result = [...result].sort((a,b)=>a.price - b.price)
}
if(sortOrder === "high_to_low"){
    result = [...result].sort((a,b)=>b.price - a.price)
}
return result 

},[products,search,category,sortOrder])


return (
    <div>
        <select value = {category}     
     onChange={(e) => setCategory(e.target.value)}
>
<option value="all">All</option>    
<option value="electronics">Electronics</option>
<option value="jewelery">Jewelery</option>
<option value="men's clothing">Men's Clothing</option>
<option value="women's clothing">Women's Clothing</option>

        </select>
        <select value = {sortOrder}
        onChange={(e)=> setsortOrder(e.target.value)} > 
            <option value = "none">DONT SORT</option>
            <option value ="low_to_high">LOW TO HIGH</option>
            <option value ="high_to_low">HGH TO LOW</option>
        </select>
        <input ref = {searchInputRef} type ="text"
        placeholder = "enter the city name to search"   
        value = {search}
     onChange={(e) => setSearch(e.target.value)}
      />
        <h2> Products are as follows</h2>
    {filteredProducts.map((product)=>(
    <div key = {product.id}>
        <h3>{product.title}</h3>
        <h3>
            Product price: {product.price}
        </h3>
        
        </div>
        
    ))}
    <p>{redcerCountRef.current}</p>
    </div>
)
}


export default App

