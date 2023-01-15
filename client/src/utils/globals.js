import { FcContacts } from "react-icons/fc";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";

export const Strings = {
  signin: "Sign In",
  signup: "Sign Up",
  namePlaceholder: "Enter your name",
  emailPlaceholder: "Enter your email",
  passwordPlaceholder: "Enter your password",
  nameError: "Please enter your name!",
  emailError: "Please enter a valid email!",
  emailRequired: "Please enter your email!",
  passwordError:
    "Password should be combination of one uppercase , one lowercase, one special char, one digit and min 6 char long!",
  passwordRequired: "Please enter your password!",
  signinTitle: "Welcome Back",
  signinSubtitle: "Enter your credentials to access your account.",
  signupTitle: "Create an account",
  signupSubtitle:
    "Hello, I guess you are new around here. You can start using the application after sign up.",
  signupRedirect: "Already have an account?",
  signinRedirect: "Don't have an account?",
};

export const ValidationPatterns = {
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
};

export const InitialValues = {
  signin: { email: "", password: "" },
  signup: { name: "", email: "", password: "" },
};

export const Icons = {
  name: <MdPerson size={20} className="text-blue-600" />,
  email: <MdEmail size={20} className="text-blue-600" />,
  password: <MdLock size={20} className="text-blue-600" />,
  appIcon: <FcContacts size={50} />,
};
