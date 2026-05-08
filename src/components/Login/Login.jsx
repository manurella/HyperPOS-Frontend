import { toast } from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, Zap, BarChart2 } from "lucide-react";
import APILogin from "../../API/APILogin";

const features = [
  { icon: <ShieldCheck size={16} />, text: "Role-based access control" },
  { icon: <Zap size={16} />,         text: "Real-time sales processing" },
  { icon: <BarChart2 size={16} />,   text: "Advanced reporting & analytics" },
];

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

  const validate = () => {
    const e = {};
    if (!username.trim()) e.username = "Username is required";
    if (!password)        e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
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

  const handleSubmit = () => { if (validate()) handleLogin(); };

  const inputCls = (hasError) =>
    `w-full px-3.5 py-[11px] bg-white border-[1.5px] rounded-lg text-sm text-[#1A1915]
     placeholder-[#8C8A82] outline-none transition-all duration-[120ms]
     ${hasError
       ? "border-[#C0392B] focus:ring-[3px] focus:ring-[rgba(192,57,43,0.12)]"
       : "border-[#E8E5DC] focus:border-[#4F7A3F] focus:ring-[3px] focus:ring-[rgba(79,122,63,0.15)]"
     }`;

  return (
    <div className="min-h-screen flex bg-[#FAFAF7]">

      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-[44%] flex-col justify-between p-12 relative overflow-hidden bg-[#1A1915]">
        {/* Dot texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }} />
        {/* Warm glow */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #4F7A3F 0%, transparent 70%)" }}
        />

        <div className="relative z-10 flex items-center gap-3">
          <img src="/HyperPOS.svg" alt="HyperPOS" className="w-7 h-7 object-contain brightness-0 invert" />
          <span className="text-[#E8E6DF] text-[17px] font-semibold">HyperPOS</span>
        </div>

        <div className="relative z-10">
          <h2 className="font-sans text-[38px] font-extrabold text-[#E8E6DF] leading-[1.15] mb-4">
            Smarter retail,<br />
            <span className="text-[#4F7A3F]">faster checkout.</span>
          </h2>
          <p className="text-[#7A786F] text-sm leading-[1.7] mb-8 max-w-xs">
            The all-in-one point-of-sale platform built for modern businesses.
            Manage inventory, track sales, and grow with confidence.
          </p>
          <div className="flex flex-col gap-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-[34px] h-[34px] rounded-lg bg-white/[0.07] flex items-center justify-center text-[#8C8A82] flex-shrink-0">
                  {f.icon}
                </div>
                <span className="text-sm text-[#A8A49B] font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-[11px] text-[#4A4845]">&copy; 2025 HyperPOS. All rights reserved.</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#FAFAF7]">
        <div className="w-full max-w-[380px]">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <img src="/HyperPOS.svg" alt="HyperPOS" className="w-7 h-7" />
            <span className="text-[#1A1915] text-base font-bold">HyperPOS</span>
          </div>

          <div className="mb-8">
            <h1 className="font-sans text-[28px] font-bold text-[#1A1915] mb-1">Welcome back</h1>
            <p className="text-sm text-[#8C8A82]">Sign in to your account to continue.</p>
          </div>

          <div className="space-y-5">

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#5C5A54] mb-1.5">Username</label>
              <input
                ref={usernameRef}
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyDown={e => e.key === "Enter" && passwordRef.current?.focus()}
                className={inputCls(!!errors.username)}
              />
              {errors.username && <p className="text-[11.5px] text-[#C0392B] mt-1.5">{errors.username}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#5C5A54]">Password</label>
                <button
                  type="button"
                  onClick={() => navigate("/forgotpassword")}
                  className="text-xs text-[#4F7A3F] hover:text-[#3D6030] font-medium transition-colors"
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8A82] hover:text-[#5C5A54] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && <p className="text-[11.5px] text-[#C0392B] mt-1.5">{errors.password}</p>}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#4F7A3F] hover:bg-[#3D6030] text-white text-sm font-semibold py-3 rounded-lg transition-all duration-[120ms] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
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

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#E8E5DC]" />
            <span className="text-[11px] text-[#8C8A82] font-medium">or</span>
            <div className="flex-1 h-px bg-[#E8E5DC]" />
          </div>

          <p className="text-center text-sm text-[#5C5A54]">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-[#4F7A3F] hover:text-[#3D6030] font-semibold transition-colors"
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
