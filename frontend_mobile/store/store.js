import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import newMessagesReducer from "./newMessagesSlice";

const persistConfig = {
  key: "auth",
  storage,
};

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    newMessages: newMessagesReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
