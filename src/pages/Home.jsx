import { Link } from "react-router-dom";

function Home() {
  const categories = [
    {
      name: "Skincare",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85",
      description: "Hydrate, nourish and protect your skin.",
    },
    {
      name: "Makeup",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85",
      description: "Beautiful makeup for every occasion.",
    },
    {
      name: "Haircare",
      image:
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=85",
         description: "Healthy and beautiful hair essentials.",
    },
    {
      name: "Fragrance",
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85",
      description: "Discover your signature fragrance.",
    },
    {
      name: "Body Care",
      image:
        "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
      description: "Pamper your skin every day.",
    },
    {
      name: "Beauty Tools",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85",
      description: "Essential tools for your beauty routine.",
    },
  ];

  return (
    <div className="bb-home">

      {/* =========================
          HERO SECTION
      ========================== */}

      <section className="bb-hero">

        <div className="bb-hero-overlay"></div>

        <div className="bb-hero-content">

          <p className="bb-hero-label">
            BEAUTY THAT BLOOMS WITH YOU
          </p>

          <h1>
            Discover Your
            <br />
            Natural Beauty
          </h1>

          <p className="bb-hero-text">
            Explore skincare, makeup, haircare and
            fragrances carefully selected for you.
          </p>

          <div className="bb-hero-buttons">

            <Link
              to="/products"
              className="bb-primary-button"
            >
              Shop Now
            </Link>

            <Link
              to="/categories"
              className="bb-secondary-button"
            >
              Explore Categories
            </Link>

          </div>

        </div>

      </section>


      {/* =========================
          FEATURES
      ========================== */}

      <section className="bb-features">

        <div className="bb-feature-card">

          <div className="bb-feature-icon">
            ✨
          </div>

          <div>
            <h3>Premium Beauty</h3>
            <p>
              Carefully selected products
            </p>
          </div>

        </div>


        <div className="bb-feature-card">

          <div className="bb-feature-icon">
            🚚
          </div>

          <div>
            <h3>Fast Delivery</h3>
            <p>
              Quick and secure delivery
            </p>
          </div>

        </div>


        <div className="bb-feature-card">

          <div className="bb-feature-icon">
            💗
          </div>

          <div>
            <h3>Made For You</h3>
            <p>
              Beauty essentials you'll love
            </p>
          </div>

        </div>

      </section>


      {/* =========================
          CATEGORY SECTION
      ========================== */}

      <section className="bb-categories">

        <div className="bb-section-heading">

          <p>
            EXPLORE OUR COLLECTION
          </p>

          <h2>
            Shop By Category
          </h2>

          <span>
            Discover beauty essentials for
            every part of your routine.
          </span>

        </div>


        <div className="bb-category-grid">

          {categories.map((category) => (

            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(
                category.name
              )}`}
              className="bb-category-card"
            >

              <img
                src={category.image}
                alt={category.name}
              />

              <div className="bb-category-overlay">

                <h3>
                  {category.name}
                </h3>

                <p>
                  {category.description}
                </p>

                <span>
                  Shop Now →
                </span>

              </div>

            </Link>

          ))}

        </div>


        <div className="bb-category-button">

          <Link
            to="/categories"
            className="bb-view-button"
          >
            View All Categories
          </Link>

        </div>

      </section>


      {/* =========================
          PROMO SECTION
      ========================== */}

      <section className="bb-promo">

        <div className="bb-promo-content">

          <p>
            BEAUTYBLOOM SPECIAL
          </p>

          <h2>
            Your Beauty,
            <br />
            Your Confidence.
          </h2>

          <span>
            Discover products that make
            your everyday beauty routine special.
          </span>

          <Link
            to="/products"
            className="bb-promo-button"
          >
            Shop Collection
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;