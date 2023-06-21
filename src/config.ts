import config from './config.json';

export const authConfig = {
    signInRedirectURL: config.signInRedirectURL,
    signOutRedirectURL: config.signOutRedirectURL,
    clientID: config.clientID,
    baseUrl: config.baseUrl,
    scope: [
        'openid',
        'profile',
        'groups',
        config.issueAPI.createPermssion,
        config.issueAPI.listPermssion,
        config.issueAPI.closePermssion,
        config.myIssueAPI.createPermssion,
        config.myIssueAPI.listPermssion,
        config.myIssueAPI.closePermssion
    ],
    resourceServerURLs: [config.issueAPI.url, config.myIssueAPI.url]
};

export const allIssuesEnabled = config.issueAPI.enabled;
export const allIssueAPIUrl = config.issueAPI.url;
export const allIssueAPIPath = config.issueAPI.path;
export const allIssuesCreatePermission = config.issueAPI.createPermssion;
export const allIssuesViewPermission = config.issueAPI.listPermssion;
export const allIssuesClosePermission = config.issueAPI.closePermssion;

export const myIssuesEnabled = config.myIssueAPI.enabled;
export const myIssueAPIUrl = config.myIssueAPI.url;
export const myIssueApiPath = config.myIssueAPI.path;
export const myIssuesCreatePermission = config.myIssueAPI.createPermssion;
export const myIssuesViewPermission = config.myIssueAPI.listPermssion;
export const myIssuesClosePermission = config.myIssueAPI.closePermssion;
