import * as yup from "yup";

export const venueSchema = yup.object({
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
