import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./ResetPage.module.css";
import Input from "../../components/Input/Input.jsx";
import Button from '../../components/Button/Button.jsx';
import LockIcon from "../../assets/icons/trouble.svg"; 

const schema = yup.object().shape({
  identifier: yup
    .string()
    .required("Email, phone, or username is required"),
});

const ResetPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Reset password requested:", data);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <img src={LockIcon} alt="Lock icon" className={styles.lockIcon} />
        
        <h3 className={styles.title}>
          Trouble logging in?
        </h3>

        <p className={styles.description}>
          Enter your email, phone, or username and we'll send you a link to get back into your account.
        </p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("identifier")}
            type="text"
            error={errors.identifier?.message}
            placeholder="Email or Username"
          />
          
          <Button 
            text="Reset your password"
            type="submit" 
          />
        </form>

        {/* OR divider */}
        <div className={styles.divider}>
          <div className={styles.line}></div>
          <span className={styles.orText}>OR</span>
          <div className={styles.line}></div>
        </div>

        {/* Create new account link */}
        <a href="/registration" className={styles.createAccountLink}>
          Create new account
        </a>
      </div>

      {/* Back to login button (separate container) */}
      <div className={styles.backToLoginContainer}>
        <a href="/" className={styles.backToLoginLink}>
          Back to login
        </a>
      </div>
    </div>
  );
};

export default ResetPage;