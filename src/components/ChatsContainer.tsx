import { Box, Container, Paper, Typography } from '@mui/material';
import MsgInput from './MsgInput';
import ChatsPanel from './ChatsPanel';

const ChatsContainer = () => {
  return (
    <Container maxWidth="md" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column', borderRadius: 3,
         overflow: 'hidden', boxShadow: 'none' }}>
      <ChatsPanel />
        <Box sx={{ p: 1 }}>
          <MsgInput />
        </Box>
        <Typography  m={0} p={1} textAlign="center" variant="caption">
           AI can make mistakes. Check our Terms & Conditions.
         </Typography>
      </Paper>
    </Container>
  );
};

export default ChatsContainer;
