import type { ContactInput } from "@/lib/validation";

/**
 * Corps de l'email reçu à chaque message du formulaire.
 *
 * Styles en attributs inline : les clients de messagerie ignorent en grande
 * partie les feuilles de style externes et `<style>` dans le `<head>`.
 */
export function ContactNotification({
  name,
  email,
  subject,
  message,
}: Omit<ContactInput, "company">) {
  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        color: "#f4f4f2",
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "32px",
      }}
    >
      <p
        style={{
          margin: "0 0 24px",
          color: "#c8f542",
          fontSize: "12px",
          letterSpacing: "0.1em",
          fontWeight: 700,
        }}
      >
        NOUVEAU MESSAGE — PORTFOLIO
      </p>

      <table cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
        <tbody>
          {(
            [
              ["Nom", name],
              ["Email", email],
              ["Sujet", subject],
            ] as const
          ).map(([label, value]) => (
            <tr key={label}>
              <td
                style={{
                  padding: "6px 16px 6px 0",
                  color: "#8a8a85",
                  fontSize: "13px",
                  verticalAlign: "top",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </td>
              <td style={{ padding: "6px 0", fontSize: "14px" }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "24px",
          padding: "20px",
          backgroundColor: "#151515",
          border: "1px solid #242424",
          borderRadius: "12px",
          fontSize: "14px",
          lineHeight: 1.65,
          whiteSpace: "pre-wrap",
        }}
      >
        {message}
      </div>

      <p style={{ marginTop: "24px", color: "#8a8a85", fontSize: "12px" }}>
        Répondre à cet email écrit directement à {email}.
      </p>
    </div>
  );
}
