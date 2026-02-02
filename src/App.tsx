import {useState,useRef,useEffect, type KeyboardEvent} from "react"
import './index.css'

function App(){
const OTP_DIGITS_COUNT = 5
const [inputArr,setinputArr] = useState(new Array(OTP_DIGITS_COUNT).fill(""))
const refArr = useRef<(HTMLInputElement|null)[]>([]);
useEffect (()=>{
refArr.current[0]?.focus();
},[])
const  isBackspacing = useRef(false)
const handleOnChange = (value:string,index:number)=>{
if(isBackspacing.current) return;
  // proper digit validation instead of NaN
if(value!=="" && !/^\d$/.test(value.slice(-1))) return
const newValue = value.trim(); 
const newArr =[...inputArr]
newArr[index] =  newValue.slice(-1);
setinputArr(newArr);
if(value && index<OTP_DIGITS_COUNT-1){refArr.current[index+1]?.focus();
}
}
const handleOnkeyDown = (e:React.KeyboardEvent<HTMLInputElement>,index:number)=>{
if(e.key==="ArrowLeft" && index>0){
  refArr.current[index-1]?.focus();
}
if(e.key==="ArrowRight" && index<OTP_DIGITS_COUNT-1){
  refArr.current[index+1]?.focus();
}
if(e.key==="Backspace"){
  e.preventDefault();
  isBackspacing.current =true;
  const currentvalue  = e.currentTarget.value;  // Reading the dom  and not the state
  if(currentvalue){
    const newArr = [...inputArr]
    newArr[index]=""
    setinputArr(newArr)
  }
  else if (index>0){
    const newArr = [...inputArr];
    newArr[index-1]=""
    setinputArr(newArr);
    refArr.current[index-1]?.focus();
  }
  requestAnimationFrame((()=>{
    isBackspacing.current = false
  }))
}
}

const handleOnpaste =(e:React.ClipboardEvent<HTMLInputElement>)=>{
  e.preventDefault();
  const pastedData = e.clipboardData.getData("text").trim();
  const digits = pastedData.replace(/\D/g,"").slice(0,OTP_DIGITS_COUNT).split("");
  if(digits.length===0) return ;

  const newArr = [...inputArr]
  digits.forEach((digit,i)=>{
    newArr[i] = digit;
  })
  setinputArr(newArr)
  const focusIndex = Math.min(digits.length,OTP_DIGITS_COUNT-1);
  refArr.current[focusIndex]?.focus();
}

  return (
  <>
    <div className="my-app">
      <div>
    Validate OTP

      </div>
      
      {inputArr.map((input,index)=>{
   return <input className="otp-input"key={index} 
   type ="text"
   value={inputArr[index]}
   onChange={(e)=>handleOnChange(e.target.value,index)}
   ref={(input)=>{refArr.current[index]=input}}
   onKeyDown={(e)=>handleOnkeyDown(e,index)}
   onPaste = {handleOnpaste}
   onFocus={(e)=>e.currentTarget.select()}
   />

      })}

       </div>
    </>
  )
}

export default App


