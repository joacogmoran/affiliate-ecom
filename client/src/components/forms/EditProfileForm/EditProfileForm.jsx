import React, {useEffect, useState} from 'react';
import toast, {Toaster} from 'react-hot-toast';

// routing
import {Navigate, useParams} from 'react-router-dom';

// redux
import {useDispatch, useSelector} from 'react-redux';

// actions
import {editUserData} from '../../../store/actions/user/data/actions';



export default function EditProfileForm () {
    const {success, failure} = useSelector(state => state.toasterReducer);
    const {user} = useSelector(state => state.appReducer);
    const {user_name} = useParams();
    const dispatch = useDispatch();

    const [error, setError] = useState({
        imageUrl: true, name: true, username: true,
        description: true
    });
    
    const [input, setInput] = useState({
        imageUrl: '', name: '', username: '',
        description: ''
    });

    const checkData = (name, value) => {
        if (name === 'imageUrl' && value.length) setError({...error, imageUrl: false});
        if (name === 'name' && (value.length > 3 && value.length < 15)) setError({...error, name: false});
        if (name === 'username' && (value.length >= 5 && value.length <= 20)) setError({...error, username: false});
        if (name === 'description' && (value.length >= 10 && value.length <= 300)) setError({...error, description: false});
    };

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
        checkData(e.target.name, e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        const {imageUrl, name, username, description} = error;
        const inputsOk = !imageUrl || !name || !username || !description;
        if (inputsOk) {
            dispatch(editUserData(input));
            setInput({
                imageUrl: '', name: '', username: '',
                description: ''
            });
        }
    };

    useEffect(() => {
        if (success) toast.success('edited successfully!');
        if (failure) toast.error('error');
    }, [success, failure]);

    if (user !== user_name) return <Navigate to={`/${user}/profile`}/>
    return <>
        {success? <Toaster/> : <></>}
        {failure? <Toaster/> : <></>}
        <form className={form}>
            <img className={formImg} src={input.imageUrl} alt=''/>

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
                    <label className={formLabel}>username</label>
                    <input className={fromInput} type="text" name="username" value={input.username} onChange={handleChange}/>
                </div>
            </div>

            <div className={formBox}>
                <label className={formLabel}>description</label>
                <textarea className={fromInput} name="description" value={input.description} onChange={handleChange} cols="30" rows="5"></textarea>
            </div>

            <button className={formButton} onClick={submit}>edit</button>
        </form>
    </>
};


// style
const form = `flex flex-col gap-5 w-full`;
const formImg = `bg-gray-200 h-[200px] w-full`;

const formBox = `flex flex-col gap-3 w-full`;
const formFlexBox = `flex justify-between items-center gap-3`;

const formLabel = `uppercase font-bold text-sm tracking-[1px]`;

const fromInput = `border border-black rounded p-1 w-full`;
const formInputError = `border border-red-500 rounded p-1 w-full`;

const formButton = `bg-blue-700 rounded w-full py-2 mt-3 uppercase text-white font-bold tracking-[1px]`;