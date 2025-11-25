import * as yup from "yup";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../FormInput";
import Button from "../../Button";

const editProfileSchema = yup.object().shape({
  bio: yup.string(),
  avatar: yup.object().shape({
    url: yup.string().url("Invalid URL").required("Avatar URL is required"),
    alt: yup.string().required("Avatar alt text is required"),
  }),
  banner: yup.object().shape({
    url: yup.string().url("Invalid URL").required("Banner URL is required"),
    alt: yup.string().required("Banner alt text is required"),
  }),
  venueManager: yup.boolean(),
});

const EditProfileForm = ({ profile, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: profile,
    resolver: yupResolver(editProfileSchema),
  });

  const avatarUrl = watch("avatar.url");
  const bannerUrl = watch("banner.url");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Edit Profile</h1>

      <div>
        <label>Bio</label>
        <FormInput {...register("bio")} />
        {errors.bio && <p>{errors.bio.message}</p>}
      </div>

      <div>
        <label>Avatar URL</label>
        <FormInput {...register("avatar.url")} />
        {errors.avatar?.url && <p>{errors.avatar.url.message}</p>}

        <label>Avatar Alt</label>
        <FormInput {...register("avatar.alt")} />
        {errors.avatar?.alt && <p>{errors.avatar.alt.message}</p>}

        {avatarUrl && (
          <div>
            <p>Preview:</p>
            <img
              src={avatarUrl}
              alt={watch("avatar.alt")}
              style={{ width: 100, height: 100, objectFit: "cover" }}
            />
          </div>
        )}
      </div>

      <div>
        <label>Banner URL</label>
        <FormInput {...register("banner.url")} />
        {errors.banner?.url && <p>{errors.banner.url.message}</p>}

        <label>Banner Alt</label>
        <FormInput {...register("banner.alt")} />
        {errors.banner?.alt && <p>{errors.banner.alt.message}</p>}

        {bannerUrl && (
          <div>
            <p>Preview:</p>
            <img
              src={bannerUrl}
              alt={watch("banner.alt")}
              style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
            />
          </div>
        )}
      </div>

      <Button $variant="primary" type="submit">
        Save
      </Button>
    </form>
  );
};

export default EditProfileForm;
