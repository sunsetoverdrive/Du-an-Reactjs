import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart";
import authReducer from "./reducers/auth";
import { applyMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "vietpro",
  storage,
};
const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const store = configureStore(
  {
    reducer: {
      Cart: persistedCartReducer,
      Auth: persistedAuthReducer,
    },
  },
  applyMiddleware(logger),
);
export const persistor = persistStore(store);
export default store;
