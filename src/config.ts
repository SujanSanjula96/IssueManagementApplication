import config from "./config.json";

export const authConfig = {
    signInRedirectURL: config.signInRedirectURL,
    signOutRedirectURL: config.signOutRedirectURL,
    clientID: config.clientID,
    baseUrl: config.baseUrl,
    scope: config.scope,
    resourceServerURLs: [ config.APIUrl ],
    prompt: "consent"
};

export const apiUrl = config.APIUrl;
export const closePermission = config.closePermssion;
