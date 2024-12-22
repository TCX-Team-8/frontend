import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import login from "../../assets/login.svg";
import { useNavigate } from "react-router-dom";  // Importing useNavigate for programmatic navigation

interface SignInData {
  email: string; // Either email or ID
  mot_de_passe: string;
}

export default function SignIn() {
  const [errors, setErrors] = useState<Partial<SignInData>>({});
  const [signInData, setSignInData] = useState<SignInData>({
    email: "",
    mot_de_passe: "",
  });
  const [showmot_de_passe, setShowmot_de_passe] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // To manage the loading state
  const navigate = useNavigate(); // Initialize navigate hook
  const [userType, setUserType] = useState("employee");

  const validateInputs = () => {
    const newErrors: Partial<SignInData> = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const idRegex = /^\d{4}[A-Za-z0-9]{8}$/; // Regex for IDs starting with 4 digits (year) followed by 8 alphanumeric characters

    if (!signInData.email.trim()) {
      newErrors.email = "Email or ID is required";
    } else if (
      !emailRegex.test(signInData.email) &&
      !idRegex.test(signInData.email)
    ) {
      newErrors.email = "Invalid Email or ID format";
    }

    if (!signInData.mot_de_passe.trim()) {
      newErrors.mot_de_passe = "mot_de_passe is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateInputs()) {
      setIsLoading(true); // Start loading before fetching

      const formData = new FormData();
      formData.append("email", signInData.email);
      formData.append("mot_de_passe", signInData.mot_de_passe);

      try {
        const response = await fetch("http://localhost:8000/login", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          // Assuming the response contains userType, ssn, and token
          const { userType, ssn, token } = data;

          // Store token and any necessary session information
          localStorage.setItem("userToken", token);
          localStorage.setItem("userType", userType); // Store userType for future use
          localStorage.setItem("userSSN", ssn); // Store SSN for future use

          // Redirect to the user's dashboard using userType and ssn
          navigate(`/${userType}/${ssn}`); // Navigate to the dynamic route with userType and ssn
        } else {
          // Handle error response (e.g., incorrect credentials)
          setErrors({
            email: "Email or ID and mot_de_passe do not match",
            mot_de_passe: "Email or ID and mot_de_passe do not match",
          });
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        setErrors({
          email: "An error occurred. Please try again.",
          mot_de_passe: "An error occurred. Please try again.",
        });
      } finally {
        setIsLoading(false); // Stop loading after the request
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
    <div className="text-black w-screen h-screen flex place-content-center place-items-center items-center p-4 gap-36">
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
              id="email"
              name="email"
              type="text"
              value={signInData.email}
              onChange={handleInputChange}
              placeholder="Email Address or ID"
              className={`border-2 rounded-md w-full pl-3 p-2 outline-none ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-200 focus:border-gray-500"
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </label>
          <label className="w-full flex flex-col gap-2">
            <p className="text-gray-600 text-start">password</p>
            <div
              className={`flex border-2 rounded-md w-full pl-3 p-2 ${
                errors.mot_de_passe
                  ? "border-red-500"
                  : "border-gray-200 focus:border-gray-500"
              }`}
            >
              <input
                id="mot_de_passe"
                name="mot_de_passe"
                type={showmot_de_passe ? "text" : "password"}
                value={signInData.mot_de_passe}
                onChange={handleInputChange}
                placeholder="password"
                className="peer h-full w-full pl-2 text-gray-900 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowmot_de_passe((prev) => !prev)}
                className="text-gray-600 pr-3"
                aria-label="Toggle mot_de_passe visibility"
              >
                {showmot_de_passe ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>
            {errors.mot_de_passe && (
              <p className="text-red-600 text-sm">{errors.mot_de_passe}</p>
            )}
          </label>
          <a
            href="/forget-password"
            className="text-sm text-b border-gray-500 self-end"
          >
            Forget password?
          </a>
          <button
            type="submit"
            className="w-full bg-[#B5C5DF] border-gray-500 rounded-md p-2 text-white font-semibold"
            disabled={isLoading} // Disable the button during loading
          >
            {isLoading ? "Signing In..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
