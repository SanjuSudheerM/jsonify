import {useCallback, useContext, useEffect, useState} from "react";
import {TabContext} from "../contexts/tabContext";
import {v4 as uuidv4} from 'uuid';
import {useIndexedDB} from 'react-indexed-db';
import {UserContext} from "../contexts/userContext";

export function JsonTab() {

    const {setCurrentTab, currentTab} = useContext(TabContext)
    const {userId} = useContext(UserContext);
    const [tabList, setTabList] = useState([])
    const jsonDb = useIndexedDB('json');
//    const activeTabDb = useIndexedDB('activeTab');

    useEffect(() => {
        getAllTabs().then()
    }, [])

    const getAllTabs = async () => {
        try {
            const tabItems = await jsonDb.getAll();
            console.log(tabItems)
            if (tabItems.length > 0) {
                setTabList(tabItems);
                setCurrentTab(tabItems[0])
            } else {
                const newTab = getNewTab();
                setTabList([newTab])
                setCurrentTab(newTab)
            }
        } catch (e) {
            console.log('error', e)
        }
    }


    function handleChange(tab) {
        setCurrentTab(tab);
    }

    const createNewTab = () => {
        const newTab = getNewTab()
        setTabList([...tabList, newTab])

        jsonDb.add({data: '{}', name: newTab.name, tabId: newTab.tabId}).then(
            res => {
                console.log('success', res)
            }, err => {
                console.error(err)
            }
        )

    }


    const getNewTab = useCallback(function () {
        return {
            name: 'Untitled Tab',
            tabId: uuidv4().substring(0, 8),
            data: '{}'
        }
    }, [])

    return (

        <div className='tab-list'>
            {tabList.map(tab => <div className={`tab ${tab?.tabId === currentTab?.tabId ? 'active' : ''}`}
                                     key={tab?.tabId} onClick={() => handleChange(tab)}>
                <span>{tab?.name}</span>
            </div>)}
            <div className='tab' onClick={createNewTab}>
                <em className='material-icons'>add</em>
            </div>
        </div>
    )
}