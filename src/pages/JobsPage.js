import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  InputAdornment,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useSearchParams } from 'react-router-dom';
import {
  fetchJobs,
  fetchLocations,
  fetchDepartments,
  fetchFunctions
} from '../utils/api';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import FilterChip from '../components/common/FilterChip';
import JobCard from '../components/common/JobCard';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';


function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [jobs, setJobs] = useState([]);
  const [locations, setLocations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [functions, setFunctions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchTerm = searchParams.get('q') || '';
  const selectedDepartment = searchParams.get('departmentId') || '';
  const selectedLocation = searchParams.get('locationId') || '';
  const selectedFunction = searchParams.get('functionId') || '';

  const updateUrlParams = useCallback((key, value) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      return newParams;
    }, [setSearchParams]);
  }, [setSearchParams]);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      updateUrlParams('q', debouncedSearchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearchTerm, updateUrlParams]);

  const handleSearchChange = (event) => {
    setDebouncedSearchTerm(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    updateUrlParams('departmentId', event.target.value);
  };

  const handleLocationChange = (event) => {
    updateUrlParams('locationId', event.target.value);
  };

  const handleFunctionChange = (event) => {
    updateUrlParams('functionId', event.target.value);
  };

  const handleClearFilter = (key) => {
    updateUrlParams(key, ''); 
  };

  const handleClearAllFilters = () => {
    setSearchParams(new URLSearchParams()); 
    setDebouncedSearchTerm(''); 
  };

  useEffect(() => {
    const getLookups = async () => {
      try {
        const [
          locationsData,
          departmentsData,
          functionsData
        ] = await Promise.all([
          fetchLocations(),
          fetchDepartments(),
          fetchFunctions()
        ]);
        setLocations(locationsData); 
            setDepartments(departmentsData); 
            setFunctions(functionsData); 
      } catch (err) {
        console.error("Failed to fetch lookups:", err);
      }
    };
    getLookups();
  }, []);

  useEffect(() => {
    const getJobs = async () => {
      setLoading(true);
      setError(null); 
      try {
        const filters = {};
        if (searchTerm) filters.q = searchTerm;
        if (selectedDepartment) filters.departmentId = selectedDepartment;
        if (selectedLocation) filters.locationId = selectedLocation;
        if (selectedFunction) filters.functionId = selectedFunction;

        const jobsData = await fetchJobs(filters); 

        setJobs(Array.isArray(jobsData) ? jobsData : []);

      } catch (err) {
        console.error('JobsPage: Error caught during job fetch:', err); 
        setError(err); 
      } finally {
        setLoading(false);
      }
    };
    getJobs();
  }, [searchTerm, selectedDepartment, selectedLocation, selectedFunction]);

const groupedJobs = useMemo(() => {
  const groups = {};
  (departments || []).forEach(dept => {
    groups[dept.id] = { ...dept, jobs: [] };
  });

  (jobs || []).forEach(job => {
    if (job.department && groups[job.department.id]) {
      groups[job.department.id].jobs.push(job);
    }
  });

  return Object.values(groups)
    .filter(group => group.jobs.length > 0)
    .sort((a, b) => a.title.localeCompare(b.title));
}, [jobs, departments]);


  const appliedFilters = useMemo(() => {
    const filters = [];
    if (searchTerm) filters.push({ key: 'q', value: searchTerm, label: `Search: "${searchTerm}"` });
    if (selectedDepartment) {
      const dept = departments.find(d => d.id === selectedDepartment);
      if (dept) filters.push({ key: 'departmentId', value: selectedDepartment, label: `Department: ${dept.title}` });
    }
    if (selectedLocation) {
      const loc = locations.find(l => l.id === selectedLocation);
      if (loc) filters.push({ key: 'locationId', value: selectedLocation, label: `Location: ${loc.title}` });
    }
    if (selectedFunction) {
      const func = functions.find(f => f.id === selectedFunction);
      if (func) filters.push({ key: 'functionId', value: selectedFunction, label: `Function: ${func.title}` });
    }
    return filters;
  }, [searchTerm, selectedDepartment, selectedLocation, selectedFunction, departments, locations, functions]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Teknorix Job Openings
      </Typography>

      <Box component={Paper} elevation={1} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={2} sx={{
            width: { xs: '100%', sm: '50%', md: '100%' }, 
            flexBasis: { xs: '100%', sm: '50%', md: '100%' }, 
            maxWidth: { xs: '100%', sm: '50%', md: '100%' }, 
            }}>
            <TextField
              fullWidth
              label="Search for Job"
              variant="outlined"
              value={debouncedSearchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  debouncedSearchTerm && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setDebouncedSearchTerm('')}>
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2} sx={{
            width: { xs: '100%', sm: '50%', md: '25%' }, 
            flexBasis: { xs: '100%', sm: '50%', md: '25%' }, 
            maxWidth: { xs: '100%', sm: '50%', md: '25%' }, 
            }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="department-label">Department</InputLabel>
              <Select
                labelId="department-label"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                label="Department"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4} md={2} sx={{
            width: { xs: '100%', sm: '50%', md: '25%' }, 
            flexBasis: { xs: '100%', sm: '50%', md: '25%' }, 
            maxWidth: { xs: '100%', sm: '50%', md: '25%' }, 
            }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="location-label">Location</InputLabel>
              <Select
                labelId="location-label"
                value={selectedLocation}
                onChange={handleLocationChange}
                label="Location"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {locations.map((loc) => (
                  <MenuItem key={loc.id} value={loc.id}>
                    {loc.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4} md={2} sx={{
            width: { xs: '100%', sm: '50%', md: '25%' }, 
            flexBasis: { xs: '100%', sm: '50%', md: '25%' }, 
            maxWidth: { xs: '100%', sm: '50%', md: '25%' }, 
            }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="function-label">Function</InputLabel>
              <Select
                labelId="function-label"
                value={selectedFunction}
                onChange={handleFunctionChange}
                label="Function"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {functions.map((func) => (
                  <MenuItem key={func.id} value={func.id}>
                    {func.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {appliedFilters.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            {appliedFilters.map((filter) => (
              <FilterChip
                key={filter.key}
                label={filter.label}
                onDelete={() => handleClearFilter(filter.key)}
              />
            ))}
            <Button
              size="small"
              onClick={handleClearAllFilters}
              sx={{ ml: 1, textTransform: 'none' }}
            >
              Clear All
            </Button>
          </Box>
        )}
      </Box>

      {loading ? (
        <Loader message="Fetching job openings..." />
      ) : error ? (
        <ErrorMessage message="Failed to load job openings. Please try refreshing." />
      ) : !jobs || jobs.length === 0 ? (

        <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 4 }}>
          No job openings found matching your criteria.
        </Typography>
      ) : (
        <Box>
          {groupedJobs.map(departmentGroup => (
            <Box key={departmentGroup.id} sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', pb: 1 }}>
                {departmentGroup.title}
              </Typography>
              <Divider sx={{ width: '50px', borderBottomWidth: 5, borderColor: 'primary.main', mb: 2 }} />
              <Grid container spacing={2}>
                {departmentGroup.jobs.map(job => (
                  <Grid item xs={12} key={job.id}>
                    <JobCard job={job} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default JobsPage;