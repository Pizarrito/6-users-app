import { createSlice } from "@reduxjs/toolkit";

const initialLogin = JSON.parse (sessionStorage.getItem('login')) || {
    isAuth:false,
    isAdmin: false,
    user: undefined,
}

export const authSlice = createSlice ({
    name : 'auth',
    initialState: initialLogin,
    reducers:{
       onLogin:(state,action)=> {
          state.isAuth = true;
          state.user = action.payload;
          state.isAdmin = action.payload.isAdmin;
       },
       onLogOut:(state,action) =>{
        state.isAuth = false;
        state.isAdmin = false;
        state.user = undefined;

       }
    }
    
});

export const {
    onLogOut,
    onLogin,
} = authSlice.actions;