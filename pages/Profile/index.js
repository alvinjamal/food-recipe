/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import Image from "next/image";
import React, { useState, useEffect } from "react";
import ModalEdit from "../../components/Modal/[id_user]";
import axios from "axios";
import Layouts from "../../components/Layouts";
import Footer from "../../components/Footer";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export const getServerSideProps = async (context) => {
  const { token } = context.req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/auth/Login",
        permanent: true,
      },
    };
  }

  return {
    props: {
      isLogin: true,
      token: token,
    },
  };
};

function profile({ token }) {
  const [data, setData] = useState("");
  const [key, setKey] = useState("myrecipe");
  const router = useRouter();
  useEffect(() => {
    axios
      .get(`/service/users/${data.id_user}`, {
        withCredentials: true,
        headers: {
          token: `${token}`,
        },
      })
      .then((res) => {
        console.log("get data success");
        console.log(res.data);
        res.data && setData(res.data.data);
      })
      .catch((err) => {
        console.log("get data fail");
        console.log(err);
      });
  }, []);
  const [recipe, setRecipe] = useState(null);
  const [save, setSave] = useState(null);
  const [like, setLike] = useState(null);
  const myrecipe = `/service/recipe/recipe-user`;
  useEffect(() => {
    axios
      .get(myrecipe, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("get data success");
        console.log(res.data);
        res.data && setRecipe(res.data.data);
      })
      .catch((err) => {
        console.log("get data fail");
        console.log(err);
      });
  }, []);
  const saved = `/service/recipe/saved-recipe`;
  useEffect(() => {
    axios
      .get(saved, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("get data success");
        console.log(res.data);
        res.data && setSave(res.data.data);
      })
      .catch((err) => {
        console.log("get data fail");
        console.log(err);
      });
  }, []);
  const liked = `/service/recipe/like-recipe`;
  useEffect(() => {
    axios
      .get(liked, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("get data success");
        console.log(res.data);
        res.data && setLike(res.data.data);
      })
      .catch((err) => {
        console.log("get data fail");
        console.log(err);
      });
  }, []);
  const DeleteSave = (id_saved) => {
    axios
      .delete(`/service/recipe/saved-recipe/delete/${id_saved}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Delete save recipe success");
        console.log(res);
        Swal.fire("Success", "Delete save recipe success", "success");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log("Delete save recipe fail");
        console.log(err);
        Swal.fire("Warning", "Delete save recipe fail", "error");
      });
  };
  const DeleteLike = (id_liked) => {
    axios
      .delete(`/service/recipe/like-recipe/delete/${id_liked}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Delete like recipe success");
        console.log(res);
        Swal.fire("Success", "Delete like recipe success", "success");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log("Delete save recipe fail");
        console.log(err);
        Swal.fire("Warning", "Delete save recipe fail", "error");
      });
  };
  const DeleteRecipe = (id_recipe) => {
    axios
      .delete(`/service/recipe/delete-recipe/${id_recipe}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Delete recipe success");
        console.log(res);
        Swal.fire("Success", "Delete recipe success", "success");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log("Delete recipe fail");
        console.log(err);
        Swal.fire("Warning", "Delete recipe fail", "error");
      });
  };
  return (
    <div className="container">
      <Layouts />
      <div>
        <div>
          <div className="row justify-content-center mt-5">
            <div className="col-1">
              <img
                src={data ? data.photo : "data not found"}
                style={{ width: "500px", height: "100px", borderRadius: "50%" }}
                className="avatar-profile"
                alt=""
              />
            </div>
          </div>
          <div className="row justify-content-center mt-5">
            <div className="col-1">
              <ModalEdit token={token} />
            </div>
          </div>
          <div className="row justify-content-center">
            <div
              className="col-6"
              style={{ marginLeft: "480px", marginTop: "-50px" }}
            >
              <h4> {data ? data[0].fullname : "data not found"}</h4>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="container text-start  rounded-2 mt-1 bg-white">
            <div className="row  rounded-3">
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="myrecipe" title="My Recipe">
                  <div className="row">
                    {recipe ? (
                      recipe.map((item) => (
                        <div
                          className="col-3"
                          key={item.id_recipe}
                          onClick={() =>
                            router.push(`/Detail-Recipe/${item.id_recipe}`)
                          }
                        >
                          <img
                            src={item.photo}
                            alt=""
                            style={{ height: "300px", width: "300px" }}
                          />
                          <h4
                            style={{
                              marginTop: "-40px",
                              marginLeft: "13px",
                              color: "white",
                            }}
                          >
                            {item.title}
                          </h4>
                          <div className="mt-4">
                            <button
                              className="btn btn-warning text-white"
                              style={{
                                marginLeft: "190px",
                                marginTop: "-100px",
                                marginRight: "20px",
                              }}
                            >
                              {/* <RiEditBoxLine /> */}
                            </button>
                            {/* <button
                              key={item.id_recipe}
                              onClick={() => DeleteRecipe(item.id_recipe)}
                              className="btn btn-danger text-white"
                              style={{
                                marginTop: "-100px",
                              }}
                            ></button> */}
                          </div>
                        </div>
                      ))
                    ) : (
                      <h1>Please Wait...</h1>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="savedrecipe" title="Saved Recipe">
                  <div className="row">
                    {save ? (
                      save.map((item) => (
                        <div
                          className="col-3"
                          key={item.recipe_id}
                          onClick={() =>
                            router.push(`/Detail-Recipe/${item.recipe_id}`)
                          }
                        >
                          <img
                            src={item.photo}
                            alt=""
                            style={{ height: "300px", width: "300px" }}
                          />
                          <h4
                            style={{
                              marginTop: "-40px",
                              marginLeft: "13px",
                              color: "white",
                            }}
                          >
                            {item.title}
                          </h4>
                          <div className="mt-4">
                            <button
                              key={item.id_saved}
                              onClick={() => DeleteSave(item.id_saved)}
                              className="btn btn-danger text-white"
                              style={{
                                marginTop: "-100px",
                                marginLeft: "250px",
                              }}
                            ></button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <h1>Please Wait...</h1>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="likedrecipe" title="Liked Recipe">
                  <div className="row">
                    {like ? (
                      like.map((item) => (
                        <div
                          className="col-3"
                          key={item.recipe_id}
                          onClick={() =>
                            router.push(`/Detail-Recipe/${item.recipe_id}`)
                          }
                        >
                          <img
                            src={item.photo}
                            alt=""
                            style={{ height: "300px", width: "300px" }}
                          />
                          <h4
                            style={{
                              marginTop: "-40px",
                              marginLeft: "13px",
                              color: "white",
                            }}
                          >
                            {item.title}
                          </h4>
                          <div className="mt-4">
                            {/* <button
                              key={item.id_liked}
                              onClick={() => DeleteLike(item.id_liked)}
                              className="btn btn-danger text-white"
                              style={{
                                marginTop: "-100px",
                                marginLeft: "250px",
                              }}
                            ></button> */}
                          </div>
                        </div>
                      ))
                    ) : (
                      <h1>Please Wait...</h1>
                    )}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default profile;
