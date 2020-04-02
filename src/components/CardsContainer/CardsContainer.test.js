import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CardsContainer from "./CardsContainer.js";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";

describe("CardsContainer", () => {
  it("should render", () => {
    const { getByTestId } = render(
      <Router>
        <CardsContainer areas={[]} />
      </Router>
    );

    const container = getByTestId("card-container");
    expect(container).toBeInTheDocument();
  });

  it("should render a card", () => {
    const { getByText } = render(
      <Router>
        <CardsContainer
          areas={[{ area: "short", id: 1, about: "About", name: "long" }]}
        />
      </Router>
    );

    const areaDescriptionElement = getByText("About");
    const shortNameElement = getByText("short");
    const longNameElement = getByText("(long)");
    const buttonElement = getByText("View Listings");

    expect(shortNameElement).toBeInTheDocument();
    expect(longNameElement).toBeInTheDocument();
    expect(areaDescriptionElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });
});
