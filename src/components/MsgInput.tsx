import { useState } from "react";
import { TextField, IconButton, Paper, useTheme } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { addMsg, setError, setLoading } from "../store/convoSlice";
import { fetchResponseData } from "../utils/getApis";
const MsgInput = () => {
  const [userInput, setUserInput] = useState("");
  const isLoading = useSelector((state: RootState) => state.convo.isLoading);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const handleFetchedData = async () => {
    if (!userInput.trim()) return;

    dispatch(addMsg({ role: "user", content: userInput }));
    dispatch(setLoading(true));
    dispatch(setError(null));
    setUserInput("");

    let gptresp = "";

    try {
      await fetchResponseData(userInput, (chunk) => {
        gptresp += chunk;
        dispatch(addMsg({ role: "gpt", content: gptresp }));
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      dispatch(setError("Failed to fetch response! Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleKeyDownEvent = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleFetchedData();
    }
  };

  return (
    <Paper
      sx={{
        p: 1,
        display: "flex",
        gap: 1,
        borderRadius: 10,
        alignItems: "center",
      }}
      elevation={3}
    >
      <TextField
        fullWidth
        placeholder={isLoading ? "Waiting..." : "Ask Me Anything..."}
        disabled={isLoading}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDownEvent}
        size="small"
        sx={{
          fieldset: { display: "none" },
        }}
      />
      <IconButton
        onClick={handleFetchedData}
        disabled={isLoading || !userInput.trim()}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: "white",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        <ArrowUpwardRoundedIcon />
      </IconButton>
    </Paper>
  );
};

export default MsgInput;
