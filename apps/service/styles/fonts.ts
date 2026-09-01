import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

export const martianMonoCondensed = localFont({
  display: "swap",
  src: "./fonts/MartianMonoCondensed-Regular.woff2",
  variable: "--font-martian-mono-condensed",
  weight: "400",
});

export const interTight = Inter_Tight({
  display: "swap",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: "300",
});

export const jetBrainsMono = JetBrains_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const pretendard = localFont({
  variable: "--font-pretendard",
  src: [
    {
      path: "./fonts/Pretendard-Thin.subset.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-ExtraLight.subset.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-Light.subset.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-Medium.subset.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-SemiBold.subset.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-ExtraBold.subset.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-Black.subset.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});
