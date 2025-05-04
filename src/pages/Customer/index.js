import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer } from "../../services/Api";
import { useParams } from "react-router-dom";

import { updatedCustomer } from "../../redux-setup/reducers/auth";

const Customer = () => {
  const { id } = useParams();
  const [alerts, setAlerts] = useState("");
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();

  const currentCustomer = useSelector(
    ({ Auth }) => Auth.login.currentCustomer?.data,
  );
  const [customer, setCustomer] = useState(currentCustomer.customer);
  // console.log(customer);

  const changeInputs = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    return setCustomer({
      ...customer,
      [name]: value,
    });
  };
  const clickUpdate = (e) => {
    e.preventDefault();
    // console.log(customer, id);

    updateCustomer(customer, id)
      .then((data) => {
        console.log(data);
        setAlerts("Cập nhật thông tin thành công!");
        setStatus(true);
        return dispatch(updatedCustomer(customer));
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === "phone exists")
          return setAlerts(" Số điện thoại đã tồn tại!");
      });
  };
  return (
    <>
      {/*	Register Form	*/}
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

        <h3 className="text-center">Thông tin tài khoản</h3>
        <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="fullName"
                className="form-control"
                value={customer.fullName}
                required
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                disabled
                placeholder="Mật khẩu (bắt buộc)"
                type="password"
                name="password"
                className="form-control"
                value={customer.password}
                required
              />
            </div>
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                disabled
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                value={customer.email}
                required
              />
            </div>
            <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone"
                className="form-control"
                value={customer.phone}
                required
              />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                type="text"
                name="address"
                className="form-control"
                value={customer.address}
                required
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a onClick={clickUpdate} href="#">
              <b>Cập nhật ngay</b>
            </a>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="#">
              <b>Quay về trang chủ</b>
            </a>
          </div>
        </div>
      </div>
      {/*	End Register Form	*/}
    </>
  );
};

export default Customer;
