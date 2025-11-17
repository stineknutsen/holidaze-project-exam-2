import FormWrapper from "../FormWrapper";
import FormSelect from "../FormSelect";
import FormInput from "../FormInput";
import Button from "../../Button";

export default function RegisterForm() {
  return (
    <FormWrapper>
      <h1>Register Account</h1>
      <label for="account-type">Select account type</label>
      <FormSelect id="account-type">
        <option value="user">Customer</option>
        <option value="admin">Manager</option>
      </FormSelect>
      <label for="username">Username</label>
      <FormInput id="username" type="text" />
      <label for="email">Email</label>
      <FormInput id="email" type="email" />
      <label for="password">Password</label>
      <FormInput id="password" type="password" />
      <label for="confirm-password">Confirm Password</label>
      <FormInput id="confirm-password" type="password" />
      <Button type="submit">Register</Button>
      <Button type="cancel" variant="secondary">
        Cancel
      </Button>
      <p style={{ textAlign: "center" }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </FormWrapper>
  );
}
