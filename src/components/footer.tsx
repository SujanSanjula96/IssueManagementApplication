import { Box } from '@mui/material';
import { JsonModal } from './json-modal';
import CopyToClipboardButton from './copy-to-clipboard';
import { useUserContext } from '../providers/user-context-provider';

interface FooterProps {
    accessToken: string;
}

export const Footer = (props: FooterProps) => {
    const userContext = useUserContext();

    return (
        <Box sx={{ backgroundColor: '#eeeeee' }}>
            <Box
                component="span"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ height: 100 }}
            >
                <JsonModal
                    title="User Info"
                    buttonLabel="User Info"
                    json={userContext}
                />
                <CopyToClipboardButton copyString={props.accessToken} />
            </Box>
        </Box>
    );
};
