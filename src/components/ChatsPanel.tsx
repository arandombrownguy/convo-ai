import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Box, Typography } from '@mui/material';
import MsgIndicator from './MsgIndicator';
import MsgBubble from './MsgBubble';

const ChatsPanel = () => {
  const { messages, isLoading, error } = useSelector((state: RootState) => state.convo);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{ flex: 1, overflowY: 'auto', p: 2, scrollbarWidth: 'none' }}>
      {messages.map((msg, idx) => (
        !!msg?.content && <MsgBubble
          key={idx}
          role={msg.role}
          content={msg.content}
        />
      ))}
      {isLoading && <MsgIndicator />}
      {error && (
         <Typography color="error" mt={1}>
           {error}
         </Typography>
       )}
      <div ref={endRef} />
    </Box>
  );
};

export default ChatsPanel;
