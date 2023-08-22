import React from "react";

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import Header from "@/src/components/Header";

describe("Header", () => {
  let expectedProps: any;

  beforeEach(() => {
    expectedProps = {
      name: "Phonebook",
      action: <button>Action</button>,
    };
  });

  it("should render name, and action", () => {
    const { getByText } = render(<Header {...expectedProps} />);

    const name = getByText(expectedProps.name);
    const action = getByText("Action");

    expect(name).toBeVisible();
    expect(action).toBeInTheDocument();
  });
});
