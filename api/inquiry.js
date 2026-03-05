module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const formData = req.body;

  // Log the full submission — visible in Vercel Functions logs
  console.log("═══ NEW INQUIRY ═══");
  console.log(JSON.stringify(formData, null, 2));
  console.log("═══════════════════");

  try {
    const response = await fetch("https://formsubmit.co/ajax/smartwaylearningcenter@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("Formsubmit response:", response.status, JSON.stringify(data));

    if (response.ok && data.success) {
      return res.status(200).json({ success: true });
    } else {
      console.error("Formsubmit failed:", data);
      return res.status(502).json({ success: false, message: data.message || "Email service error" });
    }
  } catch (err) {
    console.error("Fetch error:", err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
