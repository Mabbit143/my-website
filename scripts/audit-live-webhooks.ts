const apiKey = process.env.PADDLE_LIVE_API_KEY;

if (!apiKey) {
  throw new Error("PADDLE_LIVE_API_KEY is required. Do not hard-code live credentials.");
}

async function auditWebhooks() {
  const res = await fetch("https://api.paddle.com/notification-destinations", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log("Notification Destinations in Live:", JSON.stringify(data, null, 2));
}

auditWebhooks();
