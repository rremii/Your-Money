import * as yup from "yup"

export const infoFormSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .max(20, "Max name length is 20 digits")
      .required("Name is required"),
  })
  .required()

export const passwordFormSchema = yup
  .object()
  .shape({
    password: yup.string().required("field is required"),
    confirmPassword: yup.string().required("field is required")
  })
  .required()

export const emailFormSchema = yup
  .object()
  .shape({
    email: yup.string().email().required("Email is required")
  })
  .required()

export const codeFormSchema = yup
  .object()
  .shape({
    code: yup.string().length(6).required()
  })
  .required()