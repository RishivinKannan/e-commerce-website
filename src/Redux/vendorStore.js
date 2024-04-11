import { configureStore } from "@reduxjs/toolkit";
import vendorReducer from "./vendorServices/vendorSlice";
import { vendorApi } from "./api/vendorApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { vendorQuestionsApi } from "./api/vendorQuestionsApi";
const store = configureStore({
  reducer: {
    [vendorApi.reducerPath]: vendorApi.reducer,
    [vendorQuestionsApi.reducerPath]: vendorQuestionsApi.reducer,
    vendor: vendorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      vendorApi.middleware,
      vendorQuestionsApi.middleware,
    ]),
});
setupListeners(store.dispatch);

export default store;
