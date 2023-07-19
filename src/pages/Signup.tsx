import { useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useSignUpMutation } from "../redux/features/users/userApi";
import { setIsLoading, setUser } from "../redux/features/users/userSlice";
import swal from "sweetalert";
import Cookies from "js-cookie";

const Signup = () => {
  const [signUpData, setSignUpData] = useState<any>({});

  const navigate = useNavigate();

  const { isLoading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const [signUpMutation] = useSignUpMutation();

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
      dispatch(setIsLoading(true));
      const res: any = await signUpMutation(signUpData);

      console.log(res);

      if (res.data) {
        swal("dewd", "", "success");

        Cookies.set("token", res?.data?.token);

        navigate("/");
        setUser(signUpData.email);
      } else {
        swal("cerfer", "", "error");
      }
      dispatch(setIsLoading(false));
      e.target.reset();
    } catch (error: any) {
      console.log("FAILED ", error);
      dispatch(setIsLoading(false));
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
                  name="name"
                  type="text"
                  className="form-control"
                  id="floatingSignUpName"
                  placeholder="Your Name"
                />
                <label htmlFor="floatingSignUpName">Your Name</label>
              </div>
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
