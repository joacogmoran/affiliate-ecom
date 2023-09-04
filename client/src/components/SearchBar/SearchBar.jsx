import React, { useState } from 'react';

// icons
import {FaSearch, FaCircleNotch} from 'react-icons/fa';

// redux
import {useDispatch, useSelector} from 'react-redux';

// actions
import {fetchUserProducts, searchProducts} from '../../store/actions/user/products/actions';


// code
export default function SearchBar () {
    const {user} = useSelector(state => state.appReducer);
    const {arr} = useSelector(state => state.userReducer);
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const handleInput = (e) => {
        const {value} = e.target;
        setInput(value);
    };

    const getAllProducts = () => {
        dispatch(fetchUserProducts(user));
    };

    const submit = (e) => {
        e.preventDefault();
        if (input.length) dispatch(searchProducts(arr, input));
        setInput('');
    };

    return (
        <div className={container}>
            <button className={btn} onClick={getAllProducts}><FaCircleNotch/></button>
            <input className={search} type="text" value={input} onChange={handleInput}/>
            <button className={btn} onClick={submit}><FaSearch/></button>
        </div>
    )
};


// style
const container = `flex justify-center items-center gap-5 w-full`;
const search = `border border-black rounded w-full p-1`;
const btn = `bg-black rounded p-2 text-white`;