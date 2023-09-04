import React, {useEffect, useState} from 'react';
import toast, {Toaster} from 'react-hot-toast';

// redux
import {useDispatch, useSelector} from 'react-redux';

// actions
import { createProduct } from '../../../store/actions/user/products/actions';


export default function CreateProdForm () {
    const {success, failure} = useSelector(state => state.toasterReducer);
    const categories = ['home', 'travel', 'tech', 'game', 'book', 'cloth', 'collection'];
    const dispatch = useDispatch();

    const [error, setError] = useState({
        imageUrl: true, name: true, category: false,
        shortDesc: true, description: true, link: true
    });

    const [input, setInput] = useState({
        imageUrl: '', name: '', category: '',
        shortDesc: '', description: '', link: ''
    });

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        checkInputs(e.target.name, e.target.value);
    };

    const checkInputs = (name, value) => {
        if (name === 'imageUrl' && value.length) setError({...error, imageUrl: false});
        if (name === 'name' && (value.length >= 3 && value.length <= 15)) setError({...error, name: false});
        if (name === 'category' && categories.includes(value)) setError({...error, name: false});
        if (name === 'shortDesc' && (value.length >= 10 && value.length <= 40)) setError({...error, shortDesc: false});
        if (name === 'description' && (value.length >= 50 && value.length <= 300)) setError({...error, description: false});
        if (name === 'link' && value.length) setError({...error, link: false});
    };

    const submit = (e) => {
        e.preventDefault();
        const inputsOk = !error.imageUrl && !error.name && !error.category && !error.shortDesc && !error.description && !error.link;
        if (inputsOk) {
            dispatch(createProduct(input));
            setInput({
                imageUrl: '', name: '', category: '',
                shortDesc: '', description: '', link: ''
            });
        }
    };

    useEffect(() => {
        if (success) toast.success('created!');
        if (failure) toast.error('error');
    }, [success, failure]);

    return <>
        {success? <Toaster/> : <></>}
        {failure? <Toaster/> : <></>}
        <form className={form}>
            <img className={formImg} src={input.imageUrl} alt=''/>
            <div className={formBox}>
                <label className={formLabel}>image url</label>
                <input className={error.imageUrl? fromInputError : fromInput} type="text" name="imageUrl" value={input.imageUrl} onChange={handleChange}/>
            </div>

            <div className={formFlexBox}>
                <div className={formBox}>
                    <label className={formLabel} htmlFor="">name</label>
                    <input className={error.name? fromInputError : fromInput} type="text" name="name" value={input.name} onChange={handleChange}/>
                </div>
                <div className={formBox}>
                    <label className={formLabel}>category</label>
                    <select className={formSelect} name="category" value={input.category} onChange={handleChange}>
                        <option value="">select</option>
                        {categories.map((item, index) => <option key={index} value={item}>{item}</option>)}
                    </select>
                </div>
            </div>

            <div className={formBox}>
                <label className={formLabel}>link</label>
                <input className={error.link? fromInputError : fromInput} type="text" name="link" value={input.link} onChange={handleChange}/>
            </div>

            <div className={formBox}>
                <label className={formLabel}>short description</label>
                <input className={error.shortDesc? fromInputError : fromInput} type="text" name="shortDesc" value={input.shortDesc} onChange={handleChange}/>
            </div>

            <div className={formBox}>
                <label className={formLabel}>description</label>
                <textarea className={error.description? fromInputError : fromInput} name="description" cols="30" rows="5" value={input.description} onChange={handleChange}></textarea>
            </div>

            <button className={formButton} onClick={submit}>create</button>
        </form>
    </>
};


// style
const form = `flex flex-col gap-5 h-full`;
const formImg = `bg-gray-200 h-[250px] w-full`;

const formBox = `flex flex-col gap-3 w-full`;
const formFlexBox = `flex justify-between items-center gap-3`;

const formLabel = `uppercase font-bold text-sm tracking-[1px]`;

const fromInput = `border-2 border-black rounded p-1`;
const fromInputError = 'border border-red-400 rounded p-1';

const formButton = `bg-blue-700 rounded w-full py-2 mt-3 uppercase text-white font-bold tracking-[1px]`;

const formSelect = `bg-gray-200 border rounded p-2`;