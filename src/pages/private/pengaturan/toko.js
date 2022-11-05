import React, { useState } from 'react';

import isURL from 'validator/lib/isURL';
import { useFirebase } from '../../../components/FirebaseProvider';
function Toko(){
    const [isSubmitting, setSubmitting] = useState(false);
    const { firestore, user } = useFirebase(); //utk menyimpan data di sebuah dokumen ke collection gunakan firestore

    const tokoDoc = firestore.doc(`toko/${user.uid}`);//toko adalah collection dan ${user.uid} adalah dokumen id
    const [form, setForm] = useState({
        nama: '',
        alamat: '',
        telepon: '',
        website: ''
    });

    const [error, setError] = useState({
        nama: '',
        alamat: '',
        telepon: '',
        website: ''
    })

    const handleChange = e=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        })
    }

    const validate = ()=>{
        const newError = {...error};

        if (!form.nama){
            newError.nama = "Nama wajib diisi";
        }

        if (!form.alamat){
            newError.alamat = "Alamat wajib diisi";
        }

        if (!form.telepon){
            newError.telepon = "Telepon wajib diisi";
        }

        if (!form.website){
            newError.website = "Website wajib diisi";
        }else if (!isURL(form.website)){
            newError.website = "Website tidak valid";
        }

        return newError;

    }

    const handleSubmit = async e => {
        e.preventDefault();
        const findErrors = validate();

        if (Object.values(findErrors).some(err => err !== '')){
            setError(findErrors);
        }else{

            setSubmitting(true);
            try{
                await tokoDoc.set(form, { merge:true });
                document.querySelector('.notif_block').style.display = 'block';
                document.querySelector('.notif_block').innerText = 'Data toko berhasil disimpan';
            }catch(e){
                console.log(e.message)
            }
            setSubmitting(false);
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
                <h3 className="text-lg font-medium leading-6 text-gray-900">Informasi Toko</h3>
                <p className="mt-1 text-sm text-gray-600">Menampilkan data toko aplikasi penjualan</p>
                </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit} noValidate>
                <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-12 sm:col-span-4">
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                Nama Toko
                            </label>
                            <input
                                id="nama"
                                name="nama"
                                type="text"
                                autoComplete="nama"
                                required
                                className="relative block w-full appearance-none rounded-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Nama toko"
                                value={form.nama}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                />
                            <p className="text-red-500 text-xs italic">{error.nama}</p>
                            </div>
                            <div className="col-span-12 sm:col-span-6">
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                Alamat
                            </label>
                            <textarea
                                id="alamat"
                                name="alamat"
                                autoComplete="alamat"
                                required
                                className="relative block w-full appearance-none rounded-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Nama toko"
                                value={form.alamat}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                />
                            <p className="text-red-500 text-xs italic">{error.alamat}</p>
                            </div>
                            <div className="col-span-12 sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                Telepon
                            </label>
                            <input
                                id="telepon"
                                name="telepon"
                                type="number"
                                autoComplete="telepon"
                                required
                                className="relative block w-full appearance-none rounded-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Nama toko"
                                value={form.telepon}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                />
                            <p className="text-red-500 text-xs italic">{error.telepon}</p>
                            </div>
                            <div className="col-span-12 sm:col-span-4">
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                Website toko
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                    http://</span>
                                <input 
                                type="text" 
                                name="website" 
                                id="website" 
                                required
                                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                                placeholder="www.example.com"
                                value={form.website}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                />
                            </div>
                            
                            <p className="text-red-500 text-xs italic">{error.website}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Simpan
                    </button>
                    </div>
                </div>
                </form>
            </div>
            </div>
        </div>
    </>
}

export default Toko;