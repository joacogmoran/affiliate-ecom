import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';


// code
export default function Navbar () {
    const {token} = useSelector(state => state.authReducer);
    const {user} = useSelector(state => state.appReducer);

    return (
        <ul className={container}>
            <li><Link className={text} to={`/${user}`}>home</Link></li>
            {
                token?.length? <li><Link className={text} to={`/${user}/create`}>create</Link></li>
                : <></>
            }
            <li><Link className={text} to={`/${user}/profile`}>profile</Link></li>
        </ul>
    )
};


// style
const container = `bg-black flex justify-evenly items-center py-5`;
const text = `uppercase text-white font-bold tracking-[1px]`;