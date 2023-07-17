import { Row, Container } from "react-bootstrap";
import { Col, Card } from "react-bootstrap";
import { useGetAllBooksQuery } from "../redux/features/books/bookApi";

export default function Home() {
  const { data, isLoading, error } = useGetAllBooksQuery(undefined);
  console.log(data);

  return (
    <div className="py-5">
      <Container className="my-5">
        <Row xs={1} md={2} lg={3} className="g-4 mx-auto">
          <Col>
            <Card className="course">
              <Card.Img
                className="course-img"
                variant="top"
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
              />
              <Card.Body>
                <Card.Title className="text-start">
                  Rich Dad Poor Dad
                </Card.Title>
                <Card.Text className="pt-2">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold">Book ID</span>
                    <span>1234</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold">Author</span>
                    <span>Robert Keyosak</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold">Genre</span>
                    <span>Finance</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold">Publication</span>
                    <span>16/03/2019</span>
                  </div>
                  <button className="w-100 btn btn-success rounded-pill">
                    Add Book
                  </button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
