"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";
import PageHero from "@/components/shared/PageHero";
import GlowCard from "@/components/shared/GlowCard";
import ScrollReveal from "@/components/shared/ScrollReveal";
import MagneticButton from "@/components/shared/MagneticButton";
import { ContactPageContent } from "@/lib/types/content";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { SocialIcon } from "@/components/shared/SocialIcon";

export default function ContactPageClient({ data }: { data?: ContactPageContent }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!data) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const formattedSubject = `Website Inquiry: ${subject}`;
    const emailBody = `Hello CRE Innovations Team,\n\n${message}\n\n---\nBest regards,\n${name}\n${email}`;

    // Gmail compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hr@creinnovations.in&su=${encodeURIComponent(formattedSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open in new tab
    window.open(gmailUrl, "_blank");

    setIsSuccess(true);
    (e.target as HTMLFormElement).reset();
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <>
      {data.hero?.visible && (
        <PageHero
          badge={<span className="flex items-center gap-2"><DynamicIcon name={data.hero.badgeIcon} size={12} /> {data.hero.badge}</span>}
          title={data.hero.title}
          highlightWord={data.hero.highlightWord}
          subtitle={data.hero.subtitle}
          height="half"
        />
      )}

      <section className="section" style={{ background: "transparent" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Left Column: Form (Sticky) */}
            <div className="relative">
              {data.form?.visible && (
                <div className="sticky top-24">
                  <ScrollReveal animation="fadeRight">
                    <div className="glass-premium" style={{ padding: "3rem", display: "flex", flexDirection: "column" }}>
                      
                      <AnimatePresence mode="wait">
                        {isSuccess ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center text-center py-12"
                          >
                            <div className="w-20 h-20 bg-cyan-500/20 text-cyan-600 rounded-full flex items-center justify-center mb-6">
                              <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-3xl font-display font-extrabold tracking-tight mb-3" style={{ color: "var(--ink-0)" }}>{data.form.successTitle}</h3>
                            <p className="mb-8 text-lg" style={{ color: "var(--ink-2)" }}>{data.form.successText}</p>
                            <button type="button" onClick={() => setIsSuccess(false)} className="text-base font-bold text-cyan-600 hover:text-cyan-700 transition-colors">
                              Send another message
                            </button>
                          </motion.div>
                        ) : (
                          <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
                          >
                            <div>
                              <h3 className="text-3xl font-display font-extrabold tracking-tight" style={{ color: "var(--ink-0)", marginBottom: "0.5rem" }}>{data.form.title}</h3>
                              <p style={{ color: "var(--ink-2)", fontSize: "1.05rem", marginBottom: "2.5rem" }}>Fill out the form below and we'll get back to you shortly.</p>
                              
                              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                
                                <div>
                                  <label>Full Name <span style={{ color: "#f43f5e" }}>*</span></label>
                                  <input required name="name" type="text" placeholder="John Doe" />
                                </div>

                                <div>
                                  <label>Email Address <span style={{ color: "#f43f5e" }}>*</span></label>
                                  <input required name="email" type="email" placeholder="john@example.com" />
                                </div>

                                <div>
                                  <label>Subject <span style={{ color: "#f43f5e" }}>*</span></label>
                                  <select required name="subject">
                                    <option value="">Select a topic</option>
                                    {data.form.topics?.map(topic => (
                                      <option key={topic.value} value={topic.value}>{topic.label}</option>
                                    ))}
                                  </select>
                                </div>

                                <div>
                                  <label>Message <span style={{ color: "#f43f5e" }}>*</span></label>
                                  <textarea required name="message" rows={5} placeholder="Tell us about your project..." />
                                </div>

                              </div>
                            </div>

                            <div style={{ marginTop: "0.5rem" }}>
                              <button 
                                type="submit" 
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  padding: "1.125rem 2.25rem",
                                  background: "linear-gradient(145deg, #06b6d4 0%, #0891b2 100%)",
                                  color: "#fff",
                                  borderRadius: "var(--radius-pill)",
                                  fontSize: "1.125rem",
                                  fontWeight: 700,
                                  fontFamily: "var(--font-display)",
                                  border: "none",
                                  cursor: "pointer",
                                  transition: "transform 0.2s, box-shadow 0.2s",
                                  boxShadow: "0 4px 14px rgba(6, 182, 212, 0.4)",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = "translateY(-2px)";
                                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(6, 182, 212, 0.6)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = "none";
                                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(6, 182, 212, 0.4)";
                                }}
                              >
                                {isSubmitting ? data.form.buttonSending : data.form.buttonText}
                              </button>
                            </div>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </div>
                  </ScrollReveal>
                </div>
              )}
            </div>

            {/* Right Column: Info */}
            <div className="space-y-8">
              {data.infoSection?.visible && (
                <ScrollReveal animation="fadeLeft">
                  <h3 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight" style={{ color: "var(--ink-0)", marginBottom: "2.5rem" }}>{data.infoSection.title}</h3>
                  <div className="flex flex-col gap-5">
                    {data.infoSection.items?.map((info) => (
                      <div key={info.id} className="w-full">
                        <div className="glass-card w-full" style={{ padding: "1.75rem 2rem" }}>
                          <div style={{ display: "flex", flexDirection: "row", gap: "1.5rem", alignItems: "flex-start" }}>
                            <div className="shrink-0 rounded-2xl flex items-center justify-center shadow-inner" style={{ width: "3.5rem", height: "3.5rem", background: "rgba(109, 40, 217, 0.1)", color: "var(--violet-mid)", border: "1px solid rgba(109, 40, 217, 0.2)", marginTop: "0.25rem" }}>
                              <DynamicIcon name={info.icon} size={26} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <h4 className="font-display font-bold tracking-wide" style={{ color: "var(--ink-0)", marginBottom: "0.5rem", fontSize: "1.25rem" }}>{info.title}</h4>
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                {info.details.map((d, j) => (
                                  <div key={j} className="leading-relaxed flex items-start gap-3 group cursor-pointer transition-colors" style={{ color: "var(--ink-2)", fontSize: "1.05rem" }} onClick={() => info.copy && handleCopy(d)}>
                                    <span className="break-words group-hover:text-violet-600 transition-colors" style={{ flex: 1, minWidth: 0, letterSpacing: "-0.01em" }}>{d}</span>
                                    {info.copy && (
                                      <span className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1">
                                        {copiedText === d ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}

              {data.socialSection?.visible && (
                <ScrollReveal animation="fadeLeft" delay={0.2}>
                  <div className="glass-card" style={{ padding: "2.5rem", marginTop: "3rem" }}>
                    <h3 className="text-3xl font-display font-extrabold tracking-tight" style={{ color: "var(--ink-0)", marginBottom: "2rem" }}>{data.socialSection.title}</h3>
                    <div className="flex flex-wrap gap-5">
                      {data.socialSection.links?.map((social: any) => (
                        <a 
                          key={social.id} 
                          href={social.href} 
                          title={social.label}
                          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1" 
                          style={{ 
                            background: "var(--surface-sm)", 
                            border: "1px solid var(--card-border)",
                            color: "var(--ink-0)",
                            boxShadow: "var(--card-shadow)"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--primary-0, #00C2FF)";
                            e.currentTarget.style.color = "#000";
                            e.currentTarget.style.border = "1px solid transparent";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "var(--surface-sm)";
                            e.currentTarget.style.color = "var(--ink-0)";
                            e.currentTarget.style.border = "1px solid var(--card-border)";
                          }}
                        >
                          <SocialIcon name={social.icon || "Link"} size={24} />
                        </a>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
