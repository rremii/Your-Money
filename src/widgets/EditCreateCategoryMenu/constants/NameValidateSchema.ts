import * as yup from "yup"

export const nameValidateSchema = yup
  .object()
  .shape({
    name: yup.string().required("field is required")
  })
  .required()