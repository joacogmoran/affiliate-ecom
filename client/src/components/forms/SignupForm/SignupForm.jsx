import React, {useEffect, useState} from 'react';
import toast, {Toaster} from 'react-hot-toast';

// routing
import {Link} from 'react-router-dom';

// redux
import {useDispatch, useSelector} from 'react-redux';

// actions
import {signupUser} from '../../../store/actions/authentication/actions';



export default function SignupForm () {
    const {success, failure} = useSelector(state => state.toasterReducer);
    const [input, setInput] = useState({username: '', password: ''});
    const [error, setError] = useState({ username: true, password: true });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const {name, value} = e.target;
        const c1 = (name === 'username' && (value.length >= 3 && value.length <= 20));
        const c2 = (name === 'password' && (value.length >= 5 && value.length <= 30));
        if (c1 || c2) setError({ ...error, [name]: false });
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!error.username || !error.password) {
            setInput({ username: '', password: '' });
            dispatch(signupUser({
                username: input.username,
                password: input.password
            }));
        }
    };

    useEffect(() => {
        if (success) toast.success('signed up successfully!');
        if (failure) toast.error('username already taken');
    }, [success, failure]);

    return <>
        {success? <Toaster/> : <></>}
        {failure? <Toaster/> : <></>}
        <form className={form}>
            <label className={label}>
                <p className={formInputText}>username</p>
                <input className={error.username? formInputErr : formInput} type="text"
                    name="username" value={input.username}
                    onChange={handleChange}
                />
            </label>
            <label className={label}>
                <p className={formInputText}>password</p>
                <input className={error.password? formInputErr : formInput} type="text"
                    name="password" value={input.password}
                    onChange={handleChange}
                />
            </label>
            {/* buttons */}
            <button className={formBtn} onClick={handleSubmit} disabled={error.username || error.password}>signup</button>
            <Link className={formSecondLink} to='/'>login</Link>
        </form>
    </>
}


// style
const form = `bg-black rounded flex flex-col gap-5 w-[250px] py-5 px-2`;

const label = `flex flex-col gap-3`;
const formInput = `border border-black rounded py-1 px-2 text-black`;
const formInputText = `uppercase text-white font-bold text-sm tracking-[1px]`;

const formInputErr = `border border-red-500 rounded py-1 px-2`;

const formBtn = `bg-blue-200 w-full py-2 mt-4 uppercase text-sm text-black`;
const formSecondLink = `uppercase text-center text-sm text-white`;