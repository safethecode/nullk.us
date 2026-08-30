import assert from "node:assert/strict";
import { test } from "node:test";
import { calculateGridLayout, createIncubatorTiles } from "./grid-layout.ts";
import { INCUBATOR_PROJECTS } from "./projects.ts";

test("screenshot-sized grid contains only complete cards", () => {
  assert.deepEqual(calculateGridLayout(246, 781), {
    cardSize: 42.8,
    columns: 5,
    rows: 14,
    tileCount: 70,
  });
});

test("project cards come before the remaining placeholder cards", () => {
  const wratop = {
    logo: "/assets/logos/projects/wratop-icon.png",
    title: "Wratop",
    url: "https://github.com/safethecode/wratop",
  };

  assert.deepEqual(createIncubatorTiles([wratop], 3), [
    { kind: "project", project: wratop },
    { id: 1, kind: "placeholder" },
    { id: 2, kind: "placeholder" },
  ]);
});

test("the first project card opens the Wratop repository", () => {
  assert.deepEqual(INCUBATOR_PROJECTS[0], {
    logo: "/assets/logos/projects/wratop-icon.png",
    title: "Wratop",
    url: "https://github.com/safethecode/wratop",
  });
});
