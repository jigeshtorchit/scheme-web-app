import * as Yup from "yup";
export const FilterSchema = Yup.object().shape({
    
    Age:Yup.mixed().required(" Enter your Age..!"),
    additionalFilter:Yup.mixed().required("Must enter Filed"),
    gender: Yup.mixed().required("Gender must be required..!"),
    disabilities:Yup.mixed().required(" Please Enter Disabilities..!"),
    state:Yup.mixed().required(" State must be required..!"),
});