import React, { useState } from 'react'
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
import isEmail from 'validator/lib/isEmail'

//import react router dom
import {Link, Redirect} from 'react-router-dom';

//import firebase hooks
import {useFirebase} from '../../components/FirebaseProvider'

// import component
import AppLoading from '../../components/AppLoading'

export default function Login(props) {
  const {location} = props;

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState({
    email: '',
    password: '',
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
      setError(findError);
    }else{
      try{
        setSubmitting(true);
        await auth.signInWithEmailAndPassword (form.email, form.password)
      }catch(e){
        console.log(e.code)
        const newError = {};
        switch(e.code){
           case 'auth/user-disabled':
            newError.email = 'User telah di nonaktifkan'
           break;
           case 'auth/invalid-email':
            newError.email = 'Email tidak valid'
           break;
           case 'auth/user-not-found':
            newError.email = 'User tidak ditemukan'
           break;
           case 'auth/wrong-password':
            newError.password = 'Password salah'
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

    if(!form.password){
      newError.password = 'Password wajib di isi'
    }

    return newError;
  }

  console.log(form)
  console.log(user)

  if(loading){
    return <AppLoading/>
  }

  if(user){
    const redirectTo = location.state && location.state.from && location.state.from.pathname ? location.state.from.pathname : '/'; 
    return <Redirect to={redirectTo}/>
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
              Login Akun
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Atau{' '}
              <a component={Link} href="/registrasi" className="font-medium text-indigo-600 hover:text-indigo-500">
                Daftar
              </a>
            </p>
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
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <p className="text-red-500 text-xs italic">{error.password}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/lupa-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Lupa Password?
                </a>
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
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
