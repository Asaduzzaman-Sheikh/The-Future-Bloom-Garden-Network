import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedItems: 0,
  totalAmount: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action) => {
      // Check if the product already exists in the cart
      const isExist = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (!isExist) {
        // Add new product with quantity 1
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        // If the product exists, increase its quantity
        isExist.quantity += 1;
      }

      // Update derived state values
      state.selectedItems = state.products.reduce(
        (total, product) => total + product.quantity,
        0
      );
      state.totalAmount = state.products.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      );
      state.tax = state.totalAmount * state.taxRate;
      state.grandTotal = state.totalAmount + state.tax;
    },
  },
});

// Export actions and reducer
export const { increment } = cartSlice.actions;
export default cartSlice.reducer;
