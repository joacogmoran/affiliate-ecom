import { loading } from "../../features/app/slice";

export const setLoading = () => {
    return dispatch => {
        dispatch(loading(true))
        setTimeout(() => {
            dispatch(loading(false));
        }, 1000);
    }
};