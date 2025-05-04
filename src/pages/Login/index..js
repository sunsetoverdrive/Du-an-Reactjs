import React, { useState } from "react";
import { loginCustomer } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../redux-setup/reducers/auth";

const Login = () => {
  const [inputsForm, setInputsForm] = useState({});
  const [alerts, setAlerts] = useState("");
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeInputs = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    return setInputsForm({
      ...inputsForm,
      [name]: value,
    });
  };
  const clickLogin = (e) => {
    e.preventDefault();
    loginCustomer(inputsForm)
      .then(({ data }) => {
        console.log(data);
        setAlerts("Đăng nhập thành công!");
        setStatus(true);
        // setInputsForm({});
        dispatch(
          loggedIn({
            data,
          }),
        );
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === "email not valid")
          return setAlerts("Thông tin Email không hợp lệ!");
        if (error.response.data === "password not valid")
          return setAlerts("Password không hợp lệ!");
      });
  };
  // Thông tin Email hoặc Password không hợp lệ!
  return (
    <>
      {/*	Login Form	*/}
      <div id="customer">
        {alerts && (
          <div
            className={`alert alert-${
              status ? "success" : "danger"
            } text-center`}
          >
            {alerts}
          </div>
        )}
        <h3 className="text-center">Đăng nhập</h3>
        <form method="post">
          <div className="row">
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                value={inputsForm.email || ""}
                required
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Mật khẩu (bắt buộc)"
                type="password"
                name="password"
                className="form-control"
                value={inputsForm.password || ""}
                required
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a onClick={clickLogin} href="#">
              <b>Đăng nhập ngay</b>
            </a>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to="/">
              <b>Quay về trang chủ</b>
            </Link>
          </div>
        </div>
      </div>
      {/*	End Login Form	*/}
    </>
  );
};

export default Login;
