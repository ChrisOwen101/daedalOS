/**
 * Utility functions for playing system sounds
 */

// System sound paths
export const SYSTEM_SOUNDS = {
  chord: "/Program Files/jspaint/audio/chord.wav",
  notification: "/Program Files/Messenger/notification.mp3",
  // Add more system sounds as needed
} as const;

// Audio context for managing autoplay permissions
class AudioManager {
  private audioEnabled = false;
  private initializePromise: Promise<void> | null = null;

  public async initialize(): Promise<void> {
    if (this.audioEnabled || this.initializePromise) {
      return this.initializePromise || Promise.resolve();
    }

    this.initializePromise = this.tryEnableAudio();
    return this.initializePromise;
  }

  private async tryEnableAudio(): Promise<void> {
    try {
      // Try to play an existing audio file to test autoplay permissions
      const testAudio = new Audio(SYSTEM_SOUNDS.notification);
      testAudio.volume = 0;
      testAudio.currentTime = 0;
      await testAudio.play();
      testAudio.pause();
      this.audioEnabled = true;
    } catch {
      // Audio is blocked, user interaction required
      this.setupUserInteractionListener();
    }
  }

  private setupUserInteractionListener(): void {
    const enableAudio = async (): Promise<void> => {
      try {
        const testAudio = new Audio(SYSTEM_SOUNDS.notification);
        testAudio.volume = 0;
        testAudio.currentTime = 0;
        await testAudio.play();
        testAudio.pause();
        this.audioEnabled = true;
        
        // Remove listeners after successful audio enabling
        document.removeEventListener("click", enableAudio);
        document.removeEventListener("keydown", enableAudio);
        document.removeEventListener("touchstart", enableAudio);
      } catch {
        // Still blocked, keep trying
      }
    };

    document.addEventListener("click", enableAudio, { once: true });
    document.addEventListener("keydown", enableAudio, { once: true });
    document.addEventListener("touchstart", enableAudio, { once: true });
  }

  public async playSound(soundPath: string): Promise<void> {
    await this.initialize();
    
    try {
      const audio = new Audio(soundPath);
      audio.load();
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("Could not play system sound:", error);
    }
  }
}

const audioManager = new AudioManager();

export const playSystemSound = async (soundPath: string): Promise<void> => {
  return audioManager.playSound(soundPath);
};