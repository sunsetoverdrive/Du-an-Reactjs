import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getCategoryById, getProductsCategory } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
import { limit } from "../../shared/constants/app";
import PaginationCategoryProduct from "../../shared/components/PaginationCategory.js";
const Category = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [productsQty, setProductsQty] = useState([]);
  const [pages, setPages] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    getProductsCategory(id, {
      params: {
        page,
        limit: limit,
      },
    })
      .then(({ data }) => {
        setProducts(data.data.docs);
        setProductsQty(data.data.pages.total);
        setPages(data.data.pages);
      })
      .catch((error) => console.log(error));
    getCategoryById(id)
      .then(({ data }) => setCategory(data.data.name))
      .catch((error) => console.log(error));
  }, [id, page]);
  return (
    <>
      {/*	List Product	*/}
      <div className="products">
        <h3>
          {category} (hiện có {productsQty} sản phẩm)
        </h3>
        <div className="product-list card-deck">
          {products.map((item, index) => (
            <ProductItem key={index} item={item} />
          ))}
        </div>
      </div>
      <div id="pagination">
        <PaginationCategoryProduct pages={pages} id={id} />
      </div>
    </>
  );
};
export default Category;
