import { Link } from "react-router-dom";
import { getImageProduct } from "../ultils";
import { formatPrice } from "../ultils";

const ProductItem = ({ item }) => {
  return (
    <>
      <div className="product-item card text-center">
        <Link to={`/Product-${item._id}`}>
          <img src={getImageProduct(item.image)} />
        </Link>
        <h4>
          <Link to={`/Product-${item._id}`}> {item.name} </Link>
        </h4>
        <p>
          Giá Bán: <span>{formatPrice(item.price)}</span>
        </p>
      </div>
    </>
  );
};
export default ProductItem;
