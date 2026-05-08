import { toast } from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, KeyRound, ArrowLeft } from "lucide-react";
import { APIForgotPassword } from "../../API/APILogin";

const ForgotPassword = () => {
  const navigate    = useNavigate();
  const emailRef    = useRef();
  const passwordRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [email,        setEmail]        = useState("");
  const [newPassword,  setNewPassword]  = useState("");
  const [errors,       setErrors]       = useState({});
  const [isLoading,    setIsLoading]    = useState(false);

  useEffect(() => { emailRef.current?.focus(); }, []);

  const validate = () => {
    const e = {};
    if (!email.trim())                                 e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email format";
    if (!newPassword)                                  e.newPassword = "New password is required";
    else if (newPassword.length < 6)                   e.newPassword = "At least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      setIsLoading(true);
      const response = await APIForgotPassword(email, newPassword);
      toast.success(response.message || "Password reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputCls = (hasError) =>
    `w-full px-3.5 py-[11px] bg-white border-[1.5px] rounded-lg text-sm text-[#1A1915]
     placeholder-[#8C8A82] outline-none transition-all duration-[120ms]
     ${hasError
       ? "border-[#C0392B] focus:ring-[3px] focus:ring-[rgba(192,57,43,0.12)]"
       : "border-[#E8E5DC] focus:border-[#4F7A3F] focus:ring-[3px] focus:ring-[rgba(79,122,63,0.15)]"
     }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F4EF] p-4">

      {/* Top logo */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
        <img src="/HyperPOS.svg" alt="HyperPOS" className="w-6 h-6" />
        <span className="text-[#1A1915] font-semibold text-base">HyperPOS</span>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-[420px] bg-white border-[1.5px] border-[#E8E5DC] rounded-[16px] p-10"
        style={{ boxShadow: '0 1px 3px rgba(26,25,21,0.06), 0 4px 12px rgba(26,25,21,0.04)' }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-[#E6F0E1] flex items-center justify-center">
            <KeyRound size={24} className="text-[#4F7A3F]" />
          </div>
        </div>

        <h1 className="font-sans text-[22px] font-bold text-[#1A1915] text-center mb-2">Forgot your password?</h1>
        <p className="text-sm text-[#8C8A82] text-center leading-[1.65] mb-6">
          Enter your email address and set a new password.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#5C5A54] mb-1.5">Email Address</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && passwordRef.current?.focus()}
              className={inputCls(!!errors.email)}
            />
            {errors.email && <p className="text-[11.5px] text-[#C0392B] mt-1.5">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#5C5A54] mb-1.5">New Password</label>
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8A82] hover:text-[#5C5A54] transition-colors">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.newPassword && <p className="text-[11.5px] text-[#C0392B] mt-1.5">{errors.newPassword}</p>}
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
                Resetting…
              </>
            ) : "Send Reset Link"}
          </button>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-1.5 mx-auto mt-5 text-sm text-[#4F7A3F] hover:text-[#3D6030] transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
