import { createSlice } from '@reduxjs/toolkit'

const initialState ={
  CurrentVideo:null,
  loading:false,
  error:false
}

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (State,action) =>{
      State.loading= false;
      State.CurrentVideo= action.payload;

    },
    fetchFailure:(state)=> {
      state.loading= false;
      state.error= true;

    },
    like: (State, action) => {
      if (!State.CurrentVideo.likes.includes(action.payload)) {
        State.CurrentVideo.likes.push(action.payload);
        State.CurrentVideo.dislikes.splice(
          State.CurrentVideo.dislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    dislike: (State, action) => {
      if (!State.CurrentVideo.dislikes.includes(action.payload)) {
        State.CurrentVideo.dislikes.push(action.payload);
        State.CurrentVideo.likes.splice(
          State.CurrentVideo.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
  },
});

export const {fetchStart,fetchSuccess,fetchFailure,like,dislike} = videoSlice.actions

export default videoSlice.reducer