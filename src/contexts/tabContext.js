import {createContext, useState} from "react";

export const TabContext = createContext({
    currentTab: null,
    setCurrentTab: () => null,
})

export const TabProvider = ({children}) => {


    const [currentTab, setCurrentTab] = useState(null);

    const value = {currentTab, setCurrentTab};

    return <TabContext.Provider value={value}>{children}</TabContext.Provider>
}