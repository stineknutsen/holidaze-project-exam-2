import * as yup from "yup";

export const registerSchema = yup.object({
  accountType: yup
    .string()
    .oneOf(["Customer", "Manager"], "Please select an account type")
    .required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});
