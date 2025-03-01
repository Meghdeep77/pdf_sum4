import { useEffect, useState } from "react";
import axios from "axios";
import PayButton from "./PayButton";
import { CheckCircle } from "lucide-react";

export default function Pricing() {
  const [subscribed, setSubscribed] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL; // Use environment variable for API

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        if (!token) return;

        const response = await axios.get(`${apiUrl}/auth/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.sub === "True") {
          setSubscribed(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-lg bg-white shadow-2xl rounded-2xl overflow-hidden p-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Unlock PDF_SUM
        </h1>

        {subscribed ? (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
            <CheckCircle className="inline-block mr-2" size={20} />
            You have already subscribed!
          </div>
        ) : (
          <>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Get{" "}
              <span className="font-semibold text-gray-900">
                unlimited access
              </span>{" "}
              to PDF_SUM with a
              <span className="font-semibold text-indigo-600">
                {" "}
                one-time payment
              </span>{" "}
              of just <span className="font-bold text-gray-900">₹100</span>.
            </p>

            <div className="bg-indigo-100 p-5 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-indigo-900 mb-4">
                Why Buy PDF_SUM?
              </h2>
              <ul className="text-gray-800 text-left space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} /> One-time
                  payment, unlimited access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} /> Simple &
                  secure UPI payment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} /> No card
                  details stored – privacy first
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} /> Designed
                  for Indian university students
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <PayButton />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
