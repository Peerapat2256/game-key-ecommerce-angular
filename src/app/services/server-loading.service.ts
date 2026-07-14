import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ServerLoadingService {
  readonly isVisible = signal(false);
  private pendingRequests = 0;
  private showTimer: ReturnType<typeof setTimeout> | null = null;

  onRequestStart(): void {
    this.pendingRequests++;

    if (this.pendingRequests === 1 && !this.showTimer) {
      this.showTimer = setTimeout(() => {
        if (this.pendingRequests > 0) {
          this.isVisible.set(true);
        }
      }, 3000);
    }
  }

  onRequestEnd(): void {
    this.pendingRequests = Math.max(0, this.pendingRequests - 1);

    if (this.pendingRequests === 0) {
      if (this.showTimer) {
        clearTimeout(this.showTimer);
        this.showTimer = null;
      }
      this.isVisible.set(false);
    }
  }
}
