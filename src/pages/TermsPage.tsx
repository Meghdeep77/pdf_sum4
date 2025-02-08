import Header from "../components/Header";

import Footer from "../components/Footer";
import TermsAndConditions from "../components/TermsAndConditions";

function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-16">
        {" "}
        {/* Added pt-16 to account for header height */}
        <TermsAndConditions />
      </main>

      <Footer />
    </div>
  );
}

export default TermsPage;
