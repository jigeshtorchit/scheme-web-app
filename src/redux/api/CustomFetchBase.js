import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseUrl = process.env.REACT_APP_BASE_URL;
// Create a new mutex
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}`,
  prepareHeaders: (headers) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      console.log('====================================');
      console.log(token);
      console.log('====================================');
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    } catch (error) {
      console.error("Error parsing token from localStorage:", error);
    }
    return headers;
  },
});
const CustomFetchBase = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  // wait until the mutex is available without locking it
  // await mutex.waitForUnlock();
  // result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    toast.warning("UnAuthorized", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    <ToastContainer />;
    localStorage.clear();
    window.location.href = "/auth/login";
  }
  return result;
};
export default CustomFetchBase;
