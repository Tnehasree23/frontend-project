import {
  Sparkles,
  Heart,
  ShieldCheck,
  Truck,
  RefreshCcw
} from "lucide-react";

function About() {
  return (
    <div className="about-page">

      {/* HERO */}

      <section className="about-hero">

        <div className="about-hero-content">

          <p className="about-label">
            WELCOME TO BEAUTYBLOOM
          </p>

          <h1>
            Beauty that makes
            <br />
            you feel beautiful.
          </h1>

          <p>
            Discover skincare, makeup, haircare and
            fragrances carefully selected to bring out
            your natural beauty.
          </p>

        </div>

      </section>

      {/* OUR STORY */}

      <section className="about-story">

        <div className="story-image">
          <div className="story-image-box">
            🌸
          </div>
        </div>

        <div className="story-content">

          <p className="section-label">
            OUR STORY
          </p>

          <h2>
            Beauty is more than
            <br />
            just appearance.
          </h2>

          <p>
            BeautyBloom was created with one simple
            idea — everyone deserves to feel confident
            and beautiful in their own skin.
          </p>

          <p>
            From everyday skincare essentials to
            glamorous makeup and beautiful fragrances,
            we bring carefully selected beauty products
            together in one place.
          </p>

          <button>
            Explore Our Products
          </button>

        </div>

      </section>

      {/* WHY CHOOSE US */}

      <section className="why-beautybloom">

        <div className="section-heading">

          <p className="section-label">
            WHY BEAUTYBLOOM
          </p>

          <h2>
            Beauty shopping made better.
          </h2>

        </div>

        <div className="benefit-grid">

          <div className="benefit-card">

            <Sparkles />

            <h3>
              Premium Products
            </h3>

            <p>
              Carefully selected beauty products
              from trusted brands.
            </p>

          </div>

          <div className="benefit-card">

            <ShieldCheck />

            <h3>
              Authentic Products
            </h3>

            <p>
              Shop confidently with genuine
              beauty products.
            </p>

          </div>

          <div className="benefit-card">

            <Truck />

            <h3>
              Fast Delivery
            </h3>

            <p>
              Get your favorite beauty products
              delivered to your doorstep.
            </p>

          </div>

          <div className="benefit-card">

            <RefreshCcw />

            <h3>
              Easy Returns
            </h3>

            <p>
              Simple and convenient return
              experience.
            </p>

          </div>

        </div>

      </section>

      {/* MISSION */}

      <section className="about-mission">

        <Heart />

        <h2>
          Our mission is to help you
          <br />
          celebrate your beauty.
        </h2>

        <p>
          Because beauty isn't about being perfect.
          It's about feeling confident, comfortable
          and completely yourself.
        </p>

      </section>

    </div>
  );
}

export default About;