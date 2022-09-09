import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import registerReducer from "./slices/registerSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
  },
});
