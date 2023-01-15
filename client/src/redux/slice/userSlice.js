import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../status";
import { signinUser, signupUser } from "../services/userServices";

// initial state of the user slice
const initialState = {
  user: null,
  error: null,
  status: STATUS.IDLE,
};

// user slice with async thunk
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      state.user = null;
      state.error = null;
      state.status = STATUS.IDLE;

      // clearing local storage
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.user = action.payload;
        state.error = null;

        // setting user in local storage
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload?.response_payload)
        );
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(signupUser.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.user = action.payload;
        state.error = null;

        // setting user in local storage
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload?.response_payload)
        );
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
