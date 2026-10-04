"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Phone,
  Mail,
  Zap,
  ArrowRight,
  MessageSquare,
  Globe,
} from "lucide-react";
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

const ContactSection: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    studentName: "",
    studentAge: "",
    countryCode: "+91",
    phone: "",
    email: "",
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const fullPhoneNumber = `${formData.countryCode} ${formData.phone}`;

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID!,
        {
          studentName: formData.studentName,
          studentAge: formData.studentAge,
          email: formData.email,
          phone: fullPhoneNumber,
          countryCode: formData.countryCode,
          phoneNumber: formData.phone,
          comment: formData.comment,
          demoType: "Free Demo Request",
          time: new Date().toLocaleString(),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSubmitStatus("success");

      setFormData({
        studentName: "",
        studentAge: "",
        countryCode: "+91",
        phone: "",
        email: "",
        comment: "",
      });

      setTimeout(() => {
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
    <section className="py-20 md:py-32 bg-white relative overflow-hidden selection:bg-[#EAB308]">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[25rem] font-[1000] text-gray-50 uppercase italic opacity-80 pointer-events-none">
        CONNECT
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col lg:flex-row border-4 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">
          
          {/* LEFT */}
          <div className="w-full lg:w-[35%] bg-black p-8 md:p-14 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Zap className="fill-[#EAB308] text-[#EAB308] w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#EAB308]">
                  Inquiry Center
                </span>
              </div>

              <h3 className="text-4xl md:text-6xl font-[1000] uppercase mb-12">
                SAY <br /> <span className="text-[#EAB308]">HELLO.</span>
              </h3>

              <div className="space-y-10">
                <ContactInfoItem icon={<Phone />} label="Direct Lines" value="+91 79907 75581" subValue="+91 87330 84949" />
                <ContactInfoItem icon={<Mail />} label="Support Email" value="contact@thechessmate.org" />
                <ContactInfoItem icon={<Globe />} label="Academy Reach" value="Global Online Classes" />
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 text-[#EAB308]">
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest italic">
                  Instant Support Active
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-[65%] p-8 md:p-14 bg-white">
            <div className="mb-10">
              <h3 className="text-2xl md:text-4xl font-[1000] uppercase mb-3">
                Book A Free Demo
              </h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Enter your details to schedule your complimentary 1-on-1 trial session
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="md:col-span-2">
                  <NeubrutalistInput name="studentName" value={formData.studentName} onChange={handleChange} placeholder="STUDENT FULL NAME *" required />
                </div>

                <NeubrutalistInput name="studentAge" type="number" min="4" max="99" value={formData.studentAge} onChange={handleChange} placeholder="STUDENT AGE *" required />

                <NeubrutalistInput name="email" type="email" value={formData.email} onChange={handleChange} placeholder="EMAIL ADDRESS *" required />

                {/* Country Code & Mobile Number */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-[9px] font-black uppercase text-gray-500 mb-1">Country Code *</label>
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="w-full p-5 border-2 border-black font-black text-[11px] uppercase bg-gray-50 tracking-wider"
                    >
                      {COUNTRY_DIAL_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[9px] font-black uppercase text-gray-500 mb-1">Mobile Number *</label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="MOBILE NUMBER *"
                      required
                      className="w-full p-5 border-2 border-black bg-gray-50 uppercase text-[11px] font-black"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className="w-full p-5 border-2 border-black bg-gray-50 min-h-[120px] font-black text-xs"
                    placeholder="CHESS USERNAME / PLATFORM / ANY QUESTIONS (OPTIONAL)"
                  />
                </div>
              </div>

              {/* STATUS */}
              {submitStatus === "success" && (
                <motion.div className="p-4 bg-black text-[#EAB308] text-xs font-black">
                  ✅ FREE DEMO ENQUIRY SENT SUCCESSFULLY! WE WILL CONTACT YOU SHORTLY.
                </motion.div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-500 text-white text-xs font-black">
                  ❌ FAILED TO SEND. TRY AGAIN OR REACH OUT VIA WHATSAPP.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-[#EAB308] hover:bg-[#EAB308] hover:text-black transition-colors py-6 font-[1000] text-sm uppercase tracking-widest flex justify-center items-center gap-3 shadow-[6px_6px_0px_0px_rgba(234,179,8,1)]"
              >
                {isSubmitting ? "SENDING..." : "REQUEST FREE DEMO"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactInfoItem = ({ icon, label, value, subValue }: any) => (
  <div className="flex items-start gap-6">
    <div className="w-12 h-12 bg-[#EAB308] border-2 border-black flex items-center justify-center">
      {React.cloneElement(icon, { className: "w-5 h-5" })}
    </div>
    <div>
      <span className="text-[9px] text-[#EAB308] uppercase">{label}</span>
      <p className="font-bold">{value}</p>
      {subValue && <p className="font-bold">{subValue}</p>}
    </div>
  </div>
);

const NeubrutalistInput = (props: any) => (
  <input {...props} className="w-full p-5 border-2 border-black bg-gray-50 uppercase text-[11px]" />
);

export default ContactSection;