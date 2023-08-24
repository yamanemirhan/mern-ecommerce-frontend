import React, { useEffect, useState } from "react";
import { AiOutlineFilter } from "react-icons/ai";
import Pagination from "../components/Pagination";
import FilterProduct from "../components/FilterProduct";
import ProductCard from "../components/ProductCard";
import { getFavProductsAPI } from "../services/api/product";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LikedProducts = () => {
  const [showFilterProduct, setShowFilterProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLength, setProductsLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [productsLoading, setProductsLoading] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        setProductsLoading(true); // Loading başladı
        const queryString = `?search=${searchQuery}&page=${currentPage}&sortBy=${selectedSort}`;
        const res = await getFavProductsAPI(queryString);
        if (res.data.success) {
          setProducts(res.data.data.products);
          setProductsLength(user?.favProducts?.length);
        }
        setProductsLoading(false); // Loading tamamlandı
      };
      fetchProducts();
    } catch (error) {
      console.log(error);
      setProductsLoading(false); // Loading tamamlandı (hata durumunda da)
    }
  }, [searchQuery, priceRange, currentPage, selectedSort]);

  const removeUnlikedProduct = (e, productId) => {
    e.preventDefault();

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );

    // Sayfa numarasını güncelle
    if (products.length === 1 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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
              setPriceRange={setPriceRange}
              paginate={paginate}
            />
          )}
          {products?.length > 0 && (
            <h2 className="text-white text-3xl mt-4 mb-2 text-center">
              Liked Products
            </h2>
          )}
          <div className="flex flex-col md:flex-row mx-auto flex-wrap items-center justify-center gap-6 my-4 sm:ml-64">
            {products?.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  removeUnlikedProduct={removeUnlikedProduct}
                />
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

export default LikedProducts;
