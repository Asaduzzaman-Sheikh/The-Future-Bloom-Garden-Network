// import { createSlice } from "@reduxjs/toolkit";

// const loadUserFromLocalStorage = () => {
//   try {
//     const serializedState = localStorage.getItem("user");
//     if (serializedState === null) return { user: null };
//     return { user: JSON.parse(serializedState) };
//   } catch (error) {
//     return { user: null };
//   }
// };

// const initialState = loadUserFromLocalStorage();

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     isAuthenticated: false,
//     user: null,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload.user;
//       localStorage.setItem("user", JSON.stringify(state.user));
//     },
//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const { setUser, logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? { user: JSON.parse(user) } : { user: null };
};

const initialState = {
  isAuthenticated: false,
  ...loadUserFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Assume payload is the user object
      state.isAuthenticated = true;
      try {
        localStorage.setItem("user", JSON.stringify(state.user));
      } catch (error) {
        console.error("Failed to save user to localStorage:", error);
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
