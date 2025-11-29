import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/auth.yup";
import styles from "./LoginPage.module.css";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import logo from "../../assets/icons/logo.svg";
import phoneImages from "../../assets/images/ichgram.png";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("Login submitted:", data);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.imageContainer}>
        <img
          src={phoneImages}
          alt="Mobile phones displaying a social media feed"
          className={styles.phoneImages}
        />
      </div>

      <div className={styles.rightColumn}>
        {/* Основний контейнер форми */}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <img src={logo} alt="ICHGRAM logo" className={styles.logo} />

          <Input
            {...register("identifier")}
            type="text"
            error={errors.identifier?.message}
            placeholder="Username, or email"
          />
          <Input
            {...register("password")}
            type="password"
            error={errors.password?.message}
            placeholder="Password"
          />

          <Button text="Log In" type="submit" />

          {/* OR divider */}
          <div className={styles.divider}>
            <div className={styles.line}></div>
            <span className={styles.orText}>OR</span>
            <div className={styles.line}></div>
          </div>

          {/* Forgot password link */}
          <a href="/reset" className={styles.forgotPasswordLink}>
            Forgot password?
          </a>
        </form>

        {/* Контейнер "Don't have an account? Sign up" */}
        <div className={styles.signUpContainer}>
          <p className={styles.signUpText}>
            Don't have an account? &nbsp;
            <a href="/registration" className={styles.signUpLink}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
