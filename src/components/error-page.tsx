import { Box, Typography } from "@mui/material";

export const ErrorPage = () => {

    return (
      <Box sx={{backgroundColor:'#eeeeee'}}>
        <Box component="span"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{height:100,mt:5}}>
              <Typography variant="h4">
                Something Went Wrong
              </Typography>
        </Box>
      </Box>
    );
}
