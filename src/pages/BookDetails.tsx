import { useParams } from "react-router-dom";
import Header from "../layouts/Header/Header";
import Footer from "../layouts/Footer/Footer";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLoading, setUser } from "../redux/features/users/userSlice";
import { auth } from "../lib/firebase";
import { Card } from "react-bootstrap";
import {
  useAddBookReviewMutation,
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "../redux/features/books/bookApi";
import swal from "sweetalert";
import { useNavigate } from "react-router";

const BookDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(setLoading(true));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email!));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  const { id } = useParams();

  const [userReview, setUserReview] = useState("");

  const { data, isLoading } = useGetSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const [addBookReview] = useAddBookReviewMutation();

  const handleReviewSubmit = async (e: any) => {
    e.preventDefault();

    const options = {
      id: id,
      data: {
        review: userReview,
      },
    };

    const res: any = await addBookReview(options);

    console.log(res);

    if (res?.data) {
      swal("Review added successfully", "", "success");
    } else {
      swal("Failed to add review", "", "error");
    }
  };

  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteBook = async () => {
    const res: any = await deleteBook(id);

    if (res?.data) {
      swal("Book deleted successfully", "", "success");
      navigate("/all-books");
    } else {
      swal("Failed to delete book", "", "error");
    }
  };

  return (
    <>
      <Header />
      <div className="m-5 p-5 row mx-auto">
        <div className="col-6">
          <Card className="course">
            <Card.Img
              className="course-img"
              variant="top"
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
            />
            <Card.Body>
              <Card.Title className="text-start">
                {data?.book?.title}
              </Card.Title>
              <Card.Text className="pt-2">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">Book ID</span>
                  <span>{data?.book?._id}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">Author</span>
                  <span>{data?.book?.author}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">Genre</span>
                  <span>{data?.book?.genre}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold">Publication</span>
                  <span>{data?.book?.publicationDate}</span>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-6">
          {user.email === data?.book?.email && (
            <div className="mb-3">
              <button onClick={handleDeleteBook} className="btn btn-danger">
                Delete Book
              </button>
            </div>
          )}
          <h4>Write your review</h4>
          <textarea
            onChange={(e) => setUserReview(e.target.value)}
            className="my-2"
            name="review"
            id="review"
            cols="30"
            rows="10"
          ></textarea>
          <button
            onClick={handleReviewSubmit}
            className="mt-2 w-100 btn btn-success rounded-pill"
          >
            Submit Review
          </button>
          <div className="mt-4">
            <h3>Reviews</h3>
            <ul>
              {data?.book?.reviews?.map((review: string) => (
                <li>{review}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookDetails;
