import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useApi } from "../../../hooks/useApi";
import FormWrapper from "../FormWrapper";
import FormInput from "../FormInput";
import Button from "../../Button";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginForm() {
  const { request, isLoading, isError } = useApi();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await request("/auth/login", {
        method: "POST",
        body: data,
      });

      const { accessToken, name, email } = response;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      alert("Login successful!");
      navigate(`/profile`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email
          <FormInput type="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </label>

        <label>
          Password
          <FormInput type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </label>

        {isError && <p style={{ color: "red" }}>{isError}</p>}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </FormWrapper>
  );
}
