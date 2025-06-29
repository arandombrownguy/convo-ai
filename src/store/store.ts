import { configureStore } from "@reduxjs/toolkit";
import convoReducer from "./convoSlice";

export const store = configureStore({
  reducer: {
    convo: convoReducer,
  },
});
store.subscribe(() => {
  const { messages } = store.getState().convo;
  localStorage.setItem('cachedConvo', JSON.stringify(messages));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;