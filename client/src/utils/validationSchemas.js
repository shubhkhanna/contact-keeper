import * as yup from "yup";

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Please enter your email!"),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
      "Password should be combination of one uppercase , one lowercase, one special char, one digit and min 6 char long!"
    )
    .required("Please enter your password!"),
});

export const signupSchema = yup.object().shape({
  name: yup.string().required("Please enter your name!"),
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Please enter your email!"),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
      "Password should be combination of one uppercase , one lowercase, one special char, one digit and min 6 char long!"
    )
    .required("Please enter your password!"),
});
