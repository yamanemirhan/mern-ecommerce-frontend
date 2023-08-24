import React, { useEffect, useState } from "react";
import { AiOutlineFilter } from "react-icons/ai";
import Pagination from "../components/Pagination";
import FilterProduct from "../components/FilterProduct";
import ProductCard from "../components/ProductCard";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../features/userSlice";

const Home = () => {
  const [showFilterProduct, setShowFilterProduct] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLength, setProductsLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [productsLoading, setProductsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        setProductsLoading(true); // Loading başladı
        const queryString = `?search=${searchQuery}&page=${currentPage}&sortBy=${selectedSort}`;
        dispatch(getAllProducts(queryString)).then((res) => {
          if (res.payload.success) {
            setProducts(res.payload.data.products);
            setProductsLength(res.payload.data.count);
          }
        });
        setProductsLoading(false); // Loading tamamlandı
      };
      fetchProducts();
    } catch (error) {
      console.log(error);
      setProductsLoading(false); // Loading tamamlandı (hata durumunda da)
    }
  }, [searchQuery, currentPage, selectedSort]);

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const sortSelects = [
    { label: "Popular", value: "most-favorited" },
    { label: "Newest", value: "newest" },
    { label: "Price Low to High", value: "lowest-price" },
    { label: "Price High to Low", value: "highest-price" },
  ];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchApply = (query) => {
    setSearchQuery(query);
  };
  return (
    <>
      {productsLoading ? (
        <div className="text-white text-3xl p-10">Loading...</div>
      ) : (
        <div className="p-4 relative">
          <div className="flex items-center">
            <div
              onClick={() => setShowFilterProduct(true)}
              className="text-white text-lg flex items-center gap-1 cursor-pointer"
            >
              <AiOutlineFilter size={30} />
              <button>Filter</button>
            </div>

            {products?.length > 0 && (
              <div className="ml-24 sm:ml-60">
                <select value={selectedSort} onChange={handleSortChange}>
                  <option value="">Select a sort option</option>
                  {sortSelects.map((sortOption) => (
                    <option key={sortOption.value} value={sortOption.value}>
                      {sortOption.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {showFilterProduct && (
            <FilterProduct
              setShowFilterProduct={setShowFilterProduct}
              handleSearchApply={handleSearchApply}
              paginate={paginate}
            />
          )}
          {products?.length > 0 && (
            <h2 className="text-white text-3xl mt-4 mb-2 text-center">
              Our Products
            </h2>
          )}
          <div className="flex flex-col md:flex-row mx-auto flex-wrap items-center justify-center gap-6 my-4 sm:ml-64">
            {products?.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="text-2xl text-red-300">
                The product you are looking for could not be found!
              </div>
            )}
          </div>
          <Pagination
            itemsPerPage={productsPerPage}
            totalItems={productsLength}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
};

export default Home;
