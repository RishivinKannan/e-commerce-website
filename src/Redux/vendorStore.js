import { configureStore } from "@reduxjs/toolkit";
import vendorReducer from './vendorServices/vendorSlice'
import { vendorApi } from "./api/vendorApi";
import { setupListeners } from "@reduxjs/toolkit/query";
const store = configureStore({
  reducer: {
    [vendorApi.reducerPath]: vendorApi.reducer,
    vendor: vendorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      vendorApi.middleware,
    ]),

});
setupListeners(store.dispatch);

export default store;