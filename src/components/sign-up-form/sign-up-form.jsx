import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up.styles.scss";
// prettier-ignore
import { createAuthUserWithEmailAndPassword ,createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

// prettier-ignore
const defaultFormFields = {displayName: "",email: "",password: "",confirmPassword: ""};

const SignUpForm = () => {
  //STATE
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  //HANDE CHANGE
  const handleChange = (e) => {
    let { value, name } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  //RESET FORM
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  //HANDLE SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Not Matched Password");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      console.log(user);

      resetFormFields();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Email already in use");
      }
      console.log("Error while creating a user", err.message);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
