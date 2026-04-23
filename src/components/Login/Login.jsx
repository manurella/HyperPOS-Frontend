import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import APILogin from "../../API/APILogin";
import { ShieldCheck, Zap, BarChart2 } from "lucide-react";

const features = [
  { icon: <ShieldCheck size={18} />, text: "Role-based access control" },
  { icon: <Zap size={18} />,         text: "Real-time sales processing" },
  { icon: <BarChart2 size={18} />,   text: "Advanced reporting & analytics" },
];

const Login = () => {

  const navigate      = useNavigate();
  const usernameRef   = useRef();
  const passwordRef   = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [username,     setUsername]     = useState("");
  const [password,     setPassword]     = useState("");
  const [errors,       setErrors]       = useState({});
  const [isLoading,    setIsLoading]    = useState(false);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

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
      else                            alert("Invalid credentials");
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      const msg = error.response?.data?.message || error?.message;
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) handleLogin();
  };

  /* ── common input class ── */
  const inputCls = (hasError) =>
    `w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium transition-all duration-150 outline-none bg-white
     ${hasError
       ? "border-red-400 focus:ring-2 focus:ring-red-200 text-slate-800"
       : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-slate-800"
     }`;

  return (
    <div className="min-h-screen flex bg-white">

      {/* ── Left panel ─────────────────────────── */}
      <div
        className="hidden lg:flex lg:w-[44%] xl:w-[40%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%)" }}
      >

        {/* Background texture dots */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <img src="/HyperPOS.svg" alt="HyperPOS" className="w-9 h-9 object-contain brightness-0 invert" />
          <span className="text-white text-xl font-bold tracking-tight">HyperPOS</span>
        </div>

        {/* Main copy */}
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Smarter retail,<br/>
            <span className="text-indigo-300">faster checkout.</span>
          </h2>
          <p className="text-indigo-200 text-sm leading-relaxed mb-8">
            The all-in-one point-of-sale platform built for modern businesses.
            Manage inventory, track sales, and grow with confidence.
          </p>

          <div className="flex flex-col gap-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-indigo-300 flex-shrink-0">
                  {f.icon}
                </div>
                <span className="text-sm text-indigo-100 font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-xs text-indigo-300/60">© 2025 HyperPOS. All rights reserved.</p>
        </div>

      </div>

      {/* ── Right panel ────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-slate-50">

        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <img src="/HyperPOS.svg" alt="HyperPOS" className="w-8 h-8" />
            <span className="text-slate-800 text-lg font-bold">HyperPOS</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Welcome back</h1>
            <p className="text-sm text-slate-500">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <div className="space-y-5">

            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate("/forgotpassword")}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-lg transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors duration-150 flex items-center justify-center gap-2 shadow-sm"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                  </svg>
                  Authenticating…
                </>
              ) : "Sign In"}
            </button>

          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
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
