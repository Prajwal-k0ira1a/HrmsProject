import { useState } from "react";
import { useNavigate } from "react-router-dom";
import COVER_IMG from "../../assets/image.jpg";
import logo from "../../assets/images.png";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3152/api/auth/login", {
        email,
        password,
      });

      const { token, employee } = res.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(employee));

      // Navigate based on role
      if (employee.role === "admin") {
        toast.success("Login successful 🎉", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
        });
        navigate("/admin-dashboard");
      } else if (employee.role === "manager") {
        navigate("/teacher-dashboard");
      } else if (employee.role === "student") {
        navigate("/student-dashboard");
      } else {
        setError("Unknown role. Contact admin.");
      }

      console.log("Login successful:", employee);
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Login error:", error);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-start">
      {/* Left (Image) Section */}
      <div className="relative w-full md:w-1/2 h-64 md:h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col z-10">
          <h1 className="text-3xl md:text-4xl text-white font-bold my-4 drop-shadow-lg">
            Employee Management
          </h1>
          <p className="text-lg md:text-xl text-white font-normal drop-shadow-lg">
            Manage your employees efficiently and securely.
          </p>
        </div>
        <img
          src={COVER_IMG}
          className="w-full h-full object-cover rounded-b-2xl md:rounded-none"
          alt="cover"
        />
      </div>
      {/* Right (Form) Section */}
      <div className="w-full md:w-1/2 h-full bg-[#f5f5f5] flex flex-col p-6 md:p-20 justify-center items-center">
        <h1 className="w-full max-w-[500px] mx-auto text-lg md:text-xl text-[#060606] font-semibold ">
          Welcome Back
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col max-w-[500px]"
        >
          <div className="w-full flex-col mb-8 md:mb-10">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Login</h3>
            <p className="text-base mb-2">
              Please enter your details to continue
            </p>
          </div>
          <div className="w-full flex flex-col">
            <input
              type="email"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <p className="text-sm">Remember Me</p>
              </div>
              <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 mt-2 md:mt-0">
                Forgot Password ?
              </p>
            </div>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="w-full flex flex-col my-4">
              <button
                type="submit"
                className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex justify-center cursor-pointer"
              >
                Login
              </button>
              <button
                type="button"
                className="w-full text-[#060606] my-2 font-semibold bg-white border-1 border-black rounded-md p-4 text-center flex justify-center cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
            <div className="w-full flex items-center justify-center relative py-2">
              <div className="w-full h-[1px] bg-black/40 "></div>
              <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">Or</p>
            </div>
            <div className="w-full text-[#060606] my-2 font-semibold bg-white border-1 border-black/40 rounded-md p-4 text-center flex justify-center cursor-pointer">
              <img src={logo} className="h-6 mr-2" alt="google logo" />
              Sign In With Google
            </div>
          </div>
        </form>
        <div className="w-full flex items-center justify-center mt-4">
          <p className="text-sm font-normal text-[#060606]">
            Dont have an account?
            <span
              className="font-semibold underline underline-offset-2 cursor-pointer ml-1"
              onClick={() => navigate("/register")}
            >
              Sign up for free
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
