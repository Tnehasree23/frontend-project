import { Link } from "react-router-dom";

function Categories() {
 const categories = [
  {
    name: "Skincare",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85",
    description:
      "Serums, moisturizers, cleansers and more",
  },

  {
    name: "Makeup",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85",
    description:
      "Lipsticks, foundations, blush and more",
  },

  {
    name: "Haircare",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=85",
    description:
      "Shampoo, conditioner, oils and treatments",
  },

  {
    name: "Fragrance",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85",
    description:
      "Discover your signature fragrance.",
  },

  {
    name: "Body Care",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
    description:
      "Pamper your skin every day.",
  },

  {
    name: "Beauty Tools",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85",
    description:
      "Essential tools for your beauty routine.",
  },
];

  return (
    <div className="categories-page">

      {/* HERO */}

      <section className="categories-hero">

        <p>BEAUTYBLOOM COLLECTION</p>

        <h1>Shop By Category</h1>

        <span>
          Discover everything you need for your
          beauty and self-care routine.
        </span>

      </section>

      {/* CATEGORIES */}

      <section className="categories-section">

        <div className="section-heading">

          <p className="section-label">
            EXPLORE BEAUTY
          </p>

          <h2>
            Find Your Beauty Essentials
          </h2>

        </div>

        <div className="category-grid">

          {categories.map((category) => (

            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(
                category.name
              )}`}
              className="category-card"
            >

              <img
                src={category.image}
                alt={category.name}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <div className="category-overlay">

                <h2>{category.name}</h2>

                <p>{category.description}</p>

                <span>
                  Shop Now →
                </span>

              </div>

            </Link>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Categories;