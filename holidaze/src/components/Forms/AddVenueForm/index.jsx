import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../Button";

export const addVenueSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .min(1, "Price must be at least 1")
    .required("Price is required"),
  maxGuests: yup
    .number()
    .typeError("Max guests must be a number")
    .min(1, "Must have at least 1 guest")
    .required("Max guests is required"),

  media: yup
    .array()
    .of(
      yup.object({
        url: yup
          .string()
          .url("Must be a valid URL")
          .required("Image URL is required"),
        alt: yup.string().required("Image alt text is required"),
      })
    )
    .optional(),

  meta: yup
    .object({
      wifi: yup.boolean().optional(),
      parking: yup.boolean().optional(),
      breakfast: yup.boolean().optional(),
      pets: yup.boolean().optional(),
    })
    .optional(),

  location: yup
    .object({
      address: yup.string().nullable(),
      city: yup.string().nullable(),
      zip: yup.string().nullable(),
      country: yup.string().nullable(),
      continent: yup.string().nullable(),
    })
    .optional(),
});

const AddVenueForm = ({ onSubmit, onCancel }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addVenueSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      maxGuests: "",
      media: [{ url: "", alt: "" }],
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        address: "",
        city: "",
        zip: "",
        country: "",
        continent: "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add New Venue</h2>

      <label>Name</label>
      <input {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <label>Description</label>
      <textarea {...register("description")} />
      {errors.description && <p>{errors.description.message}</p>}

      <label>Price</label>
      <input type="number" {...register("price")} />
      {errors.price && <p>{errors.price.message}</p>}

      <label>Max Guests</label>
      <input type="number" {...register("maxGuests")} />
      {errors.maxGuests && <p>{errors.maxGuests.message}</p>}

      <h3>Images</h3>
      {fields.map((field, index) => (
        <div key={field.id}>
          <label>Image URL</label>
          <input {...register(`media.${index}.url`)} />
          {errors.media?.[index]?.url && (
            <p>{errors.media[index].url.message}</p>
          )}

          <label>Alt Text</label>
          <input {...register(`media.${index}.alt`)} />
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
      <input {...register("location.address")} />

      <label>City</label>
      <input {...register("location.city")} />

      <label>ZIP</label>
      <input {...register("location.zip")} />

      <label>Country</label>
      <input {...register("location.country")} />

      <label>Continent</label>
      <input {...register("location.continent")} />

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <Button $variant="primary" type="submit">
          Save venue
        </Button>

        <Button $variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddVenueForm;
