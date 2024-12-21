import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forgetpassword from "../../assets/ForgotPassword.svg";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBackendError = (message: string) => {
    toast.error(message);
  };

  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split("@");
    return localPart.length <= 2
      ? email
      : `${localPart.slice(0, 2)}***@${domain}`;
  };

  const validateEmail = () => {
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Email format is invalid" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: "" }));
    return true;
  };

  const validatePassword = () => {
    if (!formData.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return false;
    } else if (formData.password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters long",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, password: "" }));
    return true;
  };

  const validateConfirmPassword = () => {
    if (formData.confirmPassword !== formData.password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    return true;
  };

  const handleResetPassword = async () => {
    if (validateEmail()) {
      try {
        // Simulate backend API call
        setStep(2);
        toast.success("Reset link sent! Check your email.");
      } catch ({error}:{error:any}) {
        handleBackendError("Failed to send reset link. Please try again.");
      }
    }
  };

  const handleNewPasswordSubmit = async () => {
    if (validatePassword() && validateConfirmPassword()) {
      try {
        // Simulate backend API call for setting new password
        setStep(3);
        toast.success("Password reset successful!");
      } catch ({error}:{error:any}) {
        handleBackendError("Failed to reset password. Please try again.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      handleResetPassword();
    } else if (step === 3) {
      handleNewPasswordSubmit();
    }
  };

  return (
    <div className="w-[100vw] h-screen flex justify-center items-center p-4 ">
      <div className="hidden md:block md:w-1/2">
        <img src={Forgetpassword} alt="Forget password" className="w-full" />
      </div>
      {step === 1 && (
        <div className="flex flex-col items-center gap-3 w-full md:w-1/2">
          <form
            className="flex flex-col items-center shadow-xl rounded-lg bg-white p-6 gap-3"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-semibold">Forget Password</h2>
            <p className="text-gray-800 text-center">
              No worries, We'll send you instructions to reset your password.
            </p>
            <label className="w-full flex flex-col gap-2" htmlFor="email">
              <p className="text-gray-600 text-start">Email</p>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={validateEmail}
                placeholder="Enter your email"
                className={`font-semibold border-2 rounded-md w-full pl-3 p-2 outline-none ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-200 focus:border-[#B5C5DF]"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </label>
            <button
              type="submit"
              className="font-semibold w-full bg-[#B5C5DF] rounded-md p-2 text-white"
            >
              Reset Password
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center gap-3 md:w-1/2">
          <h2 className="text-4xl font-bold">Iqamati</h2>
          <form
            className="flex flex-col items-center shadow-lg rounded-lg bg-white p-4 gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="text-2xl font-semibold">Forget Password</h2>
            <p className="text-gray-600 text-center">
              We sent a password reset link to your email
            </p>
            <p className="text-gray-600">{maskEmail(formData.email)}</p>
            <button
              type="button"
              className="w-full bg-[#B5C5DF] rounded-md p-2 text-white"
              onClick={() => setStep(3)}
            >
              Continue
            </button>
            <button
              type="button"
              className="w-full bg-white border-2 border-gray-200 rounded-md p-2"
              onClick={() => (window.location.href = "/signin")}
            >
              Back to Sign in
            </button>
            <p>
              Didn’t receive the email?{" "}
              <span
                className="text-[#B5C5DF] cursor-pointer"
                onClick={() => toast.info("Resending email...")}
              >
                Click to resend
              </span>
            </p>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-3 md:w-1/2">
          <h2 className="text-4xl font-bold">Iqamati</h2>
          <form
            className="flex flex-col items-center shadow-lg rounded-lg bg-white p-4 gap-3"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-semibold">Set A New Password</h2>
            <p className="text-gray-600 text-center">
              New password must be different from your previous passwords
            </p>
            <label className="w-full flex flex-col gap-2" htmlFor="password">
              <p className="text-gray-600">Password</p>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={validatePassword}
                placeholder="Enter new password"
                className={`border-2 rounded-md w-full pl-3 p-2 outline-none ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-200 focus:border-[#B5C5DF]"
                }`}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </label>
            <label
              className="w-full flex flex-col gap-2"
              htmlFor="confirmPassword"
            >
              <p className="text-gray-600">Confirm Password</p>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={validateConfirmPassword}
                placeholder="Confirm new password"
                className={`border-2 rounded-md w-full pl-3 p-2 outline-none ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-200 focus:border-[#B5C5DF]"
                }`}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword}
                </span>
              )}
            </label>
            <button
              type="submit"
              className="w-full bg-[#B5C5DF] rounded-md p-2 text-white"
            >
              Continue
            </button>
            <button
              type="button"
              className="w-full bg-white border-2 border-gray-200 rounded-md p-2"
              onClick={() => (window.location.href = "/signin")}
            >
              Back to Sign in
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
