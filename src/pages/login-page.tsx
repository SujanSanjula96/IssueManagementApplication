import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '@asgardeo/auth-react';

import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

function LoginPage() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { state, signIn, signOut, on } = useAuthContext();

    useEffect(() => {
        if (!state?.isAuthenticated) {
            return;
        } else {
            history.replace('issues');
        }
    }, [state?.isAuthenticated]);

    const loginButton = (
        <Button
            onClick={() => {
                setIsLoading(true);
                signIn();
            }}
            variant="contained"
            style={{ color: 'white', backgroundColor: '#ff7300' }}
        >
            Sign In
        </Button>
    );

    return (
        <>
            {!state?.isLoading && !isLoading && (
                <div>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        justifyItems="center"
                        alignContent="center"
                        sx={{ mt: 15 }}
                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            justifyItems="center"
                            sx={{
                                width: 600,
                                height: 400,
                                backgroundColor: '#eeeeee',
                                borderRadius: 5
                            }}
                        >
                            <Box>
                                <Typography variant="h4" sx={{ mb: 2 }}>
                                    ISSUE MANAGEMENT
                                </Typography>
                                <Typography variant="h4" sx={{ mb: 12 }}>
                                    DASHBOARD
                                </Typography>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    {loginButton}
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                mt={3}
                            ></Box>
                        </Box>
                    </Box>
                </div>
            )}
            {(isLoading || state?.isLoading) && (
                <div>
                    <Box
                        justifyContent="center"
                        alignItems="center"
                        justifyItems="center"
                        alignContent="center"
                        sx={{ mt: 30 }}
                    >
                        <CircularProgress />
                    </Box>
                </div>
            )}
        </>
    );
}

export default LoginPage;
