import { createContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'

import { app } from "../firebase/firebase.config";


export const AuthContext = createContext(null)

const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [ user , setUser] = useState(null)
    const [ loading, setLoading] = useState(true)

    const createUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) =>{
        console.log(email,password);
        return signInWithEmailAndPassword(email, password)
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            console.log('user', currentUser)
            setUser( currentUser)
            setLoading(false)
        })
        return () =>{
            return unsubscribe()
        }
    },[])

    const authInfo ={
        user, 
        loading,
        createUser, 
        signIn,
        logOut,
    }


    
    return (
        <AuthContext.Provider  value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;