import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import login from "../../assets/login.svg";
import { redirect } from "react-router-dom";

interface SignInData {
  identifier: string; // Either email or ID
  password: string;
}

export default function SignIn() {
  const [errors, setErrors] = useState<Partial<SignInData>>({});
  const [signInData, setSignInData] = useState<SignInData>({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const usertype = "hr";

  const validateInputs = () => {
    const newErrors: Partial<SignInData> = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const idRegex = /^\d{4}[A-Za-z0-9]{8}$/; // Regex for IDs starting with 4 digits (year) followed by 8 alphanumeric characters

    if (!signInData.identifier.trim()) {
      newErrors.identifier = "Email or ID is required";
    } else if (
      !emailRegex.test(signInData.identifier) &&
      !idRegex.test(signInData.identifier)
    ) {
      newErrors.identifier = "Invalid Email or ID format";
    }

    if (!signInData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      console.log(signInData);

      const formData = new FormData();
      formData.append("identifier", signInData.identifier); // Changed to "identifier"
      formData.append("password", signInData.password);

      // Simulated response for validation
      const response = {
        success: false,
        error: "incorrect informations",
      };

      if (!response.success && response.error === "incorrect informations") {
        setErrors({
          identifier: "Email or ID and password do not match",
          password: "Email or ID and password do not match",
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
    <div className="text-black w-full h-screen flex place-content-between place-items-center items-center p-4 gap-3">
      <div className="hidden md:block md:w-1/2">
        <img src={login} alt="login illustration" className="w-full" />
      </div>
      <div className="flex flex-col items-center gap-3 w-full md:w-1/2 max-w-[500px]">
        <h1 className="text-4xl font-bold text-PrimaryBlue text-center">
         Welcome
        </h1>
        <form
          className="w-full flex flex-col items-center shadow-xl rounded-lg bg-white p-6 gap-3"
          onSubmit={handleSignIn}
        >
          <h2 className="text-2xl font-semibold">Sign In</h2>
          <p className="text-gray-800 text-center">
            Enter your credentials to enter the platform
          </p>
          <label className="w-full flex flex-col gap-2">
            <p className="text-gray-600 text-start">Email or ID</p>
            <input
              id="identifier"
              name="identifier"
              type="text"
              value={signInData.identifier}
              onChange={handleInputChange}
              placeholder="Email Address or ID"
              className={`border-2 rounded-md w-full pl-3 p-2 outline-none ${errors.identifier
                  ? "border-red-500"
                  : "border-gray-200 focus:border-gray-500"
                }`}
              required
            />
            {errors.identifier && (
              <p className="text-red-600 text-sm">{errors.identifier}</p>
            )}
          </label>
          <label className="w-full flex flex-col gap-2">
            <p className="text-gray-600 text-start">Password</p>
            <div
              className={`flex border-2 rounded-md w-full pl-3 p-2 ${errors.password
                  ? "border-red-500"
                  : "border-gray-200 focus:border-gray-500"
                }`}
            >
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={signInData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="peer h-full w-full pl-2 text-gray-900 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-gray-600 pr-3"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password}</p>
            )}
          </label>
          <a
            href="/forget-password"
            className="text-sm text-b border-gray-500 self-end"
          >
            Forget Password?
          </a>
          <button
            type="submit"
            className="w-full bg-[#B5C5DF] border-gray-500 rounded-md p-2 text-white font-semibold"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
