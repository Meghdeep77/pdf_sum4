import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const PaymentStatus: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("PENDING");
  const history = useHistory();

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${apiUrl}/auth/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const data = await response.json();
            setUserId(data.id);
          } else {
            console.error("Failed to fetch user ID");
          }
        } catch (error) {
          console.error("Error fetching user ID:", error);
        }
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const checkStatus = async () => {
      if (!userId) return;

      try {
        const formData = new FormData();
        formData.append("user_id", userId);

        const response = await fetch(`${apiUrl}/pay/status`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        setStatus(data.status);
      } catch (error) {
        console.error("Error checking status:", error);
      }
    };

    const interval = setInterval(() => {
      if (status === "PENDING" && userId) checkStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [userId, status]);

  useEffect(() => {
    if (status === "COMPLETED") {
      setTimeout(() => history.push("/"), 2000);
    } else if (status === "FAILED") {
      setTimeout(() => history.push("/pricing"), 2000);
    }
  }, [status, history]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        {status === "PENDING" ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="mt-4 text-lg font-semibold text-gray-700">
              Please wait while we confirm your transaction...
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Transaction Status: {status}
            </h2>
            {status === "COMPLETED" && (
              <p className="text-green-600 text-lg mt-2">
                Payment Successful! 🎉
              </p>
            )}
            {status === "FAILED" && (
              <p className="text-red-600 text-lg mt-2">Payment Failed. ❌</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
