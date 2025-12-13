import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, MessageSquareLock } from "lucide-react";
import toast from "react-hot-toast";

const ForgotPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const validatePassword = () => {
    if (!newPassword.trim()) {
      setPasswordError("Password is required");
      return false;
    }

    if (newPassword.length < 6) {
      setPasswordError("Minimum 6 characters required");
      return false;
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=\-]).{6,}$/;

    if (!strongPasswordRegex.test(newPassword)) {
      setPasswordError(
        "Must include uppercase, lowercase, number & special character"
      );
      return false;
    }

    setPasswordError("");
    return true;
  };

  const sendOtp = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }
    setLoading(true);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success("OTP sent to your email");
    setLoading(false);

    setStep(2);
  };

  const resetPassword = async () => {
    if (!validatePassword()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            otp,
            newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Password reset successful");
      navigate("/login");
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#F4F4F4]">
      <div className="main w-[90%] md:w-[60%] h-[80%] bg-white rounded-4xl shadow-2xl flex ">
        <div className="left w-full lg:w-[60%] flex flex-col   items-center justify-center ">
          <h1 className="text-4xl font-bold  playfair mb-3">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h1>

          <p className="text-sm text-gray-400 ">
            {step === 1
              ? "Enter your email to receive OTP"
              : "Enter OTP and new password"}
          </p>
          <div className="w-[70%]  mt-4 ">
            <div className="relative mb-4">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                disabled={step === 2}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-3 py-2  border rounded-lg outline-none border-gray-300 focus:border-2 focus:border-[#308357]`}
              />
            </div>

            {step === 2 && (
              <>
                <div className="relative mb-4">
                  <MessageSquareLock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none border-gray-300 focus:border-2 focus:border-[#308357]"
                  />
                </div>

                <div className="relative mb-4">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onBlur={validatePassword}
                    className="w-full pl-10 pr-10 py-2 border rounded-lg outline-none border-gray-300 focus:border-2 focus:border-[#308357]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2  -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {passwordError && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {passwordError}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="text-center">
              <button
                onClick={step === 1 ? sendOtp : resetPassword}
                disabled={loading}
                className={`p-1 px-10 rounded-lg text-[#f4f4f4] transition
      ${
        loading
          ? "bg-[#2ba58d] cursor-not-allowed"
          : "bg-[#2ba58d] hover:bg-[#11bb99] cursor-pointer"
      }`}
              >
                {loading
                  ? step === 1
                    ? "SENDING..."
                    : "RESETTING..."
                  : step === 1
                  ? "SEND OTP"
                  : "RESET PASSWORD"}
              </button>
            </div>
          </div>
          <p className=" mt-4 text-[#8b9492]">
            Already an Existing User ?{" "}
            <Link to={"/login"} className="text-[#2ba58d] hover:underline ">
              Sign In
            </Link>
          </p>
        </div>

        <div className="right w-[40%] h-full gradient rounded-r-4xl hidden lg:block ">
          <div className="h-full flex flex-col justify-center items-center ">
            <h1 className="playfair text-4xl text-[#F4F4F4] font-bold">
              Hello, Friend !
            </h1>
            <p className="text-sm text-[#f4f4f496] mb-4 text-center">
              Enter your personal deatils and start <br /> journey with us
            </p>
            <Link
              to={"/signup"}
              className="bg-[#2ba58d] p-2 px-10 rounded-lg cursor-pointer text-[#f4f4f4]"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPage;
