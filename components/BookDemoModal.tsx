"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, CheckCircle, Loader2, Zap, Star, Send } from "lucide-react";
import { useDemoModal } from "@/context/DemoContext";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const COUNTRY_DIAL_CODES = [
  { code: "+91", label: "India (+91)" },
  { code: "+1 (USA)", label: "USA (+1)" },
  { code: "+1 (Canada)", label: "Canada (+1)" },
  { code: "+44", label: "UK (+44)" },
  { code: "+65", label: "Singapore (+65)" },
  { code: "+971", label: "UAE (+971)" },
  { code: "+61", label: "Australia (+61)" },
  { code: "+351", label: "Portugal (+351)" },
  { code: "+81", label: "Japan (+81)" },
  { code: "+39", label: "Italy (+39)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+33", label: "France (+33)" },
  { code: "+966", label: "Saudi Arabia (+966)" },
  { code: "+974", label: "Qatar (+974)" },
  { code: "+965", label: "Kuwait (+965)" },
  { code: "+64", label: "New Zealand (+64)" },
  { code: "+41", label: "Switzerland (+41)" },
  { code: "+31", label: "Netherlands (+31)" },
  { code: "+353", label: "Ireland (+353)" },
];

export default function BookDemoModal() {
  const router = useRouter();
  const { isOpen, closeDemoModal } = useDemoModal();

  const [formData, setFormData] = useState({
    studentName: "",
    age: "",
    countryCode: "+91",
    phone: "",
    email: "",
    experience: "beginner",
    chessPlatform: "",
    chessUsername: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const fullPhoneNumber = `${formData.countryCode} ${formData.phone}`;

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_DEMO_TEMPLATE_ID!,
        {
          studentName: formData.studentName,
          studentAge: formData.age,
          email: formData.email,
          phone: fullPhoneNumber,
          countryCode: formData.countryCode,
          phoneNumber: formData.phone,
          experience: formData.experience,
          chessPlatform: formData.chessPlatform,
          chessUsername: formData.chessUsername,
          demoType: "Free Demo Class",
          time: new Date().toLocaleString(),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setSubmitStatus("success");

      setFormData({
        studentName: "",
        age: "",
        countryCode: "+91",
        phone: "",
        email: "",
        experience: "beginner",
        chessPlatform: "",
        chessUsername: "",
      });

      setTimeout(() => {
        closeDemoModal();
        setSubmitStatus(null);
        router.push("/thank-you");
      }, 800);

    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[100] p-4 selection:bg-[#EAB308] selection:text-black">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        className="bg-white border-4 border-black w-full max-w-xl relative shadow-[20px_20px_0px_0px_rgba(234,179,8,1)] flex flex-col max-h-[90vh] overflow-hidden"
      >
        
        {/* HEADER */}
        <div className="p-6 md:p-8 border-b-4 border-black bg-[#EAB308] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 fill-black text-black" />
              <span className="text-[10px] font-[1000] uppercase tracking-widest text-black">
                100% Free Assessment Session
              </span>
            </div>
            <h3 className="text-2xl md:text-4xl font-[1000] text-black uppercase">
              BOOK A FREE DEMO
            </h3>
          </div>

          <button
            onClick={closeDemoModal}
            className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center hover:bg-black hover:text-[#EAB308]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* FORM */}
        <div className="p-6 md:p-8 overflow-y-auto bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">

            <NeubrutalistInput
              placeholder="STUDENT FULL NAME *"
              required
              value={formData.studentName}
              onChange={(e: any) => setFormData({ ...formData, studentName: e.target.value })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NeubrutalistInput
                type="number"
                placeholder="STUDENT AGE *"
                required
                min="4"
                max="99"
                value={formData.age}
                onChange={(e: any) => setFormData({ ...formData, age: e.target.value })}
              />

              <NeubrutalistInput
                type="email"
                placeholder="EMAIL ADDRESS *"
                required
                value={formData.email}
                onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* COUNTRY CODE & MOBILE NUMBER */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-[9px] font-black uppercase text-gray-500 mb-1">
                  Country Code *
                </label>
                <select
                  required
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  className="w-full px-3 py-4 border-2 border-black font-black text-[11px] uppercase bg-gray-50 tracking-wider"
                >
                  {COUNTRY_DIAL_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[9px] font-black uppercase text-gray-500 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="MOBILE NUMBER *"
                  required
                  value={formData.phone}
                  onChange={(e: any) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-black font-black text-[11px] uppercase bg-gray-50"
                />
              </div>
            </div>

            {/* CHESS PLATFORM & USERNAME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                value={formData.chessPlatform}
                onChange={(e) =>
                  setFormData({ ...formData, chessPlatform: e.target.value })
                }
                className="w-full px-5 py-4 border-2 border-black font-black text-[11px] uppercase bg-gray-50"
              >
                <option value="">CHESS PLATFORM (OPTIONAL)</option>
                <option value="Chess.com">Chess.com</option>
                <option value="Lichess">Lichess</option>
                <option value="Beginner / None">Beginner / No Account</option>
              </select>

              <NeubrutalistInput
                placeholder="CHESS USERNAME (IF ANY)"
                value={formData.chessUsername}
                onChange={(e: any) =>
                  setFormData({ ...formData, chessUsername: e.target.value })
                }
              />
            </div>

            {/* SUCCESS / ERROR */}
            {submitStatus === "success" && (
              <motion.div className="p-4 bg-black text-[#EAB308] text-xs font-black flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#EAB308]" />
                FREE DEMO REQUEST SENT SUCCESSFULLY! OUR TEAM WILL REACH OUT.
              </motion.div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-500 text-white text-xs font-black">
                FAILED TO SEND. PLEASE TRY AGAIN OR WHATSAPP US DIRECTLY.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-[#EAB308] hover:bg-[#EAB308] hover:text-black transition-colors py-5 font-[1000] text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_rgba(234,179,8,1)] active:translate-x-1 active:translate-y-1"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  CONFIRM FREE DEMO
                </>
              )}
            </button>

            <div className="flex justify-center items-center gap-2 opacity-60">
              <Star className="w-3 h-3 fill-black text-black" />
              <p className="text-[9px] font-black uppercase tracking-widest text-black">100% Free Demo • No Obligation</p>
              <Star className="w-3 h-3 fill-black text-black" />
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
}

const NeubrutalistInput = (props: any) => (
  <input
    {...props}
    className="w-full px-5 py-4 border-2 border-black font-black text-[11px] uppercase bg-gray-50"
  />
);