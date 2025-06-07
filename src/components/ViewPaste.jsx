import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const ViewPaste = () => {
 
    const {id} = useParams();
    const allpastes = useSelector((state) => state.paste.pastes);
    const paste = allpastes.filter((p)=> p._id === id)[0];

  return (
    <div>
<div className='flex flex-row gap-6 place-content-between' >
    <input className='p-2 rounded-2xl bg-black mt-2 w-[60%] pl-3'   type='text' value={paste.title} disabled onChange={(e)=>{setTitle(e.target.value)}} placeholder='Enter the Title'></input>
  

    </div>
    <div>
        <textarea
        className='rounded-2xl bg-black mt-4 min-w-[500px] p-4'
         value={paste.value}
         disabled
         placeholder='Enter your paste here...'
         onChange = {(e)=>{setValue(e.target.value)}}
        />
    </div>
</div>
  )
}

export default ViewPaste