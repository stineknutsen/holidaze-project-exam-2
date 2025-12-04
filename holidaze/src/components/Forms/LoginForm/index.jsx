import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApi } from "../../../hooks/useApi";
import FormWrapper from "../FormWrapper";
import FormInput from "../FormInput";
import Button from "../../Button";
import { useNavigate } from "react-router-dom";
import useNotification from "../../../hooks/useNotification";
import { UserContext } from "../../../context/UserContext";
import { loginSchema } from "../../../schemas/loginSchema";

export default function LoginForm() {
  const { request, isLoading, isError } = useApi();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { login } = useContext(UserContext);

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

      const { accessToken, name } = response;

      const profile = await request(`/holidaze/profiles/${name}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-NOROFF-API-KEY": import.meta.env.VITE_API_KEY,
        },
      });

      login(profile, accessToken);

      showNotification(
        "success",
        `You are logged in! Welcome back, ${profile.name}!`
      );
      navigate(`/profile`);
    } catch (error) {
      showNotification("error", error.message || "Registration failed");

      console.error(error);
    }
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Log in</h1>
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

        <Button $variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </FormWrapper>
  );
}
