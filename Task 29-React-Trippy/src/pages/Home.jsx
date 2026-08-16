import Hero from "../components/Hero";

function Home() {
  return (
    <main>
      <Hero />

      <section className="intro">
        <h2>Popular Destinations</h2>
        <p>
          Explore some of the most beautiful places around the world.
        </p>
      </section>
    </main>
  );
}

export default Home;