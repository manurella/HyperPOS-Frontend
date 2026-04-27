import { toast } from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { registerUser } from "../../API/APILogin";
import { ShieldCheck, Users, Zap } from "lucide-react";

const features = [
  { icon: <Users size={17} />,       text: "Role-based access for your whole team" },
  { icon: <Zap size={17} />,         text: "Up and running in minutes" },
  { icon: <ShieldCheck size={17} />, text: "Secure, encrypted data storage" },
];

const inputCls = (hasError) =>
  `w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium transition-all duration-150 outline-none bg-white text-zinc-900
   ${hasError
     ? "border-red-400 focus:ring-2 focus:ring-red-100"
     : "border-zinc-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
   }`;

const Signup = () => {
  const navigate    = useNavigate();
  const usernameRef = useRef();

  const [term,                setTerm]                = useState(false);
  const [showPassword,        setShowPassword]        = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading,           setIsLoading]           = useState(false);
  const [formData, setFormData] = useState({
    username: "", phone: "", email: "",
    isActive: true, password: "", confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => { usernameRef.current?.focus(); }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.username.trim())             newErrors.username = "Username is required";
    if (!formData.phone.trim())                newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Enter a valid 10-digit number";
    if (!formData.email.trim())                newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password)                    newErrors.password = "Password is required";
    else if (formData.password.length < 6)     newErrors.password = "At least 6 characters";
    if (!formData.confirmPassword)             newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!term)                                 newErrors.term = "You must accept the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => { if (validateForm()) submitRegistration(); };

  const submitRegistration = async () => {
    try {
      setIsLoading(true);
      await registerUser(formData);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[44%] xl:w-[40%] flex-col justify-between p-12 relative overflow-hidden bg-[#0c0c0e]">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />

        <div className="relative z-10 flex items-center gap-3">
          <img src="/HyperPOS.svg" alt="HyperPOS" className="w-8 h-8 object-contain brightness-0 invert" />
          <span className="text-white text-lg font-semibold tracking-tight">HyperPOS</span>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Join thousands of<br />
            <span className="text-blue-400">growing businesses.</span>
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            Create your HyperPOS account and start managing sales,
            inventory, and your team all in one place.
          </p>
          <div className="flex flex-col gap-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.07] flex items-center justify-center text-zinc-400 flex-shrink-0">
                  {f.icon}
                </div>
                <span className="text-sm text-zinc-300 font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-zinc-600">&copy; 2025 HyperPOS. All rights reserved.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-zinc-50 overflow-y-auto">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <img src="/HyperPOS.svg" alt="HyperPOS" className="w-7 h-7" />
            <span className="text-zinc-900 text-base font-bold">HyperPOS</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-1">Create an account</h1>
            <p className="text-sm text-zinc-500">Fill in the details below to get started</p>
          </div>

          <div className="space-y-5">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">Username</label>
                <input
                  ref={usernameRef}
                  type="text" name="username"
                  placeholder="your_username"
                  value={formData.username} onChange={handleChange}
                  className={inputCls(!!errors.username)}
                />
                {errors.username && <p className="text-xs text-red-500 mt-1.5">{errors.username}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">Phone</label>
                <input
                  type="tel" name="phone"
                  placeholder="0771234567"
                  value={formData.phone} onChange={handleChange}
                  className={inputCls(!!errors.phone)}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">Email</label>
              <input
                type="email" name="email"
                placeholder="you@example.com"
                value={formData.email} onChange={handleChange}
                className={inputCls(!!errors.email)}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} name="password"
                    placeholder="Min. 6 characters"
                    value={formData.password} onChange={handleChange}
                    className={inputCls(!!errors.password)}
                  />
                  <button type="button" tabIndex={-1}
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-lg transition-colors">
                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"} name="confirmPassword"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword} onChange={handleChange}
                    className={inputCls(!!errors.confirmPassword)}
                  />
                  <button type="button" tabIndex={-1}
                    onClick={() => setShowConfirmPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-lg transition-colors">
                    {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1.5">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox" checked={term}
                  onChange={() => setTerm(v => !v)}
                  className="mt-0.5 h-4 w-4 rounded border-zinc-300 accent-blue-600 flex-shrink-0"
                />
                <span className="text-sm text-zinc-500">
                  I accept the{" "}
                  <button type="button" onClick={() => navigate("/termsofuse")}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Terms of Use
                  </button>
                  {" "}and{" "}
                  <span className="text-blue-600 font-medium">Privacy Policy</span>
                </span>
              </label>
              {errors.term && <p className="text-xs text-red-500 mt-1.5">{errors.term}</p>}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="pos-btn-primary w-full justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                  </svg>
                  Creating account...
                </>
              ) : "Create Account"}
            </button>

          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-zinc-200" />
            <span className="text-xs text-zinc-400 font-medium">or</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          <p className="text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Sign In
            </button>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Signup;
