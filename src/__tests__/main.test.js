import Home from "@/pages/index";
import { render } from "@testing-library/react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]), // You can mock dorms here later
  }),
);

describe("End-to-end testing", () => {
  test("Render index.js component", () => {
    render(<Home />);
  });
});
