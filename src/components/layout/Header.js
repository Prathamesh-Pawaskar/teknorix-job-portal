import { AppBar, Toolbar, Typography} from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'center', py: 1.5 }}> 
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#ecf0f1' }}>
            Teknorix Job Openings
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;