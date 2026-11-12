import { QRCodeCanvas } from "qrcode.react";

function Ticket() {

  const booking =
    JSON.parse(
      localStorage.getItem(
        "latestBooking"
      )
    );

  if (!booking) {
    return <h2>No Booking Found</h2>;
  }

  const qrData = JSON.stringify({
    bookingId: booking._id,
    turfName: booking.turfName,
    date: booking.date,
    slot: booking.startTime,
    court: booking.court,
  });

  return (
    <div className="ticket-page">

      <h1>
        Booking Confirmed
      </h1>

      <h2>
        {booking.turfName}
      </h2>

      <p>
        Date : {booking.date}
      </p>

      <p>
        Slot : {booking.startTime}
      </p>

      <p>
        Court : {booking.court}
      </p>

      <QRCodeCanvas
        value={qrData}
        size={250}
      />

    </div>
  );
}

export default Ticket;