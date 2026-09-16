import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { isGoogleAuthConfigured, renderGoogleButton, waitForGoogle } from "../services/firebaseGoogle";

const Signup = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ name:"", email:"", password:"", confirmPassword:"" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const googleRef = useRef(null);
  const navigate = useNavigate();
  const change = (e) => setForm({...form,[e.target.name]:e.target.value});
  const googleSignup = async (credential) => {
    try { setSubmitting(true); const res=await api.post("/auth/google",{idToken:credential,requestUri:window.location.origin}); login(res.data.token,res.data.user,res.data); toast.success("Google account connected successfully"); navigate("/"); }
    catch(err){toast.error(err.response?.data?.message||"Google sign-in failed");} finally{setSubmitting(false);}
  };
  useEffect(()=>waitForGoogle(()=>renderGoogleButton({element:googleRef.current,onCredential:googleSignup,text:"signup_with"})),[]);
  const submit = async (e) => {
    e.preventDefault();
    if (form.password!==form.confirmPassword) return toast.error("Passwords do not match ⚠️");
    if (form.password.length<6) return toast.error("Password must be at least 6 characters");
    try { setSubmitting(true); await api.post("/auth/signup",{name:form.name,email:form.email,password:form.password}); toast.success("Signup successful! You can now login 🎉"); navigate("/login"); }
    catch(err){toast.error("Signup failed: "+(err.response?.data?.message||err.message));} finally{setSubmitting(false);}
  };
  return <div className="min-h-[85vh] flex items-center justify-center px-4 py-16"><motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="w-full max-w-md bg-white/70 backdrop-blur-md shadow-xl border border-gray-200 rounded-2xl p-8">
    <div className="text-center mb-6"><UserPlus className="mx-auto mb-3 text-blue-600" size={36}/><h2 className="text-3xl font-bold text-blue-700">Create Your Account 🎉</h2><p className="text-sm text-gray-600 mt-1">Start your career journey today</p></div>
    <div className="mb-5"><div ref={googleRef} className="min-h-11 flex justify-center overflow-hidden"/>{!isGoogleAuthConfigured()&&<p className="text-xs text-gray-500 text-center mt-2">Google sign-up becomes available after Firebase/Google configuration.</p>}</div>
    <div className="flex items-center gap-3 my-5"><div className="h-px flex-1 bg-gray-200"/><span className="text-xs text-gray-400">OR</span><div className="h-px flex-1 bg-gray-200"/></div>
    <form onSubmit={submit} className="space-y-5">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><div className="relative"><User className="absolute left-3 top-2.5 text-gray-400" size={18}/><input name="name" required placeholder="John Doe" onChange={change} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"/></div></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label><div className="relative"><Mail className="absolute left-3 top-2.5 text-gray-400" size={18}/><input name="email" type="email" required placeholder="you@example.com" onChange={change} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"/></div></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><div className="relative"><Lock className="absolute left-3 top-2.5 text-gray-400" size={18}/><input name="password" type={showPassword?"text":"password"} required placeholder="••••••••" onChange={change} className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"/><button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-500">{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label><div className="relative"><Lock className="absolute left-3 top-2.5 text-gray-400" size={18}/><input name="confirmPassword" type={showConfirm?"text":"password"} required placeholder="••••••••" onChange={change} className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"/><button type="button" onClick={()=>setShowConfirm(!showConfirm)} className="absolute right-3 top-2.5 text-gray-500">{showConfirm?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></div>
      <motion.button disabled={submitting} type="submit" whileTap={{scale:.96}} className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md disabled:opacity-60">{submitting?"Creating…":"Sign Up"}</motion.button>
    </form>
    <p className="text-center text-sm mt-6 text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-medium">Login here</Link></p>
  </motion.div></div>;
};
export default Signup;
