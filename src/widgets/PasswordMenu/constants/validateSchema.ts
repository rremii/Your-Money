import * as yup from "yup"

export const passwordSchema = yup
  .object()
  .shape({
    password: yup.string().required("field is required"),
    confirmPassword: yup.string().required("field is required"),
  })
  .required()