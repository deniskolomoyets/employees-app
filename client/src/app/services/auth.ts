import { User } from "@prisma/client";
import { api } from "./api";

export type UserData = Omit<User, "id">; // for deleting the id field
type ResponseLoginData = User & { token: string }; // for defining the response data

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: "/user/login",
        method: "POST",
        body: userData,
      }), // for making a POST request to the /user/login endpoint
    }),
    register: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }), // for making a POST request to the /user/register endpoint
    }),
    current: builder.query<ResponseLoginData, void>({
      query: () => ({
        url: "/user/current",
        method: "GET",
      }), // for making a GET request to the /user/current endpoint
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useCurrentQuery } =
  authApi; // hooks for using the endpoints

export const {
  endpoints: { login, register, current },
} = authApi;
