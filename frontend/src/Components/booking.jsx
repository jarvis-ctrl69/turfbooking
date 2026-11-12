import { useEffect, useState } from "react";
import axios from "axios";

function Bookings() {

  const [bookings, setBookings] =
    useState([]);

  const userEmail =
    localStorage.getItem(
      "userEmail"
    );

  useEffect(() => {

    axios
      .get(
        "http://localhost:5000/api/bookings"
      )
      .then((res) => {

        const userBookings =
          res.data.filter(
            (booking) =>
              booking.userEmail ===
              userEmail
          );

        setBookings(
          userBookings
        );

      })
      .catch((err) =>
        console.log(err)
      );

  }, []);

  return (
    <div className="page">

      <h1>My Bookings</h1>

      {bookings.map(
        (booking) => (

          <div
            key={booking._id}
            className="booking-card"
          >

            <h2>
              {booking.turfName}
            </h2>

            <p>
              Date :
              {booking.date}
            </p>

            <p>
              Slot :
              {booking.startTime}
            </p>

            <p>
              Duration :
              {booking.duration}
            </p>

            <p>
              Court :
              {booking.court}
            </p>

            <p>
              Amount :
              ₹
              {booking.totalPrice}
            </p>

            <p>
              Status :
              {booking.status}
            </p>

          </div>

        )
      )}

    </div>
  );
}

export default Bookings;