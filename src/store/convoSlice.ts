import { createSlice } from '@reduxjs/toolkit';

interface Msg {
  role: 'user' | 'gpt';
  content: string;
}
interface ConvoState {
  messages: Msg[];
  isLoading: boolean;
  error: string | null;
}
const cachedConvo = localStorage.getItem('cachedConvo');

const initialState: ConvoState = {
  messages: cachedConvo ? JSON.parse(cachedConvo) : [],
  isLoading: false,
  error: null,
};

const convoSlice = createSlice({
  name: 'convo',
  initialState,
  reducers: {
    addMsg: (state, action) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetConvo: () => initialState,
  },
});

export const { addMsg, setLoading, setError, resetConvo } = convoSlice.actions;
export default convoSlice.reducer;
