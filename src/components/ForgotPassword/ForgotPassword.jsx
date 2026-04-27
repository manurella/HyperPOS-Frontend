import { toast } from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { APIForgotPassword } from "../../API/APILogin";
import { KeyRound, ArrowLeft } from "lucide-react";

const inputCls = (hasError) =>
  `w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium transition-all duration-150 outline-none bg-white
   ${hasError
     ? "border-red-400 focus:ring-2 focus:ring-red-200 text-primary-900"
     : "border-primary-100/20 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 text-primary-900"
   }`;

const ForgotPassword = () => {
  const navigate     = useNavigate();
  const emailRef     = useRef();
  const passwordRef  = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [email,        setEmail]        = useState("");
  const [newPassword,  setNewPassword]  = useState("");
  const [errors,       setErrors]       = useState({});
  const [isLoading,    setIsLoading]    = useState(false);

  useEffect(() => { emailRef.current?.focus(); }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim())                              newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";
    if (!newPassword)                               newErrors.newPassword = "New password is required";
    else if (newPassword.length < 6)                newErrors.newPassword = "At least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      setIsLoading(true);
      const response = await APIForgotPassword(email, newPassword);
      toast.error(response.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">

      {/* -- Left panel --------------------------- */}
      <div
        className="hidden lg:flex lg:w-[44%] xl:w-[40%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #130b2b 0%, #2e1065 40%, #581c87 100%)" }}
      >
        {/* dot texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <img src="/HyperPOS.svg" alt="HyperPOS" className="w-9 h-9 object-contain brightness-0 invert" />
          <span className="text-white text-xl font-bold tracking-tight">HyperPOS</span>
        </div>

        {/* Copy */}
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
            <KeyRound size={28} className="text-primary-200" />
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Forgot your<br />
            <span className="text-primary-300">password?</span>
          </h2>
          <p className="text-primary-200 text-sm leading-relaxed">
            No worries — enter your registered email and set a new password.
            Your account and data remain safe throughout.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-primary-300/60">© 2025 HyperPOS. All rights reserved.</p>
        </div>
      </div>

      {/* -- Right panel -------------------------- */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-primary-50/20">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <img src="/HyperPOS.svg" alt="HyperPOS" className="w-8 h-8" />
            <span className="text-primary-900 text-lg font-bold">HyperPOS</span>
          </div>

          {/* Back link */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-1.5 text-sm text-primary-800/40 hover:text-primary-800/80 mb-8 transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Sign In
          </button>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-1">Reset password</h1>
            <p className="text-sm text-primary-800/60">Enter your email and choose a new password</p>
          </div>

          <div className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-primary-800/80 uppercase tracking-wide mb-1.5">
                Email Address
              </label>
              <input
                ref={emailRef}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && passwordRef.current?.focus()}
                className={inputCls(!!errors.email)}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
            </div>

            {/* New password */}
            <div>
              <label className="block text-xs font-semibold text-primary-800/80 uppercase tracking-wide mb-1.5">
                New Password
              </label>
              <div className="relative">
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  className={inputCls(!!errors.newPassword)}
                />
                <button type="button" tabIndex={-1}
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-800/40 hover:text-primary-800/80 text-lg transition-colors">
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              {errors.newPassword && <p className="text-xs text-red-500 mt-1.5">{errors.newPassword}</p>}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="pos-btn-primary w-full"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                  </svg>
                  Resetting…
                </>
              ) : "Reset Password"}
            </button>

          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-primary-200/50" />
            <span className="text-xs text-primary-800/40 font-medium">or</span>
            <div className="flex-1 h-px bg-primary-200/50" />
          </div>

          <p className="text-center text-sm text-primary-800/60">
            Remembered your password?{" "}
            <button onClick={() => navigate("/login")}
              className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">
              Sign In
            </button>
          </p>

        </div>
      </div>

    </div>
  );
};

export default ForgotPassword;
