import { useEffect, useState, useMemo } from "react";

import  { useAuthContext } from '@asgardeo/auth-react';
import { Box, Button, CircularProgress, Modal, Table, TextField, Typography } from "@mui/material";
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { SnackbarComponent } from "../components/snackbar";

import Actions from '../components/actions';
import { apiUrl } from "../config";
import { ErrorPage } from "../components/error-page";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IssueInterface {
  id?: string;
  name?: string;
  status?: string;
}

const IssuePage = () => {

  const { httpRequest } = useAuthContext();

  const [pageSize, setPageSize] = useState(5);
  const [ responseList, setResponseList ] = useState<IssueInterface[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ openNewIssue, setOpenNewIssue ] = useState<boolean>(false);
  const [ newIssue,  setNewIssue ] = useState<string>("");
  const [ needRefresh, setNeedRefresh ] = useState<boolean>(true);
  const [ loadFailed, setLoadFailed ] = useState<boolean>(null);

  const [ openAlert, setOpenAlert ] = useState<boolean>(false);
  const [ alertMessage, setAlertMessage ] = useState<string>(undefined);
  const [ alertSeverity, setAlertSeverity ] = useState<any>(undefined);

  useEffect(() => {
    if (needRefresh){
      getIssueList();
      setNeedRefresh(false);
    }
  }, [needRefresh]);

  const getIssueList = async () => {
    try{
        const response = await httpRequest({
          url: apiUrl + "/issues",
      });
      setResponseList(response.data);
    } catch (e) {
      setLoadFailed(true);
    } finally {
      setIsLoading(false);
    }
 }

  const columns = useMemo(
    () => [
      { field: 'name', 
        headerName: 'Issues', 
        flex: 9,
      },
      {
        field: 'actions',
        headerName: 'Status',
        type: 'actions',
        flex: 1,
        renderCell: (params) => 
          <Actions params={params}
            setOpenAlert={setOpenAlert}
            setAlertMessage={setAlertMessage}
            setAlertSeverity={setAlertSeverity}
            setNeedRefresh={setNeedRefresh}
          />,
      },
    ], []
  );

  const handleClose = () => {
    setNewIssue("");
    setOpenNewIssue(false);
  }

  const handleCreate = async () => {
    try{
      const response = await httpRequest({
        data: { name: newIssue },
        method: "POST",
        url: apiUrl + "/issues",
      });
      setNeedRefresh(true);
      setAlertMessage("Issue Created Successfully");
      setAlertSeverity('success');
    } catch (e) {
      setAlertMessage("Failed to create the issue");
      setAlertSeverity('error');
    } finally {
      setNewIssue("");
      setOpenNewIssue(false);
      setOpenAlert(true);
    }
  }

  const NewIssueButton = () => (
    <div className="left-container">
      <Button variant='contained' sx={{mt:3}} onClick={() => {setOpenNewIssue(true)}} >
          + New Issue
      </Button>
    </div>
  );

  const IssueList = () => (
    <Box m={2}>
      <DataGrid
          columns={columns}
          rows={responseList}
          getRowId={(row) => row.id}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
          display: 'flex',
          [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
          width: "100%",
          height: 350
          }}
      />
    </Box>
  );

  return (
    !isLoading ? (
      !loadFailed ? (
        <Box sx={{mt:2}}>
          <Box component="span"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{width:"100%"}}>
              <Box m={2} sx={{width:"100%",  height:500} }>
                  <NewIssueButton />
                  <IssueList />
              </Box>
          </Box>
          <Modal
            open={openNewIssue}
            onClose={handleClose}
          >
            <Box sx={style} >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Create New Issue
              </Typography>
              <TextField
                required
                id="outlined-required"
                value={newIssue}
                label="Issue"
                onChange={e => setNewIssue(e.target.value)}
                sx={{
                  width: 300, mt:2, mb:3
                }}
              />
              <Box>
                <Button variant="contained" sx={{mr:2}} onClick={handleCreate}>
                  Create
                </Button>
                <Button onClick={handleClose}>
                  Cancel
                </Button> 
              </Box>
            </Box>
          </Modal>
          <SnackbarComponent
            openAlert={openAlert} 
            setOpenAlert={setOpenAlert} 
            message={alertMessage}
            severity={alertSeverity}
          />
        </Box>
      ) : (
        <ErrorPage />
      )
    ) : (
      <CircularProgress sx={{mt:15}} />
    )
  );
};

export default IssuePage;
