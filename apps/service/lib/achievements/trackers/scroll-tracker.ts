export type ScrollProgressCallback = (percent: number) => void;

export class ScrollTracker {
  private isTracking = false;
  private ticking = false;

  private readonly onProgress: ScrollProgressCallback;

  constructor(onProgress: ScrollProgressCallback) {
    this.onProgress = onProgress;
  }

  start(): void {
    if (typeof window === "undefined" || this.isTracking) {
      return;
    }

    this.isTracking = true;
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  }

  stop(): void {
    if (typeof window === "undefined" || !this.isTracking) {
      return;
    }

    this.isTracking = false;
    window.removeEventListener("scroll", this.handleScroll);
  }

  private readonly handleScroll = (): void => {
    if (!this.ticking) {
      requestAnimationFrame(this.updateScrollProgress);
      this.ticking = true;
    }
  };

  private readonly updateScrollProgress = (): void => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    this.onProgress(scrollPercent);
    this.ticking = false;
  };

  destroy(): void {
    this.stop();
  }
}
