import getImages from "./RandomImage";
import { memoryImageCategories } from "./MemoryImageLibrary";

describe("expanded MemoryGame image library", () => {
  test("contains 18 categories with 6 images in each category", () => {
    expect(memoryImageCategories).toHaveLength(18);
    memoryImageCategories.forEach((category) => {
      expect(category).toHaveLength(6);
    });
  });

  test("keeps the existing target plus two alternatives behavior", () => {
    for (let run = 0; run < 100; run++) {
      const selected = getImages(4);
      const categoryIds = selected.imageIndexes.map(({ category }) => category);

      expect(selected.images).toHaveLength(4);
      expect(selected.resultImages).toHaveLength(12);
      expect(selected.imageIndexes).toHaveLength(4);
      expect(new Set(categoryIds).size).toBe(4);

      selected.imageIndexes.forEach(({ category, index }) => {
        expect(category).toBeGreaterThanOrEqual(1);
        expect(category).toBeLessThanOrEqual(18);
        expect(index).toBeGreaterThanOrEqual(1);
        expect(index).toBeLessThanOrEqual(6);
      });
    }
  });
});
