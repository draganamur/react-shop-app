import classes from "./Login.module.scss";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { authActions } from "../../store/slices/auth-slice";
import Button from "../button/Button";

const Login = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.error);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(authActions.login({ username, password }));
  };

  return (
    <div className={classes.login}>
      <p className={error ? classes.loginErrorMsg : classes.loginError}>
        {error}
      </p>

      <form onSubmit={loginHandler} className={classes.loginForm}>
        <div className={classes.input_container}>
          <input
            type="text"
            id="username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className={classes.input_container}>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <label htmlFor="password">Password</label>
        </div>
        <Button className={classes.loginButton}>Login </Button>
      </form>
    </div>
  );
};

export default Login;
