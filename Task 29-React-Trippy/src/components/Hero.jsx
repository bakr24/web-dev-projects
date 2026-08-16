function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <p className="hero-subtitle">Explore the world</p>

          <h1>Discover Your Next Adventure</h1>

          <p className="hero-description">
            Find amazing destinations, exciting tours, and unforgettable
            experiences around the world.
          </p>

          <div className="hero-buttons">
            <a href="/tours" className="hero-button primary">
              Explore Tours
            </a>

            <a href="/about" className="hero-button secondary">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;