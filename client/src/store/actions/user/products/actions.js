import axios from 'axios';

// actions
import {filterProducts, productDetails, userProducts} from '../../../features/user/slice';
import {failureToast, successToast} from '../../toasters/actions';
import {userFound} from '../../../features/app/slice';


// GET --> get all - store products
export const fetchUserProducts = (username) => {
    return async dispatch => {
        try {
            const response = await axios.get(`/get/user/products/${username}`);
            if (response.status === 200) dispatch(userProducts(response.data));
        } catch (error) {
            if (error.response.status === 404) dispatch(userFound());
            else dispatch(failureToast());
        }
    }
};


// GET --> get user product details
export const fetchUserProductDetails = (productId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/get/user/product/details/${productId}`);
            dispatch(productDetails(response.data));
        } catch (error) {
            console.log(error)
            dispatch(failureToast());
        }
    }
};

export const searchProducts = (arr, searched) => {
    return dispatch => {
        const newArr = arr.filter(item => item.name.includes(searched));
        dispatch(filterProducts(newArr));
    }
};


export const filterProductsByCategory = (username, category) => {
    return async dispatch => {
        try {
            const response = await axios.get(`/get/user/products/${username}`);
            const newArr = response.data.filter(item => item.category === category);
            dispatch(filterProducts(newArr));
        } catch (error) {
            dispatch(failureToast());
        }
    }
};

// POST --> create product
export const createProduct = (product) => {
    return async (dispatch) => {
        try {
            await axios.post(`/create/user/product`, product);
            dispatch(successToast());
        } catch (error) {
            dispatch(failureToast());
        }
    }
};


// PUT --> edit product
export const editProduct = (productId, data) => {
    return async dispatch => {
        try {
            await axios.put(`/edit/user/product/${productId}`, data);
            dispatch(successToast());
        } catch (error) {
            dispatch(failureToast());
        }
    }
};


// DELETE --> delete product
export const deleteProduct = (username, productId) => {
    return async dispatch => {
        try {
            await axios.delete(`/delete/user/product/${productId}`);
            dispatch(fetchUserProducts(username));
            dispatch(productDetails({}));
        } catch (error) {
            dispatch(failureToast())
        }
    }
};
