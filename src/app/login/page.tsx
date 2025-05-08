'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";

export default function login() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: '',
    })
    const onLogin = async () => {
        try {
            const response = await axios.post('/api/users/login', user);
            console.log(response);
            if (response.data.success) {
                alert("Login successfully.");
                router.push("/profile");
            }
            else {
                console.log("Error in success");
            }
        }
        catch (error) {
            console.log("Erorr occured");
        }

    }
    return (
        <div className='flex flex-col justify-center items-center mt-24'>
            <h2 className='text-2xl'>Log in</h2>
            <div className='mt-8 p-8 flex flex-col w-[30%]'>
                <label className='text-xl' htmlFor='email'>Email</label>
                <input type='email' id='email' className='border-2 rounded-md p-1' placeholder='xyz@gmail.com' onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <label className='text-xl mt-6'>Password</label>
                <input placeholder='Password' type='password' className='border-2 rounded-md p-1' onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <button className='bg-green-700 p-2 w-30 mt-6 border-2 rounded-xl cursor-pointer transition-all hover:scale-105' onClick={onLogin}>Sign Up</button>
                <Link className='mt-6 text-center' href='/signup'>Create new account</Link>
            </div>
        </div>
    )
}