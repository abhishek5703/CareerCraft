import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const oobCode = params.get("oobCode") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!oobCode) toast.error("This reset link is missing its security code.");
  }, [oobCode]);

  const submit = async (e) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    if (password !== confirm) return toast.error("Passwords do not match");
    if (!oobCode) return toast.error("Invalid reset link");
    setLoading(true);
    try {
      await api.post("/auth/reset-password", { oobCode, newPassword: password });
      setDone(true);
      toast.success("Password updated successfully");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to reset password");
    } finally { setLoading(false); }
  };

  return <div className="min-h-[85vh] flex items-center justify-center px-4 py-12"><motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-8">
    {done ? <div className="text-center py-8"><CheckCircle2 className="mx-auto text-green-600 mb-3" size={48} /><h1 className="text-2xl font-bold text-gray-900">Password changed</h1><p className="text-gray-500 mt-2">Taking you back to login…</p></div> : <><div className="text-center mb-6"><Lock className="mx-auto text-blue-600 mb-3" size={38} /><h1 className="text-3xl font-extrabold text-gray-900">Choose a new password</h1><p className="text-sm text-gray-500 mt-2">Use at least 6 characters.</p></div><form onSubmit={submit} className="space-y-5"><div><label className="block text-sm font-medium text-gray-700 mb-1">New password</label><div className="relative"><Lock className="absolute left-3 top-2.5 text-gray-400" size={18} /><input value={password} onChange={(e)=>setPassword(e.target.value)} type={show ? "text" : "password"} required className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" /><button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-2.5 text-gray-500">{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label><input value={confirm} onChange={(e)=>setConfirm(e.target.value)} type={show ? "text" : "password"} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" /></div><button disabled={loading || !oobCode} className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold shadow-md disabled:opacity-60">{loading ? "Updating…" : "Update password"}</button><Link to="/login" className="block text-center text-sm text-gray-500 hover:text-blue-600">Back to login</Link></form></>}
  </motion.div></div>;
};
export default ResetPassword;
