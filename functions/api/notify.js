// POST /api/notify — trägt eine E-Mail-Adresse in die Brevo-Liste
// „Shop-Benachrichtigung" ein. Benötigt die Umgebungsvariable BREVO_API_KEY
// (Pages-Projekt → Settings → Environment variables).

const LIST_ID = 4; // Brevo-Liste „Shop-Benachrichtigung"

export async function onRequestPost({ request, env }) {
  let email = "";
  let honeypot = "";
  try {
    const ct = request.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      const d = await request.json();
      email = String(d.email || "").trim().toLowerCase();
      honeypot = String(d.hp || "");
    } else {
      const f = await request.formData();
      email = String(f.get("email") || "").trim().toLowerCase();
      honeypot = String(f.get("hp") || "");
    }
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }

  // Honeypot: Bots, die das versteckte Feld ausfüllen, bekommen Erfolg vorgemacht
  if (honeypot) return json({ ok: true });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    return json({ ok: false, error: "email" }, 400);
  }
  if (!env.BREVO_API_KEY) {
    return json({ ok: false, error: "config" }, 500);
  }

  const r = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": env.BREVO_API_KEY,
      "content-type": "application/json",
      "accept": "application/json",
    },
    body: JSON.stringify({
      email,
      updateEnabled: true,
      listIds: [LIST_ID],
      attributes: { QUELLE: "landing" },
    }),
  });

  if (r.ok) return json({ ok: true });
  const err = await r.json().catch(() => ({}));
  // Bereits eingetragene Adresse gilt als Erfolg (kein Leck nach außen)
  if (r.status === 409 || String(err.message || "").toLowerCase().includes("already")) {
    return json({ ok: true });
  }
  return json({ ok: false, error: "brevo" }, 502);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
