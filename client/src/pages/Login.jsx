import "./Auth.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { isGoogleAuthConfigured, renderGoogleButton, waitForGoogle } from "../services/firebaseGoogle";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const googleRef = useRef(null);
  const navigate = useNavigate();

  const googleLogin = useCallback(async (credential) => {
    try {
      setSubmitting(true);
      const response = await api.post("/auth/google", { idToken: credential, requestUri: window.location.origin });
      login(response.data.token, response.data.user, response.data);
      toast.success("Signed in with Google successfully");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Google sign-in failed");
    } finally {
      setSubmitting(false);
    }
  }, [login, navigate]);

  useEffect(() => waitForGoogle(() => renderGoogleButton({ element: googleRef.current, onCredential: googleLogin })), [googleLogin]);

  const submit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const response = await api.post("/auth/login", form);
      login(response.data.token, response.data.user, response.data);
      toast.success("Welcome back");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to sign in. Please check your details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <motion.div className="auth-shell" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42 }}>
        <aside className="auth-aside">
          <Link to="/" className="auth-aside-brand"><span className="auth-brand-mark"><Sparkles size={19} /></span> CareerCraft</Link>
          <div className="auth-aside-content">
            <span className="auth-aside-kicker">WELCOME BACK</span>
            <h1>Your next step is closer than you think.</h1>
            <p>Pick up where you left off. Your roadmaps and learning progress are right where you need them.</p>
            <div className="auth-aside-points">
              <span><ShieldCheck size={17} /> Your learning journey, in one place</span>
              <span><Sparkles size={17} /> Clear paths for ambitious goals</span>
            </div>
          </div>
          <div className="auth-aside-foot">LEARN WITH PURPOSE <i /> GROW WITH CONFIDENCE</div>
          <div className="auth-aside-decoration auth-decoration-one" /><div className="auth-aside-decoration auth-decoration-two" />
        </aside>

        <section className="auth-form-panel">
          <div className="auth-form-top"><Link to="/" className="auth-back-link"><ArrowLeft size={15} /> Back to home</Link><span className="auth-secure-label"><ShieldCheck size={14} /> Secure sign in</span></div>
          <div className="auth-form-heading"><span className="auth-mobile-mark"><Sparkles size={18} /></span><span className="section-kicker">YOUR JOURNEY CONTINUES</span><h2>Welcome back</h2><p>Sign in to continue building your future.</p></div>

          <div className="google-auth-area"><div ref={googleRef} className="google-button-slot" />{!isGoogleAuthConfigured() && <p className="auth-helper">Google sign-in will be available after Firebase is configured.</p>}</div>
          <div className="auth-divider"><span /> <small>OR CONTINUE WITH EMAIL</small> <span /></div>

          <form onSubmit={submit} className="auth-form">
            <label className="auth-field"><span>Email address</span><div className="auth-input-wrap"><Mail size={17} /><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} /></div></label>
            <label className="auth-field"><span>Password</span><div className="auth-input-wrap"><Lock size={17} /><input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required placeholder="Enter your password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} /><button type="button" className="password-visibility" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
            <div className="auth-form-options"><span>Keep your account secure</span><Link to="/forgot-password">Forgot password?</Link></div>
            <button type="submit" className="btn-primary auth-submit" disabled={submitting}>{submitting ? "Signing you in…" : "Sign in to CareerCraft"}<ArrowUpRight size={17} /></button>
          </form>
          <p className="auth-switch">New to CareerCraft? <Link to="/signup">Create an account <ArrowUpRight size={14} /></Link></p>
        </section>
      </motion.div>
    </div>
  );
};

export default Login;