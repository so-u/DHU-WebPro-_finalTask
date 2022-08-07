import { createSlice } from "@reduxjs/toolkit"
import { auth } from "../firebase";

const initialState = {
    user: {
        uid: '',
        email: '',
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = {uid: '', email: ''}
            auth.signOut()
        }
    }
})

export const {login, logout} = userSlice.actions;

export const selectUid = (state) => state.user.user.uid
export const selectEmail = (state) => state.user.user.email

export default userSlice.reducer