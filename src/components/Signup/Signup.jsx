import { toast } from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Users, Zap, ShieldCheck } from "lucide-react";
import { registerUser } from "../../API/APILogin";

const features = [
  { icon: <Users size={16} />,       text: "Role-based access for your whole team" },
  { icon: <Zap size={16} />,         text: "Up and running in minutes" },
  { icon: <ShieldCheck size={16} />, text: "Secure, encrypted data storage" },
];

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

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const e = {};
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRx = /^\d{10}$/;
    if (!formData.username.trim())               e.username = "Username is required";
    if (!formData.phone.trim())                  e.phone = "Phone number is required";
    else if (!phoneRx.test(formData.phone))      e.phone = "Enter a valid 10-digit number";
    if (!formData.email.trim())                  e.email = "Email is required";
    else if (!emailRx.test(formData.email))      e.email = "Invalid email format";
    if (!formData.password)                      e.password = "Password is required";
    else if (formData.password.length < 6)       e.password = "At least 6 characters";
    if (!formData.confirmPassword)               e.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) e.confirmPassword = "Passwords do not match";
    if (!term)                                   e.term = "You must accept the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
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

  const inputCls = (hasError) =>
    `w-full px-3.5 py-[10px] bg-white border-[1.5px] rounded-lg text-sm text-[#1A1915]
     placeholder-[#8C8A82] outline-none transition-all duration-[120ms]
     ${hasError
       ? "border-[#C0392B] focus:ring-[3px] focus:ring-[rgba(192,57,43,0.12)]"
       : "border-[#E8E5DC] focus:border-[#4F7A3F] focus:ring-[3px] focus:ring-[rgba(79,122,63,0.15)]"
     }`;

  return (
    <div className="min-h-screen flex bg-[#FAFAF7]">

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[44%] flex-col justify-between p-12 relative overflow-hidden bg-[#1A1915]">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #4F7A3F 0%, transparent 70%)" }}
        />

        <div className="relative z-10 flex items-center gap-3">
          <img src="/HyperPOS.svg" alt="HyperPOS" className="w-7 h-7 object-contain brightness-0 invert" />
          <span className="text-[#E8E6DF] text-[17px] font-semibold">HyperPOS</span>
        </div>

        <div className="relative z-10">
          <h2 className="font-sans text-[38px] font-extrabold text-[#E8E6DF] leading-[1.15] mb-4">
            Join thousands of<br />
            <span className="text-[#4F7A3F]">growing businesses.</span>
          </h2>
          <p className="text-[#7A786F] text-sm leading-[1.7] mb-8 max-w-xs">
            Create your HyperPOS account and start managing sales, inventory,
            and your team all in one place.
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

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-[#FAFAF7] overflow-y-auto">
        <div className="w-full max-w-md">

          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <img src="/HyperPOS.svg" alt="HyperPOS" className="w-7 h-7" />
            <span className="text-[#1A1915] text-base font-bold">HyperPOS</span>
          </div>

          <div className="mb-8">
            <h1 className="font-sans text-[28px] font-bold text-[#1A1915] mb-1">Create your account</h1>
            <p className="text-sm text-[#8C8A82]">Join thousands of businesses using HyperPOS.</p>
          </div>

          <div className="space-y-5">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#5C5A54] mb-1.5">Username</label>
                <input ref={usernameRef} type="text" name="username" placeholder="your_username"
                  value={formData.username} onChange={handleChange} className={inputCls(!!errors.username)} />
                {errors.username && <p className="text-[11.5px] text-[#C0392B] mt-1.5">{errors.username}</p>}
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#5C5A54] mb-1.5">Phone</label>
                <input type="tel" name="phone" placeholder="0771234567"
                  value={formData.phone} onChange={handleChange} className={inputCls(!!errors.phone)} />
                {errors.phone && <p className="text-[11.5px] text-[#C0392B] mt-1.5">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#5C5A54] mb-1.5">Email</label>
              <input type="email" name="email" placeholder="you@example.com"
                value={formData.email} onChange={handleChange} className={inputCls(!!errors.email)} />
              {errors.email && <p className="text-[11.5px] text-[#C0392B] mt-1.5">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#5C5A54] mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} name="password" placeholder="Min. 6 characters"
                    value={formData.password} onChange={handleChange} className={inputCls(!!errors.password)} />
                  <button type="button" tabIndex={-1} onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8A82] hover:text-[#5C5A54] transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-[11.5px] text-[#C0392B] mt-1.5">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.07em] text-[#5C5A54] mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Re-enter password"
                    value={formData.confirmPassword} onChange={handleChange} className={inputCls(!!errors.confirmPassword)} />
                  <button type="button" tabIndex={-1} onClick={() => setShowConfirmPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8A82] hover:text-[#5C5A54] transition-colors">
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-[11.5px] text-[#C0392B] mt-1.5">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={term} onChange={() => setTerm(v => !v)}
                  className="mt-0.5 h-4 w-4 rounded border-[#D4D0C4] flex-shrink-0"
                  style={{ accentColor: '#4F7A3F' }}
                />
                <span className="text-sm text-[#5C5A54]">
                  I agree to the{" "}
                  <button type="button" onClick={() => navigate("/termsofuse")}
                    className="text-[#4F7A3F] hover:text-[#3D6030] font-medium transition-colors">
                    Terms of Service
                  </button>
                  {" "}and{" "}
                  <span className="text-[#4F7A3F] font-medium">Privacy Policy</span>
                </span>
              </label>
              {errors.term && <p className="text-[11.5px] text-[#C0392B] mt-1.5">{errors.term}</p>}
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
                  Creating account…
                </>
              ) : "Create Account"}
            </button>

          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#E8E5DC]" />
            <span className="text-[11px] text-[#8C8A82] font-medium">or</span>
            <div className="flex-1 h-px bg-[#E8E5DC]" />
          </div>

          <p className="text-center text-sm text-[#5C5A54]">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")}
              className="text-[#4F7A3F] hover:text-[#3D6030] font-semibold transition-colors">
              Sign In
            </button>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Signup;
