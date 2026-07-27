import * as React from "react";
import { memoryImageCategories } from "./MemoryImageLibrary";

const ALTERNATIVES_PER_TARGET = 2;

function getKeys(limit: number) {
  if (limit > memoryImageCategories.length) {
    throw new Error("Requested more categories than are available");
  }

  const keys = Array.from(Array(memoryImageCategories.length).keys());
  const keysSelected: Array<number> = [];

  while (keysSelected.length < limit) {
    const randomKey = Math.floor(Math.random() * keys.length);
    if (!keysSelected.includes(randomKey)) {
      keysSelected.push(randomKey);
    }
  }

  return keysSelected;
}

function renderImage(categoryIndex: number, imageIndex: number) {
  const key = `${categoryIndex + 1}-${imageIndex + 1}`;
  return (
    <img
      alt=""
      className="memory-stimulus-image"
      key={key}
      src={memoryImageCategories[categoryIndex][imageIndex]}
    />
  );
}

export default function getImages(limit: number) {
  const result = [];
  const allImages = [];
  const keysSelected: Array<number> = getKeys(limit);
  const imageSelections: Array<{ category: number; index: number }> = [];

  for (let i = 0; i < limit; i++) {
    const categoryIndex = keysSelected[i];
    const category = memoryImageCategories[categoryIndex];
    const selectedImageIndex = Math.floor(Math.random() * category.length);

    result.push(renderImage(categoryIndex, selectedImageIndex));
    allImages.push(renderImage(categoryIndex, selectedImageIndex));

    const alternativeIndexes: Array<number> = [];
    while (alternativeIndexes.length < ALTERNATIVES_PER_TARGET) {
      const alternativeIndex = Math.floor(Math.random() * category.length);
      if (
        alternativeIndex !== selectedImageIndex &&
        !alternativeIndexes.includes(alternativeIndex)
      ) {
        alternativeIndexes.push(alternativeIndex);
        allImages.push(renderImage(categoryIndex, alternativeIndex));
      }
    }

    imageSelections.push({
      category: categoryIndex + 1,
      index: selectedImageIndex + 1,
    });
  }

  return {
    images: result,
    resultImages: shuffle(allImages),
    imageIndexes: imageSelections,
  };
}

function shuffle(array: Array<React.ReactElement>) {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
