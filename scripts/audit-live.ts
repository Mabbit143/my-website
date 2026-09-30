import { Environment, Paddle } from "@paddle/paddle-node-sdk";

const apiKey = process.env.PADDLE_LIVE_API_KEY;

if (!apiKey) {
  throw new Error("PADDLE_LIVE_API_KEY is required. Do not hard-code live credentials.");
}

const paddle = new Paddle(apiKey, {
  environment: Environment.production,
});

async function auditLive() {
  console.log("=== AUDITING LIVE PADDLE ACCOUNT ===");
  try {
    console.log("\n1. Products in Live:");
    const products = [];
    for await (const product of paddle.products.list({ include: ["prices"] })) {
      products.push(product);
      console.log(`- [${product.id}] ${product.name} (Tax Category: ${product.taxCategory}, Status: ${product.status})`);
      if (product.prices) {
        for (const price of product.prices) {
          console.log(`    ↳ Price [${price.id}] ${price.description || "No desc"} - ${price.unitPrice.amount} ${price.unitPrice.currencyCode} (${price.billingCycle ? price.billingCycle.interval : "one-time"})`);
        }
      }
    }

    console.log("\n2. Discounts in Live:");
    try {
      const discounts = [];
      for await (const discount of paddle.discounts.list()) {
        discounts.push(discount);
        console.log(`- [${discount.id}] ${discount.code} (${discount.type}: ${discount.amount})`);
      }
      if (discounts.length === 0) {
        console.log("  (No discounts found in live)");
      }
    } catch (e) {
      console.log("  (Discounts API not available or empty:", e instanceof Error ? e.message : e, ")");
    }

    console.log("\n3. Notification Destinations (Webhooks) in Live:");
    try {
      const notifications = [];
      for await (const nd of paddle.notificationDestinations.list()) {
        notifications.push(nd);
        console.log(`- [${nd.id}] ${nd.type} -> ${nd.url} (Active: ${nd.active})`);
      }
      if (notifications.length === 0) {
        console.log("  (No notification destinations found in live)");
      }
    } catch (e) {
      console.log("  (Notification destinations API error:", e instanceof Error ? e.message : e, ")");
    }
  } catch (error) {
    console.error("Error auditing live account:", error);
  }
}

auditLive();
