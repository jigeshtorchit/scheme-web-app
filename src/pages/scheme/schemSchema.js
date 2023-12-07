import * as Yup from "yup";

export const schemSchema = Yup.object().shape({
  ni: Yup.string()
    .transform((value) => value.trim())
    .required("respective NI is required"),
  pwds: Yup.string()
    .transform((value) => value.trim())
    .required("Scheme for PwDs is required"),
  schemes: Yup.string()
    .transform((value) => value.trim())
    .required("Schemes is required"),
  eligible: Yup.string()
    .transform((value) => value.trim())
    .required("Eligible is required"),
  email: Yup.string()
    .transform((value) => value.trim())
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  attachmentLink: Yup.string()
    .transform((value) => value.trim())
    .required("Attachment Link is required"),
  websitesLink: Yup.string()
    .transform((value) => value.trim())
    .required("Websites Link is required"),
  state: Yup.mixed().required("State is required"),
  percentofDisability: Yup.number()
    .required("Disability Percentage is required")
    .integer("Min Age must be an integer")
    .min(40, "Disability Percentage must be greater than or equal to 40%")
    .max(100, "Disability Percentage must be less than or equal to 100%"),
  disabilities: Yup.string()
    .transform((value) => value.trim())
    .required("Disabilities is required"),
  annualIncome: Yup.number().required("Annual Income is required"),
 
  Age:Yup.mixed().required(" Age must be required..!")
    })