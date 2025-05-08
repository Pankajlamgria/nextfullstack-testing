'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";

export default function signUp() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: '',
        username: '',
    })
    const [loading, setloading] = useState(false);
    const onSignUp = async () => {
        setloading(true);
        try {
            const response = await axios.post('/api/users/signup', user);
            console.log(response);
            router.push('/login');
        }
        catch (error: any) {
            console.log("erorr Occured in onSign Up call");
        }
        finally {
            setloading(false);
        }
    }
    return (
        <div className='flex flex-col justify-center items-center mt-24'>
            <h2 className='text-2xl'>{(loading) ? "Processing" : "SignUp"}</h2>
            <div className='mt-8 p-8 flex flex-col w-[30%]'>
                <label className='text-xl' htmlFor='email'>Email</label>
                <input type='email' id='email' className='border-2 rounded-md p-1' placeholder='xyz@gmail.com' onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <label className='text-xl mt-6'>Password</label>
                <input type='password' className='border-2 rounded-md p-1' onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <label className='text-xl mt-6'>Username</label>
                <input placeholder='Alice Bob' type='text' className='border-2 rounded-md p-1' onChange={(e) => setUser({ ...user, username: e.target.value })} />
                <button className='bg-green-700 p-2 w-30 mt-6 border-2 rounded-xl cursor-pointer transition-all hover:scale-105' onClick={onSignUp}>Sign Up</button>
                <Link className='mt-6 text-center' href='/login'>Already have an account</Link>
            </div>
        </div>
    )
} 