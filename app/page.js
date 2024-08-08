"use client";
import react, { useState } from "react";
const page=()=> {

  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [main, setmain] = useState([]);
  const [toggle, settoggle]=useState(true)
  const [edt, setedt]=useState(null)
  const submithandler=(e)=>{
    e.preventDefault(); 
  }
  const addtask=()=>{
    if(toggle==true){setmain([...main,{title,desc}])
      settitle("");
      setdesc("");
    }
    else{
      setmain(main.map((em,id)=>{
        if(id==edt){
          return{...em,title,desc}
        }
        return em;
    }))
    settoggle(true)
    setedt(null)
    settitle("");
    setdesc("");

  }}

  const removeitem=(index)=>{
    setmain(main.filter((elem,i)=>{
       return i!==index
    }))
  }

  const edititem=(index)=>{
     let editbutton=main.find((elem,i)=>{
       return i===index
    })
    settoggle(false)
    settitle(editbutton.title)
    setdesc(editbutton.desc)
    setedt(index)
  }

  const removeall=()=>{
    setmain([])
  }
  let render="No Task Available"
  if(main.length>0){
    render=main.map((item, index) => {
      return ( <li className="flex justify-evenly my-5" key={index}>
        <div className="px-1 py-1" >
          <input type="checkbox" className="w-4 h-4"/>
        </div>
        <h2>{item.title}</h2>
        <h2>{item.desc}</h2>       
        <button className="bg-white border-2 border-black px-1 rounded" onClick={
          ()=>{edititem(index)}}>Edit</button>

        <button className="bg-white border-2 border-black px-1 rounded" onClick={
          ()=>{removeitem(index)}}>Delete</button>
        
      </li>)
    })
  }
  return (
    <>
      <h1 className="text-center text-black text-4xl font-bold my-1.5">TO-DO List</h1>

      <form className="flex justify-evenly my-5" onSubmit={submithandler}>
        <input type="text" placeholder="Enter Title Here" value={title} onChange={(e)=>{
        settitle(e.target.value)
        }} className="bg-lime-300 border-2 border-black px-3 py-3"/>

        <input type="text" placeholder="Enter Description Here" value={desc} onChange={(e)=>{
        setdesc(e.target.value)
        }} className="bg-lime-300 border-2 border-black px-3 py-3"/>

        {
          toggle ? <button className="bg-red-400 border-2 border-black px-3 py-3 rounded font-bold" onClick={addtask}>Add</button>
          :
          <button className="bg-red-400 border-2 border-black px-3 py-3 rounded font-bold" onClick={addtask}>Update</button>
        }
       
      </form>

      <ul className="text-center bg-slate-300 my-5">
        {render}
      </ul>
      
      <div className="flex justify-center items-center h-full my-10">
      {main.length >= 1 && (
      <button onClick={removeall} className="bg-green-900 border-2 border-black px-3 py-3 rounded font-bold">
      Remove all
      </button>
      )}
     </div>

    </>
  );
}
export default page
