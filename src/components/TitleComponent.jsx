import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../App.css";
import { useEffect } from "react";
import { memo } from "react";

function TitleComponent({ user, setUser,isLoginModalOpen, setIsLoginModalOpen,isSignupModalOpen,setIsSignupModalOpen}) {

  const toggleModalLogin = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
    if (isSignupModalOpen) {
      setIsSignupModalOpen(false);
    }
  };

  const toggleModalSignup = () => {
    setIsSignupModalOpen(!isSignupModalOpen);
    if (isLoginModalOpen) {
      setIsLoginModalOpen(false);
    }
  };

  const swapToggleLogin = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const swapToggleSignup = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };


  // Signup validation Schema
  const SignupSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    emailSignup: Yup.string().email("Invalid email").required("Required"),
    passwordSignup: Yup.string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .required("Required"),
    confirm: Yup.string()
      .oneOf([Yup.ref("passwordSignup"), null], "Password doesn't match")
      .required("required"),
  });

  // Login Validation Schema
  const LoginSchema = Yup.object().shape({
    emailLogin: Yup.string().email("Invalid email").required("Required"),
    passwordLogin: Yup.string().required("Required"),
  });

  // Axios Api call
  const LoginUser = async (values) => {
    console.log(values);

    const formdata = new FormData();
    formdata.append("email", values.emailLogin);
    formdata.append("password", values.passwordLogin);

    try {
      const response = await axios.post("/api/v1/users/login", formdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Login succesfully");
      localStorage.setItem("user", JSON.stringify(response.data.data));
      setUser(JSON.parse(localStorage.getItem("user")));
      
      toggleModalLogin();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // Registering user
  const RegisterUser = async (values) => {
    console.log(values);

    const formdata = new FormData();
    formdata.append("FullName", values.fullname);
    formdata.append("email", values.emailSignup);
    formdata.append("password", values.passwordSignup);

    try {
      const response = await axios.post("/api/v1/users/register", formdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      alert("User created Successfully");
      toggleModalSignup();
    } catch (error) {
      console.log(error);
    }
  };

  // Logout 
  const logout=()=>{
    localStorage.removeItem('user')
    setUser({})
    alert('Logout succesfully');
  }


  return (
    <div
      className={`bg-white mb-4 ${isLoginModalOpen ? "blur-background" : ""}`}
    >
      <div className="flex justify-between items-center mb-2 mt-5 font-serif px-5">
        <h1 className={`font-bold text-4xl text-center flex-grow ml-60 ${Object.keys(user).length <= 0 ? 'mr-10' : ''}`}>
          Rapid Payslip
        </h1>
        <div className="ml-auto">
          <div className="flex justify-center items-center">
            {Object.keys(user).length>0 ? (
              <div className="flex justify-end items-end">
              <div className="text-black text-xl border-2 p-2">{`Welcome ${user.FullName.split(" ")[0]}`}</div>
              <button onClick={logout} className="ml-4 border-2 p-2">Logout</button>
              </div>
            ) : (
              <>
                <button
                  onClick={toggleModalLogin}
                  className="block bg-blue-500 py-1 text-white px-4 rounded shadow font-bold border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300 print-button"
                  type="button"
                >
                  Login
                </button>
                <button
                  onClick={toggleModalSignup}
                  className="block bg-blue-500 py-1 text-white px-4 rounded shadow font-bold border-2 border-blue-500 ml-2 hover:bg-transparent hover:text-blue-500 transition-all duration-300 print-button"
                  type="button"
                >
                  Signup
                </button>
              </>
            )}
          </div>

          {/* Login modal started */}
          {isLoginModalOpen && (
            <div
              id="authentication-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
            >
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Login to your account
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={toggleModalLogin}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1l6 6m0 0l6 6M7 7L1 1m6 6l6-6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className="p-4 md:p-5">
                    <Formik
                      initialValues={{
                        emailLogin: "",
                        passwordLogin: "",
                      }}
                      validationSchema={LoginSchema}
                      onSubmit={LoginUser}
                    >
                      {({ touched, errors }) => (
                        <Form className="space-y-4">
                          <div>
                            <label
                              htmlFor="emailLogin"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Your email
                            </label>
                            <Field
                              type="email"
                              name="emailLogin"
                              id="emailLogin"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              placeholder="name@company.com"
                            />
                            {errors.emailLogin && touched.emailLogin ? (
                              <div className="text-red-600 mt-2">
                                {errors.emailLogin}
                              </div>
                            ) : null}
                          </div>
                          <div>
                            <label
                              htmlFor="password"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Your password
                            </label>
                            <Field
                              type="password"
                              name="passwordLogin"
                              id="passwordLogin"
                              placeholder="••••••••"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            />
                            {errors.passwordLogin && touched.passwordLogin ? (
                              <div className="text-red-600 mt-2">
                                {errors.passwordLogin}
                              </div>
                            ) : null}
                          </div>
                          <div className="flex justify-between">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <Field
                                  id="remember"
                                  type="checkbox"
                                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                />
                              </div>
                              <label
                                htmlFor="remember"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Remember me
                              </label>
                            </div>
                            <button
                              href="#"
                              className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                            >
                              Lost Password?
                            </button>
                          </div>
                          <button
                            type="submit"
                            className="w-full text-white bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-500"
                          >
                            Login to your account
                          </button>
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?{" "}
                            <button
                              onClick={swapToggleLogin}
                              className="text-blue-700 hover:underline dark:text-blue-500"
                            >
                              Create account
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Signup modal started */}
          {isSignupModalOpen && (
            <div
              id="authentication-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
            >
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Sign-up to your account
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={toggleModalSignup}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1l6 6m0 0l6 6M7 7L1 1m6 6l6-6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <Formik
                    initialValues={{
                      fullname: "",
                      emailSignup: "",
                      passwordSignup: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={RegisterUser}
                  >
                    {({ errors, touched }) => (
                      <Form className="p-4 md:p-5 space-y-4">
                        <div>
                          <label
                            htmlFor="fullname"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Full Name
                          </label>
                          <Field
                            type="text"
                            name="fullname"
                            id="fullname"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="John Doe"
                          />
                          {errors.fullname && touched.fullname ? (
                            <div className="text-red-600 mt-2">
                              {errors.fullname}
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <label
                            htmlFor="emailSignup"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Your email
                          </label>
                          <Field
                            type="email"
                            name="emailSignup"
                            id="emailSignup"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="name@company.com"
                          />
                          {errors.emailSignup && touched.emailSignup ? (
                            <div className="text-red-600 mt-2">
                              {errors.emailSignup}
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <label
                            htmlFor="passwordSignup"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Your password
                          </label>
                          <Field
                            type="password"
                            name="passwordSignup"
                            id="passwordSignup"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="••••••••"
                          />
                          {errors.passwordSignup && touched.passwordSignup ? (
                            <div className="text-red-600 mt-2">
                              {errors.passwordSignup}
                            </div>
                          ) : null}
                        </div>
                        <div>
                          <label
                            htmlFor="confirm"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Confirm password
                          </label>
                          <Field
                            type="password"
                            name="confirm"
                            id="confirm"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="••••••••"
                          />
                          {errors.confirm && touched.confirm ? (
                            <div className="text-red-600 mt-2">
                              {errors.confirm}
                            </div>
                          ) : null}
                        </div>
                        <button
                          type="submit"
                          className="w-full text-white bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-500"
                        >
                          Create Account
                        </button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                          Already have account?{" "}
                          <button
                            onClick={swapToggleSignup}
                            className="text-blue-700 hover:underline dark:text-blue-500"
                          >
                            Login
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(TitleComponent);
