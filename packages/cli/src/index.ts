import { Command } from "commander";
import {sendTelegramMessage} from "sendkit-core";

const program = new Command();

program
  .name("sendkit")
  .description("SendKit tutorial CLI")
  .command("telegram")
  .description("Send a Telegram message")
  .argument("<chatId>", "Telegram chat ID")
  .argument("<message>", "Message text to send")
  .action(async (chatId: string, message: string) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      console.error("Error: TELEGRAM_BOT_TOKEN environment variable is not set.");
      process.exit(1);
    }
    if (!chatId) {
      console.error("Error: Chat ID is not provided.");
      process.exit(1);
    }
    if (!message) {
      console.error("Error: Message text is not provided.");
      process.exit(1);
    }
    const response = await fetch(
  `https://api.telegram.org/bot${token}/sendMessage`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  }
);

const data: TelegramResponse = await response.json();
if (!response.ok || !data.ok) {
  const detail = data.description ?? response.statusText;
  console.error(`Telegram API request failed: ${detail}`);
  process.exit(1);
}

const messageId = data.result?.message_id;

if (messageId !== undefined) {
  console.log(`Message sent successfully! Message ID: ${messageId}`);
} else {
  console.log("Message sent successfully!");
}
});

program.parseAsync(process.argv);
