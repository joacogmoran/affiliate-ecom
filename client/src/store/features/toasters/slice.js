import { createSlice } from '@reduxjs/toolkit';


const initialState = { success: false, failure: false };
export const toasters = createSlice({
    name: 'toaster', initialState,
    reducers: {
        success: (state) => { state.success = !state.success },
        failure: (state) => { state.failure = !state.failure },
    }
});


export const { success, failure } = toasters.actions;
export default toasters.reducer;