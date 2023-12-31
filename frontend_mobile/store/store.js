import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import newMessagesReducer from "./messagesSlice";

const persistConfig = {
  key: "auth",
  storage,
};

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    messages: newMessagesReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
