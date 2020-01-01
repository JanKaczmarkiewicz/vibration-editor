import validateLayout, { inRange, isCollision } from "../util";

test("inRange", () => {
  expect(inRange(20, { start: 10, end: 100 })).toBe(true);
  expect(inRange(30, { start: 40, end: 100 })).toBe(false);
  expect(inRange(101, { start: 40, end: 100 })).toBe(false);
});

test("colision", () => {
  expect(isCollision({ start: 10, end: 100 }, { start: 10, end: 100 })).toBe(
    true
  );
  expect(isCollision({ start: 0, end: 9 }, { start: 10, end: 100 })).toBe(
    false
  );
  expect(isCollision({ start: 0, end: 10 }, { start: 10, end: 100 })).toBe(
    true
  );

  expect(isCollision({ start: 20, end: 40 }, { start: 10, end: 100 })).toBe(
    true
  );
  expect(isCollision({ start: 10, end: 100 }, { start: 20, end: 40 })).toBe(
    true
  );
  expect(isCollision({ start: 10, end: 100 }, { start: 20, end: 200 })).toBe(
    true
  );
  expect(isCollision({ start: 10, end: 100 }, { start: 10, end: 200 })).toBe(
    true
  );
  expect(isCollision({ start: 80, end: 130 }, { start: 139, end: 189 })).toBe(
    false
  );
  expect(isCollision({ start: 80, end: 130 }, { start: 112, end: 162 })).toBe(
    true
  );
  expect(isCollision({ start: 10, end: 20 }, { start: 5, end: 40 })).toBe(true);
});

test("valid Layout", () => {
  expect(
    validateLayout({
      a: { left: 80, title: "XD", width: 50 },
      b: { left: 20, title: "XD", width: 50 }
    })
  ).toBe(true);

  expect(
    validateLayout({
      a: { left: 20, title: "XD", width: 50 },
      b: { left: 20, title: "XD", width: 50 }
    })
  ).toBe(false);
});

// test("valide", () => {
//   expect(validateLayout).toBe(true);
// });
