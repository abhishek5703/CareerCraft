import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";
import { isGoogleAuthConfigured, renderGoogleButton, waitForGoogle } from "../services/firebaseGoogle";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const googleRef = useRef(null);
  const navigate = useNavigate();

  const googleLogin = async (credential) => {
    try {
      setSubmitting(true);
      const res = await api.post("/auth/google", { idToken: credential, requestUri: window.location.origin });
      login(res.data.token, res.data.user, res.data);
      toast.success("Signed in with Google successfully");
      navigate("/");
    } catch (err) { toast.error(err.response?.data?.message || "Google sign-in failed"); }
    finally { setSubmitting(false); }
  };

  useEffect(() => waitForGoogle(() => renderGoogleButton({ element: googleRef.current, onCredential: googleLogin })), []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await api.post("/auth/login", form);
      login(res.data.token, res.data.user, res.data);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (err) { toast.error("Login failed: " + (err.response?.data?.message || err.message)); }
    finally { setSubmitting(false); }
  };

  return <div className="min-h-[85vh] flex items-center justify-center px-4"><motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md bg-white/70 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8">
    <div className="text-center mb-6"><LogIn className="mx-auto mb-3 text-blue-600" size={36}/><h2 className="text-3xl font-bold text-blue-700">Welcome Back 👋</h2><p className="text-sm text-gray-600 mt-1">Login to access your dashboard</p></div>
    <div className="mb-5"><div ref={googleRef} className="min-h-11 flex justify-center overflow-hidden" />{!isGoogleAuthConfigured() && <p className="text-xs text-gray-500 text-center mt-2">Google sign-in becomes available after Firebase/Google configuration.</p>}</div>
    <div className="flex items-center gap-3 my-5"><div className="h-px flex-1 bg-gray-200"/><span className="text-xs text-gray-400">OR</span><div className="h-px flex-1 bg-gray-200"/></div>
    <form onSubmit={submit} className="space-y-5"><div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><div className="relative"><Mail className="absolute left-3 top-2.5 text-gray-400" size={18}/><input name="email" type="email" required placeholder="you@example.com" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"/></div></div>
    <div><div className="flex justify-between items-center mb-1"><label className="block text-sm font-medium text-gray-700">Password</label><Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">Forgot password?</Link></div><div className="relative"><Lock className="absolute left-3 top-2.5 text-gray-400" size={18}/><input name="password" type={showPassword?"text":"password"} required placeholder="••••••••" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"/><button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-500">{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></div>
    <motion.button disabled={submitting} type="submit" whileTap={{scale:0.96}} className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg disabled:opacity-60">{submitting?"Signing in…":"Login"}</motion.button></form>
    <p className="text-center text-sm mt-6 text-gray-600">Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline font-medium">Sign up here</Link></p>
  </motion.div></div>;
};
export default Login;
