import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function ErrorMessage({ message = "Failed to load data. Please try again." }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px', 
        py: 4,
        color: 'error.main',
        textAlign: 'center',
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 40, mb: 2 }} />
      <Typography variant="body1">
        {message}
      </Typography>
    </Box>
  );
}

export default ErrorMessage;