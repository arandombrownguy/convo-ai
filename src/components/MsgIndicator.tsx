import { Box, CircularProgress, Typography } from '@mui/material';

const MsgIndicator = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="start" gap={1} mt={1}>
      <CircularProgress size={16} />
      <Typography variant="body2" color="text.secondary">
        Hmm...
      </Typography>
    </Box>
  );
};

export default MsgIndicator;
