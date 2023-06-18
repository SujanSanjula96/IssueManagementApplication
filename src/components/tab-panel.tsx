import { useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import IssuePage from '../pages/issue-page';
import {
    allIssueAPIPath,
    allIssueAPIUrl,
    allIssuesEnabled,
    myIssueAPIUrl,
    myIssueApiPath,
    myIssuesEnabled
} from '../config';

const TabContent = ({ children, value, index }) => {
    return (
        <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
};

const TabPanel = () => {
    const [value, setValue] = useState(0);
    let myIssuesTabIndex: number = 0;
    let allIssuesTabIndex: number = 0;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (myIssuesEnabled) {
        allIssuesTabIndex += 1;
    }

    return (
        <div>
            <Tabs value={value} onChange={handleChange}>
                {myIssuesEnabled && <Tab label="My Issues" id="tab-0" />}
                {allIssuesEnabled && <Tab label="All Issues" id="tab-1" />}
            </Tabs>
            {myIssuesEnabled && (
                <TabContent value={value} index={myIssuesTabIndex}>
                    <IssuePage baseUrl={myIssueAPIUrl} path={myIssueApiPath} />
                </TabContent>
            )}
            {allIssuesEnabled && (
                <TabContent value={value} index={allIssuesTabIndex}>
                    <IssuePage
                        baseUrl={allIssueAPIUrl}
                        path={allIssueAPIPath}
                    />
                </TabContent>
            )}
        </div>
    );
};

export default TabPanel;
