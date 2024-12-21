import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

interface SignInData {
  email?: string;
  password?: string;
}

export default function Login() {
  const [errors, setErrors] = useState<Partial<SignInData>>({});
  const [signInData, setSignInData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateInputs = () => {
    const newErrors: Partial<SignInData> = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!signInData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(signInData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!signInData.password?.trim()) {
      newErrors.password = "Password is required";
    } else if (signInData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      console.log(signInData);

      const response = {
        success: false,
        error: "incorrect informations",
      };

      if (!response.success && response.error === "incorrect informations") {
        setErrors({
          email: "Email and password do not match",
          password: "Email and password do not match",
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="bg-[#B5C5DF] flex h-screen w-screen text-black">
      {/* Left Panel */}
      <div className="bg-[#0C1B32] w-1/2 rounded-r-2xl flex flex-col justify-center items-center gap-6 text-white">
        <h1 className="font-bold text-7xl">Hello</h1>
        <h2 className="font-semibold text-3xl w-1/2 text-center">
          Dear Employee, Welcome to your work platform
        </h2>
      </div>

      {/* Login Form */}
      <form
        className="w-1/2 flex flex-col justify-center items-center gap-10"
        onSubmit={handleSignIn}
      >
        {/* Email Input */}
        <label className="flex flex-col place-items-start  w-80">
          <p className="text-2xl pb-2 font-semibold text-[#0C1B32]">Email</p>
          <input
            className={`h-10 w-80 rounded-md p-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            name="email"
            value={signInData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm  self-end">{errors.email}</p>
          )}
        </label>

        {/* Password Input */}
        <label className="flex flex-col place-items-start w-80">
          <p className="text-2xl pb-2 font-semibold text-[#0C1B32]">Password</p>
          <div className="relative">
            <input
              className={`h-10 w-80 rounded-md p-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              type={showPassword ? "text" : "password"}
              name="password"
              value={signInData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <LuEyeClosed className="text-[#0C1B32] text-2xl text-center" />
              ) : (
                <LuEye className="text-[#0C1B32] text-2xl text-center" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm self-end">{errors.password}</p>
          )}
        </label>

        {/* Submit Button */}
        <button
          className="bg-[#0C1B32] text-white w-80 h-10 rounded-md"
          type="submit"
        >
          Login
        </button>
      </form>
    </main>
  );
}
