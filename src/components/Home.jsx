import React, { use, useEffect } from 'react'
import { useState } from 'react'
import { useSearchParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title,setTitle] = useState("");
    const [value,setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allpastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if(pasteId){
          const paste = allpastes.find((p) => p._id === pasteId);
          setTitle(paste.title);
          setValue(paste.value);
        }
      }, [pasteId])
      

    function createPaste() {
        const paste = {
            title:title,
            value:value,
            _id: pasteId || Date.now().toString(36),
            createdAt:  new Date().toISOString(),
        }
        

        if(pasteId){
            //update
            dispatch(updateToPastes(paste));
            
            
        }
        else{
            //create
            dispatch(addToPastes(paste));
        }
        //after creating or updating the paste, reset the input fields
        setTitle("");
        setValue("");
        setSearchParams({});
    }

  return (
<div>
<div className='flex flex-row gap-6 place-content-between' >
    <input className='p-2 rounded-2xl bg-black mt-2 w-[60%] pl-3'   type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder='Enter the Title'></input>
  
  <button onClick={createPaste}>{pasteId ? "Update Paste" : "Create My Paste"}</button>

    </div>
    <div>
        <textarea
        className='rounded-2xl bg-black mt-4 min-w-[500px] p-4'
         value={value}
         placeholder='Enter your paste here...'
         onChange = {(e)=>{setValue(e.target.value)}}
        />
    </div>
</div>
  )
}

export default Home 