
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline} from '@mui/material';
import Layout from './components/layout/Layout'; 
import JobsPage from './pages/JobsPage';
import JobDetailsPage from './pages/JobDetailsPage';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<JobsPage />} />
          <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;