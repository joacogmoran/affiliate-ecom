import axios from 'axios';

// actions
import {userData} from '../../../features/user/slice';
import {refreshToken} from '../../authentication/actions';
import {failureToast} from '../../toasters/actions';
import {userFound} from '../../../features/app/slice';


// GET --> get user data
export const fetchUserData = (username) => {
    return async dispatch => {
        try {
            const response = await axios.get(`/get/user/data/${username}`);
            dispatch(userData(response.data));
        } catch (error) {
            if (error.response.status === 404) dispatch(userFound());
            else dispatch(failureToast());
        }
    }
};


// PUT --> edit user data.
export const editUserData = (data) => {
    return async dispatch  => {
        try {
            await axios.put('/edit/user/data', data);
            dispatch(fetchUserData(data.username));
            dispatch(refreshToken());
        } catch (error) {
            dispatch(failureToast())
        }
    }
};


