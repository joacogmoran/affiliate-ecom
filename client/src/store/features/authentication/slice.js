import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: '', username: ''
}

export const authentication = createSlice({
    name: 'auth', initialState,
    reducers: {
        logout: (state) => { state.token = '', state.username = '' },
        login: (state, action) => {
            state.username = action.payload.username,
            state.token = action.payload.accessToken
        }
    },
});


export const { login, logout } = authentication.actions;
export default authentication.reducer;