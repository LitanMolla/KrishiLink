import { useEffect, useState } from 'react'
import AuthContext from './AuthContext'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/firebase.config'
import { GoogleAuthProvider } from "firebase/auth";
const googleProvider = new GoogleAuthProvider();
const ContexProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    // user create
    const createUser = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // user update
    const updateUser = (info) => {
        return updateProfile(auth.currentUser, info)
    }
    // login user
    const loginUser = async (email,password) => {
        return signInWithEmailAndPassword(auth,email,password)
    }
    // logout user
    const logoutUser = () => {
        return signOut(auth)
    }
    // user login with google
    const googleLogin = () => {
        return signInWithPopup(auth,googleProvider)
    }
    // sendPasswordResetEmail
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth,email)
    }
    // user observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])
    // context value
    const authInfo = {
        createUser,
        updateUser,
        user,
        setUser,
        loading,
        setLoading,
        loginUser,
        logoutUser,
        googleLogin,
        resetPassword
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default ContexProvider