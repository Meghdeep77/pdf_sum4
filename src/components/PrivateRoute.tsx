import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
// Function to check if the token is valid (via server)
const isTokenExpired = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${apiUrl}/auth/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Send the token to the server
      },
    });

    if (response.ok) {
      const data = await response.json();
      return false; // Token is valid
    } else {
      return true; // Token is invalid or expired
    }
  } catch (error) {
    console.error("Error validating token:", error);
    return true; // Error during validation, consider the token invalid
  }
};

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Store authentication status
  const token = localStorage.getItem("token"); // Get the token from localStorage

  useEffect(() => {
    if (token) {
      // Check if the token is expired by calling the server
      isTokenExpired(token).then((expired) => {
        setIsAuthenticated(!expired); // Set authentication status based on server response
      });
    } else {
      setIsAuthenticated(false); // No token found, not authenticated
    }
  }, [token]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show a loading state while validating the token
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} /> // Render the component if authenticated
        ) : (
          <Redirect to="/login" /> // Redirect to login if not authenticated
        )
      }
    />
  );
};

export default PrivateRoute;
