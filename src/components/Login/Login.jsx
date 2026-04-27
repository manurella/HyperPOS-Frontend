import { toast } from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import APILogin from "../../API/APILogin";
import { ShieldCheck, Zap, BarChart2 } from "lucide-react";

const features = [
  { icon: <ShieldCheck size={17} />, text: "Role-based access control" },
  { icon: <Zap size={17} />,         text: "Real-time sales processing" },
  { icon: <BarChart2 size={17} />,   text: "Advanced reporting & analytics" },
];

const inputCls = (hasError) =>
  `w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium transition-all duration-150 outline-none bg-white text-zinc-900
   ${hasError
     ? "border-red-400 focus:ring-2 focus:ring-red-100"
     : "border-zinc-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
   }`;

const Login = () => {
  const navigate    = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [username,     setUsername]     = useState("");
  const [password,     setPassword]     = useState("");
  const [errors,       setErrors]       = useState({});
  const [isLoading,    setIsLoading]    = useState(false);

  useEffect(() => { usernameRef.current?.focus(); }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password)        newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await APILogin(username, password);
      const role = response.roles[0];
      if      (role === "ROLE_ADMIN") navigate("/dashboard");
      else if (role === "ROLE_USER")  navigate("/basescreen");
      else                            toast.error("Invalid credentials");
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.error(error.response?.data?.message || error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => { if (validateForm()) handleLogin(); };

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
            Smarter retail,<br />
            <span className="text-blue-400">faster checkout.</span>
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            The all-in-one point-of-sale platform built for modern businesses.
            Manage inventory, track sales, and grow with confidence.
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
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-zinc-50">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <img src="/HyperPOS.svg" alt="HyperPOS" className="w-7 h-7" />
            <span className="text-zinc-900 text-base font-bold">HyperPOS</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-1">Welcome back</h1>
            <p className="text-sm text-zinc-500">Sign in to your account to continue</p>
          </div>

          <div className="space-y-5">

            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
                Username
              </label>
              <input
                ref={usernameRef}
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyDown={e => e.key === "Enter" && passwordRef.current?.focus()}
                className={inputCls(!!errors.username)}
              />
              {errors.username && <p className="text-xs text-red-500 mt-1.5">{errors.username}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate("/forgotpassword")}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  className={inputCls(!!errors.password)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-lg transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>}
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
                  Authenticating...
                </>
              ) : "Sign In"}
            </button>

          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-zinc-200" />
            <span className="text-xs text-zinc-400 font-medium">or</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          <p className="text-center text-sm text-zinc-500">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Register
            </button>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;
