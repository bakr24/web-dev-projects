import tours from "../data/tours";
import TourCard from "../components/TourCard";

function Tours() {
  return (
    <main className="tours-page">
      <div className="page-header">
        <p>Explore our tours</p>
        <h1>Find Your Next Adventure</h1>
      </div>

      <section className="tour-grid">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </section>
    </main>
  );
}

export default Tours;