"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
// import Logo from "@/components/common/logo";
import axiosInstance from "@/utils/axiosinstance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
//import type { AxiosError } from "axios";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = email.trim() && password.length >= 6;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    setIsLoading(true);
try {
  const response = await axiosInstance.post("/auth/admin/login", data);

  // ✅ Save token to localStorage
  localStorage.setItem("user-token", response.data.access_token);

  // ✅ (Optional) Save user info if needed
  localStorage.setItem("user-info", JSON.stringify(response.data.user));

  toast.success("Login successful");
  router.push("/dashboard");
} catch {
  // const err = error as AxiosError<{ message: string }>;
  // toast.error(err.response?.data?.message || "Login failed");
} finally {
  setIsLoading(false);
}


  };

  return (
    <div className="bg-[#fff]/95 shadow-md rounded-lg p-6 w-full max-w-sm md:max-w-md z-10">
      <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">GB</span>
            </div>
            <h1 className="text-lg font-bold text-gray-900">GeniusBot</h1>
          </div>
        </div>
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-2 font-quicksand">
       Admin Portal
      </h1>
      <p className="text-center text-[15px] text-[#475467] mb-6">
       Sign in to access the admin portal
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#344054] mb-1"
          >
            Email<span className="text-[#831843]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#A855F7] placeholder:text-[#667085] text-[#101828] placeholder:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="pin"
            className="block text-sm font-medium text-[#344054] mb-1"
          >
            Password<span className="text-[#831843]">*</span>
          </label>
          <div className="relative">
         <input
  type={showPassword ? "text" : "password"}
  id="password"
  name="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your password"
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#A855F7] placeholder:text-[#667085] text-[#101828] placeholder:text-sm"
  autoComplete="off"
  required
/>


            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* <div className="w-full flex items-center justify-end py-1.5">
          <Link
            href="/forgot-password"
            className="text-[#B053EC] text-sm font-semibold"
          >
           Forgot Password?
          </Link>
        </div> */}

        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-full font-quicksand font-semibold cursor-pointer transition-colors ${
            !isFormValid || isLoading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Signing in...
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* <p className="text-center text-sm mt-6 text-[#475467]">
        Don’t have an account?{" "}
        <Link href="/register" className="text-gradient hover:underline">
          Sign up
        </Link>
      </p> */}
    </div>
  );
};

export default LoginForm;
