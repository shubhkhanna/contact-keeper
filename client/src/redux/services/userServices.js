import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { headerConfig, ServerRoutes } from "../../utils/routes";

// signin user thunk
export const signinUser = createAsyncThunk(
  "user/signin",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        ServerRoutes.signin,
        {
          email,
          password,
        },
        headerConfig()
      );

      if (data.success) return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

// signup user thunk
export const signupUser = createAsyncThunk(
  "user/signup",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        ServerRoutes.signup,
        {
          name,
          email,
          password,
        },
        headerConfig()
      );

      if (data.success) return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);
