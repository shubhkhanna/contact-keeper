import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import { STATUS } from "./status";

// loading initial state from local storage
export const loadInitialState = () => {
  try {
    const serializedState = localStorage.getItem("user");
    if (!serializedState) return undefined;

    const oldUser = {
      user: JSON.parse(serializedState),
      error: null,
      status: STATUS.SUCCESS,
    };

    return oldUser;
  } catch (err) {
    return null;
  }
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: loadInitialState(),
  },
});

export default store;
