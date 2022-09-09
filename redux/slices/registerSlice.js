import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebaseAuth from "../../config/firebaseAuth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";
import firebaseDB from "../../config/firebaseDB";

export const registerUser = createAsyncThunk("register/attemptRegister", async (credentials) => {
  try {
    const auth = getAuth();
    const { email, password, displayName } = credentials;
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const user = userCredential.user;
    await addDoc(collection(firebaseDB, "users"), {
      uid: user.uid,
      displayName,
      email,
      password,
      score: 0,
    });
    await updateProfile(auth.currentUser, {
      displayName,
    });
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
    };
  } catch (err) {
    throw TypeError("Unable to login");
  }
});

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    form: {
      displayName: "",
      email: "",
      password: "",
    },
    isLoading: false,
    authenticatedUser: null,
  },
  reducers: {
    updateCredentials: (state, action) => {
      const { name, value } = action.payload;
      state.form = {
        ...state.form,
        [name]: value,
      };
    },
    updateAuthenticatedUser: (state, action) => {
      state.authenticatedUser = {
        email: action.payload.email,
        uid: action.payload.uid,
        displayName: action.payload.displayName,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload;
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { updateCredentials, updateAuthenticatedUser } = registerSlice.actions;

export default registerSlice.reducer;
