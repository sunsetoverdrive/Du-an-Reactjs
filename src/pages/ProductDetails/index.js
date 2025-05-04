import { useEffect, useState } from "react";
import { formatPrice, getImageProduct } from "../../shared/ultils";
import {
  createCommentProduct,
  getCommentsProduct,
  getProductDetails,
} from "../../services/Api";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import moment from "moment/moment";
import { addToCart } from "../../redux-setup/reducers/cart";
import { useDispatch } from "react-redux";
import PaginationProductComments from "../../shared/components/PaginationProductComments";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [pages, setPages] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputsForm, setInputsForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const page = Number(searchParams.get("page")) || 1;

  const changeInput = (e) => {
    const { name, value } = e.target;
    // console.log(inputsForm);
    return setInputsForm({ ...inputsForm, [name]: value });
  };
  const clickAddToCart = (type) => {
    dispatch(
      addToCart({
        _id: productDetails._id,
        name: productDetails.name,
        price: productDetails.price,
        image: productDetails.image,
        qty: 1,
      }),
    );
    if (type === "buy-now") return navigate("/cart");
  };
  const clickSubmit = (e) => {
    e.preventDefault();
    createCommentProduct(id, inputsForm)
      .then(({ data }) => {
        if (data.status === "success") {
          alert("Form submit");
          getComments(id);
          return setInputsForm("");
        }
      })
      .catch((error) => console.log(error));
  };
  const getComments = (id, page) => {
    getCommentsProduct(id, {
      params: {
        page,
        limit: 3,
      },
    })
      .then(({ data }) => {
        setComments(data.data.docs);
        setPages(data.data.pages);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // Get product details
    getProductDetails(id)
      .then(({ data }) => setProductDetails(data.data))
      .catch((error) => console.log(error));
    // Get comments of product
    getComments(id, page);
    // Create comment
  }, [id, page]);
  return (
    <>
      {/*	List Product	*/}
      <div id="product">
        <div id="product-head" className="row">
          <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
            <img src={getImageProduct(productDetails.image)} />
          </div>
          <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
            <h1>{productDetails.name}</h1>
            <ul>
              <li>
                <span>Bảo hành:</span> 12 Tháng
              </li>
              <li>
                <span>Đi kèm:</span> {productDetails.accessories}
              </li>
              <li>
                <span>Tình trạng:</span> {productDetails.status}
              </li>
              <li>
                <span>Khuyến Mại:</span> {productDetails.promotion}
              </li>
              <li id="price">Giá Bán (chưa bao gồm VAT)</li>
              <li id="price-number">{formatPrice(productDetails.price)}</li>
              <li
                id="status"
                className={productDetails.is_stock ? "" : "text-danger"}
              >
                {productDetails.is_stock ? "Còn hàng" : "Hết hàng"}
              </li>
            </ul>
            <div>
              <button
                onClick={() => clickAddToCart("buy-now")}
                className="btn btn-warning mr-2"
              >
                <Link to="/cart">
                  {productDetails.is_stock ? "Mua hàng" : "Liên hệ đặt hàng"}
                </Link>
              </button>
              <button onClick={clickAddToCart} className="btn btn-info">
                <a href="#">
                  {productDetails.is_stock ? "Thêm vào giỏ hàng" : ""}
                </a>
              </button>
            </div>
          </div>
        </div>
        <div id="product-body" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>{productDetails.name}</h3>
            <p>{productDetails.details}</p>
          </div>
        </div>
        {/*	Comment	*/}
        <div id="comment" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Bình luận sản phẩm</h3>
            <form method="post">
              <div className="form-group">
                <label>Tên:</label>
                <input
                  onChange={changeInput}
                  name="name"
                  required
                  type="text"
                  className="form-control"
                  value={inputsForm.name || ""}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  onChange={changeInput}
                  name="email"
                  required
                  type="email"
                  className="form-control"
                  id="pwd"
                  value={inputsForm.email || ""}
                />
              </div>
              <div className="form-group">
                <label>Nội dung:</label>
                <textarea
                  onChange={changeInput}
                  name="content"
                  required
                  rows={8}
                  className="form-control"
                  value={inputsForm.content || ""}
                />
              </div>
              <button
                onClick={clickSubmit}
                type="submit"
                name="sbm"
                className="btn btn-primary"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
        {/*	End Comment	*/}
        {/*	Comments List	*/}
        <div id="comments-list" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            {comments.map((comment, index) => (
              <div className="comment-item" key={index}>
                <ul>
                  <li>
                    <b>{comment.name}</b>
                  </li>
                  <li>
                    {moment(comment.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                  </li>
                  <li>
                    <p>{comment.content}</p>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/*	End Comments List	*/}
      </div>
      {/*	End Product	*/}
      <div id="pagination">
        <PaginationProductComments pages={pages} id={id} />
      </div>
    </>
  );
};
export default ProductDetails;
