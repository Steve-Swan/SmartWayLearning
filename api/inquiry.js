const https = require("https");

function postToFormsubmit(formData) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(formData);
    const options = {
      hostname: "formsubmit.co",
      path: "/ajax/smartwaylearningcenter@gmail.com",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, data: { raw: data } });
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const formData = req.body;

  // Log the full submission — visible in Vercel Functions logs
  console.log("=== NEW INQUIRY ===");
  console.log(JSON.stringify(formData, null, 2));
  console.log("===================");

  try {
    const result = await postToFormsubmit(formData);
    console.log("Formsubmit response:", result.status, JSON.stringify(result.data));

    if (result.status >= 200 && result.status < 300 && result.data.success) {
      return res.status(200).json({ success: true });
    } else {
      console.error("Formsubmit failed:", result.data);
      return res.status(502).json({ success: false, message: result.data.message || "Email service error" });
    }
  } catch (err) {
    console.error("Request error:", err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
