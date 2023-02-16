import { AuthProvider } from '@asgardeo/auth-react';
import { apiUrl } from '../config';

interface Props {
  children: JSX.Element;
}

const config = {
  signInRedirectURL: "http://localhost:3000",
  signOutRedirectURL: "http://localhost:3000",
  clientID: "",
  clientSecret: "",
  baseUrl: "https://dev.api.asgardeo.io/t/<orgHandle>",
  scope: [ "openid","profile", "groups", "urn:bootcampers:issuesapi:create_issue", "urn:bootcampers:issuesapi:close_issue", "urn:bootcampers:issuesapi:list_issues" ],
  resourceServerURLs: [ "https://dev.api.asgardeo.io", apiUrl ],
  prompt: "consent"
};

export default function Providers({ children }: Props) {

  return (
    <AuthProvider
      config={ config }
    >
        {children}
    </AuthProvider>
  );
}
