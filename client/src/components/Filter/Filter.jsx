import React, { useState } from 'react';

// redux
import {useDispatch, useSelector} from 'react-redux';

// actions
import {filterProductsByCategory} from '../../store/actions/user/products/actions';



// code
export default function Filter () {
    const {user} = useSelector(state => state.appReducer);
    const [select, setSelect] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const {value} = e.target;
        if (value.length) dispatch(filterProductsByCategory(user, value));
        setSelect(value);
    };

    return (
        <select className={container} value={select} onChange={handleChange}>
            <option value="">select</option>
            <option value="home">home</option>
            <option value="travel">travel</option>
            <option value="tech">tech</option>
            <option value="game">game</option>
            <option value="book">book</option>
            <option value="cloth">cloth</option>
            <option value="collection">collection</option>
        </select>
    )
};

// style
const container = `bg-gray-200 w-full py-3 px-2 uppercase text-sm`;