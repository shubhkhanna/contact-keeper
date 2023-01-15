import AuthCard from "../components/Cards/AuthCard";
import { Icons, InitialValues, Strings } from "../utils/globals";
import { signupSchema } from "../utils/validationSchemas";

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-indigo-50 w-screen p-5">
      {Icons.appIcon}

      <AuthCard
        authType={Strings.signup}
        title={Strings.signupTitle}
        subtitle={Strings.signupSubtitle}
        buttonText={Strings.signup}
        initialValues={InitialValues.signup}
        validationSchema={signupSchema}
      />
    </div>
  );
};

export default SignupPage;
