import "bootstrap/dist/css/bootstrap.css";

import { Provider, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import firebaseAuth from "../config/firebaseAuth";
import { onAuthStateChanged } from "firebase/auth";
import store from "../redux/store";
import { updateAuthenticatedUser } from "../redux/slices/authSlice";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        dispatch(
          updateAuthenticatedUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
          })
        );
      }
    });
  }, []);

  return props.children;
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <App>
        <Component {...pageProps} />
      </App>
    </Provider>
  );
}

export default MyApp;
