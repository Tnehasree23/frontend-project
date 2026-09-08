import { useState } from "react";
import { MapPin, Plus, Trash2 } from "lucide-react";

function Addresses() {

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "BeautyBloom User",
      phone: "+91 XXXXX XXXXX",
      address: "12-34, Main Road",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500001"
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    type: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addAddress = (e) => {
    e.preventDefault();

    setAddresses([
      ...addresses,
      {
        ...form,
        id: Date.now()
      }
    ]);

    setForm({
      type: "",
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: ""
    });

    setShowForm(false);
  };

  const deleteAddress = (id) => {
    setAddresses(
      addresses.filter(
        (address) => address.id !== id
      )
    );
  };

  return (
    <div className="addresses-page">

      <div className="page-heading">

        <h1>My Addresses</h1>

        <p>
          Manage your delivery addresses.
        </p>

      </div>

      <div className="addresses-container">

        <button
          className="add-address-button"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          Add New Address
        </button>

        {showForm && (

          <form
            className="address-form"
            onSubmit={addAddress}
          >

            <h2>Add New Address</h2>

            <input
              name="type"
              placeholder="Address Type (Home/Work)"
              value={form.type}
              onChange={handleChange}
              required
            />

            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              placeholder="Complete Address"
              value={form.address}
              onChange={handleChange}
              required
            />

            <div className="address-row">

              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                required
              />

              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                required
              />

              <input
                name="pincode"
                placeholder="PIN Code"
                value={form.pincode}
                onChange={handleChange}
                required
              />

            </div>

            <button type="submit">
              Save Address
            </button>

          </form>

        )}

        <div className="address-list">

          {addresses.map((address) => (

            <div
              className="address-card"
              key={address.id}
            >

              <div className="address-card-header">

                <div>
                  <MapPin size={20} />
                  <strong>
                    {address.type || "Address"}
                  </strong>
                </div>

                <button
                  onClick={() =>
                    deleteAddress(address.id)
                  }
                  className="delete-address"
                >
                  <Trash2 size={18} />
                </button>

              </div>

              <h3>{address.name}</h3>

              <p>{address.phone}</p>

              <p>{address.address}</p>

              <p>
                {address.city}, {address.state} -{" "}
                {address.pincode}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Addresses;