import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function Admission() {
  return (
    <div>
      <Navbar />

      <div className="pt-20 max-w-5xl mx-auto px-6 py-12 space-y-12">

        <h1 className="text-4xl font-bold text-blue-900 text-center">
          Admission
        </h1>

        {/* Instructions */}
        <section className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">How to Apply</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Fill out the online application form completely.</li>
            <li>Attach required documents like birth certificate, previous school records, etc.</li>
            <li>Submit the form before the admission deadline.</li>
            <li>Attend the entrance test/interview (if applicable).</li>
            <li>Receive confirmation and payment details.</li>
          </ul>
        </section>

        {/* Eligibility */}
        <section className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">Eligibility Criteria</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Age criteria as per class applied for.</li>
            <li>Previous academic performance.</li>
            <li>Completion of necessary prerequisites for higher classes.</li>
          </ul>
        </section>

        {/* Admission Form Placeholder */}
        <section className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">Admission Form</h2>
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Student Name" className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"/>
            <input type="email" placeholder="Parent Email" className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"/>
            <input type="text" placeholder="Class Applying For" className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"/>
            <textarea rows="4" placeholder="Additional Information" className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-400"></textarea>
            <button className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              Submit Application
            </button>
          </form>
        </section>

      </div>

      <Footer />
    </div>
  );
}

export default Admission;