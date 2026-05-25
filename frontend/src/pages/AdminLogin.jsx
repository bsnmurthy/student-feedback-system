import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminLogin() {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({

      username: "",
      password: ""
    });

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value
      });
    };


  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await API.post(

            "/admin/login",

            formData
          );

        localStorage.setItem(

          "adminToken",

          response.data.token
        );

        alert(
          "Admin Login Success"
        );

        navigate(
          "/admin-dashboard"
        );

      } catch (error) {

        alert(
          "Invalid Credentials"
        );
      }
    };


  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent:
          "center",
        alignItems:
          "center",
        background:
          "#f3f4f6"
      }}
    >

      <div
        style={{
          width: "400px",
          background:
            "white",
          padding: "30px",
          borderRadius:
            "15px",
          boxShadow:
            "0 0 15px rgba(0,0,0,0.15)"
        }}
      >

        <h2
          className=
          "text-center"
        >

          Admin Login

        </h2>

        <p
          className=
          "text-center text-muted"
        >

          Student Feedback Analysis

        </p>

        <form
          onSubmit={
            handleLogin
          }
        >

          <div className="mb-3">

            <label>
              Username
            </label>

            <input
              type="text"
              name="username"
              className=
              "form-control"

              onChange={
                handleChange
              }

              required
            />

          </div>


          <div className="mb-3">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              className=
              "form-control"

              onChange={
                handleChange
              }

              required
            />

          </div>


          <button
            className=
            "btn btn-primary w-100"
          >

            Login

          </button>

        </form>

      </div>

    </div>
  );
}

export default
AdminLogin;