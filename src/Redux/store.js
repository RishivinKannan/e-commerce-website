import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "./api/products";
import { productsDjangoApi } from "./api/productsDjango";
import { userApi } from "./api/user";
import userReducer from "./services/userSlice";
import cartReducer from "./services/cartSlice";
import favReducer from "./services/FavSlice";
import historyReducer from "./services/historySlice";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [productsDjangoApi.reducerPath]: productsDjangoApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
    cart: cartReducer,
    fav: favReducer,
    history: historyReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productsApi.middleware,
      productsDjangoApi.middleware,
      userApi.middleware,
    ]),
});
setupListeners(store.dispatch);

export default store;
