import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Send, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/forgot-password", { email });
      setSent(true);
      toast.success(res.data?.message || "Check your email for a password reset link.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to send the reset email");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-8">
        <div className="text-center mb-7"><ShieldCheck className="mx-auto mb-3 text-blue-600" size={38} /><h1 className="text-3xl font-extrabold text-gray-900">Reset your password</h1><p className="text-sm text-gray-500 mt-2">We’ll send a secure password reset link to your email.</p></div>
        {sent ? (
          <div className="rounded-xl bg-green-50 border border-green-200 p-5 text-center"><Mail className="mx-auto text-green-600 mb-2" size={28} /><h2 className="font-bold text-green-800">Check your inbox</h2><p className="text-sm text-green-700 mt-1">Open the Firebase password-reset email and follow the link to choose a new password.</p><Link to="/login" className="inline-block mt-5 text-blue-600 font-semibold hover:underline">Return to login</Link></div>
        ) : (
          <form onSubmit={submit} className="space-y-5"><div><label className="block text-sm font-medium text-gray-700 mb-1">Email address</label><div className="relative"><Mail className="absolute left-3 top-2.5 text-gray-400" size={18} /><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="you@example.com" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" /></div></div><button disabled={loading} className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold shadow-md disabled:opacity-60"> <Send size={17} />{loading ? "Sending…" : "Send reset email"}</button><Link to="/login" className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-blue-600"><ArrowLeft size={15} /> Back to login</Link></form>
        )}
      </motion.div>
    </div>
  );
};
export default ForgotPassword;
