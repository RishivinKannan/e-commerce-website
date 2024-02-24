import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getcart(state, action) {
      const { username } = action.payload;
      const cartList = localStorage.getItem(`${username}-Cart`)
        ? JSON.parse(localStorage.getItem(`${username}-Cart`))
        : [];
      state.cartList = cartList;
    },
    incrementqty(state, action) {
      const { id, username } = action.payload;
      const list = state.cartList;
      const temp = list.filter((item) => {
        return item.id == id;
      });
      const index = list.indexOf(temp[0]);
      list[index].qty += 1;
      localStorage.setItem(`${username}-Cart`, JSON.stringify(list));
      state.cartList = list;
    },
    decrementqty(state, action) {
      const { id, username } = action.payload;
      const list = state.cartList;
      const temp = list.filter((item) => {
        return item.id == id;
      });
      const index = list.indexOf(temp[0]);
      if (list[index].qty > 1) {
        list[index].qty -= 1;
        localStorage.setItem(`${username}-Cart`, JSON.stringify(list));
        state.cartList = list;
      }
    },
    deleteitem(state, action) {
      const { id, username } = action.payload;
      const list = state.cartList;
      const temp = list.filter((item) => {
        return item.id == id;
      });
      const index = list.indexOf(temp[0]);
      list.splice(index, 1);
      localStorage.setItem(`${username}-Cart`, JSON.stringify(list));
      state.cartList = list;
    },
    addtocart(state, action) {
      const { id, qty, username } = action.payload;
      const cartList = localStorage.getItem(`${username}-Cart`)
        ? JSON.parse(localStorage.getItem(`${username}-Cart`)).concat({
            id,
            qty,
          })
        : [
            {
              id,
              qty,
            },
          ];
      localStorage.setItem(`${username}-Cart`, JSON.stringify(cartList));
      state.cartList = cartList;
    },
  },
});

export const { getcart, incrementqty, decrementqty, deleteitem, addtocart } =
  cartSlice.actions;
export default cartSlice.reducer;
