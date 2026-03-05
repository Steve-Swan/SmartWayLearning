module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const formData = req.body;

  // Log the full submission — visible in Vercel Functions logs
  console.log("=== NEW INQUIRY ===");
  console.log(JSON.stringify(formData, null, 2));
  console.log("===================");

  return res.status(200).json({ success: true });
};
