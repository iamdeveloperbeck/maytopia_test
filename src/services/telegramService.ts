import type { CommentPayload } from "./userService";

export const formatTelegramMessage = (data: CommentPayload) => {
  const { phone, comment, type, stol, skidkaPercent } = data;

  const typeLabel = type === "stol" ? "🪑 Stol broni" : "🛍 Buyurtma";
  const stolInfo = stol ? `\n📍 Stol/ID: ${stol}` : "";
  const skidkaInfo = skidkaPercent
    ? `\n💸 Chegirma: ${skidkaPercent}% ${
        type === "stol"
          ? " Yaratilgan sanadagi to'lov uchun"
          : " Keyingi To'lov uchun"
      }`
    : "";

  return `
${typeLabel}
━━━━━━━━━━━━━━━━━━
📞 Telefon: ${phone}
💬 Izoh: ${comment || "—"}
${stolInfo}${skidkaInfo}
━━━━━━━━━━━━━━━━━━
🕐 Sana: ${new Date().toLocaleString("uz-UZ")}
  `.trim();
};

export const sendMessageGroup = async (payload: CommentPayload) => {
  const webhookSecret = import.meta.env.VITE_BOT_TOKEN;
  const url = `https://api.telegram.org/bot${webhookSecret}/sendMessage`;

  console.log(payload);
  
  const msg = formatTelegramMessage(payload)

  console.log(msg);
  

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: "-1003275144796",
      text: msg,
    }),
  });
};
