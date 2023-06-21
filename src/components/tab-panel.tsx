import { useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import IssuePage from '../pages/issue-page';
import {
    allIssueAPIPath,
    allIssueAPIUrl,
    allIssuesClosePermission,
    allIssuesCreatePermission,
    allIssuesEnabled,
    allIssuesViewPermission,
    myIssueAPIUrl,
    myIssueApiPath,
    myIssuesClosePermission,
    myIssuesCreatePermission,
    myIssuesEnabled,
    myIssuesViewPermission
} from '../config';
import { useUserContext } from '../providers/user-context-provider';
import { IUserContext } from '../pages/home-page';

export interface PermissionInterface {
    createIssue: string;
    viewIssue: string;
    closeIssue: string;
}

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

    const userContext: IUserContext = useUserContext();
    const userScopes = userContext.scopes;

    const allIssuesPermissions: PermissionInterface = {
        createIssue: allIssuesCreatePermission,
        viewIssue: allIssuesViewPermission,
        closeIssue: allIssuesClosePermission
    }

    const myIssuesPermissions: PermissionInterface = {
        createIssue: myIssuesCreatePermission,
        viewIssue: myIssuesViewPermission,
        closeIssue: myIssuesClosePermission
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (myIssuesEnabled && userScopes.includes(myIssuesViewPermission)) {
        allIssuesTabIndex += 1;
    }

    return (
        <div>
            <Tabs value={value} onChange={handleChange}>
                {myIssuesEnabled && userScopes.includes(myIssuesViewPermission) && <Tab label="My Issues" id="tab-0" />}
                {allIssuesEnabled && userScopes.includes(allIssuesViewPermission) && <Tab label="All Issues" id="tab-1" />}
            </Tabs>
            {myIssuesEnabled && userScopes.includes(myIssuesViewPermission) && (
                <TabContent value={value} index={myIssuesTabIndex}>
                    <IssuePage
                        baseUrl={myIssueAPIUrl}
                        path={myIssueApiPath}
                        permissions={myIssuesPermissions}
                    />
                </TabContent>
            )}
            {allIssuesEnabled && userScopes.includes(allIssuesViewPermission) && (
                <TabContent value={value} index={allIssuesTabIndex}>
                    <IssuePage
                        baseUrl={allIssueAPIUrl}
                        path={allIssueAPIPath}
                        permissions={allIssuesPermissions}
                    />
                </TabContent>
            )}
        </div>
    );
};

export default TabPanel;
