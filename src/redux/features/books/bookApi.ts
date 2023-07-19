import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: ({ search, genre, publicationYear, recent }) => ({
        url: "/all-books",
        params: { search, genre, publicationYear, recent },
      }),
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: `/books/add-book`,
        method: "POST",
        body: data,
      }),
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
} = bookApi;
