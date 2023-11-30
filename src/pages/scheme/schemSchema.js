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
    .email("Invalid email format")
    .required("Email is required"),
  attachmentLink: Yup.string()
    .transform((value) => value.trim())
    .required("Attachment Link is required"),
  websitesLink: Yup.string()
    .transform((value) => value.trim())
    .required("Websites Link is required"),
  state: Yup.mixed().required("State is required"),
  percentofDisability: Yup.number()
    .required("% of Disability is required")
    .integer("Min Age must be an integer")
    .min(40, "% of Disability must be greater than or equal to 40%")
    .max(100, "% of Disability must be less than or equal to 100%"),
  disabilities: Yup.string()
    .transform((value) => value.trim())
    .required("Disabilities is required"),
  annualIncome: Yup.number().required("Annual Income is required"),
  minAge: Yup.number()
    .required("Min Age is required")
    .integer("Min Age must be an integer")
    .min(0, "Min Age must be greater than or equal to 0"),

  maxAge: Yup.number()
    .required("Max Age is required")
    .integer("Max Age must be an integer")
    .min(Yup.ref("minAge"), "Max Age must be greater than or equal to Min Age"),
});
