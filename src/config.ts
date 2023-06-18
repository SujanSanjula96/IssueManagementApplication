import config from "./config.json";

export const authConfig = {
    signInRedirectURL: config.signInRedirectURL,
    signOutRedirectURL: config.signOutRedirectURL,
    clientID: config.clientID,
    baseUrl: config.baseUrl,
    scope: [
        "openid",
        "profile",
        "groups",
        config.issueAPI.createPermssion,
        config.issueAPI.listPermssion,
        config.issueAPI.closePermssion
    ],
    resourceServerURLs: [ config.issueAPI.url ],
};

export const apiUrl = config.issueAPI.url;
export const closePermission = config.issueAPI.closePermssion;
