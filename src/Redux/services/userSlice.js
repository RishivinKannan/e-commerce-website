import { createSlice } from "@reduxjs/toolkit";

const logged = localStorage.getItem("loggedUser")
  ? JSON.parse(localStorage.getItem("loggedUser"))
  : {
      username: "Guest user",
      email: "guestuser@mail.com",
      isLogged: false,
    };

const initialState = {
  isLogged: true,
  ...logged,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userlogin(state, action) {
      const data = action.payload;
      localStorage.setItem("loggedUser", JSON.stringify(data));
      state.username = data.username;
      state.email = data.email;
      state.token = data?.token;
      state.isLogged = true;
    },
    userlogout(state) {
      localStorage.removeItem("loggedUser");
      state.username = "Guest User";
      state.email = "guestuser@mail.com";
      state.token = "";
      state.isLogged = false;
    },
    getuser(state) {
      const logged = localStorage.getItem("loggedUser")
        ? JSON.parse(localStorage.getItem("loggedUser"))
        : {
            username: "Guest user",
            email: "guestuser@mail.com",
            isLogged: false,
          };
      state.username = logged.username;
      state.email = logged.email;
      state.token = logged?.token;
      state.isLogged = logged.isLogged ? logged.isLogged : true;
    },
  },
});

export const { userlogin, userlogout, getuser } = userSlice.actions;
export default userSlice.reducer;
