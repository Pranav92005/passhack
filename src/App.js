import './App.css';
import {useState, useCallback, useEffect, useRef} from 'react';
function App() {
 const[length, setlength]=useState(8);
 const[usenumbers,setnumbers]=useState(false) ;
 const[usechars,setchars]=useState(false) ;
  const[password,setpassword]=useState("") ;
  const ref=useRef(null) ;

  

  const copypasstoclip=useCallback(
    () => {
      window.navigator.clipboard.writeText(password) ;
      ref.current?.select();
      },[password]
  )
  
  
  const passwordgenerator=useCallback(
    () => {
      let pass="";
      let storage="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(usenumbers)storage=storage+"0123456789";
      if(usechars)storage=storage+"!@#$%^&*_~";
      for(let i=1; i<=length; i++){
        let index=Math.floor(Math.random()*storage.length+1);
pass+=storage.charAt(index);
      }setpassword(pass);
    },
    [length,usenumbers,usechars]
  )
  useEffect(() => {
    passwordgenerator();
   
  },[length,usenumbers,usechars,passwordgenerator])
  
  const refresh=() => {
    passwordgenerator();
  };
 
  return (
   <>
   <div>
<h1 >Password Generator</h1>

<div className="mb-3 ">
  <label for="exampleFormControlTextarea1" className="form-label">Password</label>
  <textarea ref={ref}className="form-control" id="exampleFormControlTextarea1" placeholder='password' value={password} rows="1" readOnly></textarea>
  <button  onClick={copypasstoclip} class="btn btn-primary my-2" type="submit">Copy</button>
  <button onClick={refresh} class="btn btn-primary my-2 mx-3" type="submit">Other password</button>
</div>
<label for="customRange1" class="form-label">Length of Password:{length}</label>
<input type="range" value={length} class="form-range" min="8" max="32" step="1" id="customRange3" onChange={(e)=>{setlength(e.target.value)}}></input>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value={usenumbers} onChange={()=>{setnumbers((Prev)=>!Prev)}} id="flexCheckDefault"></input>
  <label class="form-check-label" for="flexCheckDefault">
    Numbers
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value={usechars} onChange={()=>{setchars((Prev)=>!Prev)}} id="flexCheckDefault"></input>
  <label class="form-check-label" for="flexCheckDefault">
    Special Characters
  </label>
</div>
</div>

   </>
      
  
  );
}

export default App;
