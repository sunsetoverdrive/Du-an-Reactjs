import { useDispatch, useSelector } from "react-redux";
import { formatPrice, getImageProduct } from "../../shared/ultils";
import { deleteItem, updateCart } from "../../redux-setup/reducers/cart";
import { order } from "../../services/Api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Cart = () => {
  const login = useSelector(({ Auth }) => Auth.login);
  // console.log(login.currentCustomer?.data.email);

  const itemsCart = useSelector(({ Cart }) => Cart.items);
  // console.log(Cart.items);
  const newItemsCart = itemsCart.map((item) => ({
    prd_id: item._id,
    price: item.price,
    qty: item.qty,
  }));

  const data = {
    customer_id: login.currentCustomer?.data.customer._id,
    fullName: login.currentCustomer?.data.customer.fullName,
    email: login.currentCustomer?.data.customer.email,
    phone: login.currentCustomer?.data.customer.phone,
    address: login.currentCustomer?.data.customer.address,
    items: newItemsCart,
  };

  const clickOrder = (e) => {
    e.preventDefault();
    console.log(data);

    order(data)
      .then(() => navigate("/Success"))
      .catch((error) => console.log(error));
  };
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const changeQty = (e, id) => {
    const value = Number(e.target.value);
    if (value === 0) {
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm(
        "Bạn có muốn xóa sản phẩm khỏi giỏi hàng không?",
      );
      return isConfirm ? dispatch(deleteItem({ _id: id })) : false;
    }
    dispatch(
      updateCart({
        _id: id,
        qty: value,
      }),
    );
  };
  const clickDeleteItem = (e, id) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm("Bạn có muốn xóa sản phẩm khỏi giỏi hàng không?");
    return isConfirm ? dispatch(deleteItem({ _id: id })) : false;
  };

  return (
    <>
      {/*	Cart	*/}
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
            Thông tin sản phẩm
          </div>
          <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
            Tùy chọn
          </div>
          <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
        </div>
        <form method="post">
          {itemsCart.map((item, index) => (
            <>
              <div key={item._id} className="cart-item row">
                <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                  <img src={getImageProduct(item.image)} />
                  <h4>{item.name}</h4>
                </div>
                <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                  <input
                    onChange={(e) => changeQty(e, item._id)}
                    type="number"
                    id="quantity"
                    className="form-control form-blue quantity"
                    value={item.qty}
                  />
                </div>
                <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                  <b>{formatPrice(item.price * item.qty)}</b>
                  <a onClick={(e) => clickDeleteItem(e, item._id)} href="#">
                    Xóa
                  </a>
                </div>
              </div>
            </>
          ))}
          <div className="row">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12" />
            <div className="cart-total col-lg-2 col-md-2 col-sm-12">
              <b>Tổng cộng:</b>
            </div>
            <div className="cart-price col-lg-3 col-md-3 col-sm-12">
              <b>
                {formatPrice(
                  itemsCart.reduce(
                    (total, item) => total + item.price * item.qty,
                    0,
                  ),
                )}
              </b>
            </div>
          </div>
        </form>
      </div>
      {/*	End Cart	*/}
      {/*	Customer Info	*/}
      <div id="customer">
        <div className="row">
          {login.logged ? (
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <Link onClick={clickOrder} to="/Orders">
                <b>Mua ngay</b>
                <span>Giao hàng tận nơi siêu tốc</span>
              </Link>
            </div>
          ) : (
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <Link to="/Login">
                <b>Đăng nhập</b>
                <span>Đăng nhập để mua hàng</span>
              </Link>
            </div>
          )}
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="#">
              <b>Trả góp Online</b>
              <span>Vui lòng call (+84) 0988 550 553</span>
            </a>
          </div>
        </div>
      </div>
      {/*	End Customer Info	*/}
    </>
  );
};
export default Cart;
