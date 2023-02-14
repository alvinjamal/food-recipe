import axios from "axios";
import Swal from "sweetalert2";

export const LoginUser = (data, router) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_PENDING" });
    const result = await axios.post("http://localhost:3500/users/login", data, {
      withCredentials: true,
    });
    const user = result.data.data;
    // localStorage.setItem("token", user.token);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });
    Swal.fire({
      title: "Good job!",
      text: `${result.data.message}`,
      icon: "success",
      timer: "3000",
      showConfirmButton: false,
    }).then(() => {
      router.push("/");
    });
    console.log("User Login Success");
  } catch (err) {
    Swal.fire({
      title: "Please Try Again Login",
      text: `${err.response.data.message}`,
      icon: "error",
      timer: "3000",
      showConfirmButton: false,
    });
  }
};