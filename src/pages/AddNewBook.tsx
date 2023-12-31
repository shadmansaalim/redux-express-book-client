import Header from "../layouts/Header/Header";
import Footer from "../layouts/Footer/Footer";
import { ChangeEvent, FormEvent } from "react";
import { useAddBookMutation } from "../redux/features/books/bookApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  IBookData,
  resetBookData,
  setBookData,
} from "../redux/features/books/bookSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setLoading, setUser } from "../redux/features/users/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import swal from "sweetalert";

export default function AddNewBook() {
  const { bookData }: IBookData = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();

  const [addBook] = useAddBookMutation();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newBookData: any = { ...bookData };
    newBookData[e.target.name] = e.target.value;
    console.log(newBookData);
    dispatch(setBookData(newBookData));
  };

  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.users);

  const handleBookSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newBookData: any = { ...bookData };
    newBookData.reviews = [];
    dispatch(setBookData(newBookData));

    const res: any = await addBook({ ...bookData, email: user.email });

    console.log(res);

    if (res?.data) {
      swal("Book added successfully", "", "success");
      resetBookData();
      navigate("/all-books");
    } else {
      swal("Failed to add book", "", "error");
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));

    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        dispatch(setUser(user.email!));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="col-6 mx-auto my-5 shadow rounded-3 p-5">
        <form onSubmit={handleBookSubmit}>
          <h3>Add New Book</h3>
          <div className="mt-4 mb-3">
            <label htmlFor="title" className="form-label">
              Book Title
            </label>
            <input
              name="title"
              onChange={handleOnChange}
              type="text"
              className="form-control"
              id="title"
              aria-describedby="title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Book Author
            </label>
            <input
              name="author"
              onChange={handleOnChange}
              type="text"
              className="form-control"
              id="author"
              aria-describedby="author"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="genre" className="form-label">
              Book Genre
            </label>
            <input
              name="genre"
              onChange={handleOnChange}
              type="text"
              className="form-control"
              id="genre"
              aria-describedby="genre"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="publicationDate" className="form-label">
              Book Publication Date
            </label>
            <input
              name="publicationDate"
              onChange={handleOnChange}
              type="text"
              className="form-control"
              id="publicationDate"
              aria-describedby="publicationDate"
              placeholder="DD/MM/YY"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
