import * as yup from "yup"

export const titleValidateSchema = yup.object().shape({
  title: yup.string().max(20),
})