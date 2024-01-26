import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstanceArgs from "../utils/axiosInstanceArgs";
import { mergeArrays, mergeObjectsWithArrays } from "../utils/functions";

const fetchLastFetch = createAsyncThunk(
  "messages/fetchLastFetch",
  async (arg, { getState, dispatch }) => {
    const response = await axiosInstanceArgs(getState, dispatch).get(
      "last_fetch/"
    );
    return response.data;
  }
);

const fetchNewMessages = createAsyncThunk(
  "messages/fetchNewMessages",
  async (arg, { getState, dispatch }) => {
    const response = await axiosInstanceArgs(getState, dispatch).get(
      `messages/new/${getState().messages.lastFetchTimestamp}/`
    );
    return response.data;
  }
);

const fetchOldMessages = createAsyncThunk(
  "messages/fetchOldMessages",
  async (arg, { getState, dispatch }) => {
    const response = await axiosInstanceArgs(getState, dispatch).get(
      `messages/old/${getState().messages.lastFetchTimestamp}/`
    );
    return response.data;
  }
);

const initialState = {
  oldMessages: {},
  newMessages: {},
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
  lastFetchTimestamp: 0,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setLastFetch: (state, action) => {
      state.lastFetchTimestamp = action.payload.lastFetch;
    },
    setAllRead: (state) => {
      state.oldMessages = mergeObjectsWithArrays(
        state.oldMessages,
        state.newMessages
      );
      state.newMessages = {};
    },
    setRead: (state, action) => {
      const eventId = action.payload["eventId"];
      const messages = action.payload["messages"];
      if (state.newMessages.hasOwnProperty(eventId)) {
        delete state.newMessages[eventId];
      }
      if (state.oldMessages.hasOwnProperty(eventId)) {
        state.oldMessages[eventId] = mergeArrays(
          state.oldMessages[eventId],
          messages
        );
      } else {
        state.oldMessages[eventId] = messages;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewMessages.fulfilled, (state, action) => {
      state.status = "succeeded new";

      if (action.payload?.announcements) {
        state.newMessages = mergeObjectsWithArrays(
          state.newMessages,
          action.payload?.announcements
        );
      }
      state.lastFetchTimestamp = Date.now() / 1000;
    });
    builder.addCase(fetchNewMessages.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchNewMessages.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    ////
    builder.addCase(fetchOldMessages.fulfilled, (state, action) => {
      state.status = "succeeded old";
      if (action.payload?.announcements) {
        state.oldMessages = action.payload?.announcements;
      }
    });
    builder.addCase(fetchOldMessages.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchOldMessages.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(fetchLastFetch.fulfilled, (state, action) => {
      const lf = action.payload?.last_fetch;
      state.lastFetchTimestamp = lf ? lf : 0;
    });
    builder.addCase(fetchLastFetch.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export { fetchNewMessages, fetchOldMessages, fetchLastFetch };
export const { setLastFetch, setRead } = messagesSlice.actions;
export const selectLastFetchTimestamp = (state) =>
  state.messages.lastFetchTimestamp;
export const selectNewMessages = (state) => state.messages.newMessages;
export const selectOldMessages = (state) => state.messages.oldMessages;
export default messagesSlice.reducer;
