import Header from "./components/Header";
import Pdf_upload from "./components/Pdf_upload";
import Footer from "./components/Footer";

function Summ() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <Pdf_upload />
      </main>

      <Footer />
    </div>
  );
}

export default Summ;
