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
    const activeTabDb = useIndexedDB('activeTab');

    useEffect(() => {
        if (userId) {
            getAllTabs();
        }
    }, [userId])

    useEffect(() => {
        console.log('getting current tab', userId)
        activeTabDb.getByID(userId).then(res => {
            console.log('getting current tab response: ', res, currentTab, tabList)
            if (res) {
                const currentTab = tabList.filter(tab => tab.tabId === res.tabId)[0]
                console.log('current tab on filter: ', currentTab)
                setCurrentTab(currentTab)
            }
        }, err => {
            console.error(err)
        })
    }, [tabList, userId])

    const getAllTabs = async () => {
        try {
            const tabItems = await jsonDb.getAll();
            if (tabItems.length > 0) {
                setTabList(tabItems);
            } else {
                const newTab = getNewTab();
                setTabList([newTab])
                setCurrentTab(newTab)
                addCurrentTab(newTab)
                setCurrentForNewCustomer(newTab)
            }

        } catch (e) {
            console.error('error', e)
        }
    }


    const setCurrentForNewCustomer = (currentTab) => {
        activeTabDb.add({tabId: currentTab?.tabId, id: userId}).then(res => {
            console.log(res)
        }, err => {
            console.error(err)
        });
    }


    function handleChange(tab) {
        activeTabDb.update({tabId: tab.tabId, id: userId}).then(res => {
            console.log(res)
            setCurrentTab(tab);
        }, err => {
            console.error(err)
        });
    }

    const createNewTab = () => {
        const newTab = getNewTab()
        addCurrentTab(newTab);
    }

    const addCurrentTab = (tab) => {
        jsonDb.add({data: '{}', name: tab.name, tabId: tab.tabId, id: `${userId}-${tab.tabId}`}).then(
            res => {
                console.log('success', res)
                setTabList([...tabList, tab])
            }, err => {
                console.error(err)
            }
        )
    }


    const getNewTab = useCallback(function () {
        const tabId = uuidv4().substring(0, 8)
        return {
            name: 'Untitled Tab',
            tabId,
            data: '{}',
            id: `${userId}-${tabId}`
        }
    }, [userId])

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