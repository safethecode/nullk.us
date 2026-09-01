import assert from "node:assert/strict";
import { test } from "node:test";
import Image from "next/image";
import React, { Children, isValidElement } from "react";
import { getHeaderVariant, HomeHeader, SamsonLogo } from "./header.tsx";

globalThis.React = React;

function collectElements(node) {
  if (!isValidElement(node)) {
    return [];
  }

  return [
    node,
    ...Children.toArray(node.props.children).flatMap(collectElements),
  ];
}

test("header keeps only the centered home logo", () => {
  const headerElements = collectElements(HomeHeader());
  const logoElements = collectElements(SamsonLogo());
  const logoImages = logoElements.filter((element) => element.type === Image);
  const centerContainer = headerElements.find(
    (element) =>
      element.type === "div" &&
      element.props.className.includes("justify-center")
  );
  const logoSlot = headerElements.find(
    (element) => element.type === SamsonLogo
  );
  const homeLink = logoElements.find(
    (element) =>
      element.props.href === "/" && element.props["aria-label"] === "홈으로"
  );

  assert.equal(logoImages.length, 2);
  assert.ok(centerContainer);
  assert.ok(logoSlot);
  assert.ok(homeLink);
  assert.equal(
    headerElements.filter((element) => element.type === "nav").length,
    0
  );
  assert.equal(
    headerElements.filter((element) => element.type === "button").length,
    0
  );
  assert.equal(getHeaderVariant("/"), "home");
  assert.equal(getHeaderVariant("/projects"), "site");
});
