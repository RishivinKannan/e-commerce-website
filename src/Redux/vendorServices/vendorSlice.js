import { createSlice } from "@reduxjs/toolkit";

const logged = localStorage.getItem("loggedvendor")
  ? JSON.parse(localStorage.getItem("loggedvendor"))
  : {
      isLogged: false,
    };

const initialState = {
  isLogged: true,
  ...logged,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    vendorlogin(state, action) {
      const { vendorName, email } = action.payload;
      localStorage.setItem(
        "loggedvendor",
        JSON.stringify({ vendorName: vendorName, email: email })
      );
      state.vendorName = vendorName;
      state.email = email;
      state.isLogged = true;
    },
    vendorlogout(state) {
      localStorage.removeItem("loggedvendor");
      state.vendorName = "nouser";
      state.email = "nouser@mail.com";
      state.isLogged = false;
    },
    getvendor(state) {
      const logged = localStorage.getItem("loggedvendor")
        ? JSON.parse(localStorage.getItem("loggedvendor"))
        : {
            vendorName: "nouser",
            email: "nouser@mail.com",
            isLogged: false,
          };
      state.vendorName = logged.vendorName;
      state.email = logged.email;
      state.isLogged = logged.isLogged ? logged.isLogged : true;
    },
  },
});

export const { vendorlogin, vendorlogout,getvendor } = vendorSlice.actions;
export default vendorSlice.reducer;
