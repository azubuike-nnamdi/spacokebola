import * as React from "react";

interface EmailTemplateProps {
  type: "otp" | "invitation";
  name?: string;
  code?: string;
  inviterName?: string;
  invitationUrl?: string;
  role?: string;
  expiresIn?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  type,
  name,
  code,
  inviterName,
  invitationUrl,
  role,
  expiresIn,
}) => {
  const isOtp = type === "otp";

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        lineHeight: "1.6",
        color: "#1a1a1a",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          backgroundColor: "#4f46e5",
          backgroundImage: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          padding: "48px 20px",
          textAlign: "center",
          borderRadius: "16px 16px 0 0",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            margin: 0,
            fontSize: "28px",
            fontWeight: "800",
            letterSpacing: "-0.05em",
            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          St. Paul&apos;s Anglican Church
        </h1>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            margin: "12px 0 0 0",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Oke Bola, Ibadan
        </p>
      </div>

      <div
        style={{
          padding: "40px 32px",
          border: "1px solid #e5e7eb",
          borderTop: "none",
          borderRadius: "0 0 16px 16px",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#111827",
            marginTop: 0,
            marginBottom: "16px",
          }}
        >
          {isOtp ? "Your Verification Code" : "You've Been Invited!"}
        </h2>

        {isOtp ? (
          <>
            <p style={{ color: "#4b5563", fontSize: "16px", marginBottom: "32px" }}>
              {name ? `Hello ${name}, ` : "Hello, "}
              use the verification code below to complete your sign-in. This code
              will expire in <strong>{expiresIn || "10 minutes"}</strong>.
            </p>

            <div
              style={{
                backgroundColor: "#f9fafb",
                borderRadius: "12px",
                padding: "24px",
                textAlign: "center",
                border: "1px dashed #d1d5db",
                marginBottom: "32px",
              }}
            >
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  letterSpacing: "0.25em",
                  color: "#4f46e5",
                  fontFamily: "monospace",
                }}
              >
                {code}
              </span>
            </div>
          </>
        ) : (
          <>
            <p style={{ color: "#4b5563", fontSize: "16px", marginBottom: "24px" }}>
              {inviterName} has invited you to join the St. Paul&apos;s Anglican Church
              management system as a <strong>{role || "member"}</strong>.
            </p>

            <div style={{ textAlign: "center", margin: "32px 0" }}>
              <a
                href={invitationUrl}
                style={{
                  backgroundColor: "#4f46e5",
                  color: "#ffffff",
                  padding: "14px 32px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "16px",
                  display: "inline-block",
                  boxShadow: "0 4px 6px -1px rgba(79, 70, 229, 0.2)",
                }}
              >
                Accept Invitation
              </a>
            </div>

            <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "32px" }}>
              This invitation will expire in <strong>{expiresIn || "7 days"}</strong>.
            </p>
          </>
        )}

        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: "24px",
            marginTop: "24px",
          }}
        >
          <p style={{ color: "#9ca3af", fontSize: "12px", margin: 0 }}>
            If you didn&apos;t request this email, you can safely ignore it.
          </p>
          <p
            style={{
              color: "#9ca3af",
              fontSize: "12px",
              marginTop: "8px",
              marginBottom: 0,
            }}
          >
            &copy; {new Date().getFullYear()} St. Paul&apos;s Anglican Church Oke Bola. All
            rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};