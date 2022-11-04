import React, { useRef, useState } from 'react'

import { TextField } from '@mui/material';
import { useFirebase } from '../../../components/FirebaseProvider';
import { getAuth, updateProfile, updateEmail, sendEmailVerification, updatePassword } from "firebase/auth";

import isEmail from 'validator/lib/isEmail';

function Pengguna(){
    const displayNameRef = useRef(); 
    const emailRef = useRef();
    const passwordRef = useRef();
    const { user } = useFirebase();
    const [isSubmitting, setSubmitting] = useState(false);
    const auth = getAuth();

    const [error, setError] = useState({
        displayName: '',
        email: '',
        password: ''
    })

    const saveDisplayName = async (e)=> {
        const displayName = displayNameRef.current.value;
        console.log(displayName);

        if(!displayName){
            setError({
                displayName: 'Nama wajib diisi'
            })
        }else if (displayName !== user.displayName){
            setError({
                displayName: '' //reset error
            })
            setSubmitting(true);
            await updateProfile(auth.currentUser, {
                displayName
            })
            setSubmitting(false);
            document.querySelector('.notif_block').innerText = 'Nama Berhasil Diperbaharui';
            document.querySelector('.notif_block').style.display = 'block';
        }
    }

    const saveUpdateEmail = async (e) => {
        const email = emailRef.current.value;

        if (!email){
            setError({
                email: 'Email wajib diisi'
            })
        }else if(!isEmail(email)){
            setError({
                email: 'Email tidak valid'
            })
        }else if(email !== user.email){
            setError({
                email: ''
            })
            setSubmitting(true);
            try{
                await updateEmail(auth.currentUser, email)
                document.querySelector('.notif_block').style.display = 'block';
                document.querySelector('.notif_block').innerText = 'Email Berhasil Diperbaharui';
            }catch(e){
                let emailError = '';
                switch(e.code){
                    case 'auth/email-already-in-use':
                        emailError = 'Email sudah didaftarkan oleh pengguna lain' ;
                    break;
                    case 'auth/invalid-email':
                        emailError = 'Email tidak valid';
                    break;
                    case 'auth/requires-recent-login':
                        emailError = 'Silahkan logout, kemudian login kembali'
                    break;
                    default:
                        emailError = 'Terjadi kesalahan silahkan coba lagi'
                    break;
                }

                setError({
                    email: emailError
                })
            }

            setSubmitting(false);
        }
    }

    const sendEmailVerif = async (e) => {
        const actionCodeSettings = {
            url: `${window.location.origin}/login`
        };

        setSubmitting(true);
        await sendEmailVerification(auth.currentUser)
        document.querySelector('.notif_block').style.display = 'block';
        document.querySelector('.notif_block').innerText = `Email verifikasi telah dikirim ke ${emailRef.current.value}`;
        setSubmitting(false);
    }

    const updatePasswords = async (e) => {
        const password = passwordRef.current.value;

        if (!password){
            setError({
                password: 'Password wajib diisi'
            })
        }else{
             setSubmitting(true);
             try {
                await updatePassword(auth.currentUser, password)
                document.querySelector('.notif_block').style.display = 'block';
                document.querySelector('.notif_block').innerText = `Password berhasil di perbaharui`;
             }catch(e){
                let errorPassword = '';
                console.log(e.code)

                switch(e.code){
                    case 'auth/weak-password':
                        errorPassword = "Password terlalu lemah";
                    break ;
                    case 'auth/requires-recent-login':
                        errorPassword = "Silahkan logout, kemudian login untuk memperbaharui password";
                    break;
                    default:
                        errorPassword = "Terjadi kesalahan, silahkan coba lagi";
                    break;
                }

                setError({
                    password: errorPassword
                })
             }
             setSubmitting(false)
        }
    }
    
    return <>
        <div className="hidden notif_block p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
            <span className="font-medium">Success alert!</span> Change a few things up and try submitting again.
        </div>
        <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
            <div className="border-t border-gray-200" />
            </div>
        </div>

        <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Informasi Pengguna</h3>
                <p className="mt-1 text-sm text-gray-600">Menampilkan data pengguna aplikasi penjualan</p>
                </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
                <form action="#" method="POST">
                <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            Nama
                        </label>
                        <TextField
                            type="text"
                            name="displayName"
                            id="displayName"
                            inputProps={{
                                ref: displayNameRef,
                                onBlur: saveDisplayName
                            }}
                            disabled={isSubmitting}
                            defaultValue={user.displayName}
                            error={error.displayName ? true : false}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <p className="text-red-500 text-xs italic">{error.displayName}</p>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <TextField
                            type="email "
                            name="email"
                            id="email"
                            inputProps={{
                                ref: emailRef,
                                onBlur: saveUpdateEmail
                            }}
                            disabled={isSubmitting}
                            defaultValue={user.email}
                            error={error.email ? true : false}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <p className="text-red-500 text-xs italic">{error.email}</p><br></br>
                        {
                            user.emailVerified ? 
                            <div className="notif_block p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                                Email sudah terverifikasi.
                            </div> :
                            <button 
                            type="button" 
                            disabled={isSubmitting}
                            onClick={sendEmailVerif}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">kirim email verifikasi</button>
                        }
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password baru
                        </label>
                        <TextField
                            type="password"
                            name="password"
                            id="password"
                            inputProps={{
                                ref: passwordRef,
                                onBlur: updatePasswords
                            }}
                            autoComplete="new-password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <p className="text-red-500 text-xs italic">{error.password}</p>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                        </select>
                        </div>

                        <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                            Street address
                        </label>
                        <input
                            type="text"
                            name="street-address"
                            id="street-address"
                            autoComplete="street-address"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            autoComplete="address-level2"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                            State / Province
                        </label>
                        <input
                            type="text"
                            name="region"
                            id="region"
                            autoComplete="address-level1"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                            ZIP / Postal code
                        </label>
                        <input
                            type="text"
                            name="postal-code"
                            id="postal-code"
                            autoComplete="postal-code"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Save
                    </button>
                    </div>
                </div>
                </form>
            </div>
            </div>
        </div>
    </>
}

export default Pengguna;