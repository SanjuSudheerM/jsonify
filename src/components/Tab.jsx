import {useCallback, useContext, useEffect, useRef, useState} from "react";
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
    const tabArea = useRef(null)

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
            tabItems.sort((a, b) => a.createdAt - b.createdAt);
            if (tabItems.length > 0) {
                setTabList(tabItems);
            } else {
                const newTab = {...getNewTab(), createdAt: new Date().getTime(), updatedAt: new Date().getTime()};
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
        const newTab = {...getNewTab(), createdAt: new Date().getTime(), updatedAt: new Date().getTime()};
        addCurrentTab(newTab);
        return newTab;
    }

    const addCurrentTab = (tab) => {
        jsonDb.add({
            data: '{}',
            name: tab.name,
            tabId: tab.tabId,
            id: `${userId}-${tab.tabId}`,
            createdAt: tab.createdAt,
            updatedAt: tab.updatedAt
        }).then(
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
            name: `Untitled Tab`,
            tabId,
            data: '{}',
            id: `${userId}-${tabId}`
        }
    }, [userId])


    const removeTab = (id) => {
        console.log(currentTab, id)

        jsonDb.deleteRecord(id).then(res => {
            console.log('remove :', id, res)
            const newTabList = tabList.filter(res => res.id !== id);

            if (currentTab.id === id && tabList.length > 1) {
                handleChange(tabList[0])
                console.log(tabList[0].tabId)
            }
            if (newTabList.length === 0) {
                const newTab = createNewTab()
                handleChange(newTab)
            }
            getAllTabs();

        }, err => {
            console.error('remove failed: ', id, err)
        })
    }

    const navigateTab = (direction) => {
        const value = direction === 0 ? -150 : 150;
        tabArea.current.scrollLeft += value;
    }

    return (

        <div className='tab-list-wrapper'>
            <div className="tab-list" ref={tabArea}>
                {tabList.map((tab) => <div className={`tab ${tab?.tabId === currentTab?.tabId ? 'active' : ''}`}
                                           key={tab?.tabId} onClick={() => handleChange(tab)}
                                           id={`tab-${tab.tabId}`}>
                    <span className="tab-name">{tab?.name} {tab?.order}</span>
                    <span className="tab-icon" onClick={() => removeTab(tab.id)}>
                    <em className="material-icons">close</em>
                </span>
                </div>)}
            </div>
            <div className='tab-navigation left' onClick={() => navigateTab(0)}>
                <em className='material-icons'>chevron_left</em>
            </div>
            <div className='tab-navigation right' onClick={() => navigateTab(1)}>
                <em className='material-icons'>chevron_right</em>
            </div>
            <div className='tab static' onClick={createNewTab}>
                <em className='material-icons'>add</em>
            </div>
        </div>
    )
}