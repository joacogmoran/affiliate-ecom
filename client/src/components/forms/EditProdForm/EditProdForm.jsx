import React, {useEffect, useState} from 'react';
import toast, {Toaster} from 'react-hot-toast';

// routing
import {Link, useParams} from "react-router-dom";

// redux
import {useDispatch, useSelector} from 'react-redux';

// actions
import {editProduct} from '../../../store/actions/user/products/actions';

// code
export default function EditProductForm () {
    const {success, failure} = useSelector(state => state.toasterReducer);
    const {user} = useSelector(state => state.appReducer);
    const categories = ['home', 'travel', 'tech', 'game', 'book', 'cloth', 'collection'];
    const dispatch = useDispatch();
    const {productId} = useParams();
    
    const [error, setError] = useState({
        imageUrl: true, name: true, category: false,
        shortDesc: true, description: true, link: true
    });

    const [input, setInput] = useState({
        imageUrl: '', name: '', category: 'tech',
        shortDesc: '', description: '',
        link: ''
    });

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        checkInputs(e.target.name, e.target.value);
    };

    const checkInputs = (name, value) => {
        if (name === 'imageUrl' && value.length) setError({...error, imageUrl: false});
        if (name === 'name' && (value.length >= 3 || value.length <= 15)) setError({...error, name: false});
        if (name === 'category' && categories.includes(value)) setError({...error, name: false});
        if (name === 'shortDesc' && (value.length >= 10 && value.length <= 40)) setError({ ...error, shortDesc: false});
        if (name === 'description' && (value.length >= 50 && value.length <= 300)) setError({ ...error, description: false});
        if (name === 'link' && value.length) setError({...error, link: false});
    };

    const submit = (e) => {
        e.preventDefault();
        const inputsOk = !error.imageUrl || !error.name || !error.category || !error.shortDesc || !error.description || !error.link;
        if (inputsOk) {
            dispatch(editProduct(productId, input));
            setTimeout(() => {
                setInput({
                    imageUrl: '', name: '', category: 'tech',
                    shortDesc: '', description: '',
                    link: ''
                });
                setError({
                    imageUrl: true, name: true, category: false,
                    shortDesc: true, description: true, link: true
                });
            }, 1000);
        }
    };

    useEffect(() => {
        if (success) toast.success('edited successfully');
        if (failure) toast.error('error');
    }, [success, failure]);

    return <>
        {success? <Toaster/> : <></>}
        {failure? <Toaster/> : <></>}
        
        <form action="" className={form}>
            <img className={formImg} src='' alt=''/>

            <div className={formBox}>
                <label className={formLabel}>image url</label>
                <input className={fromInput} type="text" name="imageUrl" value={input.imageUrl} onChange={handleChange}/>
            </div>

            <div className={formFlexBox}>
                <div className={formBox}>
                    <label className={formLabel}>name</label>
                    <input className={fromInput} type="text" name="name" value={input.name} onChange={handleChange}/>
                </div>
                <div className={formBox}>
                    <label className={formLabel}>category</label>
                    <select className={formSelect} name="category" value={input.category} onChange={handleChange}>
                        <option value="">select</option>
                    </select>
                </div>
            </div>

            <div className={formBox}>
                <label className={formLabel}>link</label>
                <input className={fromInput} type="text" name="link" value={input.link} onChange={handleChange}/>
            </div>

            <div className={formBox}>
                <label className={formLabel}>short description</label>
                <input className={fromInput} type="text" name="shortDesc" value={input.shortDesc} onChange={handleChange}/>
            </div>

            <div className={formBox}>
                <label className={formLabel}>description</label>
                <textarea className={fromInput} name="description" cols="30" rows="5"
                    value={input.description} onChange={handleChange}
                ></textarea>
            </div>

            <div className={btnContainer}>
                <button className={formButton} onClick={submit}>edit</button>
                <Link className={formCancelButton} to={`/${user}/product/detail/${productId}`}>cancel</Link>
            </div>
        </form>
    </>
};



// style
const form = `flex flex-col gap-5 h-full w-full`;
const formImg = `bg-gray-200 h-[250px] w-full`;

const formBox = `flex flex-col gap-3 w-full`;
const formFlexBox = `flex justify-between items-center gap-3`;

const formLabel = `uppercase font-bold text-sm tracking-[1px]`;

const fromInput = `border-2 border-black rounded p-1 text-black`;
const fromInputError = 'border border-red-400 rounded p-1 text-black';

const formButton = `bg-blue-700 rounded w-full py-2 mt-3 uppercase text-center text-white font-bold tracking-[1px]`;
const formCancelButton = `bg-red-700 rounded w-full py-2 mt-3 uppercase text-center text-white font-bold tracking-[1px]`;


const formSelect = `bg-gray-200 border rounded p-2`;

const btnContainer = `flex flex-col gap-2`;