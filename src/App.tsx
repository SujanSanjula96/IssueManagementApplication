import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './pages/login-page';
import { HomePage } from './pages/home-page';
import { AuthProvider,  SecureRoute } from '@asgardeo/auth-react';
import { useHistory } from 'react-router-dom';
import { authConfig } from './config';

const SecureRedirect = (props) => {
    const { component, path } = props;
    const history = useHistory();

    const callback = () => {
        history.push('/');
    };

    return (
        <SecureRoute path={path} component={component} callback={callback} />
    );
};

function App() {
    return (
        <div className="App">
            <AuthProvider config={authConfig}>
                <Router>
                    <Route exact path="/">
                        <LoginPage />
                    </Route>
                    <SecureRedirect path="/issues" component={HomePage} />
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
