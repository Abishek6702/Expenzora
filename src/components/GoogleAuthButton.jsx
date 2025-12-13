import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GoogleAuthButton = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // ✅ THIS IS THE ID TOKEN
      const idToken = credentialResponse.credential;

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: idToken }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Google authentication failed");
        return;
      }

      localStorage.setItem("token", data.token);
      toast.success("Login Sucessful");
      navigate("/dashboard");
    } catch {
      toast.error("Network error");
    }
  };

  return (
    <div className="flex justify-center mb-3">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => toast.error("Google Sign-In failed")}
        useOneTap={false}
      />
    </div>
  );
};

export default GoogleAuthButton;
