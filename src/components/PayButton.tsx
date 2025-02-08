import React, { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
const PayButton = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(`${apiUrl}/auth/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserId(data.id); // Store the user ID
        }
      }
    };

    fetchUserInfo();
  }, []);

  const handlePay = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found!");
      return;
    }

    try {
      if (userId !== null) {
        // Create FormData
        const formData = new FormData();
        formData.append("user_id", userId.toString());

        // Send payment request (POST request with FormData)
        const payResponse = await fetch(`${apiUrl}/pay/phone`, {
          method: "POST",
          body: formData, // 🔹 Sending form data
        });

        if (!payResponse.ok) {
          throw new Error("Payment request failed");
        }

        // Get the payment URL from the response
        const payData = await payResponse.json();
        console.log(payData);
        const paymentUrl = payData.payment_url; // 🔹 Get the payment URL from response

        // Redirect manually in frontend
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error("Error:");
    }
  };

  return (
    <button
      onClick={handlePay}
      style={{ padding: "10px 20px", fontSize: "16px" }}
    >
      Pay Now
    </button>
  );
};

export default PayButton;
