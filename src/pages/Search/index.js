import { useEffect, useState } from "react";
import ProductItem from "../../shared/components/product-item";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/Api";
import { limit } from "../../shared/constants/app";
import Pagination from "../../shared/components/Pagination";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const page = Number(searchParams.get("page")) || 1;
  useEffect(() => {
    getProducts({
      params: {
        name: keyword,
        page,
        limit: limit,
      },
    })
      .then(({ data }) => {
        setPages(data.data.pages);
        setProducts(data.data.docs);
      })
      .catch((error) => console.log(error));
  }, [keyword, page]);
  return (
    <>
      {/*	List Product	*/}
      <div className="products">
        <div id="search-result">
          Kết quả tìm kiếm với sản phẩm <span>{keyword}</span>
        </div>
        <div className="product-list card-deck">
          {products.map((item, index) => (
            <ProductItem key={index} item={item} />
          ))}
        </div>
      </div>
      {/*	End List Product	*/}
      <div id="pagination">
        <Pagination pages={pages} page={page} />
      </div>
    </>
  );
};
export default Search;
