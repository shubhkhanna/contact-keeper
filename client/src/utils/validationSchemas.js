import * as yup from "yup";
import { Strings, ValidationPatterns } from "./globals";

export const signinSchema = yup.object().shape({
  email: yup.string().email(Strings.emailError).required(Strings.emailRequired),
  password: yup
    .string()
    .matches(ValidationPatterns.password, Strings.passwordError)
    .required(Strings.passwordRequired),
});

export const signupSchema = yup.object().shape({
  name: yup.string().required(Strings.nameError),
  email: yup.string().email(Strings.emailError).required(Strings.emailRequired),
  password: yup
    .string()
    .matches(ValidationPatterns.password, Strings.passwordError)
    .required(Strings.passwordRequired),
});
