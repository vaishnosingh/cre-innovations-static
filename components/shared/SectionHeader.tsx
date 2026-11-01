interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  pillClass?: string;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  pillClass = "pill-violet",
}: SectionHeaderProps) {
  return (
    <div
      style={{
        textAlign: align,
        marginBottom: "3.5rem",
        maxWidth: align === "center" ? "42rem" : "none",
        margin: align === "center" ? "0 auto 3.5rem" : "0 0 3.5rem",
      }}
    >
      {badge && (
        <div style={{ marginBottom: "1.25rem", display: align === "center" ? "flex" : "block", justifyContent: "center" }}>
          <span className={`pill ${pillClass}`}>{badge}</span>
        </div>
      )}
      <h2
        className="text-title"
        style={{ color: "var(--t1)", marginBottom: subtitle ? "1rem" : 0 }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: "var(--t3)", fontSize: "1.0625rem", lineHeight: 1.75, margin: 0 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
