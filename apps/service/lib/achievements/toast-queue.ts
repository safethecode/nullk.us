'use client';

import type React from 'react';
import { toast } from 'sonner';

interface ToastItem {
  id: string;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  iconColor?: string;
  bgColor?: string;
}

class ToastQueue {
  private static instance: ToastQueue;
  private queue: ToastItem[] = [];
  private isProcessing = false;
  private currentToastId: string | null = null;
  private readonly TOAST_DURATION = 3000;
  private readonly TOAST_DELAY = 500;

  static getInstance(): ToastQueue {
    if (!ToastQueue.instance) {
      ToastQueue.instance = new ToastQueue();
    }
    return ToastQueue.instance;
  }

  addToast(item: Omit<ToastItem, 'id'>): void {
    const toastItem: ToastItem = {
      ...item,
      id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    this.queue.push(toastItem);

    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const toastItem = this.queue.shift();

      if (!toastItem) {
        break;
      }

      await this.showToast(toastItem);

      if (this.queue.length > 0) {
        await this.delay(this.TOAST_DELAY);
      }
    }

    this.isProcessing = false;
  }

  private async showToast(item: ToastItem): Promise<void> {
    return new Promise((resolve) => {
      const React = require('react');
      const AchievementSonnerToast =
        require('@/ui/achievement-sonner-toast').default;

      const toastId = toast.custom(
        () =>
          React.createElement(AchievementSonnerToast, {
            title: item.title,
            subtitle: item.subtitle,
            icon: item.icon,
            iconColor: item.iconColor,
            bgColor: item.bgColor,
          }),
        {
          duration: this.TOAST_DURATION,
          onDismiss: () => {
            this.currentToastId = null;
            resolve();
          },
          onAutoClose: () => {
            this.currentToastId = null;
            resolve();
          },
        }
      );

      this.currentToastId = String(toastId);

      setTimeout(() => {
        this.currentToastId = null;
        resolve();
      }, this.TOAST_DURATION + 1000);
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  clear(): void {
    this.queue = [];
    this.isProcessing = false;
    this.currentToastId = null;
    toast.dismiss();
  }

  getQueueLength(): number {
    return this.queue.length;
  }

  getQueueStatus(): {
    isProcessing: boolean;
    queueLength: number;
    currentToastId: string | null;
  } {
    return {
      isProcessing: this.isProcessing,
      queueLength: this.queue.length,
      currentToastId: this.currentToastId,
    };
  }
}

export const toastQueue = ToastQueue.getInstance();
