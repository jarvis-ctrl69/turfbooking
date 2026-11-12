const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/turfbooking";

/* ==========================
   MIDDLEWARE
========================== */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ==========================
   MONGODB CONNECTION
========================== */

mongoose
  .connect(mongoUri)
  .then(() =>
    console.log("MongoDB Connected")
  )
  .catch((err) =>
    console.log(err)
  );

/* ==========================
   USER SCHEMA
========================== */

const UserSchema =
  new mongoose.Schema(
    {
      name: String,

      email: {
        type: String,
        unique: true,
      },

      password: String,
    },
    {
      collection: "users",
    }
  );

const User =
  mongoose.model(
    "User",
    UserSchema
  );

/* ==========================
   TURF SCHEMA
========================== */

const TurfSchema =
  new mongoose.Schema(
    {
      turfName: String,

      location: String,

      sport: String,

      price: Number,

      image: String,
    },
    {
      collection: "turfs",
    }
  );

const Turf =
  mongoose.model(
    "Turf",
    TurfSchema
  );

/* ==========================
   BOOKING SCHEMA
========================== */

const BookingSchema =
  new mongoose.Schema(
    {
      userEmail: String,

      turfName: String,

      sport: String,

      date: String,

      startTime: String,

      court: String,

      totalPrice: Number,

      status: {
        type: String,
        default: "Confirmed",
      },
    },
    {
      collection: "bookings",
    }
  );

const Booking =
  mongoose.model(
    "Booking",
    BookingSchema
  );

/* ==========================
   REGISTER USER
========================== */

app.post(
  "/api/register",
  async (req, res) => {
    try {

      const user =
        new User({
          name:
            req.body.name,

          email:
            req.body.email,

          password:
            req.body.password,
        });

      await user.save();

      res.status(200).json({
        success: true,
        message:
          "User Registered Successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Registration Failed",
      });

    }
  }
);

/* ==========================
   LOGIN USER
========================== */

app.post(
  "/api/login",
  async (req, res) => {
    try {

      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
          password,
        });

      if (user) {

        res.status(200).json({
          success: true,
          message:
            "Login Successful",
          user,
        });

      } else {

        res.status(401).json({
          success: false,
          message:
            "Invalid Email or Password",
        });

      }

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
      });

    }
  }
);

/* ==========================
   GET ALL USERS
========================== */

app.get(
  "/api/users",
  async (req, res) => {
    try {

      const users =
        await User.find();

      res.status(200).json(
        users
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Error Fetching Users",
      });

    }
  }
);

/* ==========================
   ADD TURF
========================== */

app.post(
  "/api/turfs",
  async (req, res) => {
    try {

      const turf =
        new Turf({
          turfName:
            req.body.turfName,

          location:
            req.body.location,

          sport:
            req.body.sport,

          price:
            req.body.price,

          image:
            req.body.image,
        });

      await turf.save();

      res.status(200).json({
        success: true,
        message:
          "Turf Added Successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Error Adding Turf",
      });

    }
  }
);

/* ==========================
   GET ALL TURFS
========================== */

app.get(
  "/api/turfs",
  async (req, res) => {
    try {

      const turfs =
        await Turf.find();

      res.status(200).json(
        turfs
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Error Fetching Turfs",
      });

    }
  }
);

/* ==========================
   CREATE BOOKING
========================== */

app.post(
  "/api/booking",
  async (req, res) => {
    try {

      const booking =
        new Booking({
          userEmail:
            req.body.userEmail,

          turfName:
            req.body.turfName,

          sport:
            req.body.sport,

          date:
            req.body.date,

          startTime:
            req.body.startTime,

          court:
            req.body.court,

          totalPrice:
            req.body.totalPrice,
        });

      await booking.save();

      res.status(200).json({
        success: true,
        message:
          "Booking Successful",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Booking Failed",
      });

    }
  }
);

/* ==========================
   GET ALL BOOKINGS
========================== */

app.get(
  "/api/bookings",
  async (req, res) => {
    try {

      const bookings =
        await Booking.find();

      res.status(200).json(
        bookings
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Error Fetching Bookings",
      });

    }
  }
);

/* ==========================
   DELETE BOOKING
========================== */

app.delete(
  "/api/bookings/:id",
  async (req, res) => {
    try {

      await Booking.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Booking Deleted",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Delete Failed",
      });

    }
  }
);




/* ==========================
   HOME ROUTE
========================== */

app.get("/", (req, res) => {
  res.send(
    "Turf Booking Backend Running"
  );
});

/* ==========================
   START SERVER
========================== */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'turf-booking-api' });
});
app.listen(port, () => {
  console.log(
    `Server Running On Port ${port}`
  );
});