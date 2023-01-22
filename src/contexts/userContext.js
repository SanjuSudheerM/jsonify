import {createContext, useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';

export const UserContext = createContext({
    userId: null,
    setUserId: () => null
})

export const UserContextProvider = ({children}) => {
    const [userId, setUserId] = useState('')
    const value = {userId, setUserId};
    useEffect(() => {
        const currentUser = localStorage.getItem('AnoclapJsonifyUser');

        if (currentUser) {
            setUserId(currentUser);
        } else {
            const newUserId = uuidv4();
            localStorage.setItem('AnoclapJsonifyUser', newUserId)
            setUserId(newUserId)
        }
       

    }, [userId])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}