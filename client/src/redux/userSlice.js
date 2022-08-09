import { createSlice } from '@reduxjs/toolkit'

const initialState ={
  CurrentUser:null,
  loading:false,
  error:false
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    //con mayuscula el State y el CurrentUser para que se vea el logo como imagen de goggle,porque aqui se le pasa la carga del payload al State.Current de Redux!!!
    loginSuccess: (State,action) =>{
      State.loading= false;
      State.CurrentUser= action.payload;

    },
    loginFailure:(state)=> {
      state.loading= false;
      state.error= true;

    },
    logout:(state) => {
      state.CurrentUser=null;
      state.loading=false;
      state.error=false;
    },
    subscription:(State,action)=>{
        if(State.CurrentUser.subcribedUsers.includes(action.payload)){
          State.CurrentUser.subcribedUsers.splice(
            State.CurrentUser.subcribedUsers.findIndex(
              (channelId) => channelId === action.payload
            ),1
          );
        } else {
          State.CurrentUser.subcribedUsers.push(action.payload);
        }
    }
  }
});

export const {loginStart,loginSuccess,loginFailure,logout,subscription} = userSlice.actions

export default userSlice.reducer
