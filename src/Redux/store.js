import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "./api/products";
import userReducer from "./services/userSlice";
import cartReducer from "./services/cartSlice";
import favReducer from "./services/FavSlice";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    user: userReducer,
    cart: cartReducer,
    fav: favReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
setupListeners(store.dispatch);

export default store;
