import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock
} from "lucide-react";

function Contact() {

  const [submitted, setSubmitted] =
    useState(false);

  const handleSubmit = (e) => {

    e.preventDefault();

    setSubmitted(true);

    e.target.reset();

  };

  return (
    <div className="contact-page">

      {/* HEADER */}

      <div className="page-heading">

        <p className="section-label">
          GET IN TOUCH
        </p>

        <h1>
          Contact BeautyBloom
        </h1>

        <p>
          We're here to help with your beauty
          shopping journey.
        </p>

      </div>

      <div className="contact-container">

        {/* CONTACT INFO */}

        <div className="contact-info">

          <h2>
            We'd love to hear from you.
          </h2>

          <p>
            Have a question about a product, your
            order, delivery or returns? Send us a
            message and our team will get back to you.
          </p>

          <div className="contact-detail">

            <Mail />

            <div>
              <span>Email</span>
              <strong>
                support@beautybloom.com
              </strong>
            </div>

          </div>

          <div className="contact-detail">

            <Phone />

            <div>
              <span>Phone</span>
              <strong>
                +91 98765 43210
              </strong>
            </div>

          </div>

          <div className="contact-detail">

            <MapPin />

            <div>
              <span>Location</span>
              <strong>
                Hyderabad, Telangana
              </strong>
            </div>

          </div>

          <div className="contact-detail">

            <Clock />

            <div>
              <span>Support Hours</span>
              <strong>
                Mon - Sat, 9 AM - 6 PM
              </strong>
            </div>

          </div>

        </div>

        {/* CONTACT FORM */}

        <div className="contact-form-box">

          {submitted ? (

            <div className="contact-success">

              <div className="success-circle">
                ✓
              </div>

              <h2>
                Message Sent!
              </h2>

              <p>
                Thank you for contacting BeautyBloom.
                We'll get back to you soon.
              </p>

              <button
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>

            </div>

          ) : (

            <form onSubmit={handleSubmit}>

              <h2>
                Send us a message
              </h2>

              <label>
                Your Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                required
              />

              <label>
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                required
              />

              <label>
                Subject
              </label>

              <input
                type="text"
                placeholder="What can we help with?"
                required
              />

              <label>
                Message
              </label>

              <textarea
                rows="6"
                placeholder="Write your message..."
                required
              />

              <button type="submit">
                Send Message
              </button>

            </form>

          )}

        </div>

      </div>

    </div>
  );
}

export default Contact;