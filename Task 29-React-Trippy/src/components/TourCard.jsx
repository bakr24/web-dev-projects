import { Link } from "react-router-dom";

function TourCard({ tour }) {
  return (
    <article className="tour-card">
      <img
        src={tour.image}
        alt={tour.title}
        className="tour-image"
      />

      <div className="tour-content">
        <p className="tour-location">{tour.location}</p>

        <h3>{tour.title}</h3>

        <p className="tour-description">
          {tour.description}
        </p>

        <div className="tour-info">
          <span>{tour.duration}</span>
          <strong>PKR {tour.price.toLocaleString()}</strong>
        </div>

        <Link to={`/tours/${tour.id}`} className="tour-button">
          View Details
        </Link>
      </div>
    </article>
  );
}

export default TourCard;