export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>

            <section className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                We're here to help! If you have questions, suggestions, or just
                want to say hello, reach out to us. Your feedback is crucial for
                making PDF_SUM better for everyone.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Email us at:{" "}
                <a
                  href="mailto:pdf_sum@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  PdfSum@gmail.com
                </a>
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                What to Include in Your Email
              </h2>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
                <li>Your Name</li>
                <li>Your University or College (optional)</li>
                <li>The Subject of Your Query</li>
                <li>A Detailed Description of Your Question or Feedback</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                Response Time
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We aim to respond to all inquiries within 48 hours. However,
                during peak times like exam periods, responses might take a bit
                longer. Thank you for your patience!
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
                Stay Connected
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Don't forget to check out our other pages for updates, features,
                and tips on how to make the most out of PDF_SUM during your exam
                preparation.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
