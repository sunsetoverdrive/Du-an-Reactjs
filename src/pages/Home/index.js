import { useEffect, useState } from "react";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";

const Home = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    // Latest Products
    getProducts({
      params: {
        limit: 6,
      },
    })
      .then(({ data }) => {
        setLatestProducts(data.data.docs);
      })
      .catch((error) => console.log(error));
    // Featured Products
    getProducts({
      params: {
        limit: 6,
        is_featured: true,
      },
    })
      .then(({ data }) => {
        setFeaturedProducts(data.data.docs);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {/*	Feature Product	*/}
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
          {featuredProducts.map((item, index) => (
            <ProductItem key={index} item={item} />
          ))}
        </div>
      </div>
      {/*	End Feature Product	*/}
      {/*	Latest Product	*/}
      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="product-list card-deck">
          {latestProducts.map((item, index) => (
            <ProductItem key={index} item={item} />
          ))}
        </div>
      </div>
      {/*	End Latest Product	*/}
    </>
  );
};
export default Home;
