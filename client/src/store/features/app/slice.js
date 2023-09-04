import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: '', userFound: true,
    loading: true
}

export const app = createSlice({
    name: 'app', initialState,
    reducers: {
        loading: (state, action) => {state.loading = action.payload},
        setUser: (state, action) => {state.user = action.payload},
        userFound: (state) => {state.userFound = false}
    },
});


export const {loading, setUser, userFound} = app.actions
export default app.reducer;