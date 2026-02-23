import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import chessboardReducer from "@/lib/store/features/chessboard/chessboard.slice";

const rootReducer = combineReducers({
  chessboard: chessboardReducer,
});

//setting up the persist confuguration
const persistConfig = {
  key: "chess-v1",
  storage,
  whitelist: ["auth"], //save only auth
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            "persist/PERSIST",
            "persist/REHYDRATE",
            "persist/REGISTER",
            "persist/PURGE",
          ],
        },
      }),
  });
};

// Exports
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
