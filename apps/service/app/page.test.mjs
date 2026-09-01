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
  assert.ok(introSection.props.className.includes("min-h-[calc(100svh-5rem)]"));
});

test("home uses editorial labels to express personality", async () => {
  const page = await Home();
  const text = collectText(page);
  const editorialSection = collectElements(page).find(
    (element) => element.props["aria-label"] === "개인 키워드"
  );
  const italicIndexes = collectElements(editorialSection).filter(
    (element) => element.type === "em"
  );
  const boldProductLabel = collectElements(editorialSection).find(
    (element) =>
      element.type === "strong" && collectText(element) === "완성도 높은 제품"
  );

  assert.ok(text.includes("커피(#1)"));
  assert.ok(text.includes("프론트엔드(#12)"));
  assert.ok(text.includes("완성도 높은 제품(#24)"));
  assert.ok(text.includes("호기심(#∞)"));
  assert.ok(editorialSection.props.className.includes("font-inter-tight"));
  assert.ok(
    editorialSection.props.className.includes("text-[clamp(1rem,5vw,1.7rem)]")
  );
  assert.ok(editorialSection.props.className.includes("max-w-[22rem]"));
  assert.ok(editorialSection.props.className.includes("sm:max-w-[30rem]"));
  assert.ok(editorialSection.props.className.includes("leading-[1.2]"));
  assert.ok(editorialSection.props.className.includes("sm:leading-[1.16]"));
  assert.ok(editorialSection.props.className.includes("text-center"));
  assert.equal(italicIndexes.length, 4);
  assert.ok(boldProductLabel.props.className.includes("font-medium"));
});

test("home opts out of the shared footer", async () => {
  const page = await Home();

  assert.equal(page.props["data-page-footer"], "hidden");
});

test("home removes the scroll cue when there is no second section", async () => {
  const page = await Home();
  const text = collectText(page);

  assert.ok(!text.includes("scroll down"));
});

test("home keeps the service question floating at the bottom right", async () => {
  const page = await Home();
  const elements = collectElements(page);
  const text = collectText(page);
  const questionDetails = elements.find(
    (element) => element.type === "details"
  );
  const questionToggle = elements.find((element) => element.type === "summary");
  const questionPanel = elements.find(
    (element) => element.props["aria-labelledby"] === "service-essence-question"
  );
  const answerInput = elements.find(
    (element) =>
      element.type === "input" && element.props.name === "serviceEssence"
  );
  const answerButton = elements.find(
    (element) => element.type === "button" && collectText(element) === "OK"
  );

  assert.ok(questionDetails);
  assert.equal(questionDetails.props.open, true);
  assert.ok(questionDetails.props.className.includes("fixed"));
  assert.ok(questionDetails.props.className.includes("right-4"));
  assert.ok(questionDetails.props.className.includes("bottom-4"));
  assert.ok(questionToggle.props.className.includes("group-open:absolute"));
  assert.ok(collectText(questionToggle).includes("Question"));
  assert.ok(collectText(questionToggle).includes("×"));
  assert.ok(questionPanel);
  assert.ok(text.includes("Question"));
  assert.ok(text.includes("What is the essence of your service?"));
  assert.equal(answerInput.props.type, "text");
  assert.equal(answerInput.props.maxLength, 80);
  assert.ok(answerInput.props.className.includes("service-essence-input"));
  assert.ok(!answerInput.props.className.includes("border-b"));
  assert.equal(answerButton.props.type, "button");
});
