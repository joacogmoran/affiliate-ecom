import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

// actions
import {deleteProduct} from '../../store/actions/user/products/actions';


// code
export default function ProductCard ({id, image, name, description, link}) {
    const {user} = useSelector(state => state.appReducer);
    const {token} = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    const handleDelete = () => { dispatch(deleteProduct(user, id)) };
    
    return (
        <div className={container}>
            <Link to={`/${user}/product/detail/${id}`}>
                <div className={header}>
                    <img className={img} src={image} alt={name}/>
                </div>
                <div className={body}>
                    <h2 className={body_title}>{name}</h2>
                    <p className={body_text}>{description}</p>
                </div>
            </Link>
            <div className={body}>
                    {
                        !token?.length? <a className={linkItem} href={link}>get it</a>
                        : <Link className={linkItem} to={`/${user}/edit/product/${id}`}>edit</Link>
                    }
                    {
                        !token?.length? <></>
                        : <button className={btn} onClick={handleDelete}>delete</button>
                    }
                </div>
        </div>
    )
};


// style
const container = `bg-blue-100 w-[47%]`;

const header = `w-full`;
const img = `bg-gray-200 h-[200px] w-full`;

const linkItem = `bg-black rounded py-1 px-5 uppercase text-white text-sm text-center`;
const btn = `bg-red-600 rounded py-1 px-5 uppercase text-white text-sm text-center`;
const btnCart = `bg-yellow-300 rounded py-1 px-5 uppercase text-sm text-center`;

const body = `flex flex-col justify-between gap-3 py-3 px-2`;
const body_title = `uppercase font-bold text-md tracking-[1px]`;
const body_text = `text-md tracking-[1px]`;