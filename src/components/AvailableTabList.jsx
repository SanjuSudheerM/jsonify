import {useIndexedDB} from 'react-indexed-db';
import {useEffect, useState, useContext} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

import {TabContext} from "../contexts/tabContext";

export function AvailableTabList() {
    const jsonDb = useIndexedDB('json')
    const {currentTab, setCurrentTab} = useContext(TabContext)
    const [tabs, setTabs]= useState([])

    useEffect(() => {
        getTabList()
    }, [])

    const getTabList = () => {
        console.log('getting tab list')
        jsonDb.getAll().then(res => {
            console.log(res)
            setTabs(res)
        })
    }


    return (
        <List sx={{width: 300, maxWidth: 360, bgcolor: 'background.paper'}}>
            {tabs.map((res)=> {
                return <ListItem onClick={()=> {setCurrentTab(res);}} selected={currentTab.id === res.id}>
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={res.name}/>
                </ListItem>
            })}
        </List>
    );
}