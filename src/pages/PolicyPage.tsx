import Header from "../components/Header";

import Footer from "../components/Footer";
import PrivacyPolicy from "../components/PrivacyPolicy";

function PolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-16">
        {" "}
        {/* Added pt-16 to account for header height */}
        <PrivacyPolicy />
      </main>

      <Footer />
    </div>
  );
}

export default PolicyPage;
