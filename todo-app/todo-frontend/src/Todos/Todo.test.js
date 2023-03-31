import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test("renders content", () => {
  const todo = {
    text: "Learn about containers",
    done: false,
  };

  render(<Todo todo={todo} />);

  const element = screen.getByText("Learn about containers");
  expect(element).toBeDefined();
});
