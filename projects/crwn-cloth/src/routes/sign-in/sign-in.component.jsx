import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopUp,
} from "../../utils/firebase/firebase.utils.js";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In page</h1>
      <button onClick={logGoogleUser}>Sign in with google popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
