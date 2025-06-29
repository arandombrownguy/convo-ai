import { Box, Typography, Avatar, Stack, useTheme, Icon } from "@mui/material";
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

interface Props {
  role: "user" | "gpt";
  content: string;
}
const MsgBubble: React.FC<Props> = ({ role, content }) => {
  const theme = useTheme();
  const isUser = role === "user";

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      {!isUser ? (
        <Avatar alt="AI" sx={{ bgcolor: theme.palette.secondary.main }}>
          <Icon component={SmartToyRoundedIcon} sx={{ color: theme.palette.primary.dark }} />
        </Avatar>
      ) : (
        <Avatar alt="You" sx={{ bgcolor: theme.palette.secondary.main }}>
            <Icon component={AccountCircleRoundedIcon} sx={{ color: 'black' }} />
        </Avatar>
      )}
      <Box>
        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 1, opacity: 0.6 }}
        >
          02:22 AM
        </Typography>
        <Box
          sx={{
            bgcolor: theme.palette.secondary.main,
            p: 2,
            borderRadius: 3,
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
          }}
        >
          {content}
        </Box>
      </Box>
    </Stack>
  );
};

export default MsgBubble;
