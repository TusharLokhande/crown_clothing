import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../../components/button/button.component";

import SignUpForm from "../../components/sign-up-form/sign-up-form";

const SignIn = () => {
  const logGoogleUserPopup = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(userDocRef);
  };

  return (
    <div>
      <h1>Sign in</h1>
      <button onClick={logGoogleUserPopup}>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;

/*
  As we  redirecting to the google signIn page, app unmounted itself.
  we can useEffect for this.
*/
