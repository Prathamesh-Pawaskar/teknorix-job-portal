import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Chip,
  Grid,
  IconButton
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchJobDetails } from '../utils/api';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import FacebookIcon from '@mui/icons-material/Facebook'; 
import LinkedInIcon from '@mui/icons-material/LinkedIn'; 
import TwitterIcon from '@mui/icons-material/Twitter';   

function JobDetailsPage() {
  const { jobId } = useParams(); 
  const navigate = useNavigate(); 

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getJobDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchJobDetails(jobId);
        setJob(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) { 
      getJobDetails();
    } else {
      setLoading(false);
      setError(new Error("Job ID not provided in URL."));
    }
  }, [jobId]); 

  if (loading) {
    return <Loader message="Fetching job details..." />;
  }

  if (error) {
    return <ErrorMessage message={error.message || "Failed to load job details."} />;
  }

  if (!job) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No job details found.
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Jobs
        </Button>
      </Container>
    );
  }


  const renderHtml = (htmlString) => {
    return { __html: htmlString };
  };


  const currentUrl = window.location.href;
  const shareTitle = encodeURIComponent(`Check out this job opening: ${job.title} at ${job.company || 'Teknorix'}`);


  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${shareTitle}`;
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${shareTitle}&summary=${encodeURIComponent(job.description.substring(0, 200) + '...')}`; // Take first 200 chars for summary
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${shareTitle}`;


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')} 
        sx={{ mb: 3 }}
      >
        Back to Job Openings
      </Button>

      <Paper elevation={1} sx={{ p: 4 }}>
        <Grid container spacing={45} alignItems="center">
          <Grid item xs={12} md={9}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {job.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mb: 2 }}>
              {job.department && (
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                  <WorkOutlineIcon sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body1" color="text.secondary">
                    {job.department.title}
                  </Typography>
                </Box>
              )}
              {job.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                  <LocationOnIcon sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body1" color="text.secondary">
                    {job.location.title}
                  </Typography>
                </Box>
              )}
              {job.type && (
                <Chip
                  label={job.type.toUpperCase()}
                  size="medium"
                  sx={{ backgroundColor: '#e0f7fa', color: '#006064', fontWeight: 'bold', mr: 3 }}
                />
              )}
              {job.experience && (
                <Typography variant="body2" color="text.secondary">
                  Experience: {job.experience}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {job.description && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Job Description
            </Typography>
            <Typography
              variant="body1"
              component="div"
              dangerouslySetInnerHTML={renderHtml(job.description)}
              sx={{ '& h3, & h4': { mt: 2, mb: 1, fontWeight: 'bold' }, '& ul': { ml: 2, '& li': { mb: 0.5 } } }}
            />
          </Box>
        )}

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Now
          </Button>
        </Box>
                <Divider sx={{ my: 3 }} /> 

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            SHARE JOB OPENINGS
          </Typography>
          <Divider sx={{ width: '50px', borderBottomWidth: 3, borderColor: 'primary.main', mb: 2 }} />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              aria-label="share on facebook"
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '50%' }}
            >
              <FacebookIcon color="action" />
            </IconButton>
            <IconButton
              aria-label="share on linkedin"
              href={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '50%' }}
            >
              <LinkedInIcon color="action" />
            </IconButton>
            <IconButton
              aria-label="share on twitter"
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '50%' }}
            >
              <TwitterIcon color="action" />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default JobDetailsPage;