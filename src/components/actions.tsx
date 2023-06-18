import { Box, Button, Popover, Tooltip, Typography } from '@mui/material';
import { useAuthContext } from '@asgardeo/auth-react';
import { useState } from 'react';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react';
import { apiUrl, closePermission } from '../config';
import { useUserContext } from '../providers/user-context-provider';

const Actions = (props) => {
    const { httpRequest } = useAuthContext();
    const scopes = useUserContext().scopes;

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const open = Boolean(anchorEl);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    function DeleteDialog() {
        return (
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
            >
                <DialogTitle id="alert-dialog-title">
                    {'Are you sure to close the issue?'}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleDelete} variant="contained">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    const handleDelete = async () => {
        try {
            await httpRequest({
                data: {
                    status: 'Closed'
                },
                method: 'PATCH',
                url: apiUrl + '/issues/' + props.params.row.id
            });
            props.setNeedRefresh(true);
            props.setAlertMessage('Issue closed successfully');
            props.setAlertSeverity('success');
        } catch (e) {
            props.setAlertMessage('Failed to close the issue');
            props.setAlertSeverity('error');
        } finally {
          props.setOpenAlert(true);
          setOpenDialog(false);
        }
    };

    if (
        scopes.includes(closePermission) &&
        props.params.row.status === 'Open'
    ) {
        return (
            <Box>
                <Tooltip title="Close the issue">
                    <Button variant="contained" onClick={handleDialogOpen}>
                        CLOSE
                    </Button>
                </Tooltip>
                <DeleteDialog />
            </Box>
        );
    }

    if (props.params.row.status === 'Closed') {
        return (
            <Box>
                <Typography> CLOSED </Typography>
            </Box>
        );
    }

    if (!props.canClose && props.params.row.status === 'Open') {
        return (
            <>
                <Box
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                >
                    <Button variant="contained" disabled>
                        CLOSE
                    </Button>
                </Box>
                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: 'none'
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography sx={{ p: 1 }}>
                        You are not authorized to close the issue.
                    </Typography>
                </Popover>
            </>
        );
    }
};

export default Actions;
