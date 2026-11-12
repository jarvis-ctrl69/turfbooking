import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const handleBookNow = (turf) => {
    localStorage.setItem(
      "selectedTurf",
      JSON.stringify(turf)
    );

    const userEmail =
      localStorage.getItem("userEmail");

    if (!userEmail) {
      navigate("/login");
    } else {
      navigate("/booking");
    }
  };

  return (
    <div>

      {/* Navbar */}
      <nav className="navbar">

        <h1 className="logo">
          TurfBook
        </h1>

        <ul className="nav-links">

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/bookings">Bookings</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>

          <li>
            <Link to="/register">Register</Link>
          </li>

        </ul>

      </nav>

      {/* Hero Section */}
      <section className="hero">

        <div className="overlay">

          <div className="hero-content">

            <h1>
              Bangalore's Favourite
              <br />
              Sports Booking Platform
            </h1>

            <p>
              Book football turfs,
              cricket grounds and
              badminton courts across
              Bangalore with real-time
              availability and instant
              booking confirmation.
            </p>

            <div className="hero-buttons">

              <Link to="/turfs">
                <button className="primary-btn">
                  Explore Turfs
                </button>
              </Link>

              <Link to="/register">
                <button className="secondary-btn">
                  Get Started
                </button>
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="features">

        <h2>
          Why Choose TurfBook?
        </h2>

        <div className="feature-cards">

          <div className="card">

            <h3>
               Instant Booking
            </h3>

            <p>
              Book your favorite turf
              in seconds with real-time
              slot availability.
            </p>

          </div>

          <div className="card">

            <h3>
               Premium Venues
            </h3>

            <p>
              Discover top-rated
              football, cricket and
              badminton facilities
              across Bangalore.
            </p>

          </div>

          <div className="card">

            <h3>
               Multiple Locations
            </h3>

            <p>
              HSR Layout,
              Koramangala,
              Whitefield,
              Indiranagar and more.
            </p>

          </div>

        </div>

      </section>

      {/* Popular Turfs */}
      <section className="turfs">

        <h2>
          Popular Turfs In Bangalore
        </h2>

        <div className="turf-cards">

          {/* Football */}

          <div className="turf-card">

            <img
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop"
              alt="Football Arena"
            />

            <div className="turf-info">

              <h3>
                Football Arena
              </h3>

              <p>
                HSR Layout • 5v5 Football • Floodlights
              </p>

              <button
                onClick={() =>
                  handleBookNow({
                    turfName:
                      "Football Arena",
                    location:
                      "HSR Layout, Bangalore",
                    sport:
                      "Football",
                    price: 1200,
                  })
                }
              >
                Book Now
              </button>

            </div>

          </div>

          {/* Cricket */}

          <div className="turf-card">

            <img
              src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format&fit=crop"
              alt="Cricket Turf"
            />

            <div className="turf-info">

              <h3>
                Champions Cricket Turf
              </h3>

              <p>
                Whitefield • Box Cricket • Night Matches
              </p>

              <button
                onClick={() =>
                  handleBookNow({
                    turfName:
                      "Champions Cricket Turf",
                    location:
                      "Whitefield, Bangalore",
                    sport:
                      "Cricket",
                    price: 1500,
                  })
                }
              >
                Book Now
              </button>

            </div>

          </div>

          {/* Badminton */}

          <div className="turf-card">

            <img
              src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1200&auto=format&fit=crop"
              alt="Badminton Court"
            />

            <div className="turf-info">

              <h3>
                Elite Badminton Court
              </h3>

              <p>
                Koramangala • Indoor Courts • AC Facility
              </p>

              <button
                onClick={() =>
                  handleBookNow({
                    turfName:
                      "Elite Badminton Court",
                    location:
                      "Koramangala, Bangalore",
                    sport:
                      "Badminton",
                    price: 800,
                  })
                }
              >
                Book Now
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* Stats */}
      <section className="stats">

        <div className="stat-box">
          <h2>50+</h2>
          <p>Sports Venues</p>
        </div>

        <div className="stat-box">
          <h2>10,000+</h2>
          <p>Bookings Completed</p>
        </div>

        <div className="stat-box">
          <h2>25+</h2>
          <p>Locations Covered</p>
        </div>

        <div className="stat-box">
          <h2>4.8★</h2>
          <p>Average Rating</p>
        </div>

      </section>

      {/* CTA */}
      <section className="cta-section">

        <h2>
          Ready To Play?
        </h2>

        <p>
          Join thousands of players
          booking sports venues
          every day with TurfBook.
        </p>

        <Link to="/register">

          <button>
            Start Booking
          </button>

        </Link>

      </section>

      {/* Footer */}
      <footer className="footer">

        <button>
          <Link to="/admin-login">
           © 2026 TurfBook Bangalore. All rights reserved.
           </Link>
        </button>
         

        <p>
          Football • Cricket • Badminton
        </p>


      </footer>

    </div>
  );
}

export default Homepage;