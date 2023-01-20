import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {useContext} from "react";
import {TabContext} from "../contexts/tabContext";

export function JsonTab() {

    const {setCurrentTab, currentTab} = useContext(TabContext)

    function handleChange(event, selectedTabIndex) {
        setCurrentTab(selectedTabIndex);
    }

    return (
        <Tabs
            value={currentTab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
        >
            <Tab label="Untitled JSON"></Tab>
            <Tab label="Untitled JSON"></Tab>
            <Tab label="Untitled JSON"></Tab>
        </Tabs>
    )
}