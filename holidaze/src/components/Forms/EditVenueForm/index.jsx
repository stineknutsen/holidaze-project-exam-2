import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../Button";
import React from "react";
import { venueSchema } from "../../../schemas/venueSchema";
import FormInput from "../FormInput";

const EditVenueForm = ({
  onSubmit,
  onCancel,
  onDelete,
  venueData,
  isSubmitting,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: venueData,
    resolver: yupResolver(venueSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Venue</h2>

      <label>Name</label>
      <FormInput {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <label>Description</label>
      <FormInput {...register("description")} />
      {errors.description && <p>{errors.description.message}</p>}

      <label>Price</label>
      <FormInput type="number" {...register("price")} />
      {errors.price && <p>{errors.price.message}</p>}

      <label>Max Guests</label>
      <FormInput type="number" {...register("maxGuests")} />
      {errors.maxGuests && <p>{errors.maxGuests.message}</p>}

      <h3>Images</h3>
      {fields.map((field, index) => (
        <div key={field.id}>
          <label>Image URL</label>
          <FormInput {...register(`media.${index}.url`)} />
          {errors.media?.[index]?.url && (
            <p>{errors.media[index].url.message}</p>
          )}

          <label>Alt Text</label>
          <FormInput {...register(`media.${index}.alt`)} />
          {errors.media?.[index]?.alt && (
            <p>{errors.media[index].alt.message}</p>
          )}

          {index > 0 && (
            <Button
              type="button"
              $variant="secondary"
              onClick={() => remove(index)}
            >
              Remove Image
            </Button>
          )}
        </div>
      ))}

      <Button
        type="button"
        $variant="secondary"
        onClick={() => append({ url: "", alt: "" })}
      >
        + Add another image
      </Button>

      <h3>Amenities</h3>

      <label>
        <input type="checkbox" {...register("meta.wifi")} />
        Wifi
      </label>

      <label>
        <input type="checkbox" {...register("meta.parking")} />
        Parking
      </label>

      <label>
        <input type="checkbox" {...register("meta.breakfast")} />
        Breakfast
      </label>

      <label>
        <input type="checkbox" {...register("meta.pets")} />
        Pets allowed
      </label>

      <h3>Location</h3>

      <label>Address</label>
      <FormInput {...register("location.address")} />

      <label>City</label>
      <FormInput {...register("location.city")} />

      <label>ZIP</label>
      <FormInput {...register("location.zip")} />

      <label>Country</label>
      <FormInput {...register("location.country")} />

      <label>Continent</label>
      <FormInput {...register("location.continent")} />

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <Button $variant="primary" type="submit" disabled={isSubmitting}>
          Save venue
        </Button>

        <Button $variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>

        <Button
          $variant="danger"
          type="button"
          onClick={onDelete}
          disabled={isSubmitting}
        >
          Delete venue
        </Button>
      </div>
    </form>
  );
};

export default EditVenueForm;
