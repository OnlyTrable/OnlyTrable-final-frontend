import * as yup from "yup";

const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; 
const PASSWORD_MIN_LENGTH = 8;

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
    
  fullName: yup
    .string()
    .required("Full Name is required"),
    
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters long")
    .required("Username is required"),
    
  password: yup
    .string()
    .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`) 
    .matches(
      passwordRegexp,
      "Password must contain at least 1 letter and 1 number"
    )
    .required("Password is required"),
});

export const loginSchema = yup.object().shape({
  identifier: yup
    .string()
    .required("Username or email is required"),
    
  password: yup
    .string()
    .required("Password is required"),
});