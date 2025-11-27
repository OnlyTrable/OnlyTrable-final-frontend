import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./RegistrationPage.module.css";
import Input from "../../components/Input/Input.jsx";
import Button from '../../components/Button/Button.jsx';
import logo from "../../assets/icons/logo.svg";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  fullName: yup.string().required("Full Name is required"),
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* handleSubmit з react-hook-form огортає функцію onSubmit */}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h3 className={styles.subtitle}>
          Sign up to see photos and videos from your friends.
        </h3>

        <Input
          {...register("email")}
          type="email"
          error={errors.email?.message}
          placeholder="Email"
        />
        <Input
          {...register("fullName")}
          error={errors.fullName?.message}
          placeholder="Full Name"
        />
        <Input
          {...register("username")}
          error={errors.username?.message}
          placeholder="Username"
        />
        <Input
          {...register("password")}
          type="password"
          error={errors.password?.message}
          placeholder="Password"
        />
        
        {/* Блок strings1 */}
        <div className={styles.strings1}>
          <p className={styles.parag}>
            People who use our service may have uploaded
          </p>
          <div className={styles.contactRow}>
            <p className={styles.contactParag}>
              your contact information to Ichgram.
            </p>
            <a className={styles.learnMore} href="#">
              Learn More
            </a>
          </div>
        </div>

        {/* Блок strings2 - прибрано &nbsp;, пробіли контролюються CSS */}
        <div className={styles.strings2}>
          <p className={styles.parag}>
            By signing up, you agree to our 
            <wbr />
            <a className={styles.learnMore} href="#">
              Terms,
            </a>
            <a className={styles.learnMore} href="#">
              Privacy
              <wbr /> Policy
            </a>
            <span className={styles.and}>and</span>
            <a className={styles.learnMore} href="#">
              Cookies Policy.
            </a>
          </p>
        </div>
        <Button 
          text="Sign Up"
          // Передаємо type="submit"
          type="submit" 
        />
      </form>
      {/* strings3 - блок "Have an account? Log in" */}
      <div className={styles.strings3}>
        <div className={styles.contactRow}>
            <p className={styles.contactParag}>
              Have an account?
            </p>
            &nbsp;
            <a className={styles.learnMore} href="/">
              Log in
            </a>
          </div>
      </div>
    </div>
  );
};

export default RegistrationPage;