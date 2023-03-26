import { useEffect, useState } from 'react';
import { Layout } from './layout';

import { Route } from 'react-router-dom';
import  { useAuthContext } from '@asgardeo/auth-react';
import { UserProvider } from '../providers/UserProvider';
import HomePage from '../Pages/home';
import { CircularProgress } from '@mui/material';

export const Dashboard = () => {

  const { state, getBasicUserInfo} = useAuthContext();

  const [ isUserDetailsLoaded, setIsUserDetailsLoaded] = useState<boolean>(false);
  const [ scopes, setScopes ] = useState<string[]>([]);
  const [ groups, setGroups ] = useState<string[]>([])
  const [ displayName, setDisplayName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");

  useEffect((() =>{
    if (state?.isAuthenticated) {

      const getData = async () => {
        const basicUserInfo = await getBasicUserInfo();
        if (basicUserInfo.hasOwnProperty('displayName')) {
          setDisplayName(basicUserInfo.displayName);
        } else {
          const username = basicUserInfo.username.match(/^([^@]*)@/)[1];
          setDisplayName(username);
        }

        if (basicUserInfo.hasOwnProperty('groups')) {
          setGroups(basicUserInfo.groups as string[]);
        }

        setEmail(basicUserInfo.username);
        setScopes(basicUserInfo.allowedScopes.split(" "));
        setIsUserDetailsLoaded(true);
      };
      getData();
    }
  }), []);

  return (
    {isUserDetailsLoaded}
    ? (
      < UserProvider user={
          {
            scopes: scopes,
            groups: groups,
            email: email,
            displayName: displayName
          }
        }
      >
        <div>
          <Layout />
          <Route exact path="/issues" >
            <HomePage />
          </Route >
        </div>
      </UserProvider >
    ) : (
      <CircularProgress />
    )
  )
}
