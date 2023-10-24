import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
//
import { BsEyeSlash, BsEye } from "../middlewares/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaRegister, wait } from "../utils/utils";
//
import { inscription } from "../services/users";

const Register = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [classNameMsg, setClassNameMsg] = useState(
    "width msg-box display-flex justify-content-center align-items-center"
  );

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchemaRegister),
    defaultValues: { gcu: false },
  });

  const onSubmit = async (data) => {
    setIsSending(true);
    await wait(1000);
    //
    inscription(data)
      .then((result) => {
        if (result?.data?.status === 1) {
          setIsSending(false);
          setResponseMessage(result?.data?.message);
          setClassNameMsg(
            "width msg-box onSuccess fade-in display-flex justify-content-center align-items-center"
          );
        }
        const timer = setTimeout(() => {
          reset();
          navigate("/login", { replace: true });
        }, 3000);
        return () => clearTimeout(timer);
      })
      .catch((error) => {
        setIsSending(false);
        setClassNameMsg(
          "width msg-box onFailed fade-in display-flex justify-content-center align-items-center"
        );
        if (!error?.response) {
          setResponseMessage("No server response");
        } else {
          setResponseMessage(error?.response?.data?.message);
        }
        const timer = setTimeout(() => {
          setClassNameMsg(
            "width msg-box display-flex justify-content-center align-items-center"
          );
          setResponseMessage("");
        }, 3500);
        return () => clearTimeout(timer);
      });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Vatel Smart Contract - Register.</title>
        <meta
          name="description"
          content="Register and get benefits from the organization."
        />
        <meta name="keywords" content="School, Study, Education" />
      </Helmet>
      <div className="sign-up">
        <div className="container">
          <div className="head">
            <div className="image-logo">
              <Link to="/" className="link">
                <img src={process.env.PUBLIC_URL + "/logo.png"} alt="log-app" />
              </Link>
            </div>
            <h2 className="title t-1">Hey, Sign Up !</h2>
            <p>
              Start your career journey with the best opportunities with us.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="body">
            {responseMessage && (
              <div className={classNameMsg}>{responseMessage}</div>
            )}
            <div className="input-div">
              <div className="containers">
                <div className="container-48">
                  <div className="input-div">
                    <input
                      type="text"
                      className="input-form"
                      autoComplete="none"
                      placeholder=" "
                      {...register("prename")}
                    />
                    <label htmlFor="prename" className="label-form">
                      Prename
                    </label>
                    {errors.prename && (
                      <span className="fade-in">{errors.prename.message}</span>
                    )}
                  </div>
                </div>
                <div className="container-48">
                  <div className="input-div">
                    <input
                      type="text"
                      className="input-form"
                      autoComplete="none"
                      placeholder=" "
                      {...register("name")}
                    />
                    <label htmlFor="name" className="label-form">
                      Name
                    </label>
                    {errors.name && (
                      <span className="fade-in">{errors.name.message}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="width input-div">
                <input
                  type="text"
                  name="username"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  {...register("username")}
                />
                <label htmlFor="username" className="label-form">
                  Username
                </label>
                {errors.username && (
                  <span className="fade-in">{errors.username.message}</span>
                )}
              </div>
              <div className="width input-div">
                <input
                  type={showPwd ? "text" : "password"}
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  {...register("password")}
                />
                <label htmlFor="password" className="label-form">
                  Password
                </label>
                <label htmlFor="password" className="label-icon">
                  {showPwd ? (
                    <BsEye
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPwd(!showPwd)}
                    />
                  ) : (
                    <BsEyeSlash
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPwd(!showPwd)}
                    />
                  )}
                </label>
                {errors.password && (
                  <span className="fade-in">{errors.password.message}</span>
                )}
              </div>
              <div className="width input-div">
                <input
                  type={showPwd ? "text" : "password"}
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  {...register("confirm_password")}
                />
                <label htmlFor="confirm_password" className="label-form">
                  Confirm password
                </label>
                <label htmlFor="confirm_password" className="label-icon">
                  {showPwd ? (
                    <BsEye
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPwd(!showPwd)}
                    />
                  ) : (
                    <BsEyeSlash
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPwd(!showPwd)}
                    />
                  )}
                </label>
                {errors.confirm_password && (
                  <span className="fade-in">
                    {errors.confirm_password.message}
                  </span>
                )}
              </div>
              <div className="width">
                <div className="input-div display-flex justify-content-flex-start align-items-center">
                  <input type="checkbox" name="gcu" {...register("gcu")} />
                  <label htmlFor="gcu" style={{ fontSize: "0.9rem" }}>
                    Agree
                    <Link
                      to=""
                      style={{ textDecoration: "none", marginLeft: "0.5rem" }}
                    >
                      Term
                    </Link>
                    <Link
                      to=""
                      style={{ textDecoration: "none", marginLeft: "0.3rem" }}
                    >
                      Privacy
                    </Link>
                  </label>
                </div>
                {errors.gcu && (
                  <span className="fade-in">{errors.gcu.message}</span>
                )}
              </div>
            </div>
            <div className="width">
              <button
                type="submit"
                className={isSending ? "width button" : "width button normal"}
              >
                {isSending ? "Sing Up..." : "Sign Up"}
              </button>
            </div>
            <div className="get_sign-in">
              <span>Do you have account already ?</span>
              <Link to="/login" className="btn-sign-in link">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </HelmetProvider>
  );
};
export default Register;
