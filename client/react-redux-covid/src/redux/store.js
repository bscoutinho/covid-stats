import { createStore, combineReducers } from "redux";
import statsReducer from "./Stats.reducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducer = combineReducers({
  stats: statsReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  rootReducer
);

export const store = createStore(persistedReducer);

export const persistedStore = persistStore(store);
