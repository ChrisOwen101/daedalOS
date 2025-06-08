import { getEventHash, getSignature, type Event } from "nostr-tools";
import {
  BOT_PRIVATE_KEY,
  BOT_PUBLIC_KEY,
  BOT_RESPONSES,
  BOT_KEYWORDS,
} from "components/apps/Messenger/botConstants";
import { DM_KIND } from "components/apps/Messenger/constants";

export class BotService {
  private responseDelay = 1000; // 1 second delay to simulate thinking

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private categorizeMessage(content: string): keyof typeof BOT_RESPONSES {
    const lowerContent = content.toLowerCase();

    // Check for greeting keywords
    if (
      BOT_KEYWORDS.greeting.some((keyword) => lowerContent.includes(keyword))
    ) {
      return "greeting";
    }

    // Check for help keywords
    if (BOT_KEYWORDS.help.some((keyword) => lowerContent.includes(keyword))) {
      return "help";
    }

    // Check for story keywords
    if (BOT_KEYWORDS.story.some((keyword) => lowerContent.includes(keyword))) {
      return "story";
    }

    // Check for farewell keywords
    if (
      BOT_KEYWORDS.farewell.some((keyword) => lowerContent.includes(keyword))
    ) {
      return "farewell";
    }

    return "default";
  }

  private createBotEvent(content: string, recipientKey: string): Event {
    const now = Math.floor(Date.now() / 1000);

    const event: Event = {
      content,
      created_at: now,
      id: "",
      kind: DM_KIND,
      pubkey: BOT_PUBLIC_KEY,
      sig: "",
      tags: [["p", recipientKey]],
    };

    // Generate event ID
    event.id = getEventHash(event);

    // Sign the event
    event.sig = getSignature(event, BOT_PRIVATE_KEY);

    return event;
  }

  public generateResponse(
    userMessage: string,
    userPublicKey: string,
    onResponse: (event: Event) => void
  ): void {
    // Simulate thinking time
    setTimeout(() => {
      const category = this.categorizeMessage(userMessage);
      const responseText = this.getRandomResponse(BOT_RESPONSES[category]);

      // Create and send bot response event
      const responseEvent = this.createBotEvent(responseText, userPublicKey);
      onResponse(responseEvent);
    }, this.responseDelay);
  }

  public getBotPublicKey(): string {
    return BOT_PUBLIC_KEY;
  }

  public isBotMessage(pubkey: string): boolean {
    return pubkey === BOT_PUBLIC_KEY;
  }
}

// Singleton instance
export const botService = new BotService();
