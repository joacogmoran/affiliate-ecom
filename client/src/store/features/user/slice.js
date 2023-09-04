import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: {}, arr: [],
    product: {}
}


export const user = createSlice({
    name: 'client', initialState,
    reducers: {
        userData: (state, action) => { state.data = action.payload, state.userNotFound = false },
        userProducts: (state, action) => { state.arr = action.payload },
        filterProducts: (state, action) => { state.arr = action.payload },
        productDetails: (state, action) => { state.product = action.payload }
    }
});


export const { userData, userProducts, filterProducts, productDetails } = user.actions;
export default user.reducer;