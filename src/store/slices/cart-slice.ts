import { createSlice } from "@reduxjs/toolkit";
import { CartItem, Item } from "../../interfaces/index";

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  total: number;
  selectedItem: Item;
}

const initialCartState: CartState = {
  items: [],
  totalQuantity: 0,
  total: 0,
  selectedItem: { id: "", price: 0, image: "", description: "", title: "" },
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    addItemTocart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((i) => i.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          totalPrice: newItem.price,
          quantity: 1,
          image: newItem.image,
        });
      } else {
        existingItem.totalPrice += newItem.price;
        existingItem.quantity++;
      }
      state.total += newItem.price;
    },
    removeItemFromCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((i) => i.id === newItem.id);
      state.totalQuantity--;

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((i) => i.id !== newItem.id);
          state.total -= existingItem.price;
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
          state.total -= existingItem.price;
        }
      }
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
