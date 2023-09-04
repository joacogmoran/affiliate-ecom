import React, { useEffect } from 'react';

// routing
import {Link} from 'react-router-dom';

// redux
import {useDispatch, useSelector} from 'react-redux';

// actions
import {fetchUserData} from '../../../store/actions/user/data/actions';



export default function Profile () {
    const {token, username} = useSelector(state => state.authReducer);
    const {user} = useSelector(state => state.appReducer);
    const {data} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (token?.length) dispatch(fetchUserData(username))
        else if (user?.length) dispatch(fetchUserData(user));
    }, [token]);

    return <main className={container}>
            <img className={img} src={data?.imageUrl} alt=""/>
            {
                token?.length? <Link className={header_btn} to={`/${user}/edit/profile`}>edit</Link>
                : <></>
            }
            <h2 className={header_title}>{data?.username}</h2>
            <p className={body_text}>{data?.description}</p>
        </main>
};

// style
const container = 'flex flex-col gap-5 h-full py-5 px-2';
const img = `bg-gray-200 h-[150px] w-full`;

const header_title = `uppercase tracking-[1px] text-md font-bold`;
const header_btn = `bg-black rounded py-2 uppercase tracking-[1px] text-sm font-bold text-white text-center`;

const body_text = `w-full tracking-[1px] leading-7 capitalize`;