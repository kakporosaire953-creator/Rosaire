import { Router } from "express";
import { Resend } from "resend";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: "Missing required fields: name, email, message" });
    return;
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "Invalid email address" });
    return;
  }

  const apiKey = process.env["RESEND_API_KEY"];
  const toEmail = process.env["CONTACT_EMAIL"] ?? "kakporosaire953@gmail.com";

  req.log.info({ from: email, name }, "Contact form submission received");

  if (!apiKey) {
    req.log.warn("RESEND_API_KEY not configured — email not sent, but logging submission");
    req.log.info({ name, email, message }, "Contact form submission (no mailer)");
    res.json({ success: true, note: "no_mailer" });
    return;
  }

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Portfolio RK <onboarding@resend.dev>",
      to: [toEmail],
      reply_to: email,
      subject: `[Portfolio] Nouveau message de ${name}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#f8f3eb;padding:32px;border-radius:12px;border:1px solid rgba(255,110,0,0.2)">
          <div style="margin-bottom:24px">
            <div style="font-size:24px;font-weight:800;letter-spacing:-0.02em">RK<span style="color:#FF6B00">.</span> Portfolio</div>
            <div style="font-size:11px;color:rgba(248,243,235,0.4);letter-spacing:0.15em;text-transform:uppercase;margin-top:4px">Nouveau message reçu</div>
          </div>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.07);margin-bottom:24px"/>
          <div style="margin-bottom:16px">
            <div style="font-size:10px;color:rgba(248,243,235,0.4);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px">De</div>
            <div style="font-size:15px;font-weight:600">${escapeHtml(name)}</div>
            <div style="font-size:13px;color:#FF6B00">${escapeHtml(email)}</div>
          </div>
          <div style="margin-bottom:24px">
            <div style="font-size:10px;color:rgba(248,243,235,0.4);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px">Message</div>
            <div style="font-size:14px;line-height:1.6;color:rgba(248,243,235,0.85);background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:16px;white-space:pre-wrap">${escapeHtml(message)}</div>
          </div>
          <a href="mailto:${escapeHtml(email)}?subject=Re: Votre message depuis mon portfolio"
            style="display:inline-block;background:#FF6B00;color:#0a0a0a;font-weight:700;font-size:13px;padding:12px 24px;border-radius:8px;text-decoration:none">
            Répondre à ${escapeHtml(name)}
          </a>
        </div>
      `,
    });

    req.log.info({ to: toEmail }, "Contact email sent successfully");
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email via Resend");
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default router;
