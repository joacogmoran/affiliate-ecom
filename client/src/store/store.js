import { configureStore } from '@reduxjs/toolkit'

// slices
import authentication from './features/authentication/slice';
import toasters from './features/toasters/slice';
import user from './features/user/slice';
import app from './features/app/slice';



// store
export default configureStore({
    reducer: {
        authReducer: authentication,
        toasterReducer: toasters,
        userReducer: user,
        appReducer: app,
    },
});