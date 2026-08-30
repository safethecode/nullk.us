"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { calculateGridLayout, type GridLayout } from "./grid-layout";

const EMPTY_LAYOUT: GridLayout = {
  cardSize: 0,
  columns: 0,
  rows: 0,
  tileCount: 0,
};

export function IncubatorGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState(EMPTY_LAYOUT);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const updateLayout = (width: number, height: number) => {
      const nextLayout = calculateGridLayout(width, height);

      setLayout((currentLayout) =>
        currentLayout.cardSize === nextLayout.cardSize &&
        currentLayout.columns === nextLayout.columns &&
        currentLayout.rows === nextLayout.rows
          ? currentLayout
          : nextLayout
      );
    };

    updateLayout(container.clientWidth, container.clientHeight);

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (entry) {
        updateLayout(entry.contentRect.width, entry.contentRect.height);
      }
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  const gridStyle =
    layout.tileCount > 0
      ? {
          gridTemplateColumns: `repeat(${layout.columns}, ${layout.cardSize}px)`,
          gridTemplateRows: `repeat(${layout.rows}, ${layout.cardSize}px)`,
        }
      : undefined;
  const cardStyle = {
    height: layout.cardSize,
    width: layout.cardSize,
  };
  const cards: ReactNode[] = [];

  for (let cardNumber = 0; cardNumber < layout.tileCount; cardNumber += 1) {
    cards.push(
      <div
        className="rounded-xl bg-neutral-100"
        key={`incubator-card-${cardNumber}`}
        style={cardStyle}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="grid min-h-0 flex-1 content-between justify-between gap-2 overflow-hidden"
      ref={containerRef}
      style={gridStyle}
    >
      {cards}
    </div>
  );
}
