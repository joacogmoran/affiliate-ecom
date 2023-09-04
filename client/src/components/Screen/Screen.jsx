import React, {useEffect} from 'react';

// routing
import {Outlet, useParams} from 'react-router-dom';

// redux
import {useDispatch, useSelector} from 'react-redux';

// actions
import {setUser} from '../../store/features/app/slice';
import {setLoading} from '../../store/actions/app/actions';

// gif
import load from '../../assets/loading-gif.gif';

// components
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';


export default function Screen () {
    const {token, username} = useSelector(state => state.authReducer);
    const {loading} = useSelector(state => state.appReducer);
    const dispatch = useDispatch();
    const {user_name} = useParams();

    useEffect(() => {
        if (token?.length) dispatch(setUser(username))
        else dispatch(setUser(user_name));
    }, [token]);

    useEffect(() => {
        dispatch(setLoading());
    }, []);

    return <>
        {
            loading? <div className={loadContainer}><img className={gif} src={load} alt='loading'/></div>
            : <div className={container}><Header/><Outlet/><Navbar/></div>
        }
    </>
}

// style
const container = 'flex flex-col h-screen';

const loadContainer = `bg-black flex flex-col justify-center items-center h-screen`;
const gif = `rounded-full shadow shadow-white h-[100px] w-[100px]`;
