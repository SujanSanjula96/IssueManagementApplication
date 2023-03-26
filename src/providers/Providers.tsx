import { AuthProvider } from '@asgardeo/auth-react';
import { authConfig } from '../config';

interface Props {
  children: JSX.Element;
}

export default function Providers({ children }: Props) {

  return (
    <AuthProvider config={ authConfig }>
        {children}
    </AuthProvider>
  );
}
