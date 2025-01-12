import { styled, Box } from '@mui/material';

export const MainContent = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    marginTop: '64px', // Adjust as needed
}));