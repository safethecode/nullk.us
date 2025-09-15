export type TimeUpdateCallback = (seconds: number) => void;

export class TimeTracker {
  private isTracking = false;
  private startTime = 0;
  private intervalId: NodeJS.Timeout | null = null;

  private onTimeUpdate: TimeUpdateCallback;

  constructor(onTimeUpdate: TimeUpdateCallback) {
    this.onTimeUpdate = onTimeUpdate;
  }

  start(): void {
    if (this.isTracking) {
      return;
    }

    this.isTracking = true;
    this.startTime = Date.now();

    this.intervalId = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
      this.onTimeUpdate(timeSpent);
    }, 1000);
  }

  stop(): void {
    if (!this.isTracking) {
      return;
    }

    this.isTracking = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getElapsedTime(): number {
    if (!this.isTracking) {
      return 0;
    }
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  destroy(): void {
    this.stop();
  }
}
