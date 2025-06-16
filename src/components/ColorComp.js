"use client";
import React,{useState,useEffect} from 'react';
const ColorComp=()=>{
  const[activeColor,setActiveColor]= useState("");
  const[dafaultToggel,setDefaultToggle] = useState(true);

  useEffect(()=>{
    let validColor;
    if(activeColor==='default'){
      validColor=setInterval(()=>{
        setDefaultToggle((prev)=>!prev)
      },1000)
    }
    return()=>clearInterval(validColor)
  },[activeColor])

let getColor=()=>{
  if(activeColor==='default'){
    return dafaultToggel ?'White':'Orange';

  }
  return activeColor;
}

return(
  <div>
    <div  style={{border:'2px solid black'}}>
         <h3 style={{textAlign:'center', color:'brown'}}>Color Component Traffic Light</h3>
    <div
      style={{
        margin:'20px auto',
        height:'100px',
        width:'100px',
        borderRadius:'50%',
        backgroundColor:getColor(),
        border:'2px solid black',
        
      }}
      >
    </div>
    </div>
    <br/>
    <button onClick={()=>setActiveColor('red')} 
    style={{backgroundColor:'red',color:'white'}}
    >Red</button>&nbsp;
    <button onClick={()=>setActiveColor('yellow')} style={{backgroundColor:'yellow',color:'white'}}>Yellow</button>&nbsp;
    <button onClick={()=>setActiveColor('green')} style={{backgroundColor:'green',color:'white'}}>Green</button>&nbsp;
    <button onClick={()=>setActiveColor('default')}>Default</button>
    
  </div>
)

}
export default ColorComp;
