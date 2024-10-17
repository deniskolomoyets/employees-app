import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  prepareHeaders(headers, { getState }) {
    const token =
      (getState() as RootState).auth.user?.token ||
      localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  }, // for setting the token in the request headers
}); // for making requests to the server

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 }); // for retrying failed requests

export const api = createApi({
  reducerPath: "splitApi", // for storing the data in the Redux store
  baseQuery: baseQueryWithRetry, // for making requests to the server
  refetchOnMountOrArgChange: true, // for refetching the data when the component mounts or the arguments change
  endpoints: () => ({}), // for defining the endpoints
});
