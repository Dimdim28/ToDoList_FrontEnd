import React from "react";
import { useFormik } from "formik";
import "./Login.module.scss";

interface Values {
  email?: string;
  password?:string;
};

const validate = (values: Values) => {
  const errors: Values = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 5) {
    errors.password = "Must be 5 characters or more";
  } else if (values.password.length > 15) {
    errors.password = "Must be 15 characters or less";
  }

  console.log(errors);
  return errors;
};

const Login: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      console.log("values =", values);
      formik.resetForm();
      setSubmitting(false);
    },
  });

  return (
    <main>
      <div className="wrapper">
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <p>{formik.errors.email}</p>
          ) : null}

          <label htmlFor="password">password</label>
          <input
            id="passwprd"
            name="password"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <p>{formik.errors.password}</p>
          ) : null}

          <button
            disabled={
              formik.isSubmitting || Object.keys(formik.errors).length > 0
            }
            type="submit"
          >
            Piece of submition
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
