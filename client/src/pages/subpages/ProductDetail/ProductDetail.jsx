import React, {useEffect, useState} from 'react';

// routing
import {Link, Navigate, useParams} from 'react-router-dom';

// redux
import {useDispatch, useSelector} from 'react-redux';

// actions
import {deleteProduct, fetchUserProductDetails} from '../../../store/actions/user/products/actions';



// code
export default function ProductDetail () {
    const {token} = useSelector(state => state.authReducer);
    const {user} = useSelector(state => state.appReducer)
    const {product} = useSelector(state => state.userReducer);
    const [deleted, setDeleted] = useState(false);
    const dispatch = useDispatch();
    const {productId} = useParams();

    const handleDelete = () => {
        dispatch(deleteProduct(user, productId));
        setDeleted(true);
    };

    useEffect(() => {
        dispatch(fetchUserProductDetails(productId));
        setDeleted(false)
    }, [productId]);

    if (deleted && !Object.entries(product).length) return <Navigate to={`/${user}`}/>
    return (
        <main className={container}>
            <img className={img} src="" alt=""/>
            {
                !token?.length? <a className={btnGet} href={product?.link}>get it</a>
                : <div className={btnContainer}>
                    <Link className={btn} to={`/${user}/edit/product/${productId}`}>edit</Link>
                    <button className={`${btn} ${btnDelete}`} onClick={handleDelete}>delete</button>
                </div>
            }
            <div className={body}>
                <h2 className={body_title}>{product.name}</h2>
                <p className={body_text}>
                    {product.description}
                </p>
            </div>
        </main>
    )
};

// style
const container = 'flex flex-col gap-5 h-full py-5 px-2';
const img = `bg-gray-200 rounded h-[300px] w-full`;

const body = `flex flex-col gap-3 h-full w-full py-2`;
const body_title = `uppercase tracking-[1px] font-bold`;
const body_text = `leading-7`;

const btnContainer = `flex flex-col gap-3 w-full`;
const btn = `bg-black rounded py-2 uppercase text-sm text-white text-center`;
const btnDelete = `bg-red-600`;
const btnGet = `bg-yellow-300 rounded py-2 uppercase text-sm text-center w-full`;
