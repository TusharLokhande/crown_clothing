import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in.styles.scss";
// prettier-ignore
import { signInAuthUserWithEmailAndPassword,signInWithGooglePopup ,createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

// prettier-ignore
const defaultFormFields = {email: "",password: ""};

const SignInForm = () => {
  //STATE
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  //HANDE CHANGE
  const handleChange = (e) => {
    let { value, name } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  console.log(formFields);

  //RESET FORM
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  //HANDLE SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      console.log(response);
      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("Incorrect Password For this Email");
          break;

        case "auth/user-not-found":
          alert("no user assoicated with this account");
          break;
        default:
          console.log(err.message);
          break;
      }
    }
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign IN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
