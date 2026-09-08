import { useState } from "react";

function Settings() {

  const [notifications, setNotifications] =
    useState(true);

  const [offers, setOffers] =
    useState(true);

  return (
    <div className="settings-page">

      <div className="page-heading">

        <h1>Account Settings</h1>

        <p>
          Manage your BeautyBloom preferences.
        </p>

      </div>

      <div className="settings-container">

        <div className="settings-card">

          <h2>Notifications</h2>

          <div className="setting-row">

            <div>
              <h3>Order Updates</h3>
              <p>
                Receive notifications about your orders.
              </p>
            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={notifications}
                onChange={() =>
                  setNotifications(!notifications)
                }
              />

              <span></span>

            </label>

          </div>

          <div className="setting-row">

            <div>
              <h3>Beauty Offers</h3>
              <p>
                Receive updates about new offers.
              </p>
            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={offers}
                onChange={() =>
                  setOffers(!offers)
                }
              />

              <span></span>

            </label>

          </div>

        </div>

        <div className="settings-card">

          <h2>Privacy & Security</h2>

          <button className="settings-button">
            Change Password
          </button>

          <button className="settings-button">
            Privacy Settings
          </button>

        </div>

        <div className="settings-card danger-zone">

          <h2>Account</h2>

          <button className="delete-account">
            Delete Account
          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;