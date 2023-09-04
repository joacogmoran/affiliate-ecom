import React from 'react';

// routing
import {Link} from 'react-router-dom';

// redux
import {useDispatch, useSelector} from 'react-redux';

// actions
import {logoutUser} from '../../store/actions/authentication/actions';


// code
export default function Header () {
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.authReducer);
    const handleLogout = () => { dispatch(logoutUser()) };

    return (
        <header className={header}>
            <h1 className={header_title}>affiliate store</h1>
            {
                token?.length? <button className={link} onClick={handleLogout}>logout</button>
                : <></>
            }
        </header>
    )
};


// style
const header = `bg-black flex justify-between items-center py-5 px-3`;
const header_title = 'uppercase text-md text-white tracking-[1px]';

const link = `bg-gray-200 rounded py-1 px-2 uppercase text-sm font-bold`;
