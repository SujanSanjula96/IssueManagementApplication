# Getting Started with Issue Management Application

1.  Deploy and publish the sample Issue API in
    https://github.com/mefarazath/bootcampapp/tree/issues-api repo in Choreo
    Console.
2.  Create an Application in Choreo API Developer Portal and generate
    credentials.
3.  Subscribe the Issue API for the application.
4.  Go to corresponding application in Asgardeo.
5.  Change to code grant type and enable as a public client.
6.  Add `http://localhost:3000` to Authorized Redirect URLs and allowed Origins.
7.  Go to user attributes section and select `given_name` and `username` under
    `profile` and `groups`.
8.  Create Roles and assign roles to the groups.
9.  Update the `clientId`, `signInRedirectURL`, `signOutRedirectURL`, `baseUrl`
    in `src/config.json` file.
10. Update the `APIUrl` to deployed API url.
11. Run the application using


    ```
    npm install && npm start
    ```
