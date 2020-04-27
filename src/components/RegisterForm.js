import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authregister } from "../store/auth.actions";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { handleSubmit, register, errors } = useForm();

  const finishRegister = (values) => {
    dispatch(authregister(values));
  };

  return (
    <>
      <form onSubmit={handleSubmit(finishRegister)}>
        <label htmlFor="name-login" style={{ fontWeight: "bold" }}>
          Name
        </label>
        <input
          className="cr-input"
          name="name"
          id="name-login"
          ref={register({
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "invalid name address",
            },
          })}
        />
        {errors.email && errors.email.message}

        <label
          htmlFor="email-login"
          style={{ fontWeight: "bold", marginTop: 10 }}
        >
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

export default RegisterForm;
