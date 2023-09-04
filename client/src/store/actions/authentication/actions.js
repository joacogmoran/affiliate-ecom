import axios from "axios";

// actions
import { login, logout } from '../../features/authentication/slice';
import { failureToast, successToast } from '../toasters/actions';



//* POST - signup
export const signupUser = (data) => {
    return async dispatch => {
        try {
            const response = await axios.post(`/user/signup`, data);
            if (response.status !== 200) dispatch(failureToast());
            else dispatch(successToast());
        } catch (error) {
            console.log(error);
            dispatch(failureToast())
        };
    }
}


//* POST - login
export const loginUser = (data) => {
    return async dispatch => {
        try {
            const response = await axios.post(`/user/login`, data);
            if (response.status !== 200) dispatch(failureToast());
            else {
                localStorage.setItem('persist', true);
                dispatch(login(response.data));
            }
        } catch (error) {
            dispatch(failureToast())
        }
    }
}


//* GET - refresh token
export const refreshToken = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`/user/refreshToken`);
            dispatch(login(response.data));
        } catch (error) {
            console.log(error);
        };
    }
}


//* GET - logout
export const logoutUser = () => {
    return async dispatch => {
        try {
            await axios.get(`/user/logout`);
            localStorage.removeItem('persist');
            dispatch(logout());
        } catch (error) {
            console.log(error);
        };
    }
}
