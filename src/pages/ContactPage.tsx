import Header from "../components/Header";

import Footer from "../components/Footer";

import Contact from "../components/Contact";

function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-16">
        {" "}
        {/* Added pt-16 to account for header height */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default ContactPage;
