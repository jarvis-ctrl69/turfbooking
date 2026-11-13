import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";


function AdminDashboard() {

  const navigate = useNavigate();

  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {

    const admin =
      localStorage.getItem(
        "admin"
      );

    if (!admin) {
      navigate("/admin-login");
      return;
    }

    axios
      .get(
        `${API_URL}/api/bookings`
      )
      .then((res) => {

        setBookings(
          res.data
        );

      })
      .catch((err) =>
        console.log(err)
      );

  }, []);

  const deleteBooking = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this booking?"
    );

  if (!confirmDelete) return;

  try {

    await axios.delete(
      `${API_URL}/api/bookings/${id}`
    );

    setBookings(
      bookings.filter(
        (booking) =>
          booking._id !== id
      )
    );

    alert(
      "Booking Deleted"
    );

  } catch (error) {

    console.log(error);

    alert(
      "Delete Failed"
    );

  }

};

  const logout = () => {

    localStorage.removeItem(
      "admin"
    );

    navigate("/admin-login");
  };

  return (
    <div className="admin-page">

      <div className="admin-header">

        <h1>
          Admin Dashboard
        </h1>

        <button
          onClick={logout}
        >
          Logout
        </button>

      </div>

      <h2>
        All Bookings
      </h2>

      <table className="admin-table">

        <thead>

          <tr>

            <th>User</th>

            <th>Turf</th>

            <th>Sport</th>

            <th>Date</th>

            <th>Slot</th>

            <th>Court</th>

            <th>Amount</th>

          </tr>

        </thead>

        <tbody>

          {bookings.map(
            (booking) => (

              <tr
                key={
                  booking._id
                }
              >

                <td>
                  {
                    booking.userEmail
                  }
                </td>

                <td>
                  {
                    booking.turfName
                  }
                </td>

                <td>
                  {
                    booking.sport
                  }
                </td>

                <td>
                  {
                    booking.date
                  }
                </td>

                <td>
                  {
                    booking.startTime
                  }
                </td>

                <td>
                  {
                    booking.court
                  }
                </td>

                <td>
                  ₹
                  {
                    booking.totalPrice
                  }
                </td>

                <td>

  <button
    className="delete-btn"
    onClick={() =>
      deleteBooking(
        booking._id
      )
    }
  >
    Delete
  </button>

</td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}

export default AdminDashboard;