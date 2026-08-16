import { Link, useParams } from "react-router-dom";
import tours from "../data/tours";

function TourDetails() {
  const { id } = useParams();

  const tour = tours.find((tour) => tour.id === Number(id));

  if (!tour) {
    return (
      <main className="not-found">
        <h1>Tour Not Found</h1>
        <p>The tour you're looking for doesn't exist.</p>
        <Link to="/tours">Back to Tours</Link>
      </main>
    );
  }

  return (
    <main className="tour-details">
      <div className="details-image">
        <img src={tour.image} alt={tour.title} />
      </div>

      <div className="details-content">
        <p className="tour-location">{tour.location}</p>

        <h1>{tour.title}</h1>

        <p className="details-description">
          {tour.description}
        </p>

        <div className="details-info">
          <div>
            <span>Duration</span>
            <strong>{tour.duration}</strong>
          </div>

          <div>
            <span>Price</span>
            <strong>PKR {tour.price.toLocaleString()}</strong>
          </div>
        </div>

        <button className="book-button">
          Book This Tour
        </button>

        <Link to="/tours" className="back-link">
          ← Back to Tours
        </Link>
      </div>
    </main>
  );
}

export default TourDetails;