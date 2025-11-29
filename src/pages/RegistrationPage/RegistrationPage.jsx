import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/auth.yup";
import styles from "./RegistrationPage.module.css";
import Input from "../../components/Input/Input.jsx";
import Button from '../../components/Button/Button.jsx';
import logo from "../../assets/icons/logo.svg";

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
  };

  return (
    <div className={styles.pageWrapper}>
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

        <div className={styles.strings2}>
          <p className={styles.parag}>
            By signing up, you agree to our 
            <wbr />
            <a className={styles.learnMore} href="/terms">
              Terms,
            </a>
            <a className={styles.learnMore} href="/privacy">
              Privacy
              <wbr /> Policy
            </a>
            <span className={styles.and}>and</span>
            <a className={styles.learnMore} href="/cookies">
              Cookies Policy.
            </a>
          </p>
        </div>
        <Button 
          text="Sign Up"
          type="submit" 
        />
      </form>
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