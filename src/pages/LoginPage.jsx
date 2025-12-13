import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import google from "../assets/google.svg"
import toast from "react-hot-toast";
import GoogleAuthButton from "../components/GoogleAuthButton";
const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
  };

  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const isFormValid =
    email.trim() !== "" &&
    password.trim() !== "" &&
    emailError === "" &&
    passwordError === "";

  const handleLogin = async () => {
    const payload = { email, password };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Login failed:", data);
        toast.error(data.message);

        return;
      }

      localStorage.setItem("token", data.token);
      toast.success("Login Sucessful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#F4F4F4] ">
      <div className="main w-[90%] md:w-[60%] h-[80%] bg-[#ffffff]  rounded-4xl shadow-2xl flex ietms-center">
        <div className="left w-full    lg:w-[60%] rounded-l-4xl">
          <div className="h-full flex flex-col justify-center items-center">
            <h1 className="text-2xl md:text-4xl font-bold playfair mb-3 text-[#313740] ">
              Sign in to Expenzora
            </h1>
            <GoogleAuthButton text="Continue with Google" />

            <p className="mb-4 text-sm text-[#8b9492]">or use your account</p>
            <div className="w-[70%] space-y-5">
              <div>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={validateEmail}
                    className={`w-full pl-10 pr-3 py-2  border rounded-lg outline-none border-gray-300 focus:border-2 focus:border-[#308357]`}
                  />
                </div>

                {emailError && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{emailError}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={validatePassword}
                    className={`w-full pl-10  pr-10 py-2 border rounded-lg outline-none border-gray-300 focus:border-2 focus:border-[#308357]`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2  -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {passwordError && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {passwordError}
                  </p>
                )}
              </div>
            </div>

            <Link
              to={"/forgot"}
              className="mb-4  mt-4 text-sm text-[#8b9492] hover:underline hover:text-[#28ae67]"
            >
              Forgot your password?
            </Link>
            <button
              onClick={handleLogin}
              disabled={!isFormValid}
              className={`p-1 px-10 rounded-lg text-[#f4f4f4] transition
                ${
                  isFormValid
                    ? "bg-[#2ba58d] hover:bg-[#11bb99] cursor-pointer"
                    : "bg-[#2ba58d91] cursor-not-allowed"
                }`}
            >
              SIGN IN
            </button>
            <p className="lg:hidden mt-4 text-[#8b9492]">
              Don't have an account ?{" "}
              <Link to={"/signup"} className="text-[#2ba58d] hover:underline ">
                Sign Up
              </Link>
            </p>
          </div>
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

export default LoginPage;
