import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Booking() {

  const navigate = useNavigate();

  const turf = JSON.parse(
    localStorage.getItem("selectedTurf")
  );

  const userEmail =
    localStorage.getItem("userEmail");

  const [date, setDate] =
    useState("");

  const [court, setCourt] =
    useState("");

  const [selectedSlot, setSelectedSlot] =
    useState("");

  const [bookedSlots, setBookedSlots] =
    useState([]);

  const slots = [
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
    "8:00 PM - 9:00 PM",
    "9:00 PM - 10:00 PM",
  ];

  useEffect(() => {

    if (!date || !turf) return;

    axios
      .get(
        "http://localhost:5000/api/bookings"
      )
      .then((res) => {

        const filtered =
          res.data.filter(
            (booking) =>
              booking.turfName ===
                turf.turfName &&
              booking.date === date
          );

        setBookedSlots(
          filtered.map(
            (booking) =>
              booking.startTime
          )
        );

      })
      .catch((err) =>
        console.log(err)
      );

  }, [date, turf]);

  const totalPrice =
    turf?.price || 0;

  const handleBooking =
    async () => {

      if (!date) {
        alert(
          "Please Select Date"
        );
        return;
      }

      if (!selectedSlot) {
        alert(
          "Please Select Slot"
        );
        return;
      }

      if (!court) {
        alert(
          "Please Select Court"
        );
        return;
      }

      try {

        await axios.post(
          "http://localhost:5000/api/booking",
          {
            userEmail,
            turfName:
              turf.turfName,
            sport:
              turf.sport,
            date,
            startTime:
              selectedSlot,
            court,
            totalPrice,
          }
        );

        localStorage.setItem(
          "latestBooking",
          JSON.stringify({
            turfName:
              turf.turfName,
            sport:
              turf.sport,
            date,
            startTime:
              selectedSlot,
            court,
            totalPrice,
          })
        );

        alert(
          "Booking Confirmed"
        );

        navigate("/ticket");

      } catch (error) {

        console.log(error);

        alert(
          "Booking Failed"
        );

      }
    };

  if (!turf) {
    return (
      <h2>
        No Turf Selected
      </h2>
    );
  }

  return (
    <div className="booking-page">

      <div className="booking-card">

        <div className="booking-header">

          <h2>
            {turf.turfName}
          </h2>

          <p>
            📍 {turf.location}
          </p>

          <p>
            🏆 {turf.sport}
          </p>

          <p>
            ₹{turf.price}/Hour
          </p>

        </div>

        <div className="form-group">

          <label>
            Select Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
          />

        </div>

        {date && (

          <div className="form-group">

            <label>
              Available Slots
            </label>

            <div className="slot-container">

              {slots.map(
                (slot) => {

                  const booked =
                    bookedSlots.includes(
                      slot
                    );

                  return (

                    <button
                      key={slot}
                      type="button"
                      disabled={
                        booked
                      }
                      className={
                        selectedSlot === slot
                          ? "slot-btn active"
                          : "slot-btn"
                      }
                      onClick={() =>
                        setSelectedSlot(
                          slot
                        )
                      }
                    >

                      {booked
                        ? `${slot} (Booked)`
                        : slot}

                    </button>

                  );
                }
              )}

            </div>

          </div>

        )}

        <div className="form-group">

          <label>
            Court
          </label>

          <select
            value={court}
            onChange={(e) =>
              setCourt(
                e.target.value
              )
            }
          >

            <option value="">
              Select Court
            </option>

            <option>
              Court 1
            </option>

            <option>
              Court 2
            </option>

            <option>
              Court 3
            </option>

          </select>

        </div>

        <div className="price-box">

          Total Price :
          ₹{totalPrice}

        </div>

        <button
          className="book-btn"
          onClick={
            handleBooking
          }
        >
          Confirm Booking
        </button>

      </div>

    </div>
  );
}

export default Booking;