"use client";
import react, { useEffect, useState } from "react";

const page=()=> {

  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [main, setmain] = useState([]);
  const [toggle, settoggle]=useState(true)
  const [edt, setedt]=useState(null)

  useEffect(() => {
    const data = localStorage.getItem("newlist");
    if (data) {
      try {
        setmain(JSON.parse(data));
      } catch (e) {
        console.error("Error parsing JSON from localStorage:", e);
      }
    }
  }, []);
  
  const submithandler=(e)=>{
    e.preventDefault(); 
  }
  const addtask=()=>{
    if(toggle==true && title.length>=1 && desc.length>=1){setmain([...main,{title,desc}])
      const updatedmain = [...main, { title, desc }];
      setmain(updatedmain)
      localStorage.setItem('newlist',JSON.stringify(updatedmain))
      settitle("");
      setdesc("");
    }
    else{
      const updatedmain= main.map((em,id)=>{
        if(id==edt){
          return{...em,title,desc}
        }
        return em;
    })
    setmain(updatedmain)
    localStorage.setItem('newlist',JSON.stringify(updatedmain))
    settoggle(true)
    setedt(null)
    settitle("");
    setdesc("");

  }}

  const removeitem = (index) => {
    if (toggle == true) {
      let remitm=main.filter((elem, i) => i !== index)
      setmain(remitm)
      localStorage.setItem('newlist',JSON.stringify(remitm))
    }
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
    localStorage.clear()
  }
  let render="No Task Available"
  if(main.length>0){
    render=main.map((item, index) => {
      return ( <li className="grid grid-cols-[5fr,1fr] gap-x-1 my-5" key={index}>
      <div className="grid grid-cols-[1fr,1fr,1fr] gap-x-3 w-full">
  <div className="flex flex-col space-y-4">
    <div className="flex items-center space-x-20">
      <span className="text-sm">({index + 1})</span>
      <input type="checkbox" className="w-6 h-6" />
    </div>
    <div className="w-auto h-auto">
      <select id="priority" className="text-sm p-1 w-full">
        <option selected>Choose priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>   
      </select>
    </div>
  </div>

  <div className="break-words w-full min-w-0">
    <h2>{item.title}</h2>
  </div>

  <div className="break-words w-full min-w-0">
    <h2>{item.desc}</h2>
  </div>
</div>


        <div className="flex justify-end">     
        <button className="bg-white border-2 border-black px-1 mx-3 w-10 h-10 rounded" onClick={
          ()=>{edititem(index)}}>Edit</button> 

        
        <button className="bg-white border-2 border-black px-1 w-15 h-10 rounded mx-3" onClick={
          ()=>{removeitem(index)}}>Delete</button></div>
         <hr/>
          
      </li>)
    })
  }
  return (
    <>
      <h1 className="text-center text-black text-4xl font-bold my-1.5">TO-DO List</h1>

      <form className="flex justify-evenly my-5" onSubmit={submithandler}>
        <input type="text" placeholder="Enter Title Here" value={title} onChange={(e)=>{
        settitle(e.target.value)
        }} className="bg-lime-300 border-2 border-black px-3 py-3 mx-3"/>

        <input type="text" placeholder="Enter Description Here" value={desc} onChange={(e)=>{
        setdesc(e.target.value)
        }} className="bg-lime-300 border-2 border-black px-3 py-3 mx-3"/>

        {
          toggle ? <button className="bg-red-400 border-2 border-black px-3 py-3 rounded font-bold mx-3" onClick={addtask}>Add</button>
          :
          <button className="bg-red-400 border-2 border-black px-3 py-3 rounded font-bold mx-3" onClick={addtask}>Update</button>
        }
       
      </form>

      <ul className="text-center bg-slate-300 my-5 w-full">
        {render}
      </ul>
      
      <div className="flex justify-center items-center h-full my-10">
      {toggle==true && main.length >= 1 && (
      <button onClick={removeall} className="bg-green-900 border-2 border-black px-3 py-3 rounded font-bold">
      Remove all
      </button>
      )}
     </div>

    </>
  );
}
export default page
