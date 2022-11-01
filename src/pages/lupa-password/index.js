import React, { useState } from 'react';
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { LockClosedIcon } from '@heroicons/react/20/solid';
import isEmail from 'validator/lib/isEmail';

//import react router dom
import {Link, Redirect} from 'react-router-dom';

//import firebase hooks
import {useFirebase} from '../../components/FirebaseProvider';

// import component
import AppLoading from '../../components/AppLoading';

export default function LupaPassword() {

  const [form, setForm] = useState({
    email: '',
  })

  const [error, setError] = useState({
    email: '',
  })

  const [isSubmitting, setSubmitting] = useState(false);

  const {auth, user, loading} = useFirebase();

  const handleChange = e =>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })

    setError({
      ...error,
      [e.target.name]:''
    })
  }

  const handleSubmit = async e =>{
    e.preventDefault()
    const findError = validate()

    if (Object.values(findError).some(err=>err!='')){
    console.log(findError)
    setError(findError);
    }else{
      try{
        console.log('sucessfuly')
        setSubmitting(true);
        const actionCodeSettings = {
            url : `${window.location.origin}/login`
        }
        await auth.sendPasswordResetEmail(
            form.email, actionCodeSettings)
        setSubmitting(false);
      }catch(e){
        console.log(e.code)
        const newError = {};
        switch(e.code){
           case 'auth/missing-android-pkg-name':
            newError.email = 'An Android package name must be provided if the Android app is required to be installed.'
           break;
           case 'auth/invalid-email':
            newError.email = 'Email tidak valid'
           break;
           case 'auth/unauthorized-continue-uri':
            newError.email = 'Domain tidak ter whitelist'
           break;
           case 'auth/user-not-found':
            newError.email = 'Akun tidak ditemukan'
           break;
           default:
            newError.email = 'Terjadi kesalahan silahkan coba lagi'
           break;
        }

        setError(newError);
        setSubmitting(false);
      }
    }
  }

  const validate = ()=>{
    const newError = {...error}

    if(!form.email){
      newError.email = 'Email wajib di isi'
    }else if(!isEmail(form.email)){
      newError.email = 'Email tidak valid'
    }
    return newError;
  }

//   console.log(form)
//   console.log(user)

  if(loading){
    return <AppLoading/>
  }

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Lupa Password
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <p className="text-red-500 text-xs italic">{error.email}</p>
              </div>
            </div>
            <div>
              <button
                disabled={isSubmitting}
                type='submit'
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Kirim
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
