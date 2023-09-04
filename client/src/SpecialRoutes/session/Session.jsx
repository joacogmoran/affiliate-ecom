import React, { useEffect } from 'react';

// routing
import {Navigate, Outlet} from 'react-router-dom';

// redux
import {useDispatch, useSelector} from 'react-redux';

// actions
import {refreshToken} from '../../store/actions/authentication/actions';


export default function Session ({children}) {
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.authReducer);
    const {user, userFound} = useSelector(state => state.appReducer);
    const persist = localStorage.getItem('persist');

    useEffect(() => {
        if (!token?.length && persist) dispatch(refreshToken());
    }, [token]);

    if (!user || !userFound) return <Navigate to=''/>
    return children? children : <Outlet/>
};