import { Row, Container } from "react-bootstrap";
import Book from "../components/Book";
import { useGetAllBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/globalTypes";
import Loading from "../components/Loading";
import Header from "../layouts/Header/Header";
import Footer from "../layouts/Footer/Footer";
import { useState } from "react";

export default function AllBooks() {
  const [bookSearch, setBookSearch] = useState("");

  const { data, isLoading } = useGetAllBooksQuery({
    search: bookSearch,
  });

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="py-5">
          <Container className="my-5">
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
              {data?.books.map((book: IBook) => (
                <Book key={book._id} book={book} />
              ))}
            </Row>
          </Container>
        </div>
      )}
      <Footer />
    </>
  );
}
