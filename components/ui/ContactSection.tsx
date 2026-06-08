"use client";

import React, { useState } from "react";
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

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    studentAge: "",
    classType: "",
    country: "",
    timezone: "",
    preferredTime: "",
    email: "",
    phone: "",
    waNumber: "",
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

    try {
     await emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID!, // ✅ FIXED
  {
    studentName: formData.studentName,
    studentAge: formData.studentAge,
    classType: formData.classType,
    country: formData.country,
    timezone: formData.timezone,
    preferredTime: formData.preferredTime,
    email: formData.email,
    phone: formData.phone,
    waNumber: formData.waNumber,
    comment: formData.comment,
    time: new Date().toLocaleString(),
  },
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
);
      setSubmitStatus("success");

      setFormData({
        studentName: "",
        studentAge: "",
        classType: "",
        country: "",
        timezone: "",
        preferredTime: "",
        email: "",
        phone: "",
        waNumber: "",
        comment: "",
      });

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
                Begin Your Journey
              </h3>
              <p className="text-[10px] font-black text-gray-400 uppercase">
                Enter details to schedule your free demo session
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="md:col-span-2">
                  <NeubrutalistInput name="studentName" value={formData.studentName} onChange={handleChange} placeholder="STUDENT FULL NAME *" required />
                </div>

                <NeubrutalistInput name="studentAge" type="number" value={formData.studentAge} onChange={handleChange} placeholder="STUDENT AGE *" required />

                <select name="classType" required value={formData.classType} onChange={handleChange}
                  className="w-full p-5 border-2 border-black font-black text-[11px] uppercase bg-gray-50">
                  <option value="">SELECT CLASS TYPE *</option>
                  <option value="Individual Classes">Individual</option>
                  <option value="Group Classes">Group</option>
                  <option value="Open to Both">Open for Both</option>
                </select>

                <NeubrutalistInput name="country" value={formData.country} onChange={handleChange} placeholder="COUNTRY *" required />
                <NeubrutalistInput name="timezone" value={formData.timezone} onChange={handleChange} placeholder="TIME ZONE *" required />

                <div className="md:col-span-2">
                  <NeubrutalistInput name="preferredTime" value={formData.preferredTime} onChange={handleChange} placeholder="PREFERRED DATE & TIME *" required />
                </div>

                <NeubrutalistInput name="email" type="email" value={formData.email} onChange={handleChange} placeholder="EMAIL *" required />
                <NeubrutalistInput name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="PHONE *" required />

                <div className="md:col-span-2">
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className="w-full p-5 border-2 border-black bg-gray-50 min-h-[120px]"
                    placeholder="Enter your chess username and platform (Chess.com or Lichess)"
                  />
                </div>
              </div>

              {/* STATUS */}
              {submitStatus === "success" && (
                <motion.div className="p-4 bg-black text-[#EAB308] text-xs font-black">
                  ✅ ENQUIRY SENT SUCCESSFULLY
                </motion.div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-500 text-white text-xs font-black">
                  ❌ FAILED TO SEND. TRY AGAIN.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-[#EAB308] py-6 font-[1000] flex justify-center gap-3"
              >
                {isSubmitting ? "SENDING..." : "REQUEST DEMO"}
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