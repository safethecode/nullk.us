import assert from "node:assert/strict";
import { test } from "node:test";
import Image from "next/image";
import React, { Children, isValidElement } from "react";
import Home from "./page.tsx";

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

function collectText(node) {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (!isValidElement(node)) {
    return "";
  }

  return Children.toArray(node.props.children).map(collectText).join("");
}

test("home presents all 24 photos as one personal collage", async () => {
  const page = await Home();
  const elements = collectElements(page);
  const portraitCount = elements.filter(
    (element) => element.type === Image
  ).length;
  const photoSection = elements.find(
    (element) => element.props["aria-label"] === "인물 사진 모음"
  );
  const introSection = elements.find(
    (element) => element.props["aria-label"] === "개인 소개"
  );

  assert.equal(portraitCount, 24);
  assert.ok(photoSection.props.className.includes("grid-cols-6"));
  assert.ok(photoSection.props.className.includes("sm:grid-cols-8"));
  assert.ok(photoSection.props.className.includes("max-w-[23rem]"));
  assert.ok(photoSection.props.className.includes("sm:max-w-[34rem]"));
  assert.ok(introSection.props.className.includes("px-4"));
  assert.ok(introSection.props.className.includes("py-10"));
});

test("home uses editorial English labels to express personality", async () => {
  const page = await Home();
  const text = collectText(page);
  const editorialSection = collectElements(page).find(
    (element) => element.props["aria-label"] === "개인 키워드"
  );
  const italicIndexes = collectElements(editorialSection).filter(
    (element) => element.type === "em"
  );

  assert.ok(text.includes("Coffee(#1)"));
  assert.ok(text.includes("Frontend(#12)"));
  assert.ok(text.includes("Products(#24)"));
  assert.ok(text.includes("Curiosity(#∞)"));
  assert.ok(editorialSection.props.className.includes("font-inter-tight"));
  assert.ok(
    editorialSection.props.className.includes(
      "text-[clamp(0.78rem,3.8vw,1.7rem)]"
    )
  );
  assert.ok(editorialSection.props.className.includes("max-w-[22rem]"));
  assert.ok(editorialSection.props.className.includes("sm:max-w-[30rem]"));
  assert.ok(editorialSection.props.className.includes("leading-[1.2]"));
  assert.ok(editorialSection.props.className.includes("sm:leading-[1.16]"));
  assert.ok(editorialSection.props.className.includes("text-center"));
  assert.equal(italicIndexes.length, 4);
});

test("home opts out of the shared footer", async () => {
  const page = await Home();

  assert.equal(page.props["data-page-footer"], "hidden");
});

test("home presents a subtle scroll cue", async () => {
  const page = await Home();
  const text = collectText(page);
  const scrollCue = collectElements(page).find(
    (element) =>
      element.type === "p" && collectText(element).includes("scroll down")
  );

  assert.ok(text.includes("scroll down"));
  assert.ok(scrollCue.props.className.includes("left-1/2"));
  assert.ok(scrollCue.props.className.includes("-translate-x-1/2"));
  assert.ok(!scrollCue.props.className.includes("sm:left-"));
});

test("home asks for the essence of a service in the second section", async () => {
  const page = await Home();
  const elements = collectElements(page);
  const text = collectText(page);
  const questionSection = elements.find(
    (element) => element.props["aria-labelledby"] === "service-essence-question"
  );
  const answerInput = elements.find(
    (element) =>
      element.type === "input" && element.props.name === "serviceEssence"
  );

  assert.ok(questionSection);
  assert.ok(text.includes("What is the essence of your service?"));
  assert.equal(answerInput.props.type, "text");
  assert.equal(answerInput.props.maxLength, 80);
});
