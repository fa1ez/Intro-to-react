import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "./api/auth.api";
import authMiddleware from "./middleware";

const persistConfig = {
  key: "root",
  storage,
};

const combinedPersistedReducer = combineReducers({
  userReducer: userSlice.reducer,
});

const persistedReducer = persistReducer(
  persistConfig,
  combinedPersistedReducer
);

const rootReducer = combineReducers({
  persistedRoot: persistedReducer,
  //apis to not persist
  [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // getDefaultMiddleware({
      //   serializableCheck: {
      //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      //   },
      // }).concat(
      authMiddleware,
      authApi.middleware
    ),
});

export const persistor = persistStore(store);
