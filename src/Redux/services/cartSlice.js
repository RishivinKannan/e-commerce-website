import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: [],
  subTotal: 0,
  discount: 0,
  discountCode: "",
  total: 0,
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
      const total =
        cartList.length === 0
          ? []
          : cartList.map((item) => item.qty * item.price);
      let sum = 0;
      total.length === 0 ? null : total.map((item) => (sum = sum + item));
      state.subTotal = sum;
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
      const total = list.map((item) => item.qty * item.price);
      let sum = 0;
      total.length === 0 ? null : total?.map((item) => (sum = sum + item));
      state.subTotal = sum;
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
        const total =
          list.length === 0 ? 0 : list.map((item) => item.qty * item.price);
        let sum = 0;
        total.length === 0 ? null : total?.map((item) => (sum = sum + item));
        state.subTotal = sum;
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
      const total = list.map((item) => item.qty * item.price);
      let sum = 0;
      total.length === 0 ? null : total?.map((item) => (sum = sum + item));
      state.subTotal = sum;
    },
    addtocart(state, action) {
      const { id, qty, username, price } = action.payload;
      const cartList = localStorage.getItem(`${username}-Cart`)
        ? JSON.parse(localStorage.getItem(`${username}-Cart`)).concat({
            productId: id,
            qty,
            price,
          })
        : [
            {
              productId: id,
              qty,
              price,
            },
          ];
      localStorage.setItem(`${username}-Cart`, JSON.stringify(cartList));
      state.cartList = cartList;
      const total = cartList.map((item) => item.qty * item.price);
      let sum = 0;
      total.length === 0 ? null : total?.map((item) => (sum = sum + item));
      state.subTotal = sum;
    },
    addDiscount(state, action) {
      const { discount, code } = action.payload;
      state.discount = discount;
      state.discountCode = code;
    },
    setTotal(state, action) {
      const { total } = action.payload;
      state.total = total;
    },
  },
});

export const {
  getcart,
  incrementqty,
  decrementqty,
  deleteitem,
  addtocart,
  addDiscount,
  setTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
