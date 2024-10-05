import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }); // for making requests to the server

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 4 }); // for retrying failed requests

export const api = createApi({
  reducerPath: "splitApi", // for storing the data in the Redux store
  baseQuery: baseQueryWithRetry, // for making requests to the server
  refetchOnMountOrArgChange: true, // for refetching the data when the component mounts or the arguments change
  endpoints: () => ({}), // for defining the endpoints
});
