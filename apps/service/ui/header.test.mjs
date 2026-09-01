import assert from "node:assert/strict";
import { test } from "node:test";
import Image from "next/image";
import Link from "next/link";
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

test("home header centers the logo above a small text menu", () => {
  const headerElements = collectElements(HomeHeader());
  const logoElements = collectElements(SamsonLogo());
  const logoImages = logoElements.filter((element) => element.type === Image);
  const horizontalContainer = headerElements.find(
    (element) =>
      element.type === "div" && element.props.className.includes("px-4")
  );
  const headerContainer = headerElements.find(
    (element) =>
      element.type === "div" &&
      element.props.className.includes("flex-col") &&
      element.props.className.includes("items-center")
  );
  const logoContainer = headerElements.find(
    (element) =>
      element.type === "div" && element.props.className.includes("mb-2.5")
  );
  const logoSlot = headerElements.find(
    (element) => element.type === SamsonLogo
  );
  const homeLink = logoElements.find(
    (element) =>
      element.props.href === "/" && element.props["aria-label"] === "홈으로"
  );
  const homeMenu = headerElements.find(
    (element) =>
      element.type === "nav" && element.props["aria-label"] === "홈 메뉴"
  );
  const menuLinks = headerElements.filter((element) => element.type === Link);

  assert.equal(logoImages.length, 2);
  assert.ok(horizontalContainer);
  assert.ok(horizontalContainer.props.className.includes("sm:px-8"));
  assert.ok(!horizontalContainer.props.className.includes("py-"));
  assert.ok(headerContainer);
  assert.ok(headerContainer.props.className.includes("py-4"));
  assert.ok(!headerContainer.props.className.includes("px-"));
  assert.ok(!headerContainer.props.className.includes("h-20"));
  assert.ok(logoContainer);
  assert.ok(!logoContainer.props.className.includes("mt-"));
  assert.ok(logoSlot);
  assert.ok(homeLink);
  assert.ok(homeMenu);
  assert.ok(!homeMenu.props.className.includes("mb-"));
  assert.ok(!homeMenu.props.className.includes("mt-"));
  assert.ok(homeMenu.props.className.includes("text-[10px]"));
  assert.equal(menuLinks.length, 4);
  assert.equal(
    headerElements.filter((element) => element.type === "button").length,
    0
  );
  assert.equal(getHeaderVariant("/"), "home");
  assert.equal(getHeaderVariant("/projects"), "site");
});
