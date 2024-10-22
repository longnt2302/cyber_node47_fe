import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { loginAPI, loginFacebookAPI } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";
import ReactFacebookLogin from "react-facebook-login";

const Login = () => {
  const navigate = useNavigate();

  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {}, []);

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white">
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Password
            </label>
            <input className="form-control" id="pass" />
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                let email = document.getElementById("email").value;
                let pass_word = document.getElementById("pass").value;
                let payload = {
                  email,
                  pass_word,
                };

                loginAPI(payload)
                  .then((result) => {
                    toast.success(result.message);

                    // lưu accessToken vào localStorage
                    localStorage.setItem("LOGIN_USER", result.token);

                    navigate("/"); // redirect qua trang top
                  })
                  .catch((error) => {
                    toast.error(error.response.data.message);
                  });
              }}
            >
              Login
            </button>
            <Link className="btn btn-primary text-white" to="/forgot-password">
              Forgot password
            </Link>
            <ReactFacebookLogin
              appId="916249423895166"
              fields="name,email,picture"
              callback={(response) => {
                console.log(response);
                let { email, name, id } = response;
                let payload = { email, name, id };
                loginFacebookAPI(payload)
                  .then((result) => {
                    // lưu accessToken và localStorage
                    localStorage.setItem("LOGIN_USER", result.token);

                    // hiển thị message login facebook thành công
                    setTimeout(() => {
                      toast.success(result.message);
                    }, 5000);
                    // navigate về home
                    navigate("/");
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error(err.response.data.message);
                  });
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
