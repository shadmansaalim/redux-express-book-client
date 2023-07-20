import { Row, Container } from "react-bootstrap";
import Book from "../components/Book";
import { useGetAllBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/globalTypes";
import Loading from "../components/Loading";

export default function Home() {
  const { data, isLoading } = useGetAllBooksQuery({
    recent: true,
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="py-5">
          <Container className="my-5">
            <Row xs={1} md={2} lg={3} className="g-4 mx-auto">
              {data?.books.map((book: IBook) => (
                <Book key={book._id} book={book} />
              ))}
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}
