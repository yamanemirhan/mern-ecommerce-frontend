import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineFilter } from "react-icons/ai";
import { Range, getTrackBackground } from "react-range";

const FilterProduct = ({
  setShowFilterProduct,
  handleSearchApply,
  paginate,
}) => {
  const [values, setValues] = useState([0, 10000]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (values) => {
    setValues(values);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const categories = ["Phone", "Computer", "Laptop", "Tablet"];

  const handleApplyFilter = (e) => {
    e.preventDefault();
    const searchInput = e.target.searchInput.value;
    const queryString = `${searchInput}&minPrice=${values[0]}&maxPrice=${
      values[1]
    }${selectedCategory ? `&categories=${selectedCategory}` : ""}`;
    paginate(1);
    // setPriceRange(values);
    handleSearchApply(queryString);
  };

  return (
    <div className="h-[calc(100vh-80px)] text-white flex flex-col gap-6 mt-20 z-30 p-3 w-60 bg-slate-400 top-0 fixed left-0">
      <div className="flex justify-between items-center">
        <AiOutlineFilter size={30} />
        <h4 className="text-center text-xl">Filter</h4>
        <MdOutlineCancel
          onClick={() => setShowFilterProduct(false)}
          size={30}
          className="ml-auto cursor-pointer"
        />
      </div>

      <form onSubmit={handleApplyFilter}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="searchInput">Search</label>
            <input
              name="searchInput"
              type="text"
              placeholder="Name, Category, Desc or Company..."
              className="text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category">Category</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="text-black"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 mt-1 p-2">
            <label htmlFor="price" className="text-center">
              Price
            </label>
            <div className="range-slider">
              <Range
                values={values}
                step={1}
                min={0}
                max={10000}
                onChange={handleChange}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      background: getTrackBackground({
                        values,
                        colors: ["#ccc", "#548BF4", "#ccc"],
                        min: 0,
                        max: 10000,
                      }),
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "20px",
                      width: "20px",
                      borderRadius: "10px",
                      backgroundColor: "#548BF4",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-28px",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "14px",
                        fontFamily: "Arial, sans-serif",
                        padding: "4px",
                        borderRadius: "4px",
                        backgroundColor: "#548BF4",
                      }}
                    >
                      {values[props.key]}
                    </div>
                  </div>
                )}
              />
              <div className="range-labels mt-3 flex items-center gap-3">
                <span>${values[0]}</span>
                <span>-</span>
                <span>${values[1]}</span>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="border py-1 w-full mt-3 bg-yellow-100 text-black rounded-md"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default FilterProduct;
