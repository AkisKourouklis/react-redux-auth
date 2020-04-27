import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/auth.actions";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { handleSubmit, register, errors } = useForm();

  const finishLogin = (values) => {
    dispatch(login(values));
  };

  return (
    <>
      <form onSubmit={handleSubmit(finishLogin)}>
        <label htmlFor="email-login" style={{ fontWeight: "bold" }}>
          Email
        </label>
        <input
          className="cr-input"
          name="email"
          id="email-login"
          ref={register({
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "invalid email address",
            },
          })}
        />
        {errors.email && errors.email.message}

        <label
          style={{ marginTop: 10, fontWeight: "bold" }}
          htmlFor="password-login"
        >
          Password
        </label>
        <input
          id="password-login"
          className="cr-input"
          name="password"
          ref={register({
            required: "Required",
            pattern: {
              message: "invalid password",
            },
          })}
        />
        {errors.password && errors.password.message}

        <button
          style={{ marginTop: 20, maxHeight: 40 }}
          className="primary-button"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginForm;
