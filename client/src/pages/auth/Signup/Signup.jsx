import React from 'react';

// routing
import {Navigate} from 'react-router-dom';

// redux
import {useSelector} from 'react-redux';

// components
import SignupForm from '../../../components/forms/SignupForm/SignupForm';


export default function Signup () {
    const {token} = useSelector(state => state.authReducer);
    const {username} = useSelector(state => state.authReducer);

    if (token?.length) return <Navigate to={`/${username}`}/>
    return <main className={`${container} bg-auth-page`}>
        <SignupForm/>
    </main>
}

const container = 'flex flex-col justify-center items-center h-full';