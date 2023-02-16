# Getting Started with Issue Management Application
 
 1. Go to application in Asgardeo.
 2. Change to code grant type and enable as a public client.
 3. Add `http://localhost:3000` to Authorized Redirect URLs and allowed Origins.
 4. Go to user attributes section and select `given_name` and `username` under `profile` and `groups`.
 5. Update the `clientId`, `signInRedirectURL`, `signOutRedirectURL`, `baseUrl` in `src/config.json` file.
 6. Update the `APIUrl` to deployed API url.
 7. Run the application using 
  ```
  npm install && npm start
  ```
