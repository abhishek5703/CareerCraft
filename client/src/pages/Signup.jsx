import "./Auth.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { isGoogleAuthConfigured, renderGoogleButton, waitForGoogle } from "../services/firebaseGoogle";

const Signup = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const googleRef = useRef(null);
  const navigate = useNavigate();

  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const googleSignup = useCallback(async (credential) => {
    try {
      setSubmitting(true);
      const response = await api.post("/auth/google", { idToken: credential, requestUri: window.location.origin });
      login(response.data.token, response.data.user, response.data);
      toast.success("Your account is ready");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Google sign-up failed");
    } finally {
      setSubmitting(false);
    }
  }, [login, navigate]);

  useEffect(() => waitForGoogle(() => renderGoogleButton({ element: googleRef.current, onCredential: googleSignup, text: "signup_with" })), [googleSignup]);

  const submit = async (event) => {
    event.preventDefault();
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    if (form.password !== form.confirmPassword) return toast.error("Passwords do not match");

    try {
      setSubmitting(true);
      await api.post("/auth/signup", { name: form.name.trim(), email: form.email.trim(), password: form.password });
      toast.success("Account created. You can now sign in.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create your account");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <motion.div className="auth-shell auth-shell-signup" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42 }}>
        <aside className="auth-aside">
          <Link to="/" className="auth-aside-brand"><span className="auth-brand-mark"><Sparkles size={19} /></span> CareerCraft</Link>
          <div className="auth-aside-content">
            <span className="auth-aside-kicker">MAKE YOUR MOVE</span>
            <h1>Start with a plan. Grow into your potential.</h1>
            <p>Create your account and turn your career curiosity into a focused learning journey.</p>
            <div className="auth-aside-points">
              <span><ShieldCheck size={17} /> Keep your progress in sync</span>
              <span><Sparkles size={17} /> Learn at your own pace</span>
            </div>
          </div>
          <div className="auth-aside-foot">ONE GOAL <i /> ONE STEP <i /> REAL PROGRESS</div>
          <div className="auth-aside-decoration auth-decoration-one" /><div className="auth-aside-decoration auth-decoration-two" />
        </aside>

        <section className="auth-form-panel">
          <div className="auth-form-top"><Link to="/" className="auth-back-link"><ArrowLeft size={15} /> Back to home</Link><span className="auth-secure-label"><ShieldCheck size={14} /> Secure account setup</span></div>
          <div className="auth-form-heading"><span className="auth-mobile-mark"><Sparkles size={18} /></span><span className="section-kicker">BEGIN YOUR JOURNEY</span><h2>Create your account</h2><p>Set up your space and start learning with direction.</p></div>

          <div className="google-auth-area"><div ref={googleRef} className="google-button-slot" />{!isGoogleAuthConfigured() && <p className="auth-helper">Google sign-up will be available after Firebase is configured.</p>}</div>
          <div className="auth-divider"><span /> <small>OR SIGN UP WITH EMAIL</small> <span /></div>

          <form onSubmit={submit} className="auth-form">
            <label className="auth-field"><span>Full name</span><div className="auth-input-wrap"><UserRound size={17} /><input name="name" type="text" autoComplete="name" required maxLength={80} placeholder="Your name" value={form.name} onChange={change} /></div></label>
            <label className="auth-field"><span>Email address</span><div className="auth-input-wrap"><Mail size={17} /><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" value={form.email} onChange={change} /></div></label>
            <label className="auth-field"><span>Password</span><div className="auth-input-wrap"><Lock size={17} /><input name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={6} placeholder="At least 6 characters" value={form.password} onChange={change} /><button type="button" className="password-visibility" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
            <label className="auth-field"><span>Confirm password</span><div className="auth-input-wrap"><Lock size={17} /><input name="confirmPassword" type={showConfirm ? "text" : "password"} autoComplete="new-password" required minLength={6} placeholder="Enter your password again" value={form.confirmPassword} onChange={change} /><button type="button" className="password-visibility" aria-label={showConfirm ? "Hide password" : "Show password"} onClick={() => setShowConfirm((visible) => !visible)}>{showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
            <button type="submit" className="btn-primary auth-submit" disabled={submitting}>{submitting ? "Creating your account…" : "Create my account"}<ArrowUpRight size={17} /></button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Sign in <ArrowUpRight size={14} /></Link></p>
        </section>
      </motion.div>
    </div>
  );
};

export default Signup;