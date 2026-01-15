import {useState} from "react"
import {useRef} from "react"
import {useEffect} from "react"

function App(){
    const [search,setSearch] =  useState("")

fetch("'https://fakestoreapi.com/products/1")
.then((res)=> res.json())
.then((json)=>{
setSearch(json.todos)




return (
    <div>
    Products : {search}
    </div>
)
}
)}