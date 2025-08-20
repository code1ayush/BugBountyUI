import { useState } from "react";
import { Eye, EyeOff, Bug } from "lucide-react"; 
import { useAppContext } from "../context/appContext";

const InputField = ({ label, type, name, value, onChange, required, error }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-300 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      required={required}
      value={value}
      onChange={onChange}
      className={`mt-1 block w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 
        ${error ? "border border-red-500" : "border border-gray-600"}`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, loginUser } = useAppContext();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });


  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const validateForm = () => {
    let newErrors = {};
    if (!formData.userName) newErrors.userName = "userName is required";
    if (!isLoginView && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setTimeout(() => {
      if (isLoginView) {
        loginUser({
          userName: formData.userName,
          password: formData.password,
        });
      } else {
        registerUser(formData);
      }
      setLoading(false);
    }, 1500); 
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Logo */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <Bug className="w-6 h-6 text-red-500" />
        <span className="text-lg font-bold tracking-wide">BugBounty</span>
      </div>

      {/* Card */}
      <div className="relative bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-700">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-white">
          {isLoginView ? "Welcome Back!" : "Create Your Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="UserName"
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            required
            error={errors.userName}
          />

          {!isLoginView && (
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              error={errors.email}
            />
          )}

          <div className="relative">
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              error={errors.password}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 rounded-lg shadow-md text-sm font-medium 
              ${loading ? "bg-red-400" : "bg-red-500 hover:bg-red-600"} 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
          >
            {loading ? "Processing..." : isLoginView ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            {isLoginView ? "New to BugBounty?" : "Already have an account?"}
            <button
              onClick={() => setIsLoginView(!isLoginView)}
              className="ml-1 font-bold text-red-500 hover:underline focus:outline-none"
            >
              {isLoginView ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
