import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import toast from "react-hot-toast";
import google from "../assets/google.svg"
import GoogleAuthButton from "../components/GoogleAuthButton";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [passwordScore, setPasswordScore] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateName = () => {
    if (!name.trim()) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };
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
      return;
    }

    if (password.length < 6) {
      setPasswordError("Minimum 6 characters required");
      return;
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=\-]).{6,}$/;

    if (!strongPasswordRegex.test(password)) {
      setPasswordError(
        "Must include uppercase, lowercase, number & special character"
      );
      return;
    }

    setPasswordError("");
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirm your password");
      return;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    setConfirmPasswordError("");
  };
  const getPasswordScore = (password) => {
    let score = 0;

    if (password.length >= 6) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&#^()_+=\-]/.test(password)) score++;

    return score; // 0 - 5
  };

  const isFormValid =
    name.trim() &&
    email.trim() &&
    password.trim() &&
    confirmPassword.trim() &&
    !nameError &&
    !emailError &&
    !passwordError &&
    !confirmPasswordError;

  const handleRegister = async () => {
    const payload = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#F4F4F4] ">
      <div className="main w-[90%] md:w-[60%] h-[80%] bg-[#ffffff]  rounded-4xl shadow-2xl flex ietms-center">
        <div className="right w-[40%] h-full gradient rounded-l-4xl hidden lg:block ">
          <div className="h-full flex flex-col justify-center items-center ">
            <h1 className="playfair text-4xl text-[#F4F4F4] font-bold">
              Welcome Back !
            </h1>
            <p className="text-sm text-[#f4f4f496] mb-4">
              Log in to manage your expenses
            </p>
            <Link
              to={"/login"}
              className="bg-[#2ba58d] p-2 px-10 rounded-lg cursor-pointer text-[#f4f4f4]"
            >
              SIGN IN
            </Link>
          </div>
        </div>
        <div className="left w-full    lg:w-[60%] rounded-l-4xl">
          <div className="h-full flex flex-col justify-center items-center">
            <h1 className="text-2xl md:text-4xl font-bold playfair mb-2 text-[#313740] ">
              Create Account
            </h1>
            <GoogleAuthButton text="Continue with Google" />

            <p className="mb-4 text-sm text-[#8b9492]">
              or use your email for registeration
            </p>
            <div className="w-[70%] space-y-5">
              <div className="">
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={validateName}
                    className={`w-full pl-10 pr-3 py-2  border rounded-lg outline-none border-gray-300 focus:border-2 focus:border-[#308357]`}
                  />
                </div>

                {nameError && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{nameError}</p>
                )}
              </div>
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
                    onChange={(e) => {
                      const value = e.target.value;
                      setPassword(value);
                      setPasswordScore(getPasswordScore(value));
                    }}
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
              {password && (
                <div className="-mt-3">
                  <p className="text-xs text-gray-500 mb-1">
                    Password strength
                  </p>

                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => {
                      let color = "bg-gray-200";

                      if (passwordScore >= level) {
                        if (passwordScore <= 2) color = "bg-red-500";
                        else if (passwordScore <= 4) color = "bg-yellow-400";
                        else color = "bg-green-500";
                      }

                      return (
                        <div
                          key={level}
                          className={`h-1.5 w-full rounded ${color}`}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={validateConfirmPassword}
                    className={`w-full pl-10  pr-10 py-2 border rounded-lg outline-none border-gray-300 focus:border-2 focus:border-[#308357]`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2  -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {confirmPasswordError && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {confirmPasswordError}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleRegister}
              disabled={!isFormValid}
              className={`p-1 px-10 rounded-lg text-[#f4f4f4] transition mt-4
                ${
                  isFormValid
                    ? "bg-[#2ba58d] hover:bg-[#11bb99] cursor-pointer"
                    : "bg-[#2ba58d91] cursor-not-allowed"
                }`}
            >
              SIGN UP
            </button>
            <p className="lg:hidden mt-4 text-[#8b9492]">
              Already an Existing User ?{" "}
              <Link to={'/login'} className="text-[#2ba58d] hover:underline ">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
