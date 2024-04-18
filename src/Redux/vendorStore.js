import { configureStore } from "@reduxjs/toolkit";
import vendorReducer from "./vendorServices/vendorSlice";
import { vendorApi } from "./api/vendorApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { vendorQuestionsApi } from "./api/vendorQuestionsApi";
import { vendorOrderApi } from "./api/vendorOrderApi";
import { productsDjangoApi } from "./api/productsDjango";
const store = configureStore({
  reducer: {
    [vendorApi.reducerPath]: vendorApi.reducer,
    [vendorQuestionsApi.reducerPath]: vendorQuestionsApi.reducer,
    [vendorOrderApi.reducerPath]: vendorOrderApi.reducer,
    [productsDjangoApi.reducerPath]: productsDjangoApi.reducer,
    vendor: vendorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      vendorApi.middleware,
      vendorQuestionsApi.middleware,
      vendorOrderApi.middleware,
      productsDjangoApi.middleware,
    ]),
});
setupListeners(store.dispatch);

export default store;
