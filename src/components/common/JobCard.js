import {
  Paper,
  Typography,
  Box,
  Button,
  Chip
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Link } from 'react-router-dom';

function JobCard({ job }) {
  const { id, title, department, location, type} = job;

  return (
    <Paper
        elevation={1}
        sx={{
            width: '100%', 
            p: 2,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
        }}
        >

      <Box
        sx={{
            flex: 1,
            minWidth: '0', 
            mr: 65, 
        }}
        >
        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, flexWrap: 'wrap' }}>
          {department && (
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <WorkOutlineIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {department.title}
              </Typography>
            </Box>
          )}
          {location && (
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <LocationOnIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {location.title}
              </Typography>
            </Box>
          )}
          {type && ( 
            <Chip label={type.toUpperCase()} size="small" sx={{ mr: 2, backgroundColor: '#e0f7fa', color: '#006064', fontWeight: 'bold' }} />
          )}
        </Box>
      </Box>
      <Box
        sx={{
            display: 'flex',
            gap: 1,
            flexShrink: 0, 
            alignItems: 'center'
        }}
        >
        <Button
          variant="outlined"
          sx={{ mr: 1 }}
          component={Link}
          to={`/jobs/${id}`} 
        >
          View
        </Button>
        <Button
          variant="contained"
          color="primary"
          href={job.applyUrl}
          target="_blank" 
          rel="noopener noreferrer" 
        >
          Apply
        </Button>
      </Box>
    </Paper>
  );
}

export default JobCard;