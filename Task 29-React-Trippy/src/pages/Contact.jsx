function Contact() {
  return (
    <main className="contact-page">
      <h1>Contact Us</h1>

      <form className="contact-form">
        <input
          type="text"
          placeholder="Your Name"
        />

        <input
          type="email"
          placeholder="Your Email"
        />

        <textarea
          placeholder="Your Message"
          rows="6"
        ></textarea>

        <button type="submit">Send Message</button>
      </form>
    </main>
  );
}

export default Contact;