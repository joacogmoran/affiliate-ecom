import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


export default function Authentication ({children}) {
    const {token} = useSelector(state => state.authReducer);
    const {user} = useSelector(state => state.appReducer);
    const perisit = localStorage.getItem('persist');
    if (!perisit && !token?.length) return <Navigate to={`/${user}`}/>
    return children? children : <Outlet/>
};