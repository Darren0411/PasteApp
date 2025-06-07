import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pastes:localStorage.getItem('pastes') 
    ?JSON.parse(localStorage.getItem('pastes'))
    :[]
}

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState,
  reducers: {
   addToPastes: (state,action) => {
    const paste = action.payload;
    state.pastes.push(paste);
    localStorage.setItem("pastes",JSON.stringify(state.pastes))
     toast.success("Paste added successfully!",{position: "bottom-left",
        style: {
        backgroundColor: "#4ade80", 
        color: "#1e3a8a",          
        fontWeight: "bold",
        borderRadius: "10px",
        padding: "16px",
      }});
   },
    updateToPastes: (state,action) => {
        const paste = action.payload;
        const index = state.pastes.findIndex((item) => item._id === paste._id);
        if(index >=0){
            state.pastes[index] = paste;
            localStorage.setItem("pastes",JSON.stringify(state.pastes))
            toast.success("Paste updated successfully!",{position: "bottom-left",
                style: {
                backgroundColor: "#4ade80", 
                color: "#1e3a8a",          
                fontWeight: "bold",
                borderRadius: "10px",
                padding: "16px",
              }},);
        }
    },
    resetAllPastes: (state, action) => {
        state.pastes = [];
        localStorage.removeItem("pastes");
      
    },
    removeFromPastes:(state,action) =>{
        const paste = action.payload;
        const index = state.pastes.findIndex((item) => item._id === paste._id);
        if(index >=0){
            state.pastes.splice(index,1);
            localStorage.setItem("pastes",JSON.stringify(state.pastes))
            toast.success("Paste Deleted successfully!",{position: "bottom-left",
                style: {
                backgroundColor: "#4ade80", // green-400
                color: "#1e3a8a",           // blue-900
                fontWeight: "bold",
                borderRadius: "10px",
                padding: "16px",
              }},);
        }

    }
  }
})

// Action creators are generated for each case reducer function
export const { addToPastes,updateToPastes,resetAllPastes,removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer