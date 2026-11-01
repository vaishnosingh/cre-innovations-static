"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText, UploadCloud } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";
import GlowCard from "@/components/shared/GlowCard";
import { toast } from "react-hot-toast";

interface ApplyPageClientProps {
  jobTitle: string;
  department: string;
  slug: string;
  color: string;
  jobId: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--cream-0)",
  border: "1.5px solid var(--border-warm)",
  borderRadius: "var(--radius-md)",
  padding: "0.8125rem 1rem",
  fontSize: "0.9375rem",
  color: "var(--ink-1)",
  fontFamily: "var(--font-sans)",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  WebkitAppearance: "none",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ marginBottom: "0.5rem", display: "block" }}>{label}</label>
      {children}
    </div>
  );
}

export default function ApplyPageClient({ jobTitle, department, slug, color, jobId }: ApplyPageClientProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedInUrl: "",
    portfolioUrl: "",
    experience: "",
    coverLetter: ""
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      if (step === 1 && (!formData.fullName || !formData.email)) {
        toast.error("Please fill required fields");
        return;
      }
      if (step === 2 && (!formData.linkedInUrl || !formData.experience)) {
        toast.error("Please fill required fields");
        return;
      }
      if (step === 3 && !resumeFile) {
        toast.error("Please upload your resume");
        return;
      }
      handleNext();
      return;
    }

    setIsSubmitting(true);
    try {
      const formattedSubject = `Job Application: ${jobTitle} — ${formData.fullName}`;
      const emailBody = `Hello CRE Innovations HR Team,\n\nI would like to apply for the position of ${jobTitle}.\n\n--- CANDIDATE DETAILS ---\nFull Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone || "N/A"}\nExperience: ${formData.experience}\nLinkedIn: ${formData.linkedInUrl || "N/A"}\nPortfolio: ${formData.portfolioUrl || "N/A"}\nResume Attached: ${resumeFile ? resumeFile.name : "Attached to email"}\n\n--- COVER LETTER / NOTE ---\n${formData.coverLetter || "None provided"}\n\n---\nBest regards,\n${formData.fullName}`;

      // Open Gmail compose directly in a new tab
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hr@creinnovations.in&su=${encodeURIComponent(formattedSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(gmailUrl, "_blank");

      toast.success("Application ready! Email compose opened.");
      setIsSuccess(true);
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    const formattedSubject = `Job Application: ${jobTitle} — ${formData.fullName}`;
    const emailBody = `Hello CRE Innovations HR Team,\n\nI would like to apply for the position of ${jobTitle}.\n\n--- CANDIDATE DETAILS ---\nFull Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone || "N/A"}\nExperience: ${formData.experience}\nLinkedIn: ${formData.linkedInUrl || "N/A"}\nPortfolio: ${formData.portfolioUrl || "N/A"}\nResume Attached: ${resumeFile ? resumeFile.name : "Attached to email"}\n\n--- COVER LETTER / NOTE ---\n${formData.coverLetter || "None provided"}\n\n---\nBest regards,\n${formData.fullName}`;
    const mailtoUrl = `mailto:hr@creinnovations.in?subject=${encodeURIComponent(formattedSubject)}&body=${encodeURIComponent(emailBody)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hr@creinnovations.in&su=${encodeURIComponent(formattedSubject)}&body=${encodeURIComponent(emailBody)}`;

    return (
      <div style={{ textAlign: "center", padding: "5rem 0", maxWidth: "36rem", margin: "0 auto" }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 2rem",
            background: `${color}15`,
            color,
          }}
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem,3vw,2rem)",
            fontWeight: 800,
            color: "var(--ink-0)",
            marginBottom: "1rem",
            letterSpacing: "-0.03em",
          }}
        >
          Application Ready &amp; Sent!
        </h2>
        <p style={{ color: "var(--ink-3)", margin: "0 auto 1.5rem", lineHeight: 1.8 }}>
          Thank you for applying for the <strong>{jobTitle}</strong> position. Your application details have been addressed to <strong>hr@creinnovations.in</strong>.
        </p>
        {resumeFile && (
          <p style={{ color: "var(--ink-4)", fontSize: "0.875rem", margin: "0 auto 2rem", background: "var(--cream-1)", padding: "0.75rem 1rem", borderRadius: "10px", border: "1px solid var(--border-warm)" }}>
            📎 Remember to attach your resume file (<strong>{resumeFile.name}</strong>) when sending the email!
          </p>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", marginBottom: "2.5rem" }}>
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.875rem 1.75rem",
              background: color,
              color: "#fff",
              borderRadius: "999px",
              fontSize: "0.9375rem",
              fontWeight: 700,
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              boxShadow: `0 4px 14px ${color}40`,
            }}
          >
            Open in Gmail
          </a>
          <a
            href={mailtoUrl}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.875rem 1.75rem",
              background: "var(--surface-sm)",
              color: "var(--ink-1)",
              border: "1px solid var(--border-warm)",
              borderRadius: "999px",
              fontSize: "0.9375rem",
              fontWeight: 700,
              textDecoration: "none",
              fontFamily: "var(--font-display)",
            }}
          >
            Open Default Mail App
          </a>
        </div>
        <Link
          href="/careers"
          style={{
            color: "var(--ink-3)",
            fontSize: "0.875rem",
            fontWeight: 600,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <ArrowLeft size={14} /> Back to Open Roles
        </Link>
      </div>
    );
  }

  const slideVariants = {
    hidden:  { x: 50, opacity: 0 },
    visible: { x: 0,  opacity: 1 },
    exit:    { x: -50, opacity: 0 },
  };

  return (
    <div style={{ paddingTop: "1rem" }}>
      <Link
        href={`/careers/${slug}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--ink-3)",
          textDecoration: "none",
          fontSize: "0.875rem",
          fontWeight: 600,
          fontFamily: "var(--font-display)",
          marginBottom: "2.5rem",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--ink-0)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--ink-3)")}
      >
        <ArrowLeft size={16} /> Back to Job Description
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem,3.5vw,2.125rem)",
            fontWeight: 900,
            color: "var(--ink-0)",
            letterSpacing: "-0.04em",
            marginBottom: "0.375rem",
          }}
        >
          Apply for {jobTitle}
        </h1>
        <p style={{ color: "var(--ink-3)", fontSize: "0.875rem", margin: 0 }}>
          Step {step} of 4
        </p>

        {/* Progress Bar */}
        <div
          style={{
            width: "100%",
            height: 4,
            background: "var(--cream-3)",
            borderRadius: 4,
            marginTop: "1.25rem",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{ height: "100%", borderRadius: 4, background: color }}
            initial={{ width: "25%" }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ ease: "circOut", duration: 0.4 }}
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <GlowCard
          glowColor={color}
          style={{ padding: "2rem", marginBottom: "1.5rem" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
              style={{ minHeight: 300 }}
            >
              {/* ── Step 1: Personal Info ── */}
              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "1.125rem",
                      color: "var(--ink-0)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Personal Information
                  </h3>
                  <Field label="Full Name *">
                    <input required type="text" style={inputStyle} placeholder="Jane Doe" value={formData.fullName} onChange={e => setFormData(f => ({ ...f, fullName: e.target.value }))} />
                  </Field>
                  <Field label="Email Address *">
                    <input required type="email" style={inputStyle} placeholder="jane@example.com" value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} />
                  </Field>
                  <Field label="Phone Number">
                    <input type="tel" style={inputStyle} placeholder="+91 98765 43210" value={formData.phone} onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))} />
                  </Field>
                </div>
              )}

              {/* ── Step 2: Professional Links ── */}
              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "1.125rem",
                      color: "var(--ink-0)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Professional Links
                  </h3>
                  <Field label="LinkedIn Profile *">
                    <input required type="url" style={inputStyle} placeholder="https://linkedin.com/in/..." value={formData.linkedInUrl} onChange={e => setFormData(f => ({ ...f, linkedInUrl: e.target.value }))} />
                  </Field>
                  <Field label="Portfolio / GitHub">
                    <input type="url" style={inputStyle} placeholder="https://github.com/..." value={formData.portfolioUrl} onChange={e => setFormData(f => ({ ...f, portfolioUrl: e.target.value }))} />
                  </Field>
                  <Field label="Years of Experience *">
                    <select required style={inputStyle} value={formData.experience} onChange={e => setFormData(f => ({ ...f, experience: e.target.value }))}>
                      <option value="">Select experience</option>
                      <option value="0-1">0–1 years</option>
                      <option value="2-3">2–3 years</option>
                      <option value="4-5">4–5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </Field>
                </div>
              )}

              {/* ── Step 3: Documents ── */}
              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "1.125rem",
                      color: "var(--ink-0)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Documents
                  </h3>
                  <div>
                    <label style={{ marginBottom: "0.5rem", display: "block" }}>
                      Resume / CV * (PDF, max 10MB)
                    </label>
                    <input
                      type="file"
                      accept="application/pdf"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.type !== "application/pdf") {
                            toast.error("Only PDF files are allowed");
                            return;
                          }
                          if (file.size > 10 * 1024 * 1024) {
                            toast.error("File size must be under 10MB");
                            return;
                          }
                          setResumeFile(file);
                        }
                      }}
                    />
                    <div
                      style={{
                        width: "100%",
                        border: `2px dashed ${resumeFile ? color : "var(--border-strong)"}`,
                        borderRadius: "var(--radius-md)",
                        padding: "2rem",
                        textAlign: "center",
                        background: resumeFile ? `${color}15` : "var(--cream-1)",
                        cursor: "pointer",
                        transition: "background 0.2s, border-color 0.2s",
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      onMouseEnter={(e) => {
                        if (!resumeFile) {
                          (e.currentTarget as HTMLElement).style.background = "var(--cream-2)";
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--ink-4)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!resumeFile) {
                          (e.currentTarget as HTMLElement).style.background = "var(--cream-1)";
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                        }
                      }}
                    >
                      {resumeFile ? (
                        <>
                          <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem", color }}>
                            <FileText size={24} />
                          </div>
                          <p style={{ color, margin: "0 0 0.25rem", fontWeight: 600 }}>
                            {resumeFile.name}
                          </p>
                          <p style={{ fontSize: "0.75rem", color: "var(--ink-4)", margin: 0 }}>
                            Click to change file
                          </p>
                        </>
                      ) : (
                        <>
                          <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem", color: "var(--ink-4)" }}>
                            <UploadCloud size={24} />
                          </div>
                          <p style={{ color: "var(--ink-3)", margin: "0 0 0.25rem", fontWeight: 500 }}>
                            Drag and drop your file here, or click to browse
                          </p>
                          <p style={{ fontSize: "0.75rem", color: "var(--ink-4)", margin: 0 }}>
                            Only PDF formats are supported
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <Field label="Cover Letter (Optional)">
                    <textarea
                      rows={4}
                      style={{ ...inputStyle, resize: "none" }}
                      placeholder="Tell us why you'd be a great fit..."
                      value={formData.coverLetter}
                      onChange={e => setFormData(f => ({ ...f, coverLetter: e.target.value }))}
                    />
                  </Field>
                </div>
              )}

              {/* ── Step 4: Review ── */}
              {step === 4 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "1.125rem",
                      color: "var(--ink-0)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Review &amp; Submit
                  </h3>
                  <p style={{ color: "var(--ink-3)", lineHeight: 1.75 }}>
                    Please review your information before submitting. Once submitted, our team
                    will review your application.
                  </p>
                  <div
                    style={{
                      background: "var(--cream-1)",
                      borderRadius: "var(--radius-md)",
                      padding: "1.25rem 1.5rem",
                      border: "1px solid var(--border-warm)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    {[
                      { k: "Applying for", v: jobTitle },
                      { k: "Department", v: department.replace("-", " ") },
                    ].map(({ k, v }) => (
                      <div
                        key={k}
                        style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}
                      >
                        <span style={{ color: "var(--ink-3)", fontSize: "0.875rem" }}>{k}</span>
                        <span
                          style={{
                            color: "var(--ink-0)",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            textTransform: "capitalize",
                          }}
                        >
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div
            style={{
              marginTop: "2.5rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--border-warm)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "var(--radius-pill)",
                  fontWeight: 600,
                  fontFamily: "var(--font-display)",
                  fontSize: "0.9375rem",
                  color: "var(--ink-3)",
                  background: "transparent",
                  border: "1.5px solid var(--border-warm)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--ink-0)";
                  (e.currentTarget as HTMLElement).style.background = "var(--cream-2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--ink-3)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: "0.8125rem 2rem",
                borderRadius: "var(--radius-pill)",
                fontWeight: 700,
                fontFamily: "var(--font-display)",
                fontSize: "0.9375rem",
                color: "#fff",
                background: color,
                border: "none",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.6 : 1,
                transition: "transform 0.2s, opacity 0.2s",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting)
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
            >
              {step < 4 ? "Continue" : isSubmitting ? "Submitting…" : "Submit Application"}
            </button>
          </div>
        </GlowCard>
      </form>
    </div>
  );
}
