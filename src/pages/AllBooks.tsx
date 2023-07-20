import { Row, Container } from "react-bootstrap";
import Book from "../components/Book";
import { useGetAllBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/globalTypes";
import Loading from "../components/Loading";
import Header from "../layouts/Header/Header";
import Footer from "../layouts/Footer/Footer";
import { useState, useEffect } from "react";
import { Constants } from "../lib/constants";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLoading, setUser } from "../redux/features/users/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function AllBooks() {
  const [bookSearch, setBookSearch] = useState("");
  const [pickedGenre, setPickedGenre] = useState("");
  const [pickedPublicationYear, setPickedPublicationYear] = useState("");

  const { data, isLoading } = useGetAllBooksQuery({
    search: bookSearch,
    genre: pickedGenre,
    publicationYear: pickedPublicationYear,
  });

  const { user } = useAppSelector((state) => state.users);
  console.log(user);

  const dispatch = useAppDispatch();

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
      {isLoading ? (
        <Loading />
      ) : (
        <div className="py-5">
          <Container className="my-5 row">
            <div className="col-3 mx-auto">
              <div className="mb-3">Filters</div>
              <div className="bg-white shadow rounded-3 p-2 mb-4">
                <p className="text-secondary">By Genre</p>
                {Constants.genres.map((genre) => (
                  <div className="d-flex align-items-center">
                    <input
                      onChange={() => setPickedGenre(genre)}
                      id={genre}
                      type="radio"
                      name="genre"
                      checked={pickedGenre === genre}
                    />
                    <label className="ms-2" htmlFor={genre}>
                      {genre}
                    </label>
                  </div>
                ))}
              </div>

              <div className="bg-white shadow rounded-3 p-2 mb-2">
                <p className="text-secondary">By Genre</p>
                {Constants.publicationYears.map((year) => (
                  <div className="d-flex align-items-center">
                    <input
                      onChange={() => setPickedPublicationYear(year)}
                      id={year}
                      type="radio"
                      name="publicationYear"
                      checked={pickedPublicationYear === year}
                    />
                    <label className="ms-2" htmlFor={year}>
                      {year}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-9 mx-auto">
              <div className="input-group mb-4 mx-auto">
                <input
                  onChange={(e) => setBookSearch(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Search Book"
                  aria-label="Search Book"
                  aria-describedby="basic-addon2"
                />
              </div>
              <Row xs={1} md={2} lg={3} className="g-4 mx-auto">
                {data?.books.map((book: IBook, index: number) => (
                  <Book key={index} book={book} />
                ))}
              </Row>
            </div>
          </Container>
        </div>
      )}
      <Footer />
    </>
  );
}
