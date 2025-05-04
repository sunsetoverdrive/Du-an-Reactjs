import React, { useEffect, useState } from "react";
import { getOrder, orderCanceled } from "../../services/Api";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import { Link } from "react-router-dom";
const Order = () => {
  const [order, setOrder] = useState([]);
  const [idCanceled, setIdCanceled] = useState("");
  const login = useSelector(({ Auth }) => Auth.login);
  const customerId = login.currentCustomer?.data.customer._id;
  // console.log(customerId);
  const clickOrderCancel = (id) => {
    console.log("hello");

    orderCanceled(id)
      .then((data) => {
        console.log(data);
        return setIdCanceled(id);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getOrder(customerId)
      .then(({ data }) => setOrder(data.data.docs))
      .catch((error) => console.log(error));
  }, [idCanceled]);
  return (
    <>
      {/*	Cart	*/}
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
            Đơn hàng của bạn
          </div>
          <div className="cart-nav-item col-lg-5 col-md-5 col-sm-12">
            Tổng tiền
          </div>
        </div>
        <form method="post">
          {order.map((item, index) => (
            <div
              key={index}
              className={`cart-item row ${
                item.status === 0 ? "alert-danger" : ""
              } ${item.status === 2 ? "alert-success" : ""}`}
            >
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <h4>
                  Đơn hàng đã mua vào ngày:{" "}
                  <span className="text-secondary">
                    {moment(item.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                  </span>
                </h4>
                <p>Mã Đơn (MĐ): {item._id}</p>
              </div>
              <div className="cart-price col-lg-2 col-md-2 col-sm-12">
                <b>32.990.000đ</b>
              </div>

              <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
                {item.status === 2 ? (
                  <>
                    <button type="button" className="btn btn-outline-dark mb-1">
                      <Link to={`/OrderDetails-${item._id}`}>
                        Chi tiết đơn hàng
                      </Link>
                    </button>
                    <button type="button" className="btn btn-success mb-1">
                      Đơn đã giao
                    </button>
                  </>
                ) : item.status === 1 ? (
                  <>
                    <button type="button" className="btn btn-outline-dark mb-1">
                      <Link to={`/OrderDetails-${item._id}`}>
                        Chi tiết đơn hàng
                      </Link>
                    </button>
                    <button
                      onClick={() => clickOrderCancel(item._id)}
                      type="button"
                      className="btn btn-outline-danger mb-1"
                    >
                      Huỷ đơn
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-success mb-1"
                    >
                      Đơn đang giao
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" className="btn btn-outline-dark mb-1">
                      <Link to={`/OrderDetails-${item._id}`}>
                        Chi tiết đơn hàng
                      </Link>
                    </button>
                    <button type="button" className="btn btn-danger mb-1">
                      Đơn đã huỷ
                    </button>
                  </>
                )}
                {/* <button type="button" className="btn btn-outline-dark mb-1">
                  Chi tiết đơn hàng
                </button>
                <button type="button" className="btn btn-outline-danger mb-1">
                  Huỷ đơn
                </button>
                <button type="button" className="btn btn-outline-success mb-1">
                  Đơn đang giao
                </button>
                <button type="button" className="btn btn-success mb-1">
                  Đơn đã giao
                </button>
                <button type="button" className="btn btn-danger mb-1">
                  Đơn đã huỷ
                </button> */}
              </div>
            </div>
          ))}
          <div className="row">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
              <button
                id="update-cart"
                className="btn btn-success"
                type="submit"
                name="sbm"
              >
                Quay về trang chủ
              </button>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12">
              <ul className="pagination mt-4">
                <li className="page-item disabled">
                  <span className="page-link">Trang trước</span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item active" aria-current="page">
                  <span className="page-link">2</span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Trang sau
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
      {/*	End Cart	*/}
    </>
  );
};

export default Order;
