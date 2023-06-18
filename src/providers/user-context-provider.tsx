import React, { FunctionComponent, PropsWithChildren, useContext } from 'react';

const userContext = React.createContext(null);

interface IUserContextProps {
    user: IUserContext;
}

interface IUserContext {
    scopes: string[];
    groups: string[];
    email: string;
    displayName: string;
}

export function useUserContext() {
    return useContext(userContext);
}

export const UserProvider: FunctionComponent<
    PropsWithChildren<IUserContextProps>
> = (props: PropsWithChildren<IUserContextProps>) => {
    return (
        <userContext.Provider value={props.user}>
            {props.children}
        </userContext.Provider>
    );
};
