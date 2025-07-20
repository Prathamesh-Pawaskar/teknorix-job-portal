import { Box, CircularProgress, Typography } from '@mui/material';

function Loader({ message = "Loading..." }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px', 
        py: 4,
      }}
    >
      <CircularProgress color="primary" />
      <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
        {message}
      </Typography>
    </Box>
  );
}

export default Loader;