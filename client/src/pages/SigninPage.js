import AuthCard from "../components/Cards/AuthCard";
import { Icons, InitialValues, Strings } from "../utils/globals";
import { signinSchema } from "../utils/validationSchemas";

const SigninPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-indigo-50 w-screen p-5">
      {Icons.appIcon}

      <AuthCard
        authType={Strings.signin}
        title={Strings.signinTitle}
        subtitle={Strings.signinSubtitle}
        buttonText={Strings.signin}
        initialValues={InitialValues.signin}
        validationSchema={signinSchema}
      />
    </div>
  );
};

export default SigninPage;
