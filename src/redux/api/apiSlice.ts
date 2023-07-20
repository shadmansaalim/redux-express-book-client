import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://redux-express-book-server.vercel.app/",
  }),
  tagTypes: ["reviews", "editBook"],
  endpoints: (builder) => ({}),
});
