import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { logout } from "./store/auth.actions";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuthenticated);

  const authLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {!auth ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <div
              style={{
                maxWidth: "980px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ width: "100%", padding: "10px" }}>
                <h1>Login</h1>
                <LoginForm />
              </div>
              <div style={{ width: "100%", padding: "10px" }}>
                <h1>Register</h1>
                <RegisterForm />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <h1>Your are logged in</h1>
            <button
              style={{ marginTop: 20, maxHeight: 40, maxWidth: "300px" }}
              className="primary-button"
              type="submit"
              onClick={authLogout}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default App;
