import { getPublicKey } from "nostr-tools";

// Generate a consistent bot key pair (this would be the same each time)
export const BOT_PRIVATE_KEY =
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
export const BOT_PUBLIC_KEY = getPublicKey(BOT_PRIVATE_KEY);

export const BOT_PROFILE = {
  about:
    "I'm here to help you navigate and experience stories in daedalOS. Ask me anything!",
  display_name: "daedalOS Assistant",
  name: "daedalOS Assistant",
  nip05: "assistant@daedal.os",
  picture: "/System/Icons/user.webp", // Using the user icon
  username: "assistant",
};

// Bot response patterns
export const BOT_RESPONSES = {
  default: [
    "That's interesting! Tell me more about what you'd like to do.",
    "I'm still learning, but I'd love to help. Can you rephrase that?",
    "Hmm, I'm not sure about that. Is there something specific you need help with?",
    "I'm here to assist! What would you like to know about daedalOS?",
  ],
  farewell: [
    "Goodbye! Feel free to message me anytime you need assistance.",
    "Take care! I'll be here whenever you want to chat or explore together.",
    "See you later! Don't hesitate to reach out if you have questions.",
  ],
  greeting: [
    "Hello! I'm the daedalOS Assistant. How can I help you today?",
    "Hi there! Welcome to daedalOS. What would you like to explore?",
    "Greetings! I'm here to help guide you through your daedalOS experience.",
  ],
  help: [
    "I can help you with:\n• Navigating the desktop\n• Opening applications\n• Understanding features\n• Starting interactive stories\n\nWhat interests you?",
    "Here are some things you can do:\n• Explore the file system\n• Try different applications\n• Customize your desktop\n• Ask me about specific features",
  ],
  story: [
    "Would you like to embark on an interactive story? I can guide you through different scenarios and adventures within daedalOS!",
    "I have some interesting stories to share! They involve mysteries, puzzles, and exploring the digital world of daedalOS.",
    "Stories are my specialty! I can create immersive experiences where you make choices and I adapt the narrative accordingly.",
  ],
};

// Keywords that trigger specific responses
export const BOT_KEYWORDS = {
  farewell: ["bye", "goodbye", "farewell", "see you", "later", "quit", "exit"],
  greeting: [
    "hello",
    "hi",
    "hey",
    "greetings",
    "howdy",
    "good morning",
    "good afternoon",
    "good evening",
  ],
  help: ["help", "assist", "support", "how", "what", "guide", "tutorial"],
  story: [
    "story",
    "stories",
    "narrative",
    "adventure",
    "tale",
    "journey",
    "experience",
  ],
};
