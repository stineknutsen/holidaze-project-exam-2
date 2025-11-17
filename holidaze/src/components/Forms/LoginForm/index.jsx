import FormWrapper from "../FormWrapper";
import FormInput from "../FormInput";
import Button from "../../Button";

export default function LoginForm() {
  return (
    <FormWrapper>
      <h1>Log in</h1>
      <label for="email">Email</label>
      <FormInput id="email" type="email" />
      <label for="password">Password</label>
      <FormInput id="password" type="password" />
      <Button type="submit">Log in</Button>
      <Button type="cancel" variant="secondary">
        Cancel
      </Button>
      <p style={{ textAlign: "center" }}>
        Don't have an account yet? <a href="/register">Register</a>
      </p>
    </FormWrapper>
  );
}
