/**
 * Utility functions for playing system sounds
 */

export const playSystemSound = async (soundPath: string): Promise<void> => {
  try {
    const audio = new Audio(soundPath);
    await audio.play();
  } catch {
    // Silently handle audio errors (user interaction required, autoplay policies, etc.)
  }
};

// System sound paths
export const SYSTEM_SOUNDS = {
  chord: "/Program Files/jspaint/audio/chord.wav",
  notification: "/Program Files/Messenger/notification.mp3",
  // Add more system sounds as needed
} as const;
