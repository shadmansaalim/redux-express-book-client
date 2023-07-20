import { useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import {
  createUser,
  setLoading,
  setUser,
} from "../redux/features/users/userSlice";
import swal from "sweetalert";

const Signup = () => {
  const [signUpData, setSignUpData] = useState<any>({});

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    const value = e.target.value;
    const newSignUpData: any = { ...signUpData };
    newSignUpData[field] = value;
    setSignUpData(newSignUpData);
  };

  const handleSignUpSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Signup

    try {
      dispatch(setLoading(true));

      dispatch(
        createUser({ email: signUpData.email, password: signUpData.password })
      );

      swal("dewd", "", "success");
      dispatch(setLoading(false));
      navigate("/");

      e.target.reset();
    } catch (error: any) {
      console.log("FAILED ", error);
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="bg">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center vh-100">
          {/* <div className="col-md-8 col-lg-5 col-xl-8 mx-auto mb-4 mb-lg-0">
                </div> */}
          <div className="col-11 col-md-8 col-lg-7 col-xl-4 shadow-lg p-3 p-md-5 rounded-3 mx-auto mx-xl-0 ms-xl-auto bg-white">
            <h1 className="text-start login-title mb-5 fw-bold">Sign Up</h1>
            <form onSubmit={handleSignUpSubmit}>
              <div className="form-floating mb-3">
                <input
                  onBlur={handleOnBlur}
                  name="email"
                  type="email"
                  className="form-control"
                  id="floatingLoginEmail"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingSignUpEmail">Email Address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onBlur={handleOnBlur}
                  name="password"
                  type="password"
                  className="form-control"
                  id="floatingSignUpPassword1"
                  placeholder="Password"
                />
                <label htmlFor="floatingSignUpPassword">Password</label>
              </div>

              <div className="text-center  mt-4 pt-2">
                <button className="btn btn-success w-100" type="submit">
                  Sign Up <FontAwesomeIcon icon={faSignInAlt} />
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    type="button"
                    onClick={() => {
                      navigate("/login");
                      window.location.reload();
                    }}
                    className="link-danger"
                  >
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
