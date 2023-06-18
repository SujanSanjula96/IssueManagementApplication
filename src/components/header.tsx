import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Stack,
    Avatar
  } from '@mui/material';
import { useAuthContext } from '@asgardeo/auth-react';
import { useUserContext } from '../providers/user-context-provider';

export const Header = () => {

  const { signOut } = useAuthContext();
  const displayName = useUserContext().displayName;

  return (
    <AppBar position='static' color='transparent' sx={{height:75}}>
      <Toolbar >
        <Typography variant="h4" flex={1}>
          Issue Management Dashboard
        </Typography>
        <Box
          display={'flex'}
          sx={{justifyContent:'center', alignItems:'center', mr:4}} 
        >
          < Avatar sx={{mr:1}}>{displayName[0]}</ Avatar>
          <Typography variant="h6" >
            {displayName}
          </Typography>
        </Box>
        <Stack direction='row' spacing={2}>
          <Button variant='contained'  onClick={() => signOut()}>Logout</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
