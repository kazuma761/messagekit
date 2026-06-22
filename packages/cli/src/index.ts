import { Command } from "commander";

const program = new Command();

program
  .name("sendkit")
  .description("SendKit tutorial CLI")
  .command("telegram")
  .description("Send a Telegram message")
  .argument("<chatId>", "Telegram chat ID")
  .argument("<message>", "Message text to send")
  .action(async (chatId: string, message: string) => {
    console.log("chatId", chatId);
    console.log("message", message);
    process.exit(1);
  });

program.parseAsync(process.argv);