import { failure, success } from "../../features/toasters/slice";




export const successToast = () => {
    return dispatch => {
        dispatch(success());
        setTimeout(() => {
           dispatch(success());
        }, 1000);
    }
};

export const failureToast = () => {
    return dispatch => {
        dispatch(failure());
        setTimeout(() => {
           dispatch(failure());
        }, 1000);
    }
};