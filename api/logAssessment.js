export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const webhookUrl = process.env.GSHEET_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(500).json({
      error: "Missing GSHEET_WEBHOOK_URL environment variable",
    });
  }

  const {
    participantNames = {},
    participantType = "single",
    preferredName = "",
    results,
  } = req.body ?? {};

  if (!results) {
    return res.status(400).json({ error: "Missing results payload" });
  }

  const payload = {
    submittedAt: new Date().toISOString(),
    participantNames,
    participantType,
    preferredName,
    overallPercent: results.overallPercent ?? null,
    themes: results.themes ?? [],
    rating: results.rating ?? "",
    ratingForReport: results.ratingForReport ?? "",
    reasons: results.reasons ?? [],
    rawResults: results,
  };

  const sharedSecret = process.env.GSHEET_WEBHOOK_SECRET;
  if (sharedSecret) {
    payload.secret = sharedSecret;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    if (!response.ok) {
      console.error("Google Sheet webhook failed", response.status, text);
      return res.status(502).json({
        error: "Failed to append row to Google Sheet",
        status: response.status,
        details: text || response.statusText,
      });
    }

    console.log("Google Sheet webhook success", response.status, text);

    return res
      .status(200)
      .json({ success: true, webhookStatus: response.status, webhookBody: text || null });
  } catch (error) {
    console.error("Failed to hit Google Sheets webhook:", error);
    return res
      .status(500)
      .json({ error: "Unexpected error calling Google Sheets webhook" });
  }
}
