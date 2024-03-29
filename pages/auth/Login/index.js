import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../../Redux/action/login";

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const postData = async (e) => {
    e.preventDefault();
    let data = {
      email,
      password,
    };
    dispatch(LoginUser(data, router));
  };
  return (
    <div>
      <div className="container row align-items-center">
        <div className="col-lg-6 col-sm-8">
          <div
            style={{
              backgroundImage: `url(/col.png)`,
              height: "40rem",
              width: "41rem",
              opacity: 0.2,
              marginTop: "2rem",
            }}
          />
        </div>
        <div className="col-lg-4 offset-lg-1 col-sm-10 mt-sm-4">
          <h2 className="text-warning text-end" style={{ marginRight: "5rem" }}>
            Welcome
          </h2>
          <h4 className="text-end col-11 mb-3" style={{ marginLeft: "4rem" }}>
            Log in into your exiting account
          </h4>
          <Form onSubmit={postData} className="container mb-3 col-8 mt-3 ">
            <h5 className="text-secondary">E-mail</h5>
            <input
              type="email"
              className="form-control mb-2"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{ width: "25rem", height: "40px" }}
            />
            <h5 className="text-secondary">Password</h5>
            <input
              type="password"
              className="form-control mb-2"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ width: "25rem", height: "40px" }}
            />
            <Button
              type="submit"
              className="btn btn-warning text-white mt-3"
              style={{
                position: "absolute",
                width: "25rem",
                height: "47px",
              }}
            >
              Login
            </Button>
          </Form>
          <Link href="/auth/Forgot-Pass">
            <h5
              style={{ marginTop: "5rem", marginLeft: "4rem" }}
              className="col-12 text-end text-warning col-8 mb-3"
            >
              Forgot Password ?
            </h5>
          </Link>
          <h5
            className="col-12 text-end text-dark mt-1"
            style={{ marginLeft: "2rem" }}
          >
            Dont have an account?
            <Link href="/auth/Register" className="text-warning">
              Sign Up
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Login;
