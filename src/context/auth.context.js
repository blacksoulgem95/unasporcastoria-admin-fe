import {getAuth, onAuthStateChanged} from '@firebase/auth'
import {createContext, useContext, useEffect, useState} from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = props => {
    const [user, setUser] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), async user => {
            setUser(user)
            if (user)
                localStorage.setItem('tk', await getAuth().currentUser.getIdToken())
            else localStorage.delete('tk')
        }, setError)
        return () => unsubscribe()
    }, [])
    return <AuthContext.Provider value={{user, error}} {...props} />
}

export const useAuthState = () => {
    const auth = useContext(AuthContext)
    return {...auth, isAuthenticated: auth.user != null}
}
