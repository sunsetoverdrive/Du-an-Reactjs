import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};
const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const items = state.items;
      let isProductExists = false;
      items.map((item) => {
        if (item._id === action.payload._id) {
          item.qty += Number(action.payload.qty);
          isProductExists = true;
        }
        return item;
      });
      const newItems = isProductExists ? items : [...items, action.payload];
      state.items = newItems;
    },
    updateCart: (state, action) => {
      state.items = updateItemCart(state, action.payload);
    },
    deleteItem: (state, action) => {
      const items = state.items;
      const newItems = items.filter((item) => item._id !== action.payload._id);
      state.items = newItems;
    },
  },
});
const updateItemCart = (state, payload) => {
  const items = state.items;
  items.map((item) => {
    if (item._id === payload._id) {
      item.qty = Number(payload.qty);
    }
  });
  // console.log(items);
  return items;
};
export const { addToCart, updateCart, deleteItem } = cartReducer.actions;
export default cartReducer.reducer;
