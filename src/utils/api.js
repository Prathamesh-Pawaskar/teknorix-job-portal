import axios from 'axios';

const API_BASE_URL = 'https://teknorix.jobsoid.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchJobs = async (filters = {}) => {
  try {
    const response = await api.get('/jobs', { params: filters });

    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const fetchJobDetails = async (jobId) => {
  try {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job details for ${jobId}:`, error);
    throw error;
  }
};

export const fetchLocations = async () => {
  try {
    const response = await api.get('/locations');
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};

export const fetchDepartments = async () => {
  try {
    const response = await api.get('/departments');
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

export const fetchFunctions = async () => {
  try {
    const response = await api.get('/functions');
    return response.data;
  } catch (error) {
    console.error('Error fetching functions:', error);
    throw error;
  }
};