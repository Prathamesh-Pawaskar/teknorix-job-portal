import { Chip } from '@mui/material';

function FilterChip({ label, onDelete }) {
  return (
    <Chip
      label={label}
      onDelete={onDelete}
      color="primary"
      variant="outlined"
      sx={{ m: 0.5 }}
    />
  );
}

export default FilterChip;