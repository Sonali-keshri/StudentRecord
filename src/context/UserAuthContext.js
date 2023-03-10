import  React, { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../firebase';

const userAuthContext =  createContext();


export function UserAuthContextPorvider({children}) {

    const [user, setUser] = useState({});

    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function login(email, password){
        console.log(email);
        return signInWithEmailAndPassword(auth, email, password);
    }
    function logout(){
        return signOut(auth);
    }
   
    function passwordreset(email){
        return sendPasswordResetEmail(auth , email)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
                setUser(currentUser);
        });

        return () =>{
            unsubscribe();
        };
    },[]);

    return(
         <userAuthContext.Provider value={{user, signup, login, logout, passwordreset}}>{children}</userAuthContext.Provider>
         );
}

export function useUserAuth() {
    return useContext(userAuthContext);
}
