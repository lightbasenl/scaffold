import ucfirst from "./ucfirst";

test("Capitalizes first letter of a given string", () => {
  const string = "hello";
  const capitalizedString = ucfirst(string);

  expect(capitalizedString[0]).toBe("H");
  expect(capitalizedString.slice(1)).toBe("ello");
});
