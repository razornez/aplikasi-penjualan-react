import React from 'react'
import { useFirebase } from '../../../components/FirebaseProvider';

function Home(){
    const {auth} = useFirebase();
    return <button
    onClick={(e) =>{
        auth.signOut()
    }}
  >
    Sign out
  </button>
}

export default Home;