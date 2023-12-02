import * as Yup from "yup";
export const FilterSchema = Yup.object().shape({
    minAge:Yup.number().required("  Enter your MinAge..!"),
    maxAge:Yup.number().required(" Enter your MaxAge..!"),
    additionalFilter:Yup.mixed().required("Must enter Filed"),
    gender: Yup.mixed().required("Gender must be required..!"),
    disabilities:Yup.mixed().required(" Please Enter Disabilities..!"),
    state:Yup.mixed().required(" State must be required..!"),
});