import { createSlice } from "@reduxjs/toolkit";

export interface IBookData {
  bookData: {
    email: string;
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
    reviews: Array<string>;
  };
}

const initialState: IBookData = {
  bookData: {
    email: "",
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    reviews: [],
  },
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    resetBookData: (state) => {
      state.bookData = initialState.bookData;
    },
    setBookData: (state, action) => {
      state.bookData = action.payload;
    },
  },
});

export const { resetBookData, setBookData } = bookSlice.actions;

export default bookSlice.reducer;
