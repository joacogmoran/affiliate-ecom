import React, {useEffect} from 'react';
import toast, {Toaster} from 'react-hot-toast';

// routing
import {Navigate} from 'react-router-dom';

// redux
import {useDispatch, useSelector} from 'react-redux';

// actions
import {fetchUserProducts} from '../../../store/actions/user/products/actions';

// components
import SearchBar from '../../../components/SearchBar/SearchBar';
import Filter from '../../../components/Filter/Filter';
import ProductFactory from '../../../components/ProductFactory/ProductFactory';


export default function Home () {
    const {token, username} = useSelector(state => state.authReducer);
    const {user} = useSelector(state => state.appReducer);
    const {failure} = useSelector(state => state.toasterReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (failure) toast.error('could not get');
    }, [failure]);

    useEffect(() => {
        if (token?.length) dispatch(fetchUserProducts(username))
        else if (user?.length) dispatch(fetchUserProducts(user));
    }, [token]);

    if (token?.length && (username !== user)) return <Navigate to={`/${username}`}/>
    return <main className={container}>
        {failure? <Toaster/> : <></>}
        <SearchBar/>
        <Filter/>
        <ProductFactory/>
    </main>
};

// style
const container = 'flex flex-col gap-5 h-full py-5 px-2';