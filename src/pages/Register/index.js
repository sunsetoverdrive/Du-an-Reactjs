import { useState } from "react";
import { registerCustomer } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [inputsCustomer, setInputsCustomer] = useState({});
  // const [Alert, setAlert] = useState("");
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState(false);
  const changeInputs = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    return setInputsCustomer({
      ...inputsCustomer,
      [name]: value,
    });
  };

  const clickRegister = (e) => {
    e.preventDefault();
    console.log(inputsCustomer);
    // console.log(Alert);

    registerCustomer(inputsCustomer)
      .then(({ data }) => {
        // setAlert("success");
        setAlert("Đăng ký tài khoản thành công");
        setStatus(true);
        setInputsCustomer({});
        console.log(data);
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === "email exists") {
          // setAlert("email exists");
          return setAlert("Email đã tồn tại!");
        }
        if (error.response.data === "phone exists") {
          // setAlert("phone exists");
          return setAlert("Số điện thoại đã tồn tại!");
        }
        return console.log(error);
      });
  };
  return (
    <>
      {/*	Register Form	*/}
      <div id="customer">
        {/* {!Alert ? (
          ""
        ) : Alert === "success" ? (
          <div className="alert alert-success text-center">
            Đăng ký thành công!
          </div>
        ) : (
          <div className="alert alert-danger text-center">
            Thông tin Username hoặc Email đã tồn tại!
          </div>
        )} */}
        {alert && (
          <div
            className={`alert alert-${
              status ? "success" : "danger"
            } text-center`}
          >
            {alert}
          </div>
        )}
        <h3 className="text-center">Đăng ký</h3>
        <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="fullName"
                className="form-control"
                required
                value={inputsCustomer.fullName || ""}
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Mật khẩu (bắt buộc)"
                type="password"
                name="password"
                className="form-control"
                required
                value={inputsCustomer.password || ""}
              />
            </div>
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
                value={inputsCustomer.email || ""}
              />
            </div>
            <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={(e) => changeInputs(e)}
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone"
                className="form-control"
                required
                value={inputsCustomer.phone || ""}
              />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input
                onChange={(e) => changeInputs(e)}
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                type="text"
                name="address"
                className="form-control"
                required
                value={inputsCustomer.address || ""}
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a onClick={clickRegister} href="#">
              <b>Đăng ký ngay</b>
            </a>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to="/">
              <b>Quay về trang chủ</b>
            </Link>
          </div>
        </div>
      </div>
      {/*	End Register Form	*/}
    </>
  );
};
export default Register;
