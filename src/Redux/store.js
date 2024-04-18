import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "./api/products";
import { productsDjangoApi } from "./api/productsDjango";
import { userApi } from "./api/user";
import { productApi } from "./api/productApi";
import userReducer from "./services/userSlice";
import cartReducer from "./services/cartSlice";
import favReducer from "./services/FavSlice";
import historyReducer from "./services/historySlice";
import { cartApi } from "./api/cartApi";
import { orderApi } from "./api/orderApi";
import { trackerApi } from "./api/trackerApi";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [productsDjangoApi.reducerPath]: productsDjangoApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [trackerApi.reducerPath]: trackerApi.reducer,
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
      productApi.middleware,
      cartApi.middleware,
      orderApi.middleware,
      trackerApi.middleware,
    ]),
});
setupListeners(store.dispatch);

export default store;
