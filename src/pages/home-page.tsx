import { useEffect, useState } from 'react';
import { Header } from '../components/header';

import { Route } from 'react-router-dom';
import  { useAuthContext } from '@asgardeo/auth-react';
import { UserProvider } from '../providers/user-context-provider';
import IssuePage from './issue-page';
import { CircularProgress } from '@mui/material';

export interface IUserContext {
  scopes: string[];
  groups: string[];
  email: string;
  displayName: string;
}

export const HomePage = () => {

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
          <Header userDisplayName={displayName} />
          <Route exact path="/issues" >
            <IssuePage />
          </Route >
        </div>
      </UserProvider >
    ) : (
      <CircularProgress />
    )
  )
}
