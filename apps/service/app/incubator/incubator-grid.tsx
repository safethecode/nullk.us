"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@heiglabs/design-system/tooltip";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  calculateGridLayout,
  createIncubatorTiles,
  type GridLayout,
  INCUBATOR_PROJECTS,
} from "./grid-layout";

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
  const cards = createIncubatorTiles(INCUBATOR_PROJECTS, layout.tileCount).map(
    (tile) => {
      if (tile.kind === "placeholder") {
        return (
          <div
            aria-hidden="true"
            className="rounded-xl bg-neutral-100"
            key={`incubator-card-${tile.id}`}
            style={cardStyle}
          />
        );
      }

      const { project } = tile;

      return (
        <Tooltip key={project.href}>
          <TooltipTrigger asChild>
            <a
              aria-label={`${project.title} 프로젝트 열기`}
              className="group relative overflow-hidden rounded-xl bg-neutral-100 outline-none transition-[filter,box-shadow] hover:brightness-95 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-inset"
              href={project.href}
              rel="noopener noreferrer"
              style={cardStyle}
              target="_blank"
            >
              <Image
                alt=""
                className="scale-[1.225] object-cover transition-transform duration-300 ease-out group-hover:scale-100 group-focus-visible:scale-100 motion-reduce:transition-none"
                fill
                sizes="48px"
                src={project.logoSrc}
              />
            </a>
          </TooltipTrigger>
          <TooltipContent className="z-[110]" sideOffset={6}>
            {project.title}
          </TooltipContent>
        </Tooltip>
      );
    }
  );

  return (
    <div
      className="grid min-h-0 flex-1 content-between justify-between gap-2 overflow-hidden"
      ref={containerRef}
      style={gridStyle}
    >
      {cards}
    </div>
  );
}
