import React from "react";
import { Col, Card } from "react-bootstrap";
import { IBook } from "../types/globalTypes";
import { useNavigate } from "react-router-dom";

interface BookProps {
  book: IBook;
}

const Book: React.FC<BookProps> = ({ book }) => {
  const { _id, title, genre, author, publicationDate } = book;

  const navigate = useNavigate();

  return (
    <Col>
      <Card className="course">
        <Card.Img
          className="course-img"
          variant="top"
          src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        />
        <Card.Body>
          <Card.Title className="text-start">{title}</Card.Title>
          <Card.Text className="pt-2">
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-bold">Book ID</span>
              <span>{_id}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-bold">Author</span>
              <span>{author}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-bold">Genre</span>
              <span>{genre}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-bold">Publication</span>
              <span>{publicationDate}</span>
            </div>
            <button
              onClick={() => navigate(`/book/${_id}`)}
              className="mt-2 w-100 btn btn-success rounded-pill"
            >
              Book Details
            </button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Book;
