import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {TabContext} from "../contexts/tabContext";
import {v4 as uuidv4} from "uuid";
import {useIndexedDB} from "react-indexed-db";
import {UserContext} from "../contexts/userContext";
import {TabNameChangeContext} from "../contexts/tabNameChangeContext";

export function JsonTab({openRenameTab}: props) {
    const {setCurrentTab, currentTab} = useContext(TabContext);
    const {tabName, setTabName} = useContext(TabNameChangeContext);
    const {userId} = useContext(UserContext);
    const [tabList, setTabList] = useState([]);
    const jsonDb = useIndexedDB("json");
    const activeTabDb = useIndexedDB("activeTab");
    const tabArea = useRef(null);

    useEffect(() => {
        if (userId) {
            getAllTabs();
        }
    }, [userId]);

    useEffect(() => {
        activeTabDb.getByID(userId).then(
            (res) => {
                if (res) {
                    const currentTab = tabList.filter(
                        (tab) => tab.tabId === res.tabId
                    )[0];
                    setCurrentTab(currentTab);
                }
            },
            (err) => {
                console.error(err);
            }
        );
    }, [tabList, userId]);

    useEffect(() => {
        const updatedTab = tabList.filter((res) => res.tabId === tabName.id)[0];
        jsonDb
            .update({...updatedTab, name: tabName?.name})
            .then((res) => {
                console.log("updated ==>", res);
                getAllTabs();
            })
            .catch((err) => {
                console.error(err);
            });
    }, [tabName]);

    const getAllTabs = () => {
        try {
            jsonDb.getAll().then((tabItems) => {
                tabItems.sort((a, b) => a.createdAt - b.createdAt);
                if (tabItems.length > 0) {
                    setTabList(tabItems);
                } else {
                    const newTab = {
                        ...getNewTab(),
                        createdAt: new Date().getTime(),
                        updatedAt: new Date().getTime(),
                    };
                    setTabList([newTab]);
                    setCurrentTab(newTab);
                    addCurrentTab(newTab);
                    setCurrentForNewCustomer(newTab);
                }
            })
        } catch (e) {
            console.error("error", e);
        }
    };

    const setCurrentForNewCustomer = (currentTab) => {
        activeTabDb.add({tabId: currentTab?.tabId, id: userId}).then(
            (_) => {
            },
            (err) => {
                console.error(err);
            }
        );
    };

    function handleChange(tab) {
        activeTabDb.update({tabId: tab.tabId, id: userId}).then(
            (_) => {
                setCurrentTab(tab);
            },
            (err) => {
                console.error(err);
            }
        );
    }

    const createNewTab = () => {
        const newTab = {
            ...getNewTab(),
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        };
        addCurrentTab(newTab);
        return newTab;
    };

    const addCurrentTab = (tab) => {
        jsonDb
            .add({
                data: tab.data,
                name: tab.name,
                tabId: tab.tabId,
                id: `${userId}-${tab.tabId}`,
                createdAt: tab.createdAt,
                updatedAt: tab.updatedAt,
            })
            .then(
                (_) => {
                    setTabList([...tabList, tab]);
                },
                (err) => {
                    console.error(err);
                }
            );
    };

    const getNewTab = useCallback(
        function () {
            const tabId = uuidv4().substring(0, 8);
            return {
                name: `Untitled Tab`,
                tabId,
                data: "",
                id: `${userId}-${tabId}`,
            };
        },
        [userId]
    );

    const removeTab = (id) => {

        jsonDb.deleteRecord(id).then(
            (res) => {
                const newTabList = tabList.filter((res) => res.id !== id);
                if (currentTab.id === id && tabList.length > 1) {
                    handleChange(tabList[newTabList.length - 1]);
                }
                if (newTabList.length === 0) {
                    const newTab = createNewTab();
                    handleChange(newTab);
                }
                getAllTabs();
            },
            (err) => {
                console.error("remove failed: ", id, err);
            }
        );
    };

    const navigateTab = (direction) => {
        const value = direction === 0 ? -150 : 150;
        tabArea.current.scrollLeft += value;
    };

    const setTabNameContext = (tabId, tabName) => {
        setTabName({name: tabName, id: tabId});
        openRenameTab();
    };

    return (
        <div className="tab-list-wrapper">
            <div className="tab-list hide-scrollbar" ref={tabArea}>
                {tabList.map((tab) => (
                    <div
                        className={`tab ${
                            tab?.tabId === currentTab?.tabId ? "active" : ""
                        }`}
                        key={tab?.tabId}
                        onClick={() => handleChange(tab)}
                        id={`tab-${tab.tabId}`}
                        onDoubleClick={() => setTabNameContext(tab.tabId, tab?.name)}
                    >
            <span className="tab-name">
              {tab?.name} {tab?.order}
            </span>
                        <span className="tab-icon" onClick={() => removeTab(tab.id)}>
              <em className="material-icons">close</em>
            </span>
                    </div>
                ))}
            </div>
            <div className="tab-navigation left" onClick={() => navigateTab(0)}>
                <em className="material-icons">chevron_left</em>
            </div>
            <div className="tab-navigation right" onClick={() => navigateTab(1)}>
                <em className="material-icons">chevron_right</em>
            </div>
            <div className="tab static" onClick={createNewTab}>
                <em className="material-icons">add</em>
            </div>
        </div>
    );
}
