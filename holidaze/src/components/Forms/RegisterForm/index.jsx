import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApi } from "../../../hooks/useApi";
import FormWrapper from "../FormWrapper";
import FormSelect from "../FormSelect";
import FormInput from "../FormInput";
import Button from "../../Button";
import useNotification from "../../../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../../../schemas/registerSchema";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const navigate = useNavigate();

  const { request, loading, error } = useApi();
  const { showNotification } = useNotification();

  const selectedType = watch("accountType");

  const onSubmit = async (data) => {
    const body = {
      name: data.name,
      email: data.email,
      password: data.password,
      venueManager: data.accountType === "Manager",
    };

    try {
      await request("/auth/register", {
        method: "POST",
        body,
      });
      showNotification("success", "You are registered! Please log in.");
      navigate(`/login`);
    } catch (error) {
      showNotification("error", error.message || "Registration failed");
      console.error(error);
    }
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
        <label>
          Select account type
          <FormSelect {...register("accountType")}>
            <option value="Customer">Customer</option>
            <option value="Manager">Manager</option>
          </FormSelect>
          {errors.accountType && <p>{errors.accountType.message}</p>}
        </label>

        {selectedType === "Manager" && (
          <p style={{ fontSize: "0.9rem" }}>
            As a Venue Manager, you can create and manage venues, view bookings,
            and handle event details.
          </p>
        )}

        {selectedType === "Customer" && (
          <p style={{ fontSize: "0.9rem" }}>
            As a Customer, you can browse and book venues, manage your bookings,
            and leave reviews.
          </p>
        )}

        <label>
          Username
          <FormInput {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </label>

        <label>
          Email
          <FormInput {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </label>

        <label>
          Password
          <FormInput type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </label>

        <label>
          Confirm password
          <FormInput type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </label>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </FormWrapper>
  );
}
