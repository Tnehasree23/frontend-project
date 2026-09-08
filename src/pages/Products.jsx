import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart
} from "../redux/slices/cartSlice";

import {
  toggleWishlist
} from "../redux/slices/wishlistSlice";

import products from "../data/products";

function Products() {

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const categoryFromURL =
    searchParams.get("category") || "All";

  const searchFromURL =
    searchParams.get("search") || "";

  const [search, setSearch] =
    useState(searchFromURL);

  const [sort, setSort] =
    useState("default");

  const wishlist =
    useSelector(
      (state) => state.wishlist.items
    );

  const categories = [
    "All",
    "Skincare",
    "Makeup",
    "Haircare",
    "Fragrance",
    "Body Care"
  ];

  const filteredProducts = useMemo(() => {

    let result = products.filter((product) => {

      const categoryMatch =
        categoryFromURL === "All" ||
        product.category === categoryFromURL;

      const searchMatch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      return categoryMatch && searchMatch;

    });

    if (sort === "low") {

      result.sort(
        (a, b) => a.price - b.price
      );

    }

    if (sort === "high") {

      result.sort(
        (a, b) => b.price - a.price
      );

    }

    if (sort === "rating") {

      result.sort(
        (a, b) => b.rating - a.rating
      );

    }

    return result;

  }, [
    categoryFromURL,
    search,
    sort
  ]);

  const handleCategory = (category) => {

    setSearch("");

    if (category === "All") {

      setSearchParams({});

    } else {

      setSearchParams({
        category: category
      });

    }

  };

  const handleSearch = (e) => {

    setSearch(e.target.value);

    const value =
      e.target.value.trim();

    if (value) {

      const params = {
        search: value
      };

      if (categoryFromURL !== "All") {
        params.category =
          categoryFromURL;
      }

      setSearchParams(params);

    } else {

      if (categoryFromURL !== "All") {

        setSearchParams({
          category: categoryFromURL
        });

      } else {

        setSearchParams({});

      }

    }

  };

  const isWishlisted = (id) => {

    return wishlist.some(
      (item) => item.id === id
    );

  };

  return (

    <div className="shop-page">

      {/* SHOP HERO */}

      <section className="shop-hero">

        <div>

          <p>
            BEAUTYBLOOM COLLECTION
          </p>

          <h1>
            Shop Beauty
          </h1>

          <span>
            Discover products made to make
            you feel beautiful.
          </span>

        </div>

      </section>


      {/* SHOP CONTENT */}

      <section className="shop-container">

        {/* TITLE */}

        <div className="shop-title">

          <div>

            <p className="section-label">
              BEAUTY ESSENTIALS
            </p>

            <h2>
              {categoryFromURL === "All"
                ? "All Products"
                : categoryFromURL}
            </h2>

            <span>
              {filteredProducts.length} products
            </span>

          </div>

        </div>


        {/* SEARCH + SORT */}

        <div className="shop-controls">

          <div className="shop-search">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearch}
            />

          </div>


          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >

            <option value="default">
              Sort By
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>

            <option value="rating">
              Highest Rated
            </option>

          </select>

        </div>


        {/* CATEGORY BUTTONS */}

        <div className="shop-categories">

          {categories.map((category) => (

            <button
              key={category}
              className={
                categoryFromURL === category
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>


        {/* PRODUCTS */}

        {filteredProducts.length > 0 ? (

          <div className="shop-product-grid">

            {filteredProducts.map((product) => (

              <div
                className="shop-product-card"
                key={product.id}
              >

                {/* IMAGE */}

                <div className="shop-product-image">

                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x600/f8eeee/333?text=BeautyBloom";
                    }}
                  />


                  {/* DISCOUNT */}

                  <span className="discount-badge">
                    {Math.round(
                      ((product.oldPrice -
                        product.price) /
                        product.oldPrice) *
                        100
                    )}
                    % OFF
                  </span>


                  {/* WISHLIST */}

                  <button
                    className={
                      isWishlisted(product.id)
                        ? "wishlist-button liked"
                        : "wishlist-button"
                    }
                    onClick={() =>
                      dispatch(
                        toggleWishlist(product)
                      )
                    }
                  >
                    {isWishlisted(product.id)
                      ? "♥"
                      : "♡"}
                  </button>

                </div>


                {/* PRODUCT INFO */}

                <div className="shop-product-info">

                  <span className="product-category">
                    {product.category}
                  </span>

                  <Link
                    to={`/products/${product.id}`}
                    className="product-name"
                  >
                    {product.name}
                  </Link>


                  {/* RATING */}

                  <div className="product-rating">

                    <span>
                      ★
                    </span>

                    {product.rating}

                    <small>
                      ({product.reviews})
                    </small>

                  </div>


                  {/* PRICE */}

                  <div className="product-price">

                    <strong>
                      ₹{product.price}
                    </strong>

                    <del>
                      ₹{product.oldPrice}
                    </del>

                  </div>


                  {/* ADD CART */}

                  <button
                    className="add-cart-button"
                    onClick={() =>
                      dispatch(
                        addToCart(product)
                      )
                    }
                  >
                    Add to Cart
                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* NO PRODUCTS */

          <div className="no-products-shop">

            <div>
              🔍
            </div>

            <h2>
              No products found
            </h2>

            <p>
              Try searching for another product
              or select a different category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSearchParams({});
              }}
            >
              View All Products
            </button>

          </div>

        )}

      </section>

    </div>

  );
}

export default Products;